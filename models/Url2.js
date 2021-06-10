const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
    shortUrl: String, 
    result : Boolean,
    created_at :{type: String, default: Date.now}

})

module.exports = mongoose.model('Url2',URLSchema)