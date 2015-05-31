define([
    "app",
    "apps/Dashboard/dashboard_controller"
  ],
  function(VirtualDojo, DashController) {
    VirtualDojo.module("DashApp", function(DashApp, VirtualDojo, Backbone, Marionette, $, _){
      // Dashboard Router 

      DashApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "dashboard": "showDash",
        }
      });
     
    	 var API = {
        showDash: function(){
        	DashApp.Controller.showDash();
        }
      };
      
      VirtualDojo.on("show:dashboard", function(){
        console.log('show:dashboard listener executed')
        VirtualDojo.navigate("dashboard");
        API.showDash();
      });


      DashApp.on("start", function(){
        new DashApp.Router({
          controller: API
        });
      });
    })  
    return VirtualDojo.DashApp;
  }
);
