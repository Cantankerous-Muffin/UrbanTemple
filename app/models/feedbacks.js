var db = require('../config');

var Feedbacks = db.Model.extend({
  tableName: 'feedbacks',
  hasTimestamps: true,
  initialize: function(){
  },

  students: function(){
    return this.belongsTo('Students');
  },

  instructors: function(){
    return this.belongsTo('Instructors');
  },

  classes: function(){
    return this.belongsTo('Classes');
  },
});


module.exports = db.model('Feedbacks', Feedbacks);

