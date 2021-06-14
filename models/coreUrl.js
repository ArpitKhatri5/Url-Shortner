const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  created_at: {type: String, default: Date.now},
  request_count: String,
  max_req: String,
  expire_time: String,

});

module.exports = mongoose.model('Url', urlSchema);
