define([
    "app",
    "entities/models/user_models",
    "apps/Dashboard/page/page_view"
  ],
  function(VirtualDojo, UserModels, PageView) {

    var showStudentDash = function(userModel) {
      var dashboardPageLayout = new PageView.Layout({
        model: userModel
      });
      VirtualDojo.regions.main.show(dashboardPageLayout);         
    }

    var showInstructorDash = function(userModel) {

      require(["entities/feedback"], function() {
        var fetchUser = VirtualDojo.request("entities:feedback:getAll", {username: UTConfig.username});
        fetchUser
          .done(function(data){
            var pendingFeeds = data;
            if (pendingFeeds) {
              var pendingCollection = new FeedbackModels.Feedbacks();
              pendingFeeds.forEach(function(feedback) {
                pendingCollection.add(new FeedbackModels.Feedback(feedback));
              });
            }
            VirtualDojo.regions.main.show(new DashView.InstructorDashboard({
              collection: pendingCollection
            }));
          });
      }); // end of require block
    }

    VirtualDojo.module("DashApp", function(DashApp, VirtualDojo, Backbone, Marionette, $, _){
      DashApp.Controller = {
            
        showDash: function() {
          require(["entities/users"], function() {
            var fetchUser = VirtualDojo.request("entities:users:get", {username: UTConfig.username});
            fetchUser
              .done(function(data){
                var userModel = new UserModels.User(data);
                UTConfig.isInstructor = userModel.get("isInstructor");
                if (!UTConfig.isInstructor) {
                  showStudentDash(userModel);
                } else {
                  showInstructorDash(userModel);
                }
              });
          }); // end of require block
        }
      }
    });

    return VirtualDojo.DashApp.Controller;
  }
);
