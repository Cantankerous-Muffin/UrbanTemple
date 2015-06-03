var express = require('express');
var router = express.Router();
var enrolledRoute = require('./class_students');
var progressRoute = require('./student_progress');
var feedbackRoute = require('./feedback');

var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');
var passport = require('passport');
var path         = require('path');
var DBQuery = require('../utils/dbQueries.js')

router.use('/:username/enrolled', enrolledRoute);
router.use('/:username/progress', progressRoute);
router.use('/:username/feedback', feedbackRoute);

router.get('/:username', function(req, res) {
  // query 'students' table with username and return first and last name, and all ranks for all classes
  // req.url contains username

	// DBQuery.getStudentUsing('username', req.username, function(data){
	//   	res.json(data);
	// });
	res.end('get to student without any parameters '+ req.get('host') + req.originalUrl);
});


module.exports = router;