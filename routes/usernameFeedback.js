var express = require('express');
var router = express.Router();
var db = require('../app/config.js')

router.get('/', function(req, res) {
	console.log('req.url is', req.originalUrl, req.session.user);
	var markers = [];
	for (var i = 1; i < req.originalUrl.length; i++){
		if (req.originalUrl[i] === '\/'){
			markers.push(i);
		}
	}
	var usernameFromURL = req.originalUrl.slice(markers[1]+1,markers[2]);
	console.log('markers',markers,usernameFromURL);
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