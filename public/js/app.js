define([
    "marionette"
  ],
  function(Marionette) {
    
    //Create new Marionette App
    var VirtualDojo = new Marionette.Application();

    //Helper function to navigate to specified route
    VirtualDojo.navigate = function(route,  options){
      options || (options = {});
      Backbone.history.navigate(route, options);
    };

    //Helper function to get current route
    VirtualDojo.getCurrentRoute = function(){
      return Backbone.history.fragment
    };

    // fake auth check
    VirtualDojo.authed = false; 

    //Define regions before app starts
    VirtualDojo.on("before:start", function(){
      var RegionContainer = Marionette.LayoutView.extend({
        el: "#app-container",

        regions: {
          sidenav: "#sidenav-region",
          main: "#main-region",
        }
      });

      VirtualDojo.regions = new RegionContainer();

    });

    VirtualDojo.on("start", function(){
      var that = this;

      VirtualDojo.trigger("authenticate:init", function() {
        console.log("AuthCheck: In entry callback", VirtualDojo.authed)
        // initialize history on start of the app 
        if(Backbone.history){
          Backbone.history.start(); 
          console.log("history started");
    
          if(that.getCurrentRoute() === ""){
            console.log("go to dashboard")
            VirtualDojo.trigger("show:haha");
          }
        }
      });
    });

    return VirtualDojo;
  }
);