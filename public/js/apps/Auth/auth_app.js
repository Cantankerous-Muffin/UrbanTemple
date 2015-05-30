define([
    "app",
    "apps/Auth/auth_controller",
    "apps/utilities/utilities"
  ],
  function(VirtualDojo, AuthController, Utilities) {
    VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
      AuthApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "login": "showLoginPage",
          "signup": "showSignUpPage",
        }
      });
     
    	 var API = {
        showLoginPage: function(){
        	AuthController.showLoginPage();
        },

        showSignUpPage: function() {
        	AuthController.showSignUpPage();
        }
      };

      VirtualDojo.on("authenticate:init", function(){
        
        console.log("authenticate initializing");
        console.log("AuthCheck: on authenticate init", VirtualDojo.authed);
        
        // API CALL: check with server (with cookie), see if session is already auth-ed
        if (VirtualDojo.authed === true) {
          // if auth-ed then start real app (start backbone.history(in callback))
          VirtualDojo.Utilities.entryCallback();
        } else {
          // redirect to login
          VirtualDojo.trigger("auth:login:show"); 
        }

      });

      // listen for login
      VirtualDojo.on("auth:login:show", function(){
    		// VirtualDojo.navigate("login");
    		API.showLoginPage();
      });

      // listen for signup 
      VirtualDojo.on("authenticate:signup", function(){
    		// VirtualDojo.navigate("signup");
    		API.showSignUpPage();
      });


      AuthApp.on("start", function(){
        new AuthApp.Router({
    	    controller: API
        });
      });
    });

    return VirtualDojo.AuthApp;
  }
);
