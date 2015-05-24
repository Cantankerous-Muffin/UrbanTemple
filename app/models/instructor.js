var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var Instructors = db.Model.extend({
  tableName: 'instructors',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null)
      .bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  },
  studentVideos: function() {
    return this.hasMany('StudentVideos', 'instructor_id');
  },
  instrVideos: function() {
    return this.hasMany('InstrVideos', 'instructor_id');
  },
  classes: function() {
    return this.hasMany('Classes','instructor_id');
  },
  // Jimmy, you gotta debug this:
  student: function(){
    return this.belongsToMany('Students').through('Classes');
  }
  
});


module.exports = db.model('Instructors', Instructors);