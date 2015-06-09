define([
    "app"
  ],

  function(VirtualDojo) {
    VirtualDojo.module("Utilities", function(Utilities, VirtualDojo, Backbone, Marionette, $, _){
      
      Utilities.enterApplication = function() {   
        if (window.location.hash === "#logout") {
          window.location.replace("#dashboard");
        }

        // initialize history on start of the app 
        if(Backbone.history){
          Backbone.history.start(); 
          VirtualDojo.trigger("show:sidenav", {test: 'test'});
    
          if(VirtualDojo.getCurrentRoute() === ""){
            VirtualDojo.trigger("show:dashboard");
          }
        }
	    }
    });	
    return VirtualDojo.Utilities;
  }
);
