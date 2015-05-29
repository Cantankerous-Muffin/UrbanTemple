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


  //////////////////
  //Insert Queries//
  //////////////////
   /**
   * Register a new student into the DB.
   * Will check if user already exists as Student or Instructor.
   * @username  {[Object]}  Contains info of user
   * @callback  {[Function]}  Callback function invoked on success if given
   * @return    {[Boolean]} If successful
   */
  newStudent: function (user, callback) {
    //Make a DB query 
    //Check if username exists as student
    new Student({
      username: user.username
    }).fetch()
    .then(function(exists){
      if(!exists){
        //Check if instructor uses that username
        new Instructor({
          username: user.username
        }).fetch()
        .then(function(exists){
          if(!exists){
            new Student(user)
            .save()
            .catch(function(err){
              console.log('Error in newStudent: ',err);
              if(callback){
                callback(false);
              }
              return false;
            })
            .then(function(data){
              console.log('Saved new student user to DB.');
              if(callback){
                callback(true);
              }
              return true;
            });
          }else{
            console.log('Instructor already used that username.');
            if(callback){
                callback(false);
            }
            return false;
          }
        });
        //add student user to DB
      }else{
        console.log('Student already used that username.');
        if(callback){
          callback(false);
        }
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
  newInstructor: function (user, callback){
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
            new Instructor(user)
            .save()
            .catch(function(err){
              console.log('Error in newInstructor: ',err);
              if(callback){
                callback(false);
              }
              return false;
            })
            .then(function(data){
              console.log('Saved new Instructor user to DB.');
              if(callback){
                callback(true);
              }
              return true;
            });
          }else{
            //instructor exists with that username
            console.log('Instructor already used that username.');
            if(callback){
              callback(false);
            }
            return false;
          }
        });
        //add student user to DB
      }else{
        //account already exists
        console.log('Student already used that username.');
        if(callback){
          callback(false);
        }
        return false;
      }
    });
  },

  /**
   * Create a new class. WIll check if class title already exists.
   * @classInfo  {[Object]} Object with new class info
   * @return {[Boolean]}  if successful
   */
  newClass: function(classInfo, callback){
    //check if class title already exists
    new Class({
      title: classInfo.title,
    }).fetch().then(function(exists){
      if(!exists){
        new Class(classInfo)
        .save()
        .catch(function(err){
          console.log('Error in newClass: ', err);
          if(callback){
            callback(false);
          }
          return false;
        })
        .then(function(){
          console.log('Added new class to DB.');
          if(callback){
            callback(true);
          }
          return true;
        });
      }else{
        //class of that title already exists
        console.log('Class of that title already exist.');
        if(callback){
          callback(false);
        }
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
        new StudentVid(vidInfo)
        .save()
        .catch(function(err){
          console.log('Error in submitVid: ', err);
          if(callback){
            callback(false);
          }
          return false;
        })
        .then(function(){
          console.log('Saved new student video.');
          if(callback){
            callback(true);
          }
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
        new InsVid(vidInfo)
        .save()
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

  ///////////////
  //Get Queries//
  ///////////////
  
  /**
   * Gets a single student's info from DB
   * @param  {[String]} using [Property to search]
   * @param  {[]} info [Student's info]
   * @param  {[String]} callback [callback function (optional)]
   * @return {[Object]}   [Student information, or false if not found]
   */
  getStudentUsing: function(using, info, callback){
    db.knex('students')
    .where(using, info)
    .select('*')
    .catch(function(err){
      console.log('Error: ',err);
    })
    .then(function(data){
      if(!data || data.length===0){
        console.log('Student does not exist');
        if(callback){ callback(false); }
        return false;
      }else if(data.length>1){
        console.log('Warning: More then one student found.');
        if(callback){ callback(data); }
        return data[0];
      }else{
        if(callback){ callback(data[0]); }
        return data[0];
      }
    });
  },

  /**
   * Get's class info.
   * @param  {[String]} using [Property to search]
   * @param  {[]}   info  [Class info]
   * @param  {Function} callback [Callback function]
   * @return {[Object/Boolean]}  [Return false on failure, and data if any is found]
   */
  getClassUsing: function(using, info, callback){
    var result;
    db.knex('classes')
    .where(using, info)
    .select('*')
    .then(function(data){
      if(!data || data.length===0){
        console.log('Class does not exist');
        if(callback){ callback(false); }
        return false;
      }else if(data.length>1){
        console.log('Warning: More then one class found.');
        if(callback){ callback(data); }
        return data[0];
      }else{
        if(callback){ callback(data[0]); }
        return data[0];
      }
    });
  },

  /**
   * Get's Instructor info.
   * @param  {[String]} using [Property to search]
   * @param  {[]}   info  [The unique instructor info]
   * @param  {Function} callback [Callback function]
   * @return {[Object/Boolean]}  [Return false on failure, and data if any is found]
   */
  getInstructorUsing: function(using, info, callback){
    db.knex('instructors')
    .where(using, info)
    .select('*')
    .catch(function(err){
      console.log(err);
      if(callback){ callback(false); }
      return false;
    })
    .then(function(data){
      if(!data || data.length===0){
        console.log('Instructor does not exist');
        if(callback){ callback(false); }
        return false;
      }else if(data.length>1){
        console.log('Warning: More then one Instructor of this username is found.');
        if(callback){ callback(data); }
        return data[0];
      }else{
        if(callback){ callback(data[0]); }
        return data[0];
      }
    });
  },

  /**
   * Gets student video 
   * @param  {[String]} using [Property to search]
   * @param  {[]} info [unqiue info]
   * @param  {Function}  callback  [Callback function]
   * @return {[type]}  [Will return false on any failure, returns object if any data found]
   */
  getStudentVidUsing: function(using, info, callback){
    db.knex('studentVideos')
    .where(using, info)
    .select('*')
    .catch(function(err){
      console.log(err);
      if(callback){ callback(false); }
      return false;
    })
    .then(function(data){
      if(!data || data.length===0){
        console.log('No videos found.');
        if(callback){ callback(false); }
        return false;
      }else{
        if(callback){ callback(data); }
        return data;
      }
    })
    .catch(function(err){
      console.log('Error in getStudentVidUsing: \n',err);
    });
  },

  /**
   * Gets the instruction videos using the instructors ID
   * @param  {[String]} using [Property to search]
   * @param  {[]} info [unqiue info]
   * @param  {Function} callback     [Callback function]
   * @return {[type]}  [Will return false on any failure, returns object if any data found]
   */
  getInstVideoUsing: function(using, info, callback){
    db.knex('instrVideos')
    .where(using, info)
    .select('*')
    .catch(function(err){
      console.log(err);
      if(callback){ callback(false); }
      return false;
    })
    .then(function(data){
      if(!data || data.length===0){
        console.log('No videos found.');
        if(callback){ callback(false); }
        return false;
      }else{
        if(callback){ callback(data); }
        return data;
      }
    })
    .catch(function(err){
      console.log('Error in getInstVideoUsing: \n',err);
    });
  },

  /**
   * Gets all students under an instructor for all classes.
   * @param  {[String]} using [Property to search]
   * @param  {[]} info [unqiue info]
   * @param  {Function} callback     [Callback function]
   * @return {[Array]} An [] of {}, each {} being a student. Or false if invalid info or using.
   */
  getStudentsUnderInstUsing: function(using, info, callback){
    db.knex('instructors')
    .select('*')
    .where(using, info)
    .catch(function(err){
      console.log(err);
      if(callback){ callback(false); }
      return false;
    })
    .then(function(exists){
      if(!exists || exists.length===0){
        console.log('No students found.');
        return false;
      }else{
        db.knex('instructors')
        .join('classes', 'instructors.id', '=', 'classes.instructor_id')
        .join('classes_students', 'classes.id', '=', 'classes_students.class_id')
        .join('students', 'students.id', '=', 'classes_students.student_id')
        .select('students.*', 'classes.title')
        .where('instructors.'+using, info)
        .then(function(data){
          if(callback){ callback(data); }
          return data;
        });
      }
    });
  },
  
  /**
   * Gets all Instructors for a student across all classes.
   * @param  {[String]} using [Property to search]
   * @param  {[]} info [unqiue info]
   * @param  {Function} callback     [Callback function]
   * @return {[Array]} An [] of {}, each {} being a Instructor. Or false if invalid info or using.
   */
  getInstOfStudentUsing: function(using, info, callback){
    db.knex('students')
    .select('*')
    .where(using, info)
    .catch(function(err){
      console.log(err);
      if(callback){ callback(false); }
      return false;
    })
    .then(function(exists){
      if(!exists || exists.length===0){
        console.log('No teachers found.');
        return false;
      }else{
        db.knex('students')
        .join('classes_students', 'students.id', '=', 'classes_students.student_id')
        .join('classes', 'classes.id', '=', 'classes_students.class_id')
        .join('instructors', 'instructors.id', '=', 'classes.instructor_id')
        .select('instructors.*', 'classes.title')
        .where('students.'+using, info)
        .then(function(data){
          if(callback){ callback(data); }
          return data;
        });
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
  studentToClass: function(studentUser, classTitle, callback){
    
    //check if studentID and classID are valid
    var student = new Student({username: studentUser});
    var classs = new Class({title: classTitle});

    student.fetch()
    .then(function(exists){
      if(!exists || exists.length===0){
        console.log('studentToClass: Invalid studentUser');
        if(callback){
          callback(false);
        }
        return false;
      }else{
        checkClass();
      }
    })
    .catch(function(err){
      console.log('Error in studentToClass: ', err);
      if(callback){
        callback(false);
      }
      return false;
    });


    var checkClass = function(){
      classs.fetch()
      .then(function(exists){
        if(!exists || exists.length===0){
          console.log('studentToClass: Invalid classTitle');
          if(callback){
            callback(false);
          }
          return false;
        }else{
          asignStudent();
        }
      })
      .catch(function(err){
        console.log(err);
        if(callback){
          callback(false);
        }
        return false;
      });
    };

    var asignStudent = function(){
      //check if such a relation already exist
      db.knex('classes_students')
      .join('students', 'students.id', '=', 'classes_students.student_id')
      .join('classes', 'classes.id', '=', 'classes_students.class_id')
      .where({
        'students.username': studentUser,
        'classes.title': classTitle
      })
      .select('classes_students.id')
      .then(function(exist){
        if(!exist || exist.length===0){
          console.log('Succesfully added student to class.');
          student.classes().attach(classs);
          if(callback){
            callback(true);
          }
          return true;
        }else{
          console.log('That student is already in that class.');
          if(callback){
            callback(false);
          }
          return false;
        }
      })
      .catch(function(err){
        console.log('Error in studentToClass: '+err);
        if(callback){
          callback(false);
        }
        return false;
      });
    };
  },


  /////////////////////
  //Deletion Queries //
  //USE WITH CAUTION!//
  /////////////////////
  
  /**
   * Removes a student from the Students table
   * @param  {[String]}   username [Student's username.]
   * @param  {Function} callback [Optional callback]
   * @return {[Boolean]} [if no callback, will return true on successful del]
   */
  delStudent: function(username, callback){
    db.knex('students')
    .where('username', username)
    .del()
    .catch(function(err){
      console.log('Error in delStudent: ',err);
      return false;
    })
    .then(function(data){
      console.log(username,' removed from Students table.');
      if(callback){
        callback(data);
      }else{
        return true;
      }
    });
  },

  /**
   * [delInstructor description]
   * @param  {[String]}   username [Instructor username]
   * @param  {Function} callback [Callback]
   * @return {[Boolean]}  [If no callback, will return boolean based on success]
   */
  delInstructor: function(username, callback){
    db.knex('instructors')
    .where('username', username)
    .del()
    .catch(function(err){
      console.log('Error in delInstructor: ',err);
      if(callback){
        callback(false);
      }else{
        return false;
      }
    })
    .then(function(data){
      console.log(username,' removed from Instructor table.');
      if(callback){
        callback(true);
      }else{
        return true;
      }
    });
  },
  
  /**
   * Will delete all rows from a table is specified. 
   * Will clear ALL tables if tableName is not given.
   * @param  {[String]} tableName [Name of table to clear.]
   */
  clearTable: function(tableName){
    if(tableName){
      db.knex(tableName)
      .select('*')
      .del()
      .then(function(){
        console.log('Cleared Table: ', tableName);
      });
    }else{
      db.knex.raw('DELETE FROM "students";');
      db.knex.raw('DELETE FROM "instructors";');
      db.knex.raw('DELETE FROM "classes";');
      db.knex.raw('DELETE FROM "studentVideos";');
      db.knex.raw('DELETE FROM "instrVideos";');
      db.knex.raw('DELETE FROM "classes_students";');
      console.log('Cleared All Tables!');
    }
  },

};


module.exports = DBQuery;






