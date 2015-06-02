var express = require('express');
var router = express.Router();

var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');
var passport = require('passport');
var path         = require('path');
var DBQuery = require('../utils/dbQueries.js')

router.get('/', function(req, res) {
  // query 'class' table with student_id and return classes that the student is enrolled in.

});