define([
  "app",
  "tpl!apps/Sidenav/sidenav/templates/sidenav_view.tpl"
],
  function(VirtualDojo, SidenavViewTpl) {
    VirtualDojo.module("Sidenav.View", function(SidenavView, VirtualDojo, Backbone, Marionete, $, _){

      SidenavView.view = Marionette.ItemView.extend({

        template: SidenavViewTpl,
        serializeData: function() {
          return {
            sidenav: "SIDENAV!"
          };
        }
      });
    });
    return VirtualDojo.Sidenav.View;
  }
);