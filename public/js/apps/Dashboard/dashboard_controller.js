define([
    "app",
    "entities/models/user_models",
    "apps/Dashboard/dashboard_view",
    "apps/Dashboard/profile/profile_view",
    "apps/Dashboard/classes/classes_view"
  ],
  function(VirtualDojo, UserModels, DashView) {

    VirtualDojo.module("DashApp", function(DashApp, VirtualDojo, Backbone, Marionette, $, _){
      DashApp.Controller = {
            
        showDash: function() {
          var dashLayoutView = new DashView.Layout();

          // ajax call to retrieve

          var user = null;
          require(["entities/users"], function() {
            var fetchUser = VirtualDojo.request("entities:users:get", {username: UTConfig.username});
            fetchUser
              .done(function(data){
                user = new UserModels.User(data);

                dashLayoutView.profileRegion.show(new DashView.Profile({
                  model: user
                }));
              });
          }); // end of require block

          /*
          require(["entities/users"], function() {
            var fetchUser = VirtualDojo.request("entities:users:progresses", {username: UTConfig.username});
            fetchUser
              .done(function(data){
                var progresses = data;
                if (progresses) {
                  var progressCollection = new UserModels.Progresses();
                  progresses.forEach(function(progress) {
                    progessCollection.add(new UserModels.Progress(progress));
                  });
                }

                dashLayoutView.classRegion.show(new DashView.MyClasses({
                  collection: progressCollection
                }));
              });
          }); // end of require block
          */

          VirtualDojo.regions.main.show(dashLayoutView);
        }
      }
    });

    return VirtualDojo.DashApp.Controller;
  }
);

