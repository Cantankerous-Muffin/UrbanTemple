var db = require('../config');

var Levels = db.Model.extend({
  tableName: 'levels',
  hasTimestamps: true,
  initialize: function(){
  },

  classes: function() {
    return this.belongsTo('Classes');
  }
});


module.exports = db.model('Levels', Levels);

