define([
    "app",
    "entities/models/user_models",
    "apps/Dashboard/profile/profile_view",
    "apps/Dashboard/progress/progress_view",
    "tpl!apps/Dashboard/page/templates/layout.tpl",
  ],
  function(VirtualDojo, UserModels, ProfileView, ProgressView, layoutTpl) {
    VirtualDojo.module("DashApp.Page.View", function(View, VirtualDojo, Backbone, Marionette, $, _){
    
      // Dashboard Layout View 
      View.Layout = Marionette.LayoutView.extend({
        className: "dashboard-layout",
        template: layoutTpl,
        regions: {
          profileRegion: "#profile-region",
          progressRegion: "#progress-region"
        },
        onShow: function() {
          var that = this;

          var profileLayout = new ProfileView.ProfileLayout({
            model: this.model
          });
          this.profileRegion.show(profileLayout);


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