const express = require('express');
const logger = require('../utils/error-logging.js');

const router = express.Router();

const coreUrl = require('../models/coreUrl');

router.get('/:code', async (req, res)=>{
  try {
    const url = await coreUrl.findOne({
      url_code: req.params.code
    });
    if (url) {
      res.status(302);
      return res.redirect(url.long_url);
    } else {
      return res.status(404).json('No URL Found');
    }
  } catch (err) {
    logger(err);
    res.status(500).json('Server Error');
  }
});


module.exports = router;
