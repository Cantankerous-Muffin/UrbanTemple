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
		.then(function(originalData){
			if (!originalData || originalData.length === 0){
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
				console.log('student data',originalData);
				var userRankArray=[];
				db.knex('classes_students')
					.where({'classes_students.student_id':originalData[0].id})
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
											.where({'student_id':data[0].student_id})
											.select('*')
											.then(function(data3){
												// console.log('data3',data3);
												userRankArray.push({'disciplineTitle':data2[0].title, 'rankNum':data3[0].rankNum, 'rankTitle':data3[0].rankTitle, 'rankIcon':data3[0].rankIcon});
												console.log(i,'i','length',data.length);
												if (userRankArray.length === data.length){
													console.log('userRankArray',userRankArray);
													// res.json(userPackage);
													res.json({'isInstructor':false,'username':req.url.slice(1),'firstname':originalData[0].firstName,'lastname':originalData[0].lastName,'ranks':userRankArray});
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

router.get('/:username/progress', function(req,res){
	// remove progress from url to find username
	var username = req.url.slice(1,req.url.length - 9);
	var userPackage = [];
	var disciplinePackage = {};
	var levelNum;
	var levelTitle;
	var classNum;
	var totalLevels;

	db.knex('progress')
		.where({'progress.student_id':14})
		.map(function(row){
			console.log('row',row);
			return db.knex('classes')
				.where({'classes.id':row.class_id})
				.then(function(classData){
					classData[0].levelNum = row.levelNum;
					classData[0].our_class_id = row.class_id;
					return classData[0];
			});
		})
		.map(function(row){
			console.log('classData',row);
			return db.knex('disciplines')
				.where({'disciplines.id':row.discipline_id})
				.then(function(discData){
					// console.log('discData',discData);
					discData[0].levelNum = row.levelNum;
					// discData[0].classNum = row.classNum;
					// class_id is classNum for now since we might not have put the correct values of classNum in our DB.
					discData[0]['currentClassNum'] = row.our_class_id;
					return discData[0];
				})
		})
		.map(function(row){
			console.log('row',row);
			// total classes for discipline
			return db.knex('classes')
				.where({'classes.discipline_id':row.id})
				.then(function(x){
					// x['title'] = row.title;
					// x['description'] = row.description;
					// x['discLogo'] = row.discLogo;
					// x['currentLevelNum'] = row.levelNum;
					// // x['currentClassNum'] = row.classNum;
					// x['currentClassNum'] = row.our_class_id;
					row['totalClass'] = x.length;
					return row;
				})
		})
		.map(function(y){
			console.log('y',y);
			// y['length'] = y.length;
			// find levelTitle from levelNum
			return db.knex('levels')
				.where({'levels.levelNum':y.levelNum, 'levels.class_id': y.currentClassNum})
				.then(function(l){
					console.log('l',l);
					y['currentLevelTitle'] = l[0].title;
					return y;
				})
		})
		.map(function(z){
			console.log('z',z);
			return db.knex('levels')
				.where({'levels.class_id':z.currentClassNum})
				.then(function(zz){
					console.log('zz',zz);
					z['percentage'] = 100*z.levelNum/zz.length;
					return z;
				})
		})
		.then(function(aa){
			console.log('aa',aa);
			res.json(aa);
		});
});

router.get('/:username/feedbacks', function(req, res) {
	console.log('req.url is', req.url, req.session.user);
	var markers = [];
	for (var i = 1; i < req.url.length; i++){
		if (req.url[i] === '\/'){
			markers.push(i);
		}
	}
	console.log('markers',markers,req.url.slice(1,markers[0]));
	var usernameFromURL = req.url.slice(1,markers[0]);
	db.knex('students')
		.where({'students.username': usernameFromURL})
		.select('id')
		.then(function(user_id){
			if (!user_id[0]){
				console.log('perhaps an instructor?')
				db.knex('instructors')
					.where({'instructors.username': usernameFromURL})
					.then(function(instructorData){
						console.log('username',instructorData[0].username);
						if (req.session.user === instructorData[0].username){
							db.knex('feedback')
								.where({'feedback.instructor_id': instructorData[0].id})
								.then(function(feedbackData){
									console.log('feedbackData', feedbackData);
									res.json(feedbackData);
								});
						} else {
							res.json({'message': 'incorrect user signed in to view instructor feedbacks'});
						}
					})
					.catch(function(err){
						res.json({'message': 'No student/instructor with this username found.'});
					});
			} else {
				console.log('students', req.session.user);
				if (usernameFromURL === req.session.user){
					db.knex('feedback')
						.where({'feedback.student_id': user_id[0].id})
						.then(function(feedbackData){
							console.log('feedbackData', feedbackData);
							res.json(feedbackData);
						});
				} else {
					res.json({'message': 'incorrect user signed in to view students'});
				}
			}
		})
		// .catch(function(err){
		// 	res.json({'message': 'No student with this username found.'});
		// });
});



module.exports = router;