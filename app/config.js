var knex =  !process.env.DATABASE_URL ? require('./local_config.js') :
  require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

var db = require('bookshelf')(knex);
db.plugin('registry');

/**
 * Columns email, firstName, lastName, shippingAddress and phoneNumber are currently not being used.
 */
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
      classe.string('instructor_id', 10);
      // student_id is a ForeignKey attached to student
      classe.string('student_id', 10);
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
      studentVideo.string('student_id', 255); 
      // instructor_id is a ForeignKey attached to instructor
      studentVideo.string('instructor_id', 255); 
      // class_id is a ForeignKey attached to class
      studentVideo.string('class_id', 255);
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
      instrVideo.string('class_id', 255); 
      // instructor_id is a ForeignKey attached to instructor
      instrVideo.string('instructor_id', 255);
      instrVideo.string('videoURL',255);
      instrVideo.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
