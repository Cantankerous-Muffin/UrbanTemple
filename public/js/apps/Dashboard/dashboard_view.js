define([
    "app",
    "tpl!apps/Dashboard/templates/layout.tpl"
  ],
  function(VirtualDojo, layoutTpl) {
    VirtualDojo.module("DashApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){
    
    // Dashboard Layout View 

      View.Layout = Marionette.LayoutView.extend({
        template: layoutTpl,

        regions: {
          profileRegion: "#profile-region",
          feedbackRegion: "#feedback-region",
          progressRegion: "#progress-region"
        }
      });
    });
    return VirtualDojo.DashApp.View;
  }	
);