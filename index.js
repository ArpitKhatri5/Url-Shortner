const express = require("express")
const app = express()


const connection = require('./Database/db')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

app.use(express.json({
    extended: false
})) 
app.use('/', require('./Links/redirect'))
app.use('/api/url', require('./Links/url'))
app.use('/data',require('./data.js'))
//Listen for incoming requests
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`))