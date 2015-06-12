define([
    "app",
    "entities/models/user_models",
    "apps/Dashboard/profile/profile_view",
    "apps/Dashboard/progress/progress_view",
    "tpl!apps/Dashboard/page/templates/layout.tpl",
  ],
  function(VirtualDojo, UserModels, ProfileView, ProgressView, layoutTpl) {
    VirtualDojo.module("DashApp.Page.View", function(View, VirtualDojo, Backbone, Marionette, $, _){
    
      // Student dashboard Layout View 
      View.Layout = Marionette.LayoutView.extend({
        className: "dashboard-layout",
        template: layoutTpl,
        regions: {
          profileRegion: "#profile-region",
          progressRegion: "#progress-region"
        },
        // function invoked when the view is rendered 
        onShow: function() {
          var that = this;
          var profileLayout = new ProfileView.ProfileLayout({
            model: this.model
          });
          this.profileRegion.show(profileLayout);

          // fetch the user's progress data
          require(["entities/progress"], function() {
            var fetchUserProgress = VirtualDojo.request("entities:users:progresses", {username: UTConfig.username});
            fetchUserProgress
              // instantiate user progress and show it on progress region
              .done(function(data){ 
                console.log("yyyyyy", data);
                var progresses = data;
                if (progresses) {
                  var progressCollection = new UserModels.Progresses();
                  progresses.forEach(function(progress) {
                    progressCollection.add(new UserModels.Progress(progress));
                  });
                }
                that.progressRegion.show(new ProgressView.Progresses({
                  collection: progressCollection
                }));
              });
          }); // end of require block
        }
      });
    });


    return VirtualDojo.DashApp.Page.View;
  }	
);