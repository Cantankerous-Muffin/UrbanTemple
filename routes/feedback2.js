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
					console.log('looking in students database');
					db.knex('students')
						.where({'students.username': req.session.user})
						.then(function(studentsData){
							if (!studentsData[0]){
								res.json({'message': 'no user found in database.'});
							} else {
								// user is a student. check if this is the same student that owns the feedback
								db.knex('feedback')
									.where({'feedback.student_id': studentsData[0].id, 'feedback.id': req.url.slice(1)})
									.select('*')
									.then(function(feedbackData){
										if (!feedbackData[0]) {
											res.json({'message': 'feedbackData not found'});
										}
										db.knex('instructors')
											.where({'instructors.id': feedbackData[0].instructor_id})
											.then(function(instructorsData){
												feedbackData[0].studentName = studentsData[0].username;
												feedbackData[0].instructorName = instructorsData[0].username;
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
						})
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
						db.knex.raw('insert into feedback ("videoURL","approved","updated_at", "student_id","instructor_id","class_id") values ('+"'"+req.body.videoUrl+"'"+','+"'f'"+','+"'"+'now()'+"'"+','+student_idData[0].id+','+data[0].instructor_id+','+data[0].id+') RETURNING *;')
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
});

router.post('/:feedback_id/update', function(req, res) {
	console.log('req.url is', req.url, req.url.match(/\w+/));

	console.log('req.session.user is', req.session.user);
	console.log('req.body is', req.body);
	if (!req.session.user){
		res.json({'message':'user not signed in'});
	} else {
		db.knex('instructors')
			.where({'instructors.username': req.session.user})
			.then(function(instructorData){
				if (!instructorData[0]){
					res.json({'message':'User not signed in as instructor.'});
				} else {
					console.log('instructorData[0].id',instructorData[0].id);
					db.knex('feedback')
						.where({'feedback.instructor_id': instructorData[0].id, 'feedback.id': req.url.match(/\w+/)[0]})
						.then(function(feedbackData){
							console.log('feedbackData', feedbackData);
							if (!feedbackData[0]){
								res.json({'message':'Wrong instructor for class'});
							} else {
								console.log('gets to raw');
								db.knex.raw('UPDATE feedback SET comment='+"'"+req.body.comment+"'"+', updated_at=now(), approved='+"'"+req.body.approved+"'"+' WHERE id = '+req.url.match(/\w+/)+' returning *;')
								.then(function(data){
									console.log('data row',data.rows);
									res.json(data.rows[0]);
								})
							}
						})
				}
			})
	}

});


module.exports = router;