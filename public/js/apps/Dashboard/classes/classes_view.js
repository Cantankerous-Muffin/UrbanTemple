// collection view
define([
    "app",
    "tpl!apps/Dashboard/classes/templates/classes_view.tpl"
  ],
  function(VirtualDojo, classesTpl) {
    VirtualDojo.module("DashApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){

      View.Classes = Marionette.CompositeView.extend({

        template: classesTpl,
        serializeData: function() {
          return {
            yay: "Classes!!"
          };
        }
      });
    });

    return VirtualDojo.DashApp.View;
  }
);



 