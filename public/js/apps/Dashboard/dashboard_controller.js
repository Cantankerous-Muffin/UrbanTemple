define([
    "app",
    "apps/Dashboard/profile/profile_view"
  ],
  function(VirtualDojo, ProfileView) {

    VirtualDojo.module("DashApp", function(DashApp, VirtualDojo, Backbone, Marionette, $, _){
      DashApp.Controller = {
            
        showDash: function() {
          VirtualDojo.regions.main.show(new ProfileView.view());
        }
      }
    });

    return VirtualDojo.DashApp.Controller;
  }
);

