const express = require('express');

const router = express.Router();


const {getData1, getData2, getData3} = require('../../controller/controller2.js');
router.use('/data', getData1);
router.use('/data2', getData2);
router.use('/analytics', getData3);


module.exports = router;
