define([
    "app",
    "entities/models/discipline_models",
    "entities/models/class_models",
    "apps/TrainingCenter/trainingCenter_view"
  ],
  function(VirtualDojo, DisciplineModels, ClassModel, TrainingView) {

    VirtualDojo.module("TrainingApp", function(TrainingApp, VirtualDojo, Backbone, Marionette, $, _){
      TrainingApp.Controller = {
            
        showTraining: function() {
          var trainingLayoutView = new TrainingView.TrainingLayout();

          // save the user's current progress in class
          require(["entities/progress"], function() {
            var fetchUserProgress = VirtualDojo.request("entities:users:progresses", {username: UTConfig.username});
            fetchUserProgress
              .done(function(data){ 
                var progresses = data;
                progresses.forEach(function(progress) {
                  if (progress.discipline.disciplineId === 1) {
                    UTConfig.currentKendoClass = progress.currentClassNum;
                  } else {
                    UTConfig.currentQigongClass = progress.currentClassNum;
                  }
                });
              });
          });
          
          require(["entities/training"], function() {
            var fetchDiscipline = VirtualDojo.request("entities:training:get");
            fetchDiscipline
              .done(function(data){
                var disciplines = data;
                if (disciplines) {
                  // instantiate disciplineCollection and models 
                  var disciplineCollection = new DisciplineModels.Disciplines();
                  disciplines.forEach(function(discipline) {
                    disciplineCollection.add(new DisciplineModels.Discipline(discipline));
                  });
                }
                
                var kendoModel = disciplineCollection.models[0];
                var qigongModel = disciplineCollection.models[1];

                trainingLayoutView.kendoRegion.show(new TrainingView.ClassList({
                  model: kendoModel,
                  collection: kendoModel.get("classes"),
                }));

                trainingLayoutView.qigongRegion.show(new TrainingView.ClassList({
                  model: qigongModel,
                  collection: qigongModel.get("classes"),
                }));

              });
          }); // end of require block

          VirtualDojo.regions.main.show(trainingLayoutView);
        }
      }
    });

    return VirtualDojo.TrainingApp.Controller;
  }
);

