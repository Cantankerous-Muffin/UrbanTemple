var express = require('express');
var router = express.Router();

var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');
var passport = require('passport');
var path         = require('path');
var DBQuery = require('../utils/dbQueries.js')

router.get('/user', function(req, res) {
  console.log("hohohohoho", req.username);
	DBQuery.getStudentUsing('username', req.username, function(data){
  	res.json(data);
  	res.end();
	});
});