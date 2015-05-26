////////////////////////////////////////
//Functions for query calls to the DB.//
////////////////////////////////////////

var db = require('../app/config');
var Student = require('../app/models/student.js');
var Instructor = require('../app/models/instructor.js');
var Class = require('../app/models/classes.js');


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
            return false;
          }
        });
        //add student user to DB
      }else{
        //account already exists
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
        }).catch(function(err){
          if(err){
            console.log('Error in newClass: ', err);
          }
        }).then(function(){
          console.log('Added new class to DB.');
        });
      }else{
        //class of that title already exists
        return false;
      }
    });
  },


};


module.exports = DBQuery;






