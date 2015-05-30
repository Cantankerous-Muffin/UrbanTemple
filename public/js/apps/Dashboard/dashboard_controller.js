define([
    "app",
    "apps/Dashboard/dashboard_view",
    "apps/Dashboard/profile/profile_view",
    "apps/Dashboard/classes/classes_view"
  ],
  function(VirtualDojo, DashView, ProView, ClaView) {
    
    console.log("Dashview", DashView);
    // console.log("layout", DashView.Layout);
    console.log("profile", ProView);
    console.log("classes", ClaView);

    VirtualDojo.module("DashApp", function(DashApp, VirtualDojo, Backbone, Marionette, $, _){
      DashApp.Controller = {
            
        showDash: function() {
          var foo = new DashView.Layout();

          foo.on("show", function(){
            foo.profileRegion.show(new DashView.Profile());
            foo.classRegion.show(new DashView.Classes());
          });

          VirtualDojo.regions.main.show(foo);
        }
      }
    });

    return VirtualDojo.DashApp.Controller;
  }
);

