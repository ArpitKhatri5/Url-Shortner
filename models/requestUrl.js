const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortUrl: String,
  result: Boolean,
  created_at: {type: String, default: Date.now},
  ip: String,

});

module.exports = mongoose.model('Url2', urlSchema);
