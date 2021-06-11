

const express = require('express')

const router = express.Router()
const logger = require('../../utils/error-logging.js')
const debug = require('../../utils/debug-logging.js')
const Url2 = require('../../models/Url2')

let q

router.post('/',(req,res)=>{
    let days = req.body.days
    debug("Sending data of last x days from collection");
    
    let x = Url2.find({"created_at":{$gt:new Date(Date.now() - 24*60*60 * 1000 * Number(days))}},  (err, docs)=> {
        
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