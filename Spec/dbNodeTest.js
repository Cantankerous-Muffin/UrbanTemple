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
};
var clas2 = {
  title: 'Grips',
  classNum: 1,
  description: 'Learn to Hold.',
  image: 'classImageURL'
};
var clas3 = {
  title: 'Jump',
  classNum: 1,
  description: 'First step to flying.',
  image: 'classImageURL',
};
var clas4 = {
  title: 'Steps',
  classNum: 2,
  description: 'Learn to Walk.',
  image: 'classImageURL',
};
var clas5 = {
  title: 'Three asasdfasdfdf Strike',
  classNum: 3,
  description: 'Learn to asdf after Three steps.',
  image: 'classImageURL',
};

var levl = {
  title: 'Steps - 1',
  description: 'The first step.',
  videoURL: 'www.wat',
  levelNum: 1,
  feedbackNeeded: false,
  class_id: 4,
};
var levl2 = {
  title: 'Steps - 2',
  description: 'The second step.',
  videoURL: 'www.wat',
  levelNum: 2,
  feedbackNeeded: false,
  class_id: 4,
};
var levl3 = {
  title: 'Steps - 3',
  description: 'The third step.',
  videoURL: 'www.wat',
  levelNum: 3,
  feedbackNeeded: true,
  class_id: 4,
};
var levl4 = {
  title: 'Strike - 1',
  description: 'The first strike.',
  videoURL: 'www.wat',
  levelNum: 1,
  feedbackNeeded: false,
  class_id: 2,
};

var rank = {
  rankTitle: 'Beginner - 2',
  rankNum: 2,
  rankIcon: 'rankBeginnerIcon'
};

var feed = {
  videoURL: 'feedbackURL',
  comment: 'A comment for a feedback.',
};

var feedReply = {
  comment: 'You shall not PASS!!',
  approved: false,
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

// DBQuery.newClass(clas, 'Kendo', 'Key');
// DBQuery.newClass(clas2, 'Tonfa', 'Quan');
// DBQuery.newClass(clas3, 'Flying', 'Gandalf');
// DBQuery.newClass(clas4, 'Kendo', 'Key');
// DBQuery.newClass(clas5, 'Kendo', 'Gandalf');

// DBQuery.newLevel(levl, function(data){
//   if(!data.result){
//     console.log(data.message);
//   }
// });
// DBQuery.newLevel(levl2, function(data){
//   if(!data.result){
//     console.log(data.message);
//   }
// });
// DBQuery.newLevel(levl3, function(data){
//   if(!data.result){
//     console.log(data.message);
//   }
// });
// DBQuery.newLevel(levl4, function(data){
//   if(!data.result){
//     console.log(data.message);
//   }
// });

// DBQuery.setRank(1,2,rank, false, function(result){
//   console.log(result);
// });

// DBQuery.setProgress('Sokka', 'Steps', 1, function(result){
//   console.log(result);
// });

DBQuery.replyToFeedback(2, feedReply, function(result){
  console.log(result);
});

// DBQuery.clearTable('progress');



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
// .select('classes.*')
.select('classes.id','classes.title as Class', 'classes.levelCount', 'classes.classNum',
  'disciplines.title as Discipline', 'instructor_id as InstrID')
.then(function(data){
  console.log('-------------------------');
  console.log('classes');
  console.log(data);
  console.log('-------------------------');
});
db.knex('ranks')
.select('rankTitle', 'rankNum', 'student_id', 'discipline_id')
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
.select('id','title', 'levelNum', 'class_id as classID')
.then(function(data){
  console.log('-------------------------');
  console.log('levels');
  console.log(data);
  console.log('-------------------------');
});
db.knex('progress')
.select('levelNum', 'student_id', 'class_id')
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

DBQuery.studentToClass('ggg','Grips',function(data){
  console.log(data);
})

