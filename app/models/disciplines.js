var db = require('../config');

var Disciplines = db.Model.extend({
  tableName: 'disciplines',
  hasTimestamps: true,
  initialize: function(){
  },

  classes: function() {
    return this.belongsTo('Classes');
  },
  ranks: function() {
    return this.belongsTo('Ranks');
  }
});


module.exports = db.model('Disciplines', Disciplines);

