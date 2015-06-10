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

router.get('/:feedback_id', function(req, res) {
	console.log('req.url is', req.url);
	console.log('req.session.user is', req.session.user);
	if (!req.session.user){
		res.json({'message': 'user not defined.'});
	} else {
		db.knex('instructors')
			.where({'instructors.username': req.session.user})
			.then(function(instructorData){
				console.log('instructorData', instructorData);
				if (!instructorData[0]){
					res.json({'message': 'no instructor found.'});
				} else {
					db.knex('feedback')
						.where({'feedback.instructor_id': instructorData[0].id})
						.select('*')
						.then(function(feedbackData){
							console.log('feedbackData', feedbackData);
							res.json(feedbackData);
						});
				}
			});
	}
});


module.exports = router;