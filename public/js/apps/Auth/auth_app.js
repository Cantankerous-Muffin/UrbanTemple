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
          "signup": "showSignUpPage"
        }
      });
     
      var API = {
        showLoginPage: function(){
          AuthController.showLoginPage();
        },

        showSignUpPage: function() {
          AuthController.showSignUpPage();
        },

        login: function(data) {
          AuthController.authenticate(data.username, data.password, data.unauthorized);
        },

        signup: function(data) {
          AuthController.signup(data.username, data.password, data.whenDone)
        },

        logout: function() {
          AuthController.logout();
        }
      };

      VirtualDojo.on("authenticate:init", function(userdata){
        console.log("authenticate initializing");
        //Make empty ajax GET


        $.get('/checkauth')
        .success(function(data){
          //means cookie is respected, authorized
          console.log('Successful AJAX request to server.', data)
          if (data.isAuthed) {
            VirtualDojo.Utilities.enterApplication();
          } else {
            VirtualDojo.trigger("auth:login:show");
          }
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
      });

      VirtualDojo.on("auth:login:show", function(){
    		API.showLoginPage();
      });

      VirtualDojo.on("auth:signup:show", function(){
        API.showSignUpPage();
      });

      VirtualDojo.on("authenticate:login", function(data) {
        API.login(data);
      });

      VirtualDojo.on('authenticate:signup', function(data) {
        API.signup(data);
      });

      VirtualDojo.on("authenticate:logout", function(){
        API.logout();
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
