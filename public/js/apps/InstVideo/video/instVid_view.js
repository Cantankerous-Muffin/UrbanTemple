define([
    "app",
    "tpl!apps/InstVideo/video/templates/video_view.tpl"
  ],
  function(VirtualDojo, InstVidViewTpl) {
    VirtualDojo.module("InstVid.View", function(InstVidView, VirtualDojo, Backbone, Marionette, $, _){

      InstVidView.view = Marionette.ItemView.extend({
        
        template: InstVidViewTpl,
        serializeData: function() {
          return {
            test: "InstVideo"
          };
        }
      });
    });

    return VirtualDojo.InstVid.View;
  }
);



 