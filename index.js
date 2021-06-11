const express = require("express")
const app = express()
const logger = require('./logging.js')

const Sentry = require('@sentry/node');

Sentry.init({ dsn: "https://0b9c64357fa840b1a2f53277cdc80181@o285623.ingest.sentry.io/5796886"});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

const connection = require('./Database/db')
connection.once('open', () => logger('DB Connected'))
connection.on('error', () => logger('Error'))



app.use(express.json({
    extended: false
})) 
app.use('/',require('./Links/redirect'))
app.use('/api/url', require('./Links/url'))
app.use('/data', require('./data.js'))
app.use('/requests', require('./requests.js'))
app.use('/analytics', require('./shorturl_analytics.js'))



const PORT = process.env.PORT || 5000
app.listen(PORT, logger(`server started, listening PORT ${PORT}`))