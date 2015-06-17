var express = require('express');
var router = express.Router();
var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');
var passport = require('passport');
var path         = require('path');
var DBQuery = require('../utils/dbQueries.js')
var db = require('../app/config.js');
/**
 * handleAuth creates a session object, which we then store the username as a user
 * property under the req.session object
 */
function handleAuth(req, res, username, id) {
  req.session.regenerate(function() {
    req.session.user = username;
    req.session.user_id = id.toString();
    console.log("SESSION!!! " + req.session.user + "ID!!! " + req.session.user_id);
    // res.redirect('/dashboard');
    res.end();
  });
};

// Local Auth Sign-in
router.post('/login', passport.authenticate('local'), function(req, res) {
  var username = req.body.username;
  console.log('gets to login page');
  // need to check if user is a student or an instructor by doing a db query.
  new Instructor({username: username})
    .fetch()
    .then(function(model){
      if (!model){
        // login is not an instructor
        new Student({username: username})
        .fetch()
        .then(function(model) {
          handleAuth(req, res, username, model.attributes.id);
        });
      } else {
        // login is an instructor
         handleAuth(req, res, username, model.attributes.id);
      }
    })
});

// Local Auth Sign-up
// router.get('/signup', function(req, res, next) {
//   res.sendFile(path.join(__dirname,'../public/signup.html'));
// });
// // Local Auth Sign-up
// router.get('/login', function(req, res, next) {
//   res.sendFile(path.join(__dirname,'../public/index.html'));
// });


// Local Auth Sign-up
router.post('/signup', function(req, res, next) {

  var isInstructor = req.body.isInstructor;
  var username  = req.body.username;
  var password  = req.body.password;
  if (!isInstructor){
    // sign up student
    console.log('user is a student');
    new Student({username:username})
      .fetch()
      .then(function(model){
        if (model) {
          return next(null);
        } else {

          new Student({username:username,password:password, firstName:req.body.firstname, lastName:req.body.lastname, email:req.body.email},{isNew:true}).save()
  	        .then(function(model){
              console.log('model looks like', model);
              // look for class_id where classNum = 1
              db.knex('classes')
                .where({'classes.classNum': 1})
                .select('id','discipline_id')
                .map(function(class_idData){
                  console.log('class_idData', class_idData);
                  db.knex.raw('insert into classes_students ("updated_at", "student_id","class_id") values ('+"'"+'now()'+"'"+','+model.attributes.id+','+class_idData.id+') RETURNING *;')
                    .then(function(x){
                      db.knex.raw('insert into progress ("updated_at", "student_id","class_id","levelNum") values ('+"'"+'now()'+"'"+','+model.attributes.id+','+class_idData.id+','+5+') RETURNING *;')
                        .then(function(y){
                          db.knex.raw('insert into ranks ("updated_at", "student_id","discipline_id","rankTitle","rankNum") values ('+"'"+'now()'+"'"+','+model.attributes.id+','+class_idData.discipline_id+','+"'"+"Beginner - 1"+"'"+','+1+') RETURNING *;')
                            .then(function(z){
                              console.log('z',z);

                            })
                        })
                      console.log('x',x);
                    });
                  
                  return class_idData;
                })
                .then(function(collatedClass_idData){
                  res.json(collatedClass_idData);
                })
  	          handleAuth(req, res, username, model.attributes.id);
  	        });
          }
      });
  }
  else {
    // sign up instructor
    console.log('user is a instructor');
    console.log('req permissionKey', req.body.permissionKey);
    db.knex("instrKeys")
      .select("used")
      .where("key",req.body.permissionKey)
      .then(function(exist){
        console.log('exist',exist[0].used);
        if (exist[0].used){
          console.log("Key already used by another instructor.");
        } else {
          // look if instructor already exists
          new Instructor({username:username})
            .fetch()
            .then(function(model){
              if (model) {
                // instructor present in DB. update key to used.
                console.log("Instructor present in DB.");
                return next(null);
              } else {
                // instructor not present in DB. Can save instructor to DB.
                db.knex("instrKeys")
                  .where('key',req.body.permissionKey)
                  .update({
                    used: true
                  })
                  .then(function(){
                    new Instructor({username:username,password:password, firstName:req.body.firstname, lastName:req.body.lastname, email:req.body.email},{isNew:true}).save()
                      .then(function(model){
                        handleAuth(req, res, username, model.attributes.id);
                      });
                  });
                }
            });
        }
      })
  }
});

/**
 * Logout... console logs are for checking the req.session object before and after it's
 * destroyed to ensure it's working.
 */

router.get('/logout', function(req, res, next) {

  console.log("Before destroy session... " + JSON.stringify(req.session));
  req.session.destroy(function() {
    console.log("Destroying express-session object for this session... ");
    res.redirect('/');
    // res.json({isAuthed: false});
  });
});


router.get('/checkauth', function(req, res, next) {
  if (req.session.user) {
    console.log('user is logged in')
    res.json({isAuthed:true, username:req.session.user})
  } else {
    console.log('user is NOT logged in')
    res.json({isAuthed:false})
  }
});




module.exports = router;


