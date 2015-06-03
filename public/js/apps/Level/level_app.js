define([
    "app",
    "apps/Level/level_controller"
  ], 
  function(VirtualDojo, LevelController) {

    VirtualDojo.module("LevelApp", function(LevelApp, VirtualDojo, Backbone, Marionette, $, _) {

      LevelApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "level": "showLevel"
        }
      });

      var API = {
        showLevel: function(){
          LevelController.showLevel();
        }
      };

      VirtualDojo.on("itemview:show:video", function(){
        console.log('Show:video executed from level_app');

        API.showLevel();
      });

      LevelApp.on("start", function(){
        console.log('LevelApp starting:', LevelApp)
        console.log("VD", VirtualDojo)
        new LevelApp.Router({
          controller: API
        });
      });



    });
    return VirtualDojo.LevelApp 
  }
);