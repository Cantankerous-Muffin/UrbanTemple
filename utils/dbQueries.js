////////////////////////////////////////
//Functions for query calls to the DB.//
////////////////////////////////////////

var db = require('../app/config');
var Student = require('../app/models/student.js');
var Instructor = require('../app/models/instructor.js');
var Class = require('../app/models/classes.js');
var StudentVid = require('../app/models/studentVideos.js');
var InsVid = require('../app/models/instrVideos.js');


var DBQuery = {
   /**
   * Register a new student into the DB.
   * Will check if user already exists as Student or Instructor.
   * @username  {[Object]}  Contains info of user
   * @return    {[Boolean]} If successful
   */
  newStudent: function (user) {
    //Make a DB query 
    //Check if username exists as student
    new Student({
      username: user.username
    }).fetch().then(function(exists){
      if(!exists){
        //Check if instructor uses that username
        new Instructor({
          username: user.username
        }).fetch().then(function(exists){
          if(!exists){
            new Student({
              username: user.username,
              password: user.password,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            }).save()
            .catch(function(err){
              console.log('Error in newStudent: ',err);
              return false;
            })
            .then(function(){
              console.log('Saved new student user to DB.');
              return true;
            });
          }else{
            console.log('Instructor already used that username.');
            return false;
          }
        });
        //add student user to DB
      }else{
        console.log('Student already used that username.');
        return false;
      }
    });
  },

  /**
   * Register a new Instructor into the DB.
   * Will check if username already exists as Student or Instructor.
   * @username  {[Object]}  Contains info of user
   * @return    {[Boolean]} If successful
   */
  newInstructor: function (user){
    //Make a DB query 
    //Check if username exists as student
    new Student({
      username: user.username
    }).fetch().then(function(exists){
      if(!exists){
        //Check if instructor uses that username
        new Instructor({
          username: user.username
        }).fetch().then(function(exists){
          if(!exists){
            new Instructor({
              username: user.username,
              password: user.password,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            }).save()
            .catch(function(err){
              console.log('Error in newInstructor: ',err);
              return false;
            })
            .then(function(){
              console.log('Saved new Instructor user to DB.');
              return true;
            });
          }else{
            //instructor exists with that username
            console.log('Instructor already used that username.');
            return false;
          }
        });
        //add student user to DB
      }else{
        //account already exists
        console.log('Student already used that username.');
        return false;
      }
    });
  },

  /**
   * Create a new class. WIll check if class title already exists.
   * @classInfo  {[Object]} Object with new class info
   * @return {[Boolean]}  if successful
   */
  newClass: function(classInfo){
    //check if class title already exists
    new Class({
      title: classInfo.title,
    }).fetch().then(function(exists){
      if(!exists){
        new Class({
          title: classInfo.title,
          instructor_id: classInfo.instructor_id,
          description: classInfo.description,
        }).save()
        .catch(function(err){
          console.log('Error in newClass: ', err);
          return false;
        })
        .then(function(){
          console.log('Added new class to DB.');
          return true;
        });
      }else{
        //class of that title already exists
        console.log('Class of that title already exist.');
        return false;
      }
    });
  },

  /**
   * When student submits a video. Only one can exist at a time per student.
   * If student have submitted video to a class before, will overwrite that URL.
   * @vidInfo  {[Object]}
   * @return {[Boolean]} if successful
   */
  submitVid: function(vidInfo){
    //check if a video under the students id already exists
    new StudentVid({
      student_id: vidInfo.student_id,
      class_id: vidInfo.class_id
    }).fetch().then(function(exists){
      if(!exists){
        new StudentVid({
          student_id: vidInfo.student_id,
          instructor_id: vidInfo.instructor_id,
          class_id: vidInfo.class_id,
          videoURL: vidInfo.videoURL,
        }).save()
        .catch(function(err){
          console.log('Error in submitVid: ', err);
          return false;
        })
        .then(function(){
          console.log('Saved new student video.');
          return true;
        });
      }else{
        exists.save( { videoURL: vidInfo.videoURL }, {patch: true} );
        console.log('Updated previous video URL');
      }
    });
  },

  /**
   * Submits instructor's video for a class. Will check and do nothing 
   * if same vid already exists in that class.
   * @vidInfo  {[Object]} Information on the new video.
   * @return {[Boolean]}  If successful
   */
  submitInsVid: function (vidInfo){
    new InsVid({
      class_id: vidInfo.class_id,
      instructor_id: vidInfo.instructor_id,
      videoURL: vidInfo.videoURL,
    }).fetch().then(function(exists){
      if(!exists){
        new InsVid({
          class_id: vidInfo.class_id,
          instructor_id: vidInfo.instructor_id,
          videoURL: vidInfo.videoURL,
        }).save()
        .catch(function(err){
          console.log('Error in SubmitInsVid: ', err);
          return false;
        })
        .then(function(){
          console.log('Created new instructor video for class id: ', vidInfo.class_id);
          return true;
        });
      }else{
        console.log('Video already exists for this class.');
        return false;
      }
    });
  },


  /////////////////////
  //Special functions//
  /////////////////////

  /**
   * Establish a relation between student to class using their ID.
   * Will return false if student already has relation to that class.
   * @studentID  {[String]} Student ID
   * @classID  {[String]}   Class ID
   * @return {[Boolean]}    If successful
   */
  studentToClass: function(studentID, classID){
    //check if student is already a part of that class

    db.knex('students')
    .join('classes_students', 'students.id', '=', 'classes_students.student_id')
    .join('classes', 'classes.id', '=', 'classes_students.class_id')
    .select('classes_students.id','students.username', 'classes.title')
    .where({
      'students.id': studentID,
      'classes.id': classID
    })
    .then(function(exists){
      // console.log('!!!!!!',exists.length);
      if(exists.length === 0){
        db.knex('classes_students').insert({
          class_id: classID,
          student_id: studentID
        })
        .catch(function(err){
          console.log('Error in studentToClass: '+err);
          return false;
        })
        .then(function(data) {
          console.log('Student successfully registered to class');
          return true;
        });
      }else{
        console.log('Student is already in this class.');
        return false;
      }
    });
  },

  /**
   * Gets all students under an instructor for all classes.
   * @instructorID  {[Integer]} The Instructor ID
   * @return {[Array]} An [] of {}, each {} being a student. Or false if invalid instructorID.
   */
  studentsUnderInst: function(instructorID){
    db.knex('instructors')
    .select('*')
    .where('id', instructorID)
    .then(function(exists){
      if(!exists){
        console.log('Invalid instructor ID.');
        return false;
      }else{
        db.knex('instructors')
        .join('classes', 'instructors.id', '=', 'classes.instructor_id')
        .join('classes_students', 'classes.id', '=', 'classes_students.class_id')
        .join('students', 'students.id', '=', 'classes_students.student_id')
        .select('students.*', 'classes.title')
        .where({
          'instructors.id': instructorID
        })
        .then(function(data){
          console.log(data);
          return data;
        });
      }
    })
  },



};


module.exports = DBQuery;






