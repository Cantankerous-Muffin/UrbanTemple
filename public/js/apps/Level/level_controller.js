define([
    "app",
    "entities/models/level_models",
    "apps/Level/level_view"
  ], 
  function(VirtualDojo, LevelModels, LevelView){
    VirtualDojo.module("LevelApp", function(LevelApp, VirtualDojo, Backbone, Marionette, $, _){

      LevelApp.Controller = {
        
        showLevel: function(params){
          var LevelMainView = new LevelView.Video(params);
          console.log('showLevel in controller executed');
          VirtualDojo.regions.main.show(LevelMainView);
        }
      };

    });
    return VirtualDojo.LevelApp.Controller
  });