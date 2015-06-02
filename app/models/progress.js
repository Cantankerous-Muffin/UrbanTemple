var db = require('../config');

var Progress = db.Model.extend({
  tableName: 'progress',
  hasTimestamps: true,
  initialize: function(){
  },

  students: function() {
    return this.belongsTo('Students');
  },

  classes: function() {
    return this.belongsTo('Classes');
  },

});


module.exports = db.model('Progress', Progress);