var db = require('../config');

var Ranks = db.Model.extend({
  tableName: 'ranks',
  hasTimestamps: true,
  initialize: function(){
  },

  students: function() {
    return this.belongsTo('Students');
  },

  instructors: function(){
    return this.belongsTo('instructors');
  },

  disciplines: function(){
    return this.belongsTo('Disciplines');
  }

});


module.exports = db.model('Ranks', Ranks);


