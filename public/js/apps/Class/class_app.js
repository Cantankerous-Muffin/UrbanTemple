define([
    "app",
    "apps/Class/class_controller"
  ],
  function(VirtualDojo, ClassController) {
    VirtualDojo.module("ClassApp", function(ClassApp, VirtualDojo, Backbone, Marionette, $, _){
      // Dashboard Router 

      ClassApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "discipline/:disciplineId/class/:classNum": "showClass",
        }
      });

      ClassApp.generateClassUrl = function(disciplineId, classNum) {
        var url = "discipline/" + disciplineId + "/class/" + classNum;
        return url;
      }
     
    	var API = {
        showClass: function(disciplineId, classNum){
        	ClassApp.Controller.showClass(
            {
              disciplineId: disciplineId,
              classNum: classNum
            }
          );
        }
      };
      
      VirtualDojo.on("show:class", function(params){
        console.log('show:class listener executed!!');
        if (!params) return;
        VirtualDojo.navigate(ClassApp.generateClassUrl(params.disciplineId, params.classNum));
        API.showClass(params);
      });


      ClassApp.on("start", function(){
        new ClassApp.Router({
          controller: API
        });
      });


    })  
    return VirtualDojo.ClassApp;
  }
);
