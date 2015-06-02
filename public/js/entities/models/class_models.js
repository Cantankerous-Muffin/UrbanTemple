define(
  [
    "app",
  ],
  function(VirtualDojo) {
    VirtualDojo.module("Entities.Models.Classes", function(ClassModels, VirtualDojo, Backbone, Marionette, $, _) {
      
      // Class model 
      ClassModels.Class = Backbone.Model.extend({
        default: {
          classId: null,
          disciplineId: null,
          instructorId: null,
          userId: null,
          title: "",
          description: "",
          totalLevel: null
        },
      });
      
      // Classes collection
      ClassModels.Classes = Backbone.Collection.extend({
        model: ClassModels.Class,
        findById: function(cid) {
          return this.findWhere({classId: cid});
        }
      });
    });
    return VirtualDojo.Entities.Models.Classes;
  }
);
