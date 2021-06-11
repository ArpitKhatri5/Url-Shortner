const express = require("express")
const app = express()
const logger = require('../utils/error-logging.js')
const debug = require('../utils/debug-logging.js')

const Sentry = require('@sentry/node');

// Sentry.init({ dsn: "https://0b9c64357fa840b1a2f53277cdc80181@o285623.ingest.sentry.io/5796886"});
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.errorHandler());

const connection = require('../config/db')
connection.once('open', () => debug('DB Connected'))
connection.on('error', () => debug('Error'))



app.use(express.json({
    extended: false
})) 
app.use('/',require('../routes/redirect'))
app.use('/api/url', require('../routes/url'))
app.use('/data', require('../routes/requests/data.js'))
app.use('/requests', require('../routes/requests/requests.js'))
app.use('/analytics', require('../routes/requests/shorturl_analytics.js'))



const PORT = process.env.PORT || 5000
app.listen(PORT, debug(`server started, listening PORT ${PORT}`))