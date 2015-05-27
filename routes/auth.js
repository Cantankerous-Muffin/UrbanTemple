var express = require('express');
var router = express.Router();
var Student  = require('./../app/models/student');
var Instructor  = require('./../app/models/instructor');
var passport = require('passport');
var path         = require('path');


/**
 * handleAuth creates a session object, which we then store the username as a user
 * property under the req.session object
 */
function handleAuth(req, res, username, id) {
  req.session.regenerate(function() {
    req.session.user = username;
    req.session.user_id = id.toString();
    console.log("SESSION!!! " + req.session.user + "ID!!! " + req.session.user_id);
    // res.end();
    res.redirect('/dashboard');
  });
};



// Local Auth Sign-in
router.post('/login', passport.authenticate('local', { failureRedirect: 'login' }), function(req, res) {
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
  var typeOf = req.body.typeOf;
  var username  = req.body.username;
  var password  = req.body.password;
  if (typeOf !== 'Instructor'){
    // sign up student
    new Student({username:username})
      .fetch()
      .then(function(model){
        if (model) {
          return next(null);
        } else {
          new Student({username:username,password:password},{isNew:true}).save()
  	        .then(function(model){
  	          handleAuth(req, res, username, model.attributes.id);
  	        });
          }
      });
  }
  else {
    // sign up instructor
      new Instructor({username:username})
        .fetch()
        .then(function(model){
          if (model) {
            return next(null);
          } else {
            new Instructor({username:username,password:password},{isNew:true}).save()
              .then(function(model){
                handleAuth(req, res, username, model.attributes.id);
              });
            }
        });
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
    res.redirect('..#/signin');
  });

});

module.exports = router;


