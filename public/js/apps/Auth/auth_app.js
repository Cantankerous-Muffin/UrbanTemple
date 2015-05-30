define([
    "app",
    "apps/Auth/auth_controller",
    "utilities/utilities"
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
        
        //Make empty ajax GET

        $.get('/checkauth')
        .success(function(data){
          //means cookie is respected, authorized
          console.log('Successful AJAX request to server.', data)
          if (data.isAuthed) {
            VirtualDojo.Utilities.entryCallback();
          } else {
            VirtualDojo.trigger("auth:login:show");
          }//start history
        })
        .fail(function(xhr){
          console.log(xhr)
          if(xhr.status === 404){
            //means unauthorized
            //redirect
            console.log('AJAX request to server failed: 404',xhr);
            // VirtualDojo.trigger("auth:login:show");//route to login 
          }

        })

        // API CALL: check with server (with cookie), see if session is already auth-ed
        // if (    ) {
        //   // if auth-ed then start real app (start backbone.history(in callback))
        //   VirtualDojo.Utilities.entryCallback();
        // } else {
        //   // redirect to login
        //   VirtualDojo.trigger("auth:login:show"); 
        // }
      });

      // listen for login
      VirtualDojo.on("auth:login:show", function(){
    		API.showLoginPage();
      });
      // listen for signup 
      VirtualDojo.on("authenticate:signup", function(){
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
