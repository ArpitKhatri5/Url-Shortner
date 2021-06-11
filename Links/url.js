const express = require('express')

const router = express.Router()

const validUrl = require('valid-url')
const shortid = require('shortid')

const Url = require('../models/Url')
const Url2 = require('../models/Url2')


const requestIp = require('request-ip');


const baseUrl = 'http:localhost:5000'
router.post('/shorten',async(req,res)=>{
    
   try{

    const {longUrl} = req.body

    //check if it is short url
    if(req.body.shortUrl)
    {
        let url = await Url.findOne({shortUrl :req.body.shortUrl})
        if(url){
              //inserting into 2nd collection
            url2 = new Url2({
            shortUrl : req.body.shortUrl,
            result : true,
            created_at: new Date(),
            ip : String(requestIp.getClientIp(req))
        
        })
        url2.save(); 
        res.status(200);
        res.json(url) 
        res.end() 
        }
        else{
            url2 = new Url2({
                shortUrl : req.body.shortUrl,
                result : false,
                created_at: new Date()
            
            })
            url2.save();            
            res.status(401).json('Invalid shortUrl') 
            res.end()
        }

        
    }    
    else
    {
    //check base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base URL')
    }
    // create url code
    const urlCode = shortid.generate()
    //check long url
    if(validUrl.isUri(longUrl)){
        try{
            let url = await Url.findOne({longUrl})
            if(url){
 
                //check for expiry
                
                let expiry = url.expire_time
                
                let z = Number(url.request_count)
                
                let dt = new Date( Date.now() - 24*60* 60 * 1000 * Number(expiry))  ;
                
                if(dt < url.created_at)
                {
                    url.remove({"longUrl":longUrl})
                    res.status(404)
                    res.send("Oops! The link has expired");
                    res.end()

                }
                
                

                //check for limit
                
                else if(z >= Number(url.max_req))
                {   
                    res.status(410)
                    res.send("Limit reached!!!")
                    res.end()
                }
                z = z+1;
                
                url.request_count = String(z)
                url.save()
                res.json(url)
            }
            else{
                const shortUrl = baseUrl + '/'+ urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    created_at: new Date(),
                    request_count : "1",
                    max_req : req.body.max_req,
                    expire_time : req.body.expire_time
                })
                await url.save()
                res.status(200)
                res.json(url)
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json('Server Error')
        }
    }
    else{
        res.status(401).json('Invalid longUrl')
    }
}


}

catch(err){
    console.error(err,"this error")
    res.status(500).json('Server Error')
}


})

module.exports = router
