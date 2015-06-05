define([
    "app",
    "tpl!apps/Dashboard/profile/templates/layout.tpl",
    "tpl!apps/Dashboard/profile/templates/profile_view.tpl",
    "tpl!apps/Dashboard/profile/templates/rank_view.tpl"
  ],
  function(VirtualDojo, profileLayoutTpl, profileViewTpl, rankViewTpl) {
    VirtualDojo.module("DashApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){
      
      View.ProfileLayout = Marionette.LayoutView.extend({
        template: profileLayoutTpl,

        regions: {
          rankRegion: "#rank-region",
          feedbackRegion: "#feedback-region"
        }
      });

      View.RankView = Marionette.ItemView.extend({
        className: "rank",
        template: rankViewTpl,
        initialize: function() {
        }
      });

      View.Profile = Marionette.CompositeView.extend({
        template: profileViewTpl,
        childView: View.RankView,
        childViewContainer: ".ranks-container",

        serializeData: function() {
          return {
            firstname: this.model.get("firstname"),
            lastname: this.model.get("lastname")
          } 
        }
      });
    });
    return VirtualDojo.DashApp.View;
  }
);



