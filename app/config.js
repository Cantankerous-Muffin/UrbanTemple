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
      //normal stuff
      student.increments('id').primary();
      student.string('username', 100).unique();//.notNullable();
      student.string('password', 100).unique();//.notNullable();
      student.string('email', 100).unique();//.notNullable();
      student.string('firstName', 100);//.notNullable();
      student.string('lastName', 100);//.notNullable();
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
      instructor.string('username', 100).unique();//.notNullable();
      instructor.string('password', 100).unique();//.notNullable();
      instructor.string('email', 100).unique();//.notNullable();
      instructor.string('firstName', 100);//.notNullable();
      instructor.string('lastName', 100);//.notNullable();
      instructor.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('disciplines').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('disciplines', function(table){
      table.increments('id').primary(); 
      table.string('title', 100).unique();
      table.text('description');
      table.integer('classCount').unsigned().defaultTo(0);
      table.timestamps();

    }).then(function (table) {
      console.log('Created Table', table);
    }); 
  }
});

db.knex.schema.hasTable('ranks').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('ranks', function(table){
      table.increments('id').primary(); 
      table.string('rankTitle', 100);
      table.integer('rankNum').unsigned();//.notNullable();
      table.string('rankIcon', 200);//.notNullable();
      table.timestamps();

      //relations
      table.integer('student_id').unsigned().references('students.id');
      table.integer('instructor_id').unsigned().references('instructors.id');
      table.integer('discipline_id').unsigned().references('disciplines.id');

    }).then(function (table) {
      console.log('Created Table', table);
    }); 
  }
});

db.knex.schema.hasTable('feedback').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('feedback', function (table) {
      table.increments('id').primary();
      table.string('videoURL',255);
      table.text('comment');
      table.boolean('approved').defaultTo(null);
      table.timestamps();
      
      //relations
      // student_id is a ForeignKey attached to student
      table.integer('student_id').unsigned().references('students.id'); 
      // instructor_id is a ForeignKey attached to instructor
      table.integer('instructor_id').unsigned().references('instructors.id'); 
      // class_id is a ForeignKey attached to class
      table.integer('class_id').unsigned().references('classes.id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('classes').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('classes', function (table) {
      table.increments('id').primary();
      table.string('title', 100).unique().notNullable();
      table.integer('classNum').unsigned().notNullable();
      table.text('description');
      table.string('classImage',255);
      table.string('classVideo', 255);
      table.integer('levelCount').unsigned().defaultTo(0);
      table.timestamps();

      //Relations
      // instructor_id is a ForeignKey attached to instructor
      table.integer('instructor_id').unsigned().references('instructors.id');
      table.integer('discipline_id').unsigned().references('disciplines.id');
      
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('progress').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('progress', function (table) {
      table.increments('id').primary();
      table.integer('levelNum').unsigned().notNullable();
      table.timestamps();

      //Relations
      table.integer('student_id').unsigned().references('students.id');
      table.integer('class_id').unsigned().references('classes.id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('levels').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('levels', function (table) {
      table.increments('id').primary();
      table.integer('levelNum').unsigned();
      table.string('title',100).notNullable();
      table.text('description');
      table.string('videoURL',255);
      table.boolean('feedbackNeeded').defaultTo(false);
      table.timestamps();

      //relations
      // class_id is a ForeignKey attached to class
      table.integer('class_id').unsigned().references('classes.id'); 
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('instrKeys').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('instrKeys', function (table) {
      table.increments('id').primary();
      table.string('key',255);
      table.boolean('used').defaultTo(false);
      table.timestamps();

    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

//Joing Tables
//Disciplines to Students
db.knex.schema.hasTable('classes_students').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('classes_students', function (table) {
      table.increments('id').primary();
      table.timestamps();

      //relations
      table.integer('class_id').unsigned().references('classes.id');
      table.integer('student_id').unsigned().references('students.id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
