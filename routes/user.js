

var express = require('express');
var router = express.Router();

var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');

var passport = require('passport');
var path         = require('path');
var DBQuery = require('../utils/dbQueries.js')
var db = require('../app/config.js')

var studentRoute = require('./student');
var instructorRoute = require('./instructor');

var usernameRoute = require('./username');

router.get('/', function(req, res) {
	console.log('req.url is', req.url);
});

router.use('/:username', usernameRoute);

module.exports = router;