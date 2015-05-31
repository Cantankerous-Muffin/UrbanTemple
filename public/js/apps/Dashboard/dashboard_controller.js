define([
    "app",
    "apps/Dashboard/dashboard_view",
    "apps/Dashboard/profile/profile_view",
    "apps/Dashboard/classes/classes_view"
  ],
  function(VirtualDojo, DashView) {

    VirtualDojo.module("DashApp", function(DashApp, VirtualDojo, Backbone, Marionette, $, _){
      DashApp.Controller = {
            
        showDash: function() {
          var foo = new DashView.Layout();

          foo.on("show", function(){
            foo.profileRegion.show(new DashView.Profile());
            foo.classRegion.show(new DashView.MyClasses());
          });

          VirtualDojo.regions.main.show(foo);
        }
      }
    });

    return VirtualDojo.DashApp.Controller;
  }
);

