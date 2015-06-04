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
router.get('/', function(req, res) {
	console.log('req.url is', req.url);
});
router.get('/:username', function(req, res) {
	console.log('req.url is', req.url);
	// we need to check if the user is a student or an instructor.
		// if user is a student, direct to student route.
		// else direct to instructor route.
	db.knex({username: req.url.slice(1)})
		.where({})
	if (req.url.slice(1)){
		res.end('get to student without any parameters '+ req.get('host') + req.originalUrl);
	} else {
		res.end('get to instructor without any parameters '+ req.get('host') + req.originalUrl);
	}

  // query 'students' table with username and return first and last name, and all ranks for all classes
  // req.url contains username

	// DBQuery.getStudentUsing('username', req.username, function(data){
	//   	res.json(data);
	// });
});


module.exports = router;