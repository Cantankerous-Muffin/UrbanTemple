define([
    "app",
    "apps/Haha/haha_controller"
  ],
  function(VirtualDojo, HahaController) {

    VirtualDojo.module("HahaApp", function(HahaApp, VirtualDojo, Backbone, Marionette, $, _){
      HahaApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "haha": "showHaha",
        }
      });
     
    	 var API = {
        showHaha: function(){
        	HahaController.showHaha();
        }
      };
      
      HahaApp.on("start", function(){
        new HahaApp.Router({
    	    controller: API
        });
      });
    });

    return VirtualDojo.HahaApp;
  }
);
