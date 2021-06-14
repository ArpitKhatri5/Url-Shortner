const express = require('express');
const logger = require('../utils/error-logging.js');
const debug = require('../utils/debug-logging.js');
const router = express.Router();

const Url = require('../models/Url');

router.get('/:code', async (req, res)=>{
  try {
    const url = await Url.findOne({urlCode: req.params.code});
    if (url) {
      res.status(302);
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL Found');
    }
  } catch (err) {
    logger(err);
    res.status(500).json('Server Error');
  }
});


module.exports = router;
