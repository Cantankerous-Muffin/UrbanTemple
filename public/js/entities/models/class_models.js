define(
  [
    "app",
  ],
  function(VirtualDojo) {
    VirtualDojo.module("Entities.Models.Classes", function(ClassModels, VirtualDojo, Backbone, Marionette, $, _) {
      
      // Class model 
      ClassModels.Class = Backbone.Model.extend({
        default: {
          classImage: "",
          classNum: null,
          classId: null,
          classVideo:"",
          discipline_id: null,
          instructor_name: null,
          userId: null,
          title: "",
          description: "",
          totalLevel: null
        },
      });
      
      // Classes collection
      ClassModels.Classes = Backbone.Collection.extend({
        model: ClassModels.Class,
        // findById: function(cid) {
        //   return this.findWhere({classId: cid});
        // }
      });
    });
    return VirtualDojo.Entities.Models.Classes;
  }
);
