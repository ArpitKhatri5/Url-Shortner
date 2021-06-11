const express = require('express')

const router = express.Router()
const logger = require('../../utils/error-logging.js')
const debug = require('../../utils/debug-logging.js')
const Url2 = require('../../models/Url2')

let q

router.post('/',(req,res)=>{
    let days = req.body.days
    debug("Sending All shortUrl access logs")
    let x = Url2.find( {
        $and : [ {"created_at":{$gt:new Date(Date.now() - 24*60*60 * 1000 * Number(days))}} , {"shortUrl" : req.body.shortUrl}]
    } ,  (err, docs)=> {
        if (err){
            logger(err);
        }
        else{
           
            q =docs
        }
    });
   
    res.send(q);

})

module.exports = router
