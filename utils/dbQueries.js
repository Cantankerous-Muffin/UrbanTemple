////////////////////////////////////////
//Functions for query calls to the DB.//
////////////////////////////////////////

var db = require('../app/config');
var Student = require('../app/models/student.js');
var Instructor = require('../app/models/instructor.js');
var Class = require('../app/models/classes.js');
var StudentVid = require('../app/models/studentVideos.js');


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


};


module.exports = DBQuery;






