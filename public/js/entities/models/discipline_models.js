define(
  [
    "app",
    "entities/models/class_models",
  ],
  function(VirtualDojo, ClassModels) {
    VirtualDojo.module("Entities.Models.Disciplines", function(DisciplineModels, VirtualDojo, Backbone, Marionette, $, _) {
      
      // Discipline model 
      DisciplineModels.Discipline = Backbone.Model.extend({
        default: {
          id: null,
          title: "",
          description: "",
          disciplineLogo: "",
          classData: null
        },
        initialize: function() {
          // instantiate Collections and Models from JSON
          var classes = this.get("classData");
          if (classes) {
            var classesCollection = new ClassModels.Classes();
            classes.forEach(function(cls) {
              classesCollection.add(
                new ClassModels.Class(cls)
              );
            });
            this.set("classData", classesCollection);
          }
        }
      });
      
      // Discipline collection
      DisciplineModels.Disciplines = Backbone.Collection.extend({
        model: DisciplineModels.Discipline
      });
    });
    return VirtualDojo.Entities.Models.Disciplines;
  }
);
