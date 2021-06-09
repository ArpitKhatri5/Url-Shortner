const express = require('express')

const router = express.Router()


const Url = require('./models/Url')
//let data_array = {}
let q

router.post('/',(req,res)=>{
    let days = req.body.days

    let x = Url.find({"created_at":{$gt:new Date(Date.now() - 24*60*60 * 1000 * Number(days))}},  (err, docs)=> {
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