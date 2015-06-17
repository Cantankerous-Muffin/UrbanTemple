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
          // invoke show function in dashboard controller
        	DashApp.Controller.showDash();
        }
      };
      // 
      VirtualDojo.on("show:dashboard", function(){
        VirtualDojo.navigate("dashboard");
        // invoke API middleware 
        API.showDash();
      });

      // sub-application automatically starts when main app starts
      DashApp.on("start", function(){
        // instantiate marionette router and assign its API controller middleware
        new DashApp.Router({
          controller: API
        });
      });
    })  
    return VirtualDojo.DashApp;
  }
);
