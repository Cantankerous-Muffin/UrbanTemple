var express = require('express');
var router = express.Router();

var studentRoute = require('./student');
var classRoute = require('./class');
var feedbackRoute = require('./feedbackPOST');

router.use('/student', studentRoute);
router.use('/class', classRoute);
router.use('/feedback', feedbackRoute);

module.exports = router;