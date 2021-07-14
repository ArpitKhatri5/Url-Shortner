const logger = require('../utils/error-logging.js');
const debug = require('../utils/debug-logging.js');
const coreUrl = require('../models/coreUrl');
const requestUrl = require('../models/requestUrl');

let urlRequests;

const getUrlData = (req, res)=>{
  const days = req.body.days;
  debug('Sending data of last x days from collection');
  coreUrl.find({
    'created_at': {$gt: new Date(Date.now() - 24*60*60 * 1000 * Number(days))}
  }, (err, docs)=> {
    if (err) {
      logger(err);
    } else {
        urlRequests =docs;
    }
  });

  res.send(urlRequests);
};



const getRequestData = (req, res)=>{
  const days = req.body.days;
  debug('Sending data of last x days from collection');

  requestUrl.find({
    'created_at': {$gt: new Date(Date.now() - 24*60*60 * 1000 * Number(days))}
  }, (err, docs)=> {
    if (err) {
      logger(err);
    } else {
        urlRequests =docs;
    }
  });

  res.send(urlRequests);
};




const getAccessData = (req, res)=>{
  const days = req.body.days;
  debug('Sending All short_url access logs');
  requestUrl.find( {
    $and: [{'created_at': {$gt: new Date(Date.now() - 24*60*60 * 1000 * Number(days))}}, {'short_url': req.body.short_url}],
  }, (err, docs)=> {
    if (err) {
      logger(err);
    } else {
        urlRequests =docs;
    }
  });

  res.send(urlRequests);
};


module.exports = {getUrlData, getRequestData, getAccessData};
