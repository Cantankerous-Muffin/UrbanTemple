var express = require('express');
var router = express.Router();

var studentRoute = require('student');

router.use('/student', studentRoute);