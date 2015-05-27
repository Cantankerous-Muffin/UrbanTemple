// Dependencies
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var passport     = require('passport');
var session      = require('express-session');

// Routes
var routes       = require('./../routes/index');
var users        = require('./../routes/users');
var dashboard    = require('./../routes/dashboard');
var Student        = require('../app/models/student');
var Instructor        = require('../app/models/instructor');
var auth         = require('./../routes/auth');

// Authentication
var LocalStrategy = require('passport-local').Strategy;

var app = express();

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Initiate passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// Express-session settings
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Routing
app.use('/', routes);
// app.use('/users', users);
app.use('/auth', auth);
app.use('/dashboard', dashboard);


// Passport will serialize and deserialize user instances to and from the session.
// Not using these right now, maybe later?
passport.serializeUser(function(user, done) {
  console.log('Serializing User!!!' + user);
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  console.log('Deserializing User!!!' + user);
  done(null, obj);
});


// Local Auth
passport.use('local',new LocalStrategy(
  function(username, password, done) {
    new Student({ username: username })
      .fetch()
      .then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.comparePassword(password,function(x){
        if (x === true){
          return done(null, user);
        } else {
          // we look for whether user is an instructor instead:
          new Instructor({ username: username })
            .fetch()
            .then(function(user) {
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.comparePassword(password,function(x){
              if (x === true){
                return done(null, user);
              } else {
                return done(null, false, { message: 'Incorrect password.' });
              }
            })){
            }
          });
          // return done(null, false, { message: 'Incorrect password.' });
        }
      })){
      }
    });

  }));

// Catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log('Error:',err.message);
    // res.end(err.message);
    res.redirect('login');
  });
}
else {
  // FIXME
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
    res.end(err.message);
  });
}


module.exports = app;






