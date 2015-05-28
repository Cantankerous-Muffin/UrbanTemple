define([
    "app",
    "apps/Auth/auth_controller"
  ],
  function(VirtualDojo, AuthController) {

    VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
      AuthApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
          "login": "showLoginPage",
          "signup": "showSignUpPage",
        }
      });
     
    	 var API = {
        showLoginPage: function(options){
        	AuthController.showLoginPage(options);
        },

        showSignUpPage: function() {
        	AuthController.showSignUpPage();
        }
      };

      VirtualDojo.on("authenticate:init", function(entryCallback){
    		// console.log("entryCallback", entryCallback);
        // API CALL: check with server (with cookie), see if session is already auth-ed
        // if auth-ed then start real app (start backbone.history(in callback))
            // entryCallback();
    		// else
    		    VirtualDojo.trigger("auth:login:show", entryCallback);
      });

      // listen for login
      VirtualDojo.on("auth:login:show", function(entryCallback){
    		// VirtualDojo.navigate("login");
    		API.showLoginPage({entryCallback: entryCallback});
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
