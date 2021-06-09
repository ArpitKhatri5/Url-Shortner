const express = require('express')

const router = express.Router()

const validUrl = require('valid-url')
const shortid = require('shortid')

const Url = require('../models/Url')


const baseUrl = 'http:localhost:5000'
router.post('/shorten', async(req,res)=>{
    const {longUrl} = req.body

    //check if it is short url
    if(req.body.shortUrl)
    {
        let url = await Url.findOne({shortUrl :req.body.shortUrl})
        if(url){
            res.json(url)
        }
        else{
            res.status(401).json('Invalid shortUrl') 
        }

        
    }    
    
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
                
                let dt = new Date( Date.now() - 60 * 1000 * Number(expiry))  ;
                dt = String(dt)

                if(dt > url.created_at)
                {
                    url.remove({"longUrl":longUrl})

                    res.send("Oops! The link has expired");

                }
                
                

                //check for limit
                let z = Number(url.request_count)
                if(z >= Number(url.max_req))
                {
                    res.send("Limit reached!!!")
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
})

module.exports = router
