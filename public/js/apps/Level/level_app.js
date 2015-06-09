define([
    "app",
    "apps/Level/level_controller"
  ], 
  function(VirtualDojo, LevelController) {

    VirtualDojo.module("LevelApp", function(LevelApp, VirtualDojo, Backbone, Marionette, $, _) {

      LevelApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "discipline/:disciplineId/class/:classNum/level/:levelNum": "showLevel"
        }
      });

      //Generate URL route to be called with API
      LevelApp.generateClassUrl = function(disciplineId, classNum, levelNum) {
        var url = "discipline/" + disciplineId + "/class/" + classNum + /level/ + levelNum;
        return url;
      }

      var API = {
        showLevel: function(params){
          LevelController.showLevel(params);
        }
      };


      VirtualDojo.on("show:video", function(params){
        VirtualDojo.navigate(LevelApp.generateClassUrl(params.disciplineId, params.classNum, params.levelNum));
        API.showLevel(params);
      });

      LevelApp.on("start", function(){
        new LevelApp.Router({
          controller: API
        });
      });

    });
    return VirtualDojo.LevelApp 
  }
);