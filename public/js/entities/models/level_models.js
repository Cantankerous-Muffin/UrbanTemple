define(
  [
    "app",
  ],
  function(VirtualDojo) {
    VirtualDojo.module("Entities.Models.Levels", function(LevelModels, VirtualDojo, Backbone, Marionette, $, _) {  
      // Level model 
      LevelModels.Level = Backbone.Model.extend({
        default: {
          disciplineId: null,
          classNum: null,
	        levelNum: null,
    		  title: "",
    		  description: "",
    		  videoUrl: "",
    		  feedbackNeeded: false,
    		  prev: null,
    		  next: null 
        },
      });
      
      // Level collection
      LevelModels.Levels = Backbone.Collection.extend({
        model: LevelModels.Level
      });
    });
    return VirtualDojo.Entities.Models.Levels;
  }
);
