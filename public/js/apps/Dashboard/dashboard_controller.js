define([
    "app",
    "entities/models/user_models",
    "entities/models/feedback_models",
    "apps/Dashboard/dashboard_view",
    "apps/Dashboard/profile/profile_view",
    "apps/Dashboard/progress/progress_view",
    "apps/Dashboard/feedbacks/user_feedback_view"
  ],
  function(VirtualDojo, UserModels, FeedbackModels, DashView) {

    VirtualDojo.module("DashApp", function(DashApp, VirtualDojo, Backbone, Marionette, $, _){
      DashApp.Controller = {
            
        showDash: function() {
          var dashLayoutView = new DashView.Layout();
          var profileLayoutView = new DashView.ProfileLayout();

          // ajax call to retrieve user data and instantiate user model
          require(["entities/users"], function() {
            var fetchUser = VirtualDojo.request("entities:users:get", {username: UTConfig.username});
            fetchUser
              .done(function(data){
                var user = new UserModels.User(data);
                profileLayoutView.rankRegion.show(new DashView.Profile({
                  model: user,
                  collection: user.get("ranks"),
                }));
              });
          }); // end of require block

          require(["entities/feedback"], function() {
            var fetchUser = VirtualDojo.request("entities:feedback:getAll", {username: UTConfig.username});
            fetchUser
              .done(function(data){
                var userFeeds = data;
                if (userFeeds) {
                  var feedbackCollection = new FeedbackModels.Feedbacks();
                  userFeeds.forEach(function(feedback) {
                    feedbackCollection.add(new FeedbackModels.Feedback(feedback));
                  });
                }
                profileLayoutView.feedbackRegion.show(new DashView.UserFeedbacks({
                  collection: feedbackCollection
                }));
              });
          }); // end of require block

          require(["entities/progress"], function() {
            var fetchUserProgress = VirtualDojo.request("entities:users:progresses", {username: UTConfig.username});
            fetchUserProgress
              .done(function(data){
                var progresses = data;
                if (progresses) {
                  // instantiate progress collection and models
                  var progressCollection = new UserModels.Progresses();
                  progresses.forEach(function(progress) {
                    progressCollection.add(new UserModels.Progress(progress));
                  });
                }
                dashLayoutView.progressRegion.show(new DashView.Progresses({
                  collection: progressCollection
                }));
              });
          }); // end of require block
          
          VirtualDojo.regions.main.show(dashLayoutView);
          dashLayoutView.profileRegion.show(profileLayoutView);
        }
      }
    });

    return VirtualDojo.DashApp.Controller;
  }
);

