// collection view
define([
    "app",
    "tpl!apps/Dashboard/classes/templates/class_view.tpl"
  ],
  function(VirtualDojo, classTpl) {
    VirtualDojo.module("DashApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){

      // single class item view
      View.Class = Marionette.ItemView.extend({
        template: classTpl,
        serializeData: function() {
          return {
            title: "Kendo101:Steps"
          };
        }
      });

      // my classes collection view
      View.MyClasses = Marionette.CollectionView.extend({
        tagName: "div",      
        className: "my-classes",
        childView: View.Class
      });
    });

    return VirtualDojo.DashApp.View;
  }
);



 