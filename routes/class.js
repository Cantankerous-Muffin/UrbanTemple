var express = require('express');
var router = express.Router();

var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');
var passport = require('passport');
var path         = require('path');
var DBQuery = require('../utils/dbQueries.js')

var levelRoute = require('./level')
router.use('/:classname/level/', levelRoute);
router.get('/:classname', function(req, res) {
  // query 'students' table with username and return first and last name, and all ranks for all classes
  // req.url contains username

	// DBQuery.getStudentUsing('username', req.username, function(data){
	//   	res.json(data);
	// });
	res.end('get to class '+ req.get('host') + req.originalUrl);
});


module.exports = router;