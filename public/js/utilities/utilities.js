define([
    "app"
  ],

  function(VirtualDojo) {
    VirtualDojo.module("Utilities", function(Utilities, VirtualDojo, Backbone, Marionette, $, _){
      Utilities.enterApplication = function() {
        console.log("AuthCheck: In entry callback", VirtualDojo.authed)
        // initialize history on start of the app 
        if(Backbone.history){
          Backbone.history.start(); 
          console.log("history started");
          VirtualDojo.trigger("show:sidenav", {test: 'test'});
    
          if(VirtualDojo.getCurrentRoute() === ""){
            console.log("navigating to dashboard")
            VirtualDojo.trigger("show:dashboard");
          }
        }
	    }
    });	
    return VirtualDojo.Utilities;
  }
);
