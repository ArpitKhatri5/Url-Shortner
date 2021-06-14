const core_url = require('../models/coreUrl');

const insertUrlData = (longUrl, shortUrl, urlCode, maximumRequests, expiryTime) => {
  return url = new core_url({
    longUrl,
    shortUrl,
    urlCode,
    created_at: new Date(),
    request_count: '1',
    max_req: maximumRequests,
    expire_time: expiryTime,
  });
};

module.exports = insertUrlData;
