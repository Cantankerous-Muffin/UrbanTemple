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
  username: 'Jim',
  password: 'Jim',
};
var stu2 = {
  username: 'Yuri',
  password: 'Yuri',
};
var stu3 = {
  username: 'Sokka',
  password: 'Sokka',
};
var stu4 = {
  username: 'Frey',
  password: 'Frey',
};

var inst = {
  username: 'Key',
  password: 'Key',
};
var inst2 = {
  username: 'Quan',
  password: 'Quan',
};
var inst3 = {
  username: 'Gandalf',
  password: 'Gandalf',
};
var inst4 = {
  username: 'Morgan',
  password: 'Morgan',
};

var dis = {
  title: 'Kendo',
  description: 'Way of the Stick',
  disLogo: 'wwwwwwwww'
};
var dis2 = {
  title: 'Tonfa',
  description: 'Way of the Short Sticks',
  disLogo: 'wwwwwwwww'
};
var dis3 = {
  title: 'Flying',
  description: 'Way of Falling',
  disLogo: 'wwwwwwwww'
};

var clas = {
  title: 'Posture',
  classNum: 1,
  description: 'Learn to Stand.',
  image: 'classImageURL',
  instructor_id: 2,
  discipline_id: 1
};
var clas2 = {
  title: 'Grip',
  classNum: 1,
  description: 'Learn to Hold.',
  image: 'classImageURL'
};
var clas3 = {
  title: 'Jump',
  classNum: 1,
  description: 'First step to flying.',
  image: 'classImageURL',
  instructor_username: 'Gandalf',
  discipline_title: 'Flying'
};
var clas4 = {
  title: 'Steps',
  classNum: 2,
  description: 'Learn to Walk.',
  image: 'classImageURL',
  instructor_username: 'Key',
  discipline_title: 'Kendo'
};
var clas5 = {
  title: 'Strike',
  classNum: 2,
  description: 'Learn to Swing.',
  image: 'classImageURL',
  instructor_username: 'Morgan',
  discipline_title: 'Tonfa'
};

// DBQuery.newStudent(stu);
// DBQuery.newStudent(stu2);
// DBQuery.newStudent(stu3);
// DBQuery.newStudent(stu4);

// DBQuery.newInstructor(inst);
// DBQuery.newInstructor(inst2);
// DBQuery.newInstructor(inst3);
// DBQuery.newInstructor(inst4);

// DBQuery.newDiscipline(dis);
// DBQuery.newDiscipline(dis2);
// DBQuery.newDiscipline(dis3);

// DBQuery.newClass(clas);
DBQuery.newClass(clas2, 'Tonfa', 'Quan');
// DBQuery.newClass(clas3);
// DBQuery.newClass(clas4);
// DBQuery.newClass(clas5);


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
.join('disciplines', 'classes.discipline_id', '=', 'disciplines.id')
.select('classes.id','classes.title as Class', 'disciplines.title as Discipline')
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
  console.log('ranks');
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
.select('id','title', 'description')
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
  console.log('progress');
  console.log(data);
  console.log('-------------------------');
});
db.knex('disciplines')
.select('id', 'title', 'description')
.then(function(data){
  console.log('-------------------------');
  console.log('disciplines');
  console.log(data);
  console.log('-------------------------');
});

