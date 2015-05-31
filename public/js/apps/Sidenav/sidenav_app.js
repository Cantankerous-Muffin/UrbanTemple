define([
    "app",
    "apps/Sidenav/list/list_controller"
  ], 
  function(VirtualDojo, SidenavController) {

    VirtualDojo.module("SidenavApp", function(SidenavApp, VirtualDojo, Backbone, Marionette, $, _){
      var API = {
        listSidenav: function() {
          SidenavController.listSidenav();
        }
      };

      VirtualDojo.on("show:sidenav", function(){
        console.log('show:sidenav listener executed')
        API.listSidenav();
        });
      });
      return VirtualDojo.SidenavApp;
});


