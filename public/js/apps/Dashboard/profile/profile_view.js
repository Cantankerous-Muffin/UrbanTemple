define([
    "app",
    "tpl!apps/Dashboard/profile/templates/profile_view.tpl"
  ],
  function(VirtualDojo, profileView) {
    VirtualDojo.module("DashApp.ProfileView", function(ProfileView, VirtualDojo, Backbone, Marionette, $, _){

      ProfileView.view = Marionette.ItemView.extend({
        
        template: profileView,
        serializeData: function() {
          return {
            yay: "YAY"
          };
        }
      });
    });

    return VirtualDojo.DashApp.ProfileView;
  }
);



 