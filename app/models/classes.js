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
    return this.belongsToMany(Students);
  },
  instructor: function() {
    return this.hasOne('Instructors');
  },
  instructorVideos: function() {
    return this.hasMany('InstrVideos','class_id');
  }
});


module.exports = db.model('Classes', Classes);