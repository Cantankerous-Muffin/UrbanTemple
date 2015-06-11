define([
    "app",
    "entities/models/user_models",
    "entities/models/feedback_models",
    "apps/Dashboard/Instructor/instructor_view",
    "apps/Dashboard/page/page_view"
  ],
  function(VirtualDojo, UserModels, FeedbackModels, InstructorView, PageView) {
    // instantiate new marionettee layout view and show it on main region of the app
    var showStudentDash = function(userModel) {
      var dashboardPageLayout = new PageView.Layout({
        model: userModel
      });
      VirtualDojo.regions.main.show(dashboardPageLayout);         
    }

    var showInstructorDash = function(userModel) {
      // fetch student pending feedback data from ajax request 
      require(["entities/feedback"], function() {
        var fetchPendingFeedbacks = VirtualDojo.request("entities:feedback:getAll", {username: UTConfig.username});
        fetchPendingFeedbacks
          // instantiate new feedbacks collection and show it on main region. 
          .done(function(data){
            var pendingFeeds = data;
            if (pendingFeeds) {
              var pendingCollection = new FeedbackModels.Feedbacks();
              pendingFeeds.forEach(function(feedback) {
                pendingCollection.add(new FeedbackModels.Feedback(feedback));
              });
            }
            VirtualDojo.regions.main.show(new InstructorView.InstructorDashboard({
              collection: pendingCollection
            }));
          });
      }); // end of require block
    }

    VirtualDojo.module("DashApp", function(DashApp, VirtualDojo, Backbone, Marionette, $, _){
      DashApp.Controller = {
        // function that renders different dashboard views depending on user account type (student or instructor) 
        showDash: function() {
          // fetch user data from ajax request
          require(["entities/users"], function() {
            var fetchUser = VirtualDojo.request("entities:users:get", {username: UTConfig.username});
            fetchUser
              // instantitate the new user model based on the data returned from ajax request
              .done(function(data){
                var userModel = new UserModels.User(data);
                // save the user's account type to global object 
                UTConfig.isInstructor = userModel.get("isInstructor");
                if (!UTConfig.isInstructor) {
                  // if the user is student, invoke render function for student dashbaord passing in user model as parameter
                  showStudentDash(userModel);
                } else {
                  // if the user is instructor, invoke render function for instrutor dashboard passing in user model as parameter
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
