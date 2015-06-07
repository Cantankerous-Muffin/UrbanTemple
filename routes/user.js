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

router.get('/:username/progress', function(req,res){
	// remove progress from url to find username
	var username = req.url.slice(1,req.url.length - 9);
	var userPackage = [];
	var disciplinePackage = {};
	var levelNum;
	var levelTitle;
	var classNum;
					var outer = 0;
	db.knex('students')
		.where({'students.username': username})
		.select('id')
		.then(function(data){
			return data[0];
		})
		.then(function(studentData){
			console.log('studentData',studentData);
			db.knex('progress')
				.where({'progress.student_id':studentData.id})
				.select('*')
				.then(function(data2){
					var outer = 0;
					for (var i = 0; i < data2.length; i++){
						console.log('data2',i, data2[i]);
						// levelNum = data2[i].levelNum;
						db.knex('levels')
							.where({'levels.levelNum': data2[i].levelNum})
							.select('title')
							.then(function(levelData){
								levelTitle = levelData;
								console.log('outer',outer);
								console.log('levelTitle',levelTitle);
							})
						db.knex('classes')
							.where({'classes.id':data2[i].class_id})
							.select('*')
							.then(function(data3){
								console.log('classes',data3);
									db.knex('disciplines')
										.where({'disciplines.id':data3[0].discipline_id})
										.select('*')
										.then(function(data4){
											disciplinePackage['id'] = data4[0].id;
											disciplinePackage['title'] = data4[0].title;
											disciplinePackage['description'] = data4[0].description;
											disciplinePackage['disciplineLogo'] = data4[0].disLogo;
											console.log('data4',data4 ,'disciplinePackage', disciplinePackage, 'levelTitle', levelTitle);
											userPackage.push({'discipline':data4[0], 'classNum':data3[0].classNum,'levelNum':data2[outer].levelNum, 'currentLevelTitle':levelTitle[outer].title});
											outer++;
											// userPackage.push({'i':i,'discipline':disciplinePackage, 'classNum': classNum, 'levelNum':levelNum});
											if (userPackage.length === i){
												console.log('our data', userPackage);
												res.json(userPackage);
											}
											// DisciplineProgress = { 
											//   discipline: Discipline{
												// disciplineId: INT,
												// title: STRING,
												// description: STRING, 
												// disciplineLogo: STRING (URL),
												// totalClass: INT}, 
											//disciplines.*
											//   currentClassNum: INT,   //classes.classNum
											//   currentLevelNum: INT,   //levels.levelNum
											//   currentLevelTitle: STRING,  //levels.title
											//   percentage: INT // eg. 34 (%)
											// }

										})
									});
								// outer++;
							}
							
					}
				)

		});
})

module.exports = router;