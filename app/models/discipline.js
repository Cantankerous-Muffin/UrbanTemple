var db = require('../config');

var Disciplines = db.Model.extend({
  tableName: 'disciplines',
  hasTimestamps: true,
  initialize: function(){
  },

  students: function(){
    return this.belongsToMany('Students');
  },

  instructors: function(){
    return this.belongsToMany('Instructors');
  },

  classes: function(){
    return this.hasMany('Classes', 'discipline_id');
  },
});


module.exports = db.model('Disciplines', Disciplines);