const logger = require('../utils/error-logging.js');
const debug = require('../utils/debug-logging.js');
const Url = require('../models/Url');
const Url2 = require('../models/Url2');

let q1;

const getData1 = (req, res)=>{
  const days = req.body.days;
  debug('Sending data of last x days from collection');
  const x = Url.find({'created_at': {$gt: new Date(Date.now() - 24*60*60 * 1000 * Number(days))}}, (err, docs)=> {
    if (err) {
      logger(err);
    } else {
      q1 =docs;
    }
  });

  res.send(q1);
};


let q2;

const getData2 = (req, res)=>{
  const days = req.body.days;
  debug('Sending data of last x days from collection');

  const x = Url2.find({'created_at': {$gt: new Date(Date.now() - 24*60*60 * 1000 * Number(days))}}, (err, docs)=> {
    if (err) {
      logger(err);
    } else {
      q2 =docs;
    }
  });

  res.send(q2);
};


let q3;

const getData3 = (req, res)=>{
  const days = req.body.days;
  debug('Sending All shortUrl access logs');
  const x = Url2.find( {
    $and: [{'created_at': {$gt: new Date(Date.now() - 24*60*60 * 1000 * Number(days))}}, {'shortUrl': req.body.shortUrl}],
  }, (err, docs)=> {
    if (err) {
      logger(err);
    } else {
      q3 =docs;
    }
  });

  res.send(q3);
};


module.exports = {getData1, getData2, getData3};
