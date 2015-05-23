var Bookshelf = require('bookshelf');

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
    db.knex.schema.createTable('classes', function (class) {
      class.increments('id').primary();
      class.string('title', 255);
      class.string('video_URL', 255);
      class.string('instructor_id', 10);
      class.text('description');
      class.string('image',255);
      class.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('invites').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('invites', function (invite) {
      invite.increments('id').primary();
      invite.string('user_id', 255);
      invite.string('event_id', 255);
      invite.boolean('joined');
      invite.boolean('declined');
      invite.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
