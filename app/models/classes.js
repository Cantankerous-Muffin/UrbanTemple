var db = require('../config');

var Classes = db.Model.extend({
  tableName: 'classes',
  hasTimestamps: true,
  initialize: function(){
  },
  
  studentVideos: function() {
    return this.hasMany('StudentVideos', 'class_id');
  },
  student: function() {
    return this.belongsToMany('Student');
  },
  instructor: function() {
    return this.hasOne('Instructor');
  },
  instructorVideos: function() {
    return this.hasMany('InstrVideos','class_id');
  }
});


module.exports = db.model('Classes', Classes);