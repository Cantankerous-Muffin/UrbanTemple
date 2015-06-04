var express = require('express');
var router = express.Router();

var userRoute = require('./user');
var classRoute = require('./class');
var feedbackRoute = require('./feedbackPOST');

router.use('/user', userRoute);
router.use('/class', classRoute);
router.use('/feedback', feedbackRoute);

module.exports = router;