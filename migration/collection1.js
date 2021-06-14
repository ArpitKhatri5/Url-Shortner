const Url2 = require('../models/Url2');

const fun = (a, b, c) => {
  return new Url2({
    shortUrl: a,
    result: b,
    created_at: new Date(),
    ip: String(c),

  });
};

module.exports = fun;
