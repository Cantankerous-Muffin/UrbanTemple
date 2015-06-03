var db = require('../app/config');
var Class = require('../app/models/classes.js');
var Discipline = require('../app/models/disciplines.js');
var Feedback = require('../app/models/feedbacks.js');
var Instructor = require('../app/models/instructor.js');
var Level = require('../app/models/levels.js');
var Progress = require('../app/models/progress.js');
var Rank = require('../app/models/ranks.js');
var Student = require('../app/models/student.js');


var DBQuery = require('../utils/dbQueries.js');

var stu = {
  username: 'Yen',
  password: 'Yen',
};
var stu2 = {
  username: 'Lin',
  password: 'Lin',
};
var stu3 = {
  username: 'Pamela',
  password: 'Pamela',
};
var stu4 = {
  username: 'Jason',
  password: 'Jason',
};

// DBQuery.newInstructor(stu);
// DBQuery.newInstructor(stu2);
// DBQuery.newInstructor(stu3);
// DBQuery.newInstructor(stu4);


db.knex('students')
.select('id','username')
.then(function(data){
  console.log('-------------------------');
  console.log('students');
  console.log(data);
  console.log('-------------------------');
});
db.knex('instructors')
.select('id','username')
.then(function(data){
  console.log('-------------------------');
  console.log('Instructors');
  console.log(data);
  console.log('-------------------------');
});
db.knex('classes')
.select('id','title')
.then(function(data){
  console.log('-------------------------');
  console.log('classes');
  console.log(data);
  console.log('-------------------------');
});
db.knex('ranks')
.select('*')
.then(function(data){
  console.log('-------------------------');
  console.log('disciplines');
  console.log(data);
  console.log('-------------------------');
});
db.knex('feedback')
.select('*')
.then(function(data){
  console.log('-------------------------');
  console.log('feedback');
  console.log(data);
  console.log('-------------------------');
});
db.knex('levels')
.select('id','title')
.then(function(data){
  console.log('-------------------------');
  console.log('levels');
  console.log(data);
  console.log('-------------------------');
});
db.knex('progress')
.select('*')
.then(function(data){
  console.log('-------------------------');
  console.log('disciplines');
  console.log(data);
  console.log('-------------------------');
});

