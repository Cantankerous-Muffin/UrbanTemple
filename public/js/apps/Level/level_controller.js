define([
    "app",
    "entities/models/level_models",
    "apps/Level/level_view"
  ], 
  function(VirtualDojo, LevelModel, LevelView){
    VirtualDojo.module("LevelApp", function(LevelApp, VirtualDojo, Backbone, Marionette, $, _){

      LevelApp.Controller = {
        
        showLevel: function(params){
          var LevelMainView = null
          
          require(["entities/class"],function(){
            var fetchClass = VirtualDojo.request("entities:classes:get", params)
              fetchClass
                .done(function(data){
                  if (data) {
                    var videoModel = new LevelModel.Level(data);
                  }

                  LevelMainView = new LevelView.Video({model: videoModel});
                  console.log(LevelMainView)
                  VirtualDojo.regions.main.show(LevelMainView);
                });

            
          })
        }
      };

    });
    return VirtualDojo.LevelApp.Controller
  });