const request_url = require('../models/requestUrl');

const insertRequestData = (shortUrlValue, booleanResult, ipAddress) => {
  return new request_url({
    short_url: shortUrlValue,
    result: booleanResult,
    created_at: new Date(),
    ip: String(ipAddress),

  });
};

module.exports = insertRequestData;
