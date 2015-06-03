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
      table.string('disLogo', 200);
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
      table.boolean('approved').defaultTo(false);
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
      table.integer('classNum').unsigned();
      table.text('description');
      table.string('image',255);
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
      table.timestamps();

      //Relations
      table.integer('student_id').unsigned().references('students.id');
      table.integer('class_id').unsigned().references('classes.id');
      table.integer('levelNum').unsigned().references('levels.levelNum');

      
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('levels').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('levels', function (table) {
      table.increments('id').primary();
      table.integer('levelNum').unsigned().unique();
      table.string('title',100).unique();
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

// db.knex.schema.hasTable('students').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('students', function (student) {
//       //normal stuff
//       student.increments('id').primary();
//       student.string('username', 100).unique();
//       student.string('password', 100);
//       student.string('email', 100);
//       student.string('firstName', 100);
//       student.string('lastName', 100);
//       student.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('instructors').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('instructors', function (instructor) {
//       instructor.increments('id').primary();
//       instructor.string('username', 100).unique();
//       instructor.string('password', 100);
//       instructor.string('email', 100);
//       instructor.string('firstName', 100);
//       instructor.string('lastName', 100);
//       instructor.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('classes').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('classes', function (classe) {
//       classe.increments('id').primary();
//       classe.string('title', 255).unique();
//       // instructor_id is a ForeignKey attached to instructor
//       classe.integer('instructor_id').unsigned().references('instructors.id');
//       // student_id is a ForeignKey attached to student
//       //classe.string('student_id', 10);
//       classe.text('description');
//       classe.string('image',255);
//       classe.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('studentVideos').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('studentVideos', function (studentVideo) {
//       studentVideo.increments('id').primary();
//       // student_id is a ForeignKey attached to student
//       studentVideo.integer('student_id').unsigned().references('students.id'); 
//       // instructor_id is a ForeignKey attached to instructor
//       studentVideo.integer('instructor_id').unsigned().references('instructors.id'); 
//       // class_id is a ForeignKey attached to class
//       studentVideo.integer('class_id');
//       studentVideo.string('videoURL',255);
//       studentVideo.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });
// db.knex.schema.hasTable('instrVideos').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('instrVideos', function (instrVideo) {
//       instrVideo.increments('id').primary();
//       // class_id is a ForeignKey attached to class
//       instrVideo.integer('class_id').unsigned().references('classes.id'); 
//       // instructor_id is a ForeignKey attached to instructor
//       instrVideo.integer('instructor_id').unsigned().references('instructors.id');
//       instrVideo.string('videoURL',255);
//       instrVideo.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// //Joing Tables
// //Classes to Students
// db.knex.schema.hasTable('classes_students').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('classes_students', function (class_student) {
//       class_student.increments('id').primary();
//       class_student.integer('class_id').unsigned().references('classes.id');
//       class_student.integer('student_id').unsigned().references('students.id');
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = db;
