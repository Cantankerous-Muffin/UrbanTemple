define([
    "app",
    "chroma",
    "entities/models/feedback_models",
    "apps/Dashboard/feedbacks/user_feedback_view",
    "tpl!apps/Dashboard/profile/templates/profile_layout.tpl",
    "tpl!apps/Dashboard/profile/templates/rank_view.tpl",
    "tpl!apps/Dashboard/profile/templates/ranks_view.tpl"
  ],
  function(VirtualDojo, chroma, FeedbackModels, UserFeedbackView, profileLayoutTpl, rankViewTpl, ranksViewTpl) {
    VirtualDojo.module("DashApp.Profile.View", function(View, VirtualDojo, Backbone, Marionette, $, _){
      
      View.RankView = Marionette.ItemView.extend({
        className: "rank ui card",
        template: rankViewTpl,
        // display user rank color based on user's rank number
        onShow: function() {
          var colorScale = chroma.scale(['lime', 'black']).mode('lab');
          var rankNum = this.model.get("rankNum");
          var rankColor = colorScale(rankNum/6).hex();
          this.$(".rank-color").css("background", rankColor);
        },
      });

      View.RanksView = Marionette.CompositeView.extend({
        className: "ranks-view",
        template: ranksViewTpl,
        childView: View.RankView,
        childViewContainer: ".ranks-container"
      });

      View.ProfileLayout = Marionette.LayoutView.extend({
        template: profileLayoutTpl,
        className: "profile-layout",
        regions: {
          rankRegion: "#rank-region",
          feedbackRegion: "#feedback-region"
        },
        // serialize uder model data
        serializeData: function() {
          return {
            firstname: this.model.get("firstname"),
            lastname: this.model.get("lastname")
          } 
        },
        onShow: function() {
          var that = this;
          var model = this.model;

          // instantiate profile view
          var profileView = new View.RanksView({
            model: model,
            collection: model.get("ranks"),
          });

          this.rankRegion.show(profileView);

          // fetch user feedbacks from ajax request 
          require(["entities/feedback"], function() {
            var fetchUser = VirtualDojo.request("entities:feedback:getAll", {username: UTConfig.username});
            fetchUser.done(function(data){
              var userFeeds = data;
              if (userFeeds) {
                // instantiate new feedbacks collection 
                var feedbackCollection = new FeedbackModels.Feedbacks();
                // add feedback to the feedbacks collection 
                userFeeds.forEach(function(feedback) {
                  feedbackCollection.add(new FeedbackModels.Feedback(feedback));
                });
              }
              // instantiate new user feedbacks collection view
              that.feedbackRegion.show(new UserFeedbackView.UserFeedbacks({
                collection: feedbackCollection
              }));
            });
          }); // end of require block
        }
      });

    });
    return VirtualDojo.DashApp.Profile.View;
  }
);



