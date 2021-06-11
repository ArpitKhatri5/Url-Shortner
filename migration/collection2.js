const Url = require('../models/Url')

const fun = (longUrl,shortUrl,urlCode,c,d) =>
{ 

return url = new Url({
    longUrl,
    shortUrl,
    urlCode,
    created_at: new Date(),
    request_count : "1",
    max_req : c,
    expire_time : d
})

}

module.exports = fun;