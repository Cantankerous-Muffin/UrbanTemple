var express = require('express');
var router = express.Router();

var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');

var passport = require('passport');
var path         = require('path');
var DBQuery = require('../utils/dbQueries.js')
var db = require('../app/config.js')

// var studentRoute = require('./student');
// var instructorRoute = require('./instructor');

router.get('/', function(req, res) {
	// return all the disciplines
	console.log('req.url is', req.url);
	db.knex('disciplines')
		.map(function(discipline){

			return db.knex('classes')
				.where({'classes.discipline_id': discipline.id})
				.map(function(classData){
					console.log('classData',classData);
					// discipline.classes = classData;
					// discipline.totalClass = classData.length;
					// classData.discipline = discipline;
					
					return db.knex('levels')
						.where({'levels.class_id':classData.id})
						.then(function(datapack){
							console.log('datapack',datapack, 'classData.instructor_id', classData.instructor_id);
							classData.totalLevel = datapack.length;
							return db.knex('instructors')
								.where({'instructors.id': classData.instructor_id})
								.select('username')
								.then(function(instrData){
									// console.log('instrData', instrData[0]);
									classData.instructor_name = instrData[0].username;
									return classData;
								})
						})

				})
				.then(function(collatedClassData){
					// console.log('discipline',discipline, 'collatedClassData', collatedClassData);
					discipline.classData = collatedClassData;
					return discipline;
				})

			})
		.then(function(disciplineData){
			// console.log('disciplineData',disciplineData);
			res.json(disciplineData);
		});
});

router.get('/:discipline_id', function(req, res) {
	console.log('url for discipline_id', req.url);
db.knex('disciplines')
		.where({'disciplines.id': req.url.slice(1)})
		.map(function(discipline){
			return db.knex('classes')
				.where({'classes.discipline_id': discipline.id})
				.map(function(classData){
					console.log('classData',classData);
					// discipline.classes = classData;
					// discipline.totalClass = classData.length;
					// classData.discipline = discipline;
					
					return db.knex('levels')
						.where({'levels.class_id':classData.id})
						.then(function(datapack){
							console.log('datapack',datapack, 'classData.instructor_id', classData.instructor_id);
							classData.totalLevel = datapack.length;
							return db.knex('instructors')
								.where({'instructors.id': classData.instructor_id})
								.select('username')
								.then(function(instrData){
									// console.log('instrData', instrData[0]);
									classData.instructor_name = instrData[0].username;
									return classData;
								})
						})

				})
				.then(function(collatedClassData){
					// console.log('discipline',discipline, 'collatedClassData', collatedClassData);
					discipline.classData = collatedClassData;
					return discipline;
				})

			})
			.catch(function(err){
				res.json({'message':err})
			})
		.then(function(disciplineData){
			// console.log('disciplineData',disciplineData);
			console.log('disciplineData',disciplineData[0])
			if (!disciplineData[0]){
				res.json({'message':'No discipline found for '+ req.url.slice(1)});
			}
			res.json(disciplineData[0]);
		});
});

router.get('/:discipline_id/class', function(req, res) {
	console.log('url for discipline_id', req.url);
db.knex('disciplines')
		.where({'disciplines.id': req.url.match(/\w+/)[0]})
		.then(function(discipline){
			console.log('discipline',discipline);
			db.knex('classes')
				.where({'classes.discipline_id': discipline[0].id})
				.map(function(classData){
					console.log('classData',classData);
					// discipline.classes = classData;
					// discipline.totalClass = classData.length;
					// classData.discipline = discipline;
					
					return db.knex('levels')
						.where({'levels.class_id':classData.id})
						.then(function(datapack){
							// console.log('datapack',datapack, 'classData.instructor_id', classData.instructor_id);
							classData.totalLevel = datapack.length;
							return db.knex('instructors')
								.where({'instructors.id': classData.instructor_id})
								.select('*')
								.then(function(instrData){
									// console.log('instrData', instrData[0]);
									classData.instructor_name = instrData[0].username;
									// set instructor_id to 2 if not found.
									instrData[0].id = instrData[0].id || 2;
									console.log('gets here discipline is', discipline[0].id, instrData[0].id);
									return db.knex('ranks')
										.where({'ranks.instructor_id': instrData[0].id, 'ranks.discipline_id': discipline[0].id})
										.then(function(instructorRankData){
											console.log('instructorRankData',instructorRankData);
											if (!instructorRankData[0]){
												return {'message': 'instructor not assigned to one of the classes. Check DB'};
											}
											classData.instructorRankTitle = instructorRankData[0].rankTitle;
											classData.instructorRankNum = instructorRankData[0].rankNum;
											return db.knex('feedback')
												.where({'feedback.instructor_id':instrData[0].id, 'feedback.class_id':classData.id})
												.select('videoURL')
												.then(function(videoURLData){
													console.log('videoURLData', videoURLData)
													if (!videoURLData[0]){
														videoURLData[0] = {'videoURL': 'generic video URL. Original not found.'};
													}
													classData.videoURL = videoURLData[0].videoURL;
													return classData;
												})
										})
								})
						})

				})
				.then(function(collatedClassData){
					// console.log('discipline',discipline, 'collatedClassData', collatedClassData);
					// discipline.classData = collatedClassData;
					if (!collatedClassData[0]){
						res.json({'message':'No classes found for discipline'+ req.url.slice(1)});
					}
					res.json(collatedClassData);
				})

			})
			.catch(function(err){
				res.json({'message':err})
			});
});

router.get('/:discipline_id/class/:class_id', function(req, res) {
	console.log('url for discipline_id', req.url);
	var markers = [];
	for (var i = 1; i < req.url.length; i++){
		if (req.url[i] === '\/'){
			markers.push(i);
		}
	}
	console.log('markers',markers);
	var discIDfromURL = req.url.slice(1,markers[0]);
	var classIDfromURL = req.url.slice(markers[1]+1);
	console.log('discIDfromURL',discIDfromURL,'classIDfromURL',classIDfromURL);
	db.knex('classes')
		.where({'classes.discipline_id': discIDfromURL, 'classes.id': classIDfromURL})
		.then(function(classData){
			console.log('classData',classData);
			// discipline.classes = classData;
			// discipline.totalClass = classData.length;
			// classData.discipline = discipline;
			if (!classData[0]){
				// trigger error
				return;
			}
			return db.knex('levels')
				.where({'levels.class_id':classData[0].id})
				.then(function(datapack){
					// console.log('datapack',datapack, 'classData.instructor_id', classData.instructor_id);
					classData[0].totalLevel = datapack.length;
					return db.knex('instructors')
						.where({'instructors.id': classData[0].instructor_id})
						.select('*')
						.then(function(instrData){
							// console.log('instrData', instrData[0]);
							classData[0].instructor_name = instrData[0].username;
							// set instructor_id to 2 if not found.
							instrData[0].id = instrData[0].id || 2;
							// console.log('gets here discipline is', discipline[0].id, instrData[0].id);
							return db.knex('ranks')
								.where({'ranks.instructor_id': instrData[0].id, 'ranks.discipline_id': discIDfromURL})
								.then(function(instructorRankData){
									console.log('instructorRankData',instructorRankData);
									if (!instructorRankData[0]){
										return {'message': 'instructor not assigned to one of the classes. Check DB'};
									}
									classData[0].instructorRankTitle = instructorRankData[0].rankTitle;
									classData[0].instructorRankNum = instructorRankData[0].rankNum;
									return classData[0];
									})
							})
					})

				})
				.then(function(collatedClassData){
					console.log('collatedClassData', collatedClassData);
					// discipline.classData = collatedClassData;
					if (!collatedClassData){
						res.json({'message':'Class id not found for particular discipline'+ req.url.slice(1)});
					}
					res.json(collatedClassData);
				})

		});

router.get('/:discipline_id/class/:class_id/level', function(req, res) {
	console.log('url for discipline_id', req.url);
	var markers = [];
	for (var i = 1; i < req.url.length; i++){
		if (req.url[i] === '\/'){
			markers.push(i);
		}
	}
	console.log('markers',markers);
	var discIDfromURL = req.url.slice(1,markers[0]);
	var classIDfromURL = req.url.slice(markers[1]+1, req.url.length - 6);
	console.log('discIDfromURL',discIDfromURL,'classIDfromURL',classIDfromURL);
	db.knex('classes')
		.where({'classes.discipline_id': discIDfromURL, 'classes.id': classIDfromURL})
		.then(function(classData){
			console.log('classData',classData);
			// discipline.classes = classData;
			// discipline.totalClass = classData.length;
			// classData.discipline = discipline;
			if (!classData[0]){
				// trigger error
				return;
			}
			return db.knex('levels')
				.where({'levels.class_id':classData[0].id})
				.map(function(datapack){
					console.log('datapack',datapack);
					// classData[0].levelData = datapack;
					datapack.discipline_id = classData[0].discipline_id;
					datapack.classNum = classData[0].classNum;
					return datapack;
				})

			})
				.then(function(collatedClassData){
					console.log('collatedClassData', collatedClassData);
					// discipline.classData = collatedClassData;
					if (!collatedClassData){
						res.json({'message':'Class id not found for particular discipline'+ req.url.slice(1)});
					}
					res.json(collatedClassData);
				})

		});


module.exports = router;