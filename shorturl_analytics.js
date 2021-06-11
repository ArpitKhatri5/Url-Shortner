const express = require('express')

const router = express.Router()


const Url2 = require('./models/Url2')

let q

router.post('/',(req,res)=>{
    let days = req.body.days
    
    let x = Url2.find( {
        $and : [ {"created_at":{$gt:new Date(Date.now() - 24*60*60 * 1000 * Number(days))}} , {"shortUrl" : req.body.shortUrl}]
    } ,  (err, docs)=> {
        if (err){
            console.log(err);
        }
        else{
           // console.log("First function call : ", docs);
            q =docs
        }
    });
   
    res.send(q);

})

module.exports = router
