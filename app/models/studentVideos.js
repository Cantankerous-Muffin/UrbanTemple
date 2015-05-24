var db = require('../config');

var StudentVideos = db.Model.extend({
  tableName: 'studentVideos',
  hasTimestamps: true,
  initialize: function(){
  },

  student: function() {
    return this.hasOne('Student');
  },
  instructor: function() {
    return this.hasOne('Instructor');
  },
  class: function() {
    return this.hasOne('Classes');
  }
});


module.exports = db.model('StudentVideos', StudentVideos);