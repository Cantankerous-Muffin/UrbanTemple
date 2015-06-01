define([
    "app",
    "tpl!apps/Dashboard/profile/templates/profile_view.tpl"
  ],
  function(VirtualDojo, profileTpl) {
    VirtualDojo.module("DashApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){

      View.Profile = Marionette.ItemView.extend({
        template: profileTpl
      });
    });

    return VirtualDojo.DashApp.View;
  }
);



