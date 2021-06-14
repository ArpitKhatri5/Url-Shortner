const express = require('express');
const logger = require('../utils/error-logging.js');
const debug = require('../utils/debug-logging.js');
const router = express.Router();
const add_data = require('../migration/collection1.js');
const add_data2 = require('../migration/collection2.js');
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/Url');
const Url2 = require('../models/Url2');


const requestIp = require('request-ip');

const fun = require('../controller/controller1.js');

router.post('/shorten', fun);

module.exports = router;
