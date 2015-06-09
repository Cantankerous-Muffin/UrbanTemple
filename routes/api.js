var express = require('express');
var router = express.Router();

var userRoute = require('./user');
var classRoute = require('./class');
var feedbackRoute = require('./feedbackPOST');
var disciplineRoute = require('./discipline');

router.use('/user', userRoute);
router.use('/class', classRoute);
router.use('/feedback', feedbackRoute);
router.use('/discipline', disciplineRoute);

module.exports = router;