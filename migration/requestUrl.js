const request_url = require('../models/requestUrl');

const insertRequestData = (short_urlValue, booleanResult, ipAddress) => {
  return new request_url({
    short_url: short_urlValue,
    result: booleanResult,
    created_at: new Date(),
    ip: String(ipAddress),

  });
};

module.exports = insertRequestData;
