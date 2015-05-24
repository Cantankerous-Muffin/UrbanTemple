var db = require('../config');

var InstrVideos = db.Model.extend({
  tableName: 'instrVideos',
  hasTimestamps: true,
  initialize: function(){
  },

  instructor: function() {
    return this.hasOne('Instructors');
  },
  class: function() {
    return this.hasOne('Classes');
  }
});


module.exports = db.model('InstrVideos', InstrVideos);