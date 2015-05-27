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
var inst = {
  username: 'Ray',
  password: 'Yar',
  email: 'yar@gmail.com',
};
var clas = {
  title: 'Flying',
  instructor_id: '2',
  description: 'Fly with Raymond!',
};
var vid = {
  student_id: 1,
  instructor_id: 1,
  class_id: 2,
  videoURL: 'This is another test URL.'
};

DBQuery.studentsUnderInst(1);
// DBQuery.studentToClass(2,1);
// DBQuery.studentToClass(5,2);
// DBQuery.studentToClass(6,3);
// DBQuery.studentToClass(8,2);
// DBQuery.studentToClass(6,2);




// db.knex.raw('delete from "classes" where "id" = 2').then(function(){console.log('!!!!!!!!!!!');});
// db.knex.schema.dropTable('classes').then(function(){console.log('!!!!!!!!!!!');});
// db.knex.schema.dropTable('studentVideos').then(function(){console.log('!!!!!!!!!!!');});
// db.knex.schema.dropTable('classes_students').then(function(){console.log('!!!!!!!!!!!');});
// db.knex.schema.dropTable('instrVideos').then(function(){console.log('!!!!!!!!!!!');});


// db.knex('studentVideos')
// .select('*').then(function(data){
//   console.log('---------------------------------------');
//   console.log('StuVids: ',data);
//   console.log('---------------------------------------');
// });
//Find list of students for instructor through class

//Find 
// db.knex('students')
// .join('classes_students', 'students.id', '=', 'classes_students.student_id')
// .join('classes', 'classes.id', '=', 'classes_students.class_id')
// .select('classes_students.id','students.username', 'classes.title')
// .where({
//   'students.id': 8,
//   'classes.id': 2
// })
// .then(function(data){
//   console.log('---------------------------------------');
//   console.log('Students in class');
//   console.log(data);
//   console.log('---------------------------------------');
// });
// db.knex('students')
// .select('id','username').then(function(data){
//   console.log('---------------------------------------');
//   console.log('Students');
//   console.log(data);
//   console.log('---------------------------------------');
// });
// db.knex('instructors')
// .select('id','username').then(function(data){
//   console.log('---------------------------------------');
//   console.log('Instructors:');
//   console.log(data);
//   console.log('---------------------------------------');
// });
// db.knex('classes')
// .select('id','title', 'description', 'instructor_id').then(function(data){
//   console.log('---------------------------------------');
//   console.log('Classes:');
//   console.log(data);
//   console.log('---------------------------------------');
// });
// db.knex('instructors')
// .join('classes', 'instructors.id', '=', 'classes.instructor_id')
// .join('classes_students', 'classes.id', '=', 'classes_students.class_id')
// .join('students', 'students.id', '=', 'classes_students.student_id')
// .select('students.*', 'classes.title')
// .where({
//   'instructors.id': 1
// })
// .then(function(data){
//   console.log('---------------------------------------');
//   console.log('Students under Instructor:');
//   console.log(data);
//   console.log('---------------------------------------');
// });
// db.knex('classes_students')
// .select('*').then(function(data){
//   console.log('---------------------------------------');
//   console.log('classes_students');
//   console.log(data);
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

