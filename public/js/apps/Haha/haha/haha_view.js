define([
    "app",
    "tpl!apps/Haha/haha/templates/haha_view.tpl"
  ],
  function(VirtualDojo, hahaViewTpl) {
    VirtualDojo.module("HahaApp.View", function(HahaView, VirtualDojo, Backbone, Marionette, $, _){

      HahaView.view = Marionette.ItemView.extend({
        
        template: hahaViewTpl,
        serializeData: function() {
          return {
            yay: "YAY"
          };
        }
      });
    });

    return VirtualDojo.HahaApp.View;
  }
);



 