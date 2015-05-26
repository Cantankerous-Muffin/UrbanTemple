// var expect = require('chai').expect;
var db = require('../app/config');
var Students = require('../app/models/student.js');
var Instructors = require('../app/models/instructor.js');
var Classes = require('../app/models/classes.js');
var DBQuery = require('../utils/dbQueries.js');

var stu = {
  username: 'tim',
  password: 'yim',
  email: 'yim@gmail.com',
};
// DBQuery.newStudent(stu);
//Find list of students for instructor through class
// db.knex('classes_students')
// .insert({
//   class_id: '1',
//   student_id: '2'
// }).then(function(data) {
//     console.log('Query: ', data);
//   });

// db.knex('students')
// .join('classes_students', 'students.id', '=', 'classes_students.student_id')
// .select('*').then(function(data){
//   console.log('---------------------------------------');
//   console.log('Students in class: ',data);
//   console.log('---------------------------------------');
//});
// db.knex('students')
// .select('*').then(function(data){
//   console.log('---------------------------------------');
//   console.log('Students: ',data);
//   console.log('---------------------------------------');
// });
// db.knex('classes_students')
// .select('*').then(function(data){
//   console.log('---------------------------------------');
//   console.log('Join: ',data);
//   console.log('---------------------------------------');
// });
// new Students({
//   username: 'Ben'
// }).save()
// .then(function(data){
//   console.log('Saved!');
// });

// new Classes({
//   title: 'Kendo',
//   instructor_id: '1',
//   description: 'Kendo with Ken.'
// }).save().then(function(exist){
//   console.log(exist);
// });

