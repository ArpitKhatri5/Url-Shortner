const core_url = require('../models/coreUrl');

const insertUrlData = (long_url, short_url, url_code, maximumRequests, expiryTime) => {
  return url = new core_url({
    long_url,
    short_url,
    url_code,
    created_at: new Date(),
    request_count: '1',
    max_req: maximumRequests,
    expire_time: expiryTime,
  });
};

module.exports = insertUrlData;
