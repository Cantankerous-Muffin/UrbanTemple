var db = require('../config');

var Classes = db.Model.extend({
  tableName: 'classes',
  hasTimestamps: true,
  initialize: function(){
  },

  students: function(){
    return this.belongsToMany('Students');
  },

  progress: function(){
    return this.hasMany('Progress', 'class_id');
  },

  instructors: function(){
    return this.belongsTo('Instructors');
  },

  levels: function(){
    return this.hasMany('Levels', 'class_id');
  },

  feedbacks: function(){
    return this.hasMany('Feedbacks', 'class_id');
  },

  disciplines: function(){
    return this.belongsTo('Disciplines');
  },
});


module.exports = db.model('Classes', Classes);
