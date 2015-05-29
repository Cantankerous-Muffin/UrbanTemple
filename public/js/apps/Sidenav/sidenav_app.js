define([
    "app",
    "apps/Sidenav/sidenav_controller"
  ], 
  function(VirtualDojo, SidenavController) {

    VirtualDojo.module("SidenavApp", function(SidenavApp, VirtualDojo, Backbone, Marionette, $, _){
      SidenavApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "sidenav": "showSidenav"
        }
      })

    var API = {
      showSidenav: function() {
        SidenavController.showSidenav();
      }
    };

    SidenavApp.on("start", function(){
      new SidenavApp.Router({
        controller: API
      });
    });

  });


    return VirtualDojo.SidenavApp;
  }
);