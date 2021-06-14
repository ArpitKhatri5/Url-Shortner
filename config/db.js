const mongoose = require('mongoose');

// const DB_URI = 'mongodb://localhost:27017/urlshortener'
const DB_URI = 'mongodb://assignmentUser2021:I88HLABQAPhYQF8a@sp-dev-shard-00-00-sytop.mongodb.net:27017,sp-dev-shard-00-01-sytop.mongodb.net:27017,sp-dev-shard-00-02-sytop.mongodb.net:27017/assignment2021?ssl=true&replicaSet=sp-dev-shard-0&authSource=admin&retryWrites=true&w=majority';


mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;

module.exports = connection;
