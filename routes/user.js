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
	var userRank = {'disciplineTitle':"",'rankNum':0,'rankTitle':"",'rankIcon':""}
	var userPackage = {'isInstructor':false,'username':"",'firstname':"",'lastname':"",'ranks':userRank};
	db.knex('students')
		.where ({username: req.url.slice(1)})
		.then(function(data){
			if (!data || data.length === 0){
				// user is not a student, check instructor instead
				db.knex('instructors')
					.where({username: req.url.slice(1)})
					.then(function(data){
						if (!data || data.length === 0){
							// user not found in student and instructor, so direct them to 404
							res.end('user not found!');
						} else {
							console.log('instructor data',data);
							var userRankArray=[];
							db.knex('ranks')
								.where({'ranks.instructor_id':data[0].id})
								.select('*')
								.then(function(data1){
									console.log('data1',data1);
									for (var i = 0; i < data1.length; i++){
										console.log('item',data1[i]);
										db.knex('disciplines')
											.where({'disciplines.id':data1[i].discipline_id})
											.select('title')
											.then(function(data2){
												console.log('data2',data2);
												userRankArray.push({'disciplineTitle':data2[0].title, 'rankNum':data1[0].rankNum, 'rankTitle':data1[0].rankTitle, 'rankIcon':data1[0].rankIcon});
											if (data1.length === userRankArray.length){
												res.json({'isInstructor':true,'username':req.url.slice(1),'firstname':data[0].firstName,'lastname':data[0].lastName,'ranks':userRankArray});
											}
											});
									}
								})
						}
					})
			} else {
				console.log('student data',data);
				var userRankArray=[];
				db.knex('classes_students')
					.where({'classes_students.student_id':data[0].id})
					.select('*')
					.then(function(data){
						console.log('classes_students data',data);
						for (var i = 0; i < data.length; i ++){
							db.knex('classes')
							.where({'classes.id':data[i].class_id})
							.select('classes.discipline_id')
							.then(function(data1){
								console.log('data is',data1);
								db.knex('disciplines')
									.where({'disciplines.id':data1[0].discipline_id})
									.select('title')
									.then(function(data2){
										console.log('data2',data2);
										db.knex('ranks')
											.where({'student_id':data[0].id})
											.select('*')
											.then(function(data3){
												userRankArray.push({'disciplineTitle':data2[0].title, 'rankNum':data3[0].rankNum, 'rankTitle':data3[0].rankTitle, 'rankIcon':data3[0].rankIcon});
												console.log(i,'i','length',data.length);
												if (userRankArray.length === data.length){
													console.log('userRankArray',userRankArray);
													// res.json(userPackage);
													res.json({'isInstructor':false,'username':req.url.slice(1),'firstname':data[0].firstName,'lastname':data[0].lastName,'ranks':userRankArray});
												}	
											})
									})
							})
						}
					});
			}
		})
	// if (req.url.slice(1)){
	// 	res.end('get to student without any parameters '+ req.get('host') + req.originalUrl);
	// } else {
	// 	res.end('get to instructor without any parameters '+ req.get('host') + req.originalUrl);
	// }

  // query 'students' table with username and return first and last name, and all ranks for all classes
  // req.url contains username

	// DBQuery.getStudentUsing('username', req.username, function(data){
	//   	res.json(data);
	// });
});


module.exports = router;