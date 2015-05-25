var db = require('../config');

var StudentVideos = db.Model.extend({
  tableName: 'studentVideos',
  hasTimestamps: true,
  initialize: function(){
  },

  student: function() {
    return this.hasOne('Students');
  },
  instructor: function() {
    return this.hasOne('Instructors');
  },
  class: function() {
    return this.hasOne('Classes');
  }
});


module.exports = db.model('StudentVideos', StudentVideos);