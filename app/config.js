var knex =  !process.env.DATABASE_URL ? require('./local_config.js') :
  require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

var db = require('bookshelf')(knex);
db.plugin('registry');


db.knex.schema.hasTable('students').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('students', function (student) {
      student.increments('id').primary();
      student.string('username', 100).unique();
      student.string('password', 100);
      student.string('email', 100);
      student.string('firstName', 100);
      student.string('lastName', 100);
      student.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('instructors').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('instructors', function (instructor) {
      instructor.increments('id').primary();
      instructor.string('username', 100).unique();
      instructor.string('password', 100);
      instructor.string('email', 100);
      instructor.string('firstName', 100);
      instructor.string('lastName', 100);
      instructor.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('classes').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('classes', function (classe) {
      classe.increments('id').primary();
      classe.string('title', 255);
      // instructor_id is a ForeignKey attached to instructor
      classe.integer('instructor_id');
      // student_id is a ForeignKey attached to student
      //classe.string('student_id', 10);
      classe.text('description');
      classe.string('image',255);
      classe.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('studentVideos').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('studentVideos', function (studentVideo) {
      studentVideo.increments('id').primary();
      // student_id is a ForeignKey attached to student
      studentVideo.integer('student_id'); 
      // instructor_id is a ForeignKey attached to instructor
      studentVideo.integer('instructor_id'); 
      // class_id is a ForeignKey attached to class
      studentVideo.integer('class_id');
      studentVideo.string('videoURL',255);
      studentVideo.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
db.knex.schema.hasTable('instrVideos').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('instrVideos', function (instrVideo) {
      instrVideo.increments('id').primary();
      // class_id is a ForeignKey attached to class
      instrVideo.integer('class_id'); 
      // instructor_id is a ForeignKey attached to instructor
      instrVideo.integer('instructor_id');
      instrVideo.string('videoURL',255);
      instrVideo.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

//Joing Tables
//Classes to Students
db.knex.schema.hasTable('classes_students').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('classes_students', function (class_student) {
      class_student.increments('id').primary();
      class_student.integer('class_id');
      class_student.integer('student_id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
