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
          var dashLayoutView = new DashView.Layout();

          dashLayoutView.on("show", function(){
            dashLayoutView.profileRegion.show(new DashView.Profile());
            dashLayoutView.classRegion.show(new DashView.MyClasses());
          });

          VirtualDojo.regions.main.show(dashLayoutView);
        }
      }
    });

    return VirtualDojo.DashApp.Controller;
  }
);

