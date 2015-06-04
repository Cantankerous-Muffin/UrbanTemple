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
  new Student({username: username})
  .fetch()
  .then(function(model) {
    handleAuth(req, res, username, model.attributes.id);
  });
});

// Local Auth Sign-up
router.get('/signup', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/signup.html'));
});
// Local Auth Sign-up
router.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});


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
    console.log("Destroying express-session object for this session... " + req.session);
    res.redirect('/');
    // res.json({isAuthed: false});
  });
});

module.exports = router;


