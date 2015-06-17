var express = require('express');
var router = express.Router();
var db = require('../app/config.js')

router.get('/', function(req,res){
	// remove progress from url to find username
	console.log('req.originalUrl',req.originalUrl);
	var markers = [];
	for (var i = 1; i < req.originalUrl.length; i++){
		if (req.originalUrl[i] === '\/'){
			markers.push(i);
		}
	}
	console.log('markers',markers);
	var username = req.originalUrl.slice(markers[1]+1,markers[2]);
	console.log('usernameFromURL', username);

	var userPackage = [];
	var disciplinePackage = {};
	var levelNum;
	var levelTitle;
	var classNum;
	var totalLevels;

	db.knex('students')
		.where({'students.username': username})
		.select('id')
		.then(function(studentData){
			if (!studentData[0]){
				res.json({'message': username + ' student Not Found'});
			} else {
				
				db.knex('progress')
					.where({'progress.student_id':studentData[0].id})
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
								discData[0]['currentClassNum'] = row.classNum;
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
			}
		});
});

module.exports = router;