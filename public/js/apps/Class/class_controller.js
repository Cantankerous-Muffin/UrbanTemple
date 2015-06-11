define([
    "app",
    "entities/models/class_models",
    "entities/models/level_models",
    "apps/Class/class_view",
  ],
  function(VirtualDojo, ClassModels, LevelModels, ClassView) {

    VirtualDojo.module("ClassApp", function(ClassApp, VirtualDojo, Backbone, Marionette, $, _){
      ClassApp.Controller = {
            
        showClass: function(params) {
          var classLayoutView = new ClassView.classLayout();
          
          // ajax call to retrieve user data and instantiate user model
          require(["entities/class"], function() {
            var fetchClasses = VirtualDojo.request("entities:classes:get", params);
            fetchClasses
              .done(function(data){
                var cls = new ClassModels.Class(data);
                classLayoutView.classRegion.show(new ClassView.Class({
                  model: cls
                }));
              });
          }); // end of require block

          require(["entities/level"], function() {
            var fetchLevels = VirtualDojo.request("entities:levels:getAll", params);
            fetchLevels
              .done(function(data){
                var levels = data;
                if (levels) {

                  // instantiate progress collection and models
                  var levelCollection = new LevelModels.Levels();
                  levels.forEach(function(level) {
                    levelCollection.add(new LevelModels.Level(level));
                  });
                }

                classLayoutView.levelRegion.show(new ClassView.LevelList({
                  collection: levelCollection
                }));
              });
          }); // end of require block
          
          VirtualDojo.regions.main.show(classLayoutView);
        }
      }
    });

    return VirtualDojo.ClassApp.Controller;
  }
);

