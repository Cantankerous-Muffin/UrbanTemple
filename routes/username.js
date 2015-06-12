var express = require('express');
var router = express.Router();
var db = require('../app/config.js')

var usernameProgressRoute = require('./usernameProgress');

router.use('/progress', usernameProgressRoute);

router.get('/', function(req, res) {
	console.log('req.url for user/:username is', req.originalUrl);
	var username = "";
	var marker = req.originalUrl.length - 1;
	while (req.originalUrl[marker] !== '\/'){
		username = req.originalUrl[marker] + username;
		marker --;
	}
	console.log('username',username);
	// we need to check if the user is a student or an instructor.
		// if user is a student, direct to student route.
		// else direct to instructor route.
	var userRank = {'disciplineTitle':"",'rankNum':0,'rankTitle':"",'rankIcon':""}
	var userPackage = {'isInstructor':false,'username':"",'firstname':"",'lastname':"",'ranks':userRank};
	db.knex('students')
		.where ({username: username})
		.then(function(originalData){
			if (!originalData || originalData.length === 0){
				// user is not a student, check instructor instead
				db.knex('instructors')
					.where({username: username})
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
													res.json({'isInstructor':true,'username':username,'firstname':data[0].firstName,'lastname':data[0].lastName,'ranks':userRankArray});
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
													res.json({'isInstructor':false,'username':username,'firstname':originalData[0].firstName,'lastname':originalData[0].lastName,'ranks':userRankArray});
												}	
											})
									})
							})
						}
					});
			}
		})
});


module.exports = router;