define([
    "app",
    "apps/TrainingCenter/trainingCenter_controller"
  ],
  function(VirtualDojo, TrainingController) {
    VirtualDojo.module("TrainingApp", function(TrainingApp, VirtualDojo, Backbone, Marionette, $, _){
      // Dashboard Router 

      TrainingApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "training": "showTraining",
        }
      });
     
    	 var API = {
        showTraining: function(){
        	TrainingApp.Controller.showTraining();
        }
      };
      
      VirtualDojo.on("show:training", function(){
        console.log('show:training listener executed');
        VirtualDojo.navigate("training");
        API.showTraining();
      });


      TrainingApp.on("start", function(){
        new TrainingApp.Router({
          controller: API
        });
      });
    })  
    return VirtualDojo.TrainingApp;
  }
);
