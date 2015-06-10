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
							db.knex('students')
								.where({'students.id': feedbackData[0].student_id})
								.select('username')
								.then(function(studentData){
									console.log(studentData,instructorData[0].username);
									feedbackData[0].studentName = studentData[0].username;
									feedbackData[0].instructorName = instructorData[0].username;
									db.knex('classes')
										.where({'classes.id': feedbackData[0].class_id})
										.select('*')
										.then(function(classesData){
											feedbackData[0].Class = classesData[0];
											res.json(feedbackData);
										})
								})
						});
				}
			});
	}
});

router.post('/submit', function(req, res) {
	console.log('req.url is', req.url);
	console.log('req.session.user is', req.session.user);
	console.log('req.body is', req.body);
	if (!req.session.user){
		res.json({'message':'user not signed in'});
	} else {
		db.knex('classes')
			.where({'classes.classNum': req.body.classNum, 'classes.discipline_id': req.body.disciplineID})
			.then(function(data){
				console.log('data',data);
				db.knex('students')
					.where({'students.username': req.session.user})
					.select('id')
					.then(function(student_idData){
						console.log('student_idData',student_idData);
						// we can write to the SQL DB feedback with our prepared feedback
						db.knex.raw('insert into feedback ("videoURL","approved","student_id","instructor_id","class_id") values ('+"'"+req.body.videoUrl+"'"+','+"'f'"+','+student_idData[0].id+','+data[0].instructor_id+','+data[0].id+') RETURNING *;')
						.then(function(returnData){
							//successful insert. get the last value added with lastval() or RETURNING last added in original query
							var prev = returnData.rows[0];
							// console.log('data',data,'prev_id',prev);
							db.knex('instructors')
								.where({'instructors.id': data[0].instructor_id})
								.select('username')
								.then(function(instructor_username){
									prev.instructorUserName = instructor_username[0].username;
									prev.instructor_id = data[0].instructor_id;
									prev.studentUserName = req.session.user;
									prev.Class = data[0];
									res.json(prev);
								})

						})
						.catch(function(err){
							console.log('error:',err);
						});
						
					});
			});
	}


	// if (!req.session.user){
	// 	res.json({'message': 'user not defined.'});
	// } else {
	// 	db.knex('instructors')
	// 		.where({'instructors.username': req.session.user})
	// 		.then(function(instructorData){
	// 			console.log('instructorData', instructorData);
	// 			if (!instructorData[0]){
	// 				res.json({'message': 'no instructor found.'});
	// 			} else {
	// 				db.knex('feedback')
	// 					.where({'feedback.instructor_id': instructorData[0].id})
	// 					.select('*')
	// 					.then(function(feedbackData){
	// 						console.log('feedbackData', feedbackData);
	// 						db.knex('students')
	// 							.where({'students.id': feedbackData[0].student_id})
	// 							.select('username')
	// 							.then(function(studentData){
	// 								console.log(studentData,instructorData[0].username);
	// 								feedbackData[0].studentName = studentData[0].username;
	// 								feedbackData[0].instructorName = instructorData[0].username;
	// 								db.knex('classes')
	// 									.where({'classes.id': feedbackData[0].class_id})
	// 									.select('*')
	// 									.then(function(classesData){
	// 										feedbackData[0].Class = classesData[0];
	// 										res.json(feedbackData);
	// 									})
	// 							})
	// 					});
	// 			}
	// 		});
	// }
});


module.exports = router;