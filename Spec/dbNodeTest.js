var db = require('../app/config');
var Students = require('../app/models/student.js');
var Instructors = require('../app/models/instructor.js');
var Classes = require('../app/models/classes.js');
var DBQuery = require('../utils/dbQueries.js');


// DBQuery.studentToClass('Yim', 'Karate');
DBQuery.getStudentsUnderInstUsing('username', 'Ken', function(data){
  console.log(data);
});
DBQuery.getInstOfStudentUsing('username', 'tim', function(data){
  console.log('Teachers for student: \n',data);
});

db.knex('classes_students')
.select('*')
.then(function(data){
  console.log('-------------------------');
  console.log('classes_students');
  console.log(data);
  console.log('-------------------------');
});
db.knex('students')
.select('id','username')
.then(function(data){
  console.log('-------------------------');
  console.log('students');
  console.log(data);
  console.log('-------------------------');
});
// //Get classes of a single student
// db.knex('students')
// .join('classes_students', 'students.id', '=', 'classes_students.student_id')
// .join('classes', 'classes_students.class_id', '=', 'classes.id')
// .select('classes_students.id','students.username', 'classes.title')
// .where({
//   'classes.id': 1
// })
// .then(function(data){
//   console.log('-------------------------');
//   console.log('Student in class:');
//   console.log(data);
//   console.log('-------------------------');
// });
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



