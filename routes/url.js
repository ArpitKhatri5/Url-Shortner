const express = require('express');
const router = express.Router();


const fun = require('../controller/controller1.js');

router.post('/shorten', fun);

module.exports = router;
