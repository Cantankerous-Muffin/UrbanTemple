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
		.then(function(disciplineData){
			// console.log('disciplineData',disciplineData);
			res.json(disciplineData[0]);
		});
});


module.exports = router;