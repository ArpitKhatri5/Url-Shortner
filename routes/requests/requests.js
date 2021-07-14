const express = require('express');

const router = express.Router();


const {getUrlData, getRequestData, getAccessData} = require('../../controller/requestUrl.js');
router.use('/data', getUrlData);
router.use('/data2', getRequestData);
router.use('/analytics', getAccessData);


module.exports = router;
