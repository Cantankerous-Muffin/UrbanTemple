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
          disciplineId: null,
          title: "",
          description: "",
          disciplineLogo: "",
          classes: null
        },
        initialize: function() {
          // instantiate Collections and Models from JSON
          var classes = this.get("classes");
          if (classes) {
            var classesCollection = new ClassModels.Classes();
            classes.forEach(function(cls) {
              classesCollection.add(
                new ClassModels.Class(cls)
              );
            });
            this.set("classes", classesCollection);
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
