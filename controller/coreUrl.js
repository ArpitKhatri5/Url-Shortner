const logger = require('../utils/error-logging.js');
const debug = require('../utils/debug-logging.js');


const insertRequestData = require('../migration/requestUrl.js');
const insertUrlData = require('../migration/coreUrl.js');
const validUrl = require('valid-url');
const shortid = require('shortid');

const coreUrl = require('../models/coreUrl');

const requestIp = require('request-ip');


const baseUrl = 'http:localhost:5000';
const fun = async (req, res)=>{
  try {
    const {longUrl} = req.body;

    // check if it is short url
    if (req.body.shortUrl) {
      debug('shortUrl detected: ');
      const url = await coreUrl.findOne({
        shortUrl: req.body.shortUrl
      });
      if (url) {
        // inserting into 2nd collection
        debug('Present in DB ;storing the request in database ');
        url2 = insertRequestData(
          req.body.shortUrl, 
          true, 
          requestIp.getClientIp(req)
          );

        url2.save();
        res.status(200);
        res.json(url);
        res.end();
      } else {
        debug('Not Present in DB ;storing the request in database ');
        url2 = insertRequestData(
          req.body.shortUrl, 
          false, 
          requestIp.getClientIp(req)
          );
        url2.save();
        res.status(401).json('Invalid shortUrl');
        res.end();
      }
    } else {
    // check base url
      debug('Recieved request for longUrl : ');
      if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
      }
      // create url code
      const urlCode = shortid.generate();
      // check long url
      if (validUrl.isUri(longUrl)) {
        try {
          let url = await coreUrl.findOne({longUrl});
          if (url) {
            // check for expiry

            const expiry = url.expire_time;

            let request_count = Number(url.request_count);

            const dt= new Date( Date.now() - 24*60* 60 * 1000 * Number(expiry));

            if (dt < url.created_at) {
              debug('Link expired; 404 returned ');
              url.remove({'longUrl': longUrl});
              res.status(404);
              res.send('Oops! The link has expired');
              res.end();
            }


            // check for limit

            else if (request_count >= Number(url.max_req)) {
              res.status(410);
              res.send('Limit reached!!!');
              res.end();
            }
            request_count = request_count+1;

            url.request_count = String(request_count);
            url.save();
            res.json(url);
          } else {
            const shortUrl = baseUrl + '/'+ urlCode;

            url = insertUrlData(
              longUrl, 
              shortUrl, 
              urlCode, 
              req.body.max_req,
              req.body.expire_time
              );

            await url.save();
            res.status(200);
            res.json(url);
          }
        } catch (err) {
          logger(err);
          res.status(500).json('Server Error');
        }
      } else {
        res.status(401).json('Invalid longUrl');
      }
    }
  } catch (err) {
    logger(err);
    res.status(500).json('Server Error');
  }
};

module.exports = fun;
