const express = require('express');
const router = express.Router();


const fun = require('../controller/coreUrl.js');

router.post('/shorten', fun);

module.exports = router;
