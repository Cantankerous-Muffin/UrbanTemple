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

    })

    VirtualDojo.on("start", function(){
      var that = this;

      VirtualDojo.trigger("authenticate:init", function() {
        // initialize history on start of the app 
        if(Backbone.history){
          Backbone.history.start(); 
          console.log("history started");
        
          if(that.getCurrentRoute() === ""){
            // VirtualDojo.trigger("show:dashboard");
          }
        }
      });
    });

    return VirtualDojo;
  }
);