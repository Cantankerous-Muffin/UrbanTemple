define([
    "app",
    "apps/Sidenav/sidenav/sidenav_view"
  ],
    function(VirtualDojo, SidenavView) {

      VirtualDojo.module("SidenavApp", function(SidenavApp, VirtualDojo, Backbone, Marionette, $, _){
        SidenavApp.Controller = {

          showSidenav: function() {
            VirtualDojo.regions.sidenav.show(new SidenavView.view());
          }
        }
      });

      return VirtualDojo.SidenavApp.Controller;
    }
  );