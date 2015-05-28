define([
    "app",
    "tpl!apps/Auth/login/templates/login_view.tpl"
  ],
  function(VirtualDojo, loginViewTpl) {
    VirtualDojo.module("AuthApp.Login.View", function(LoginView, VirtualDojo, Backbone, Marionette, $, _){

      LoginView.view = Marionette.ItemView.extend({
        
        template: loginViewTpl, 

        ui: {
          inputUsername: "input#username",
          inputPassword: "input#password",
          loginButton: "button#loginButton",
          signupButton: "button#signupButton"
        },

        events: {
          "click @ui.loginButton": "login",
          "click @ui.signupButton": "onSignupButtonClick"
        },

        login: function(event) {
          event.preventDefault();
          var username = this.ui.inputUsername.val();
          var password = this.ui.inputPassword.val();
          if (!username) return;
          if (!password) return;

          var authorized = this.onAuthorized;
          var unauthorized = this.onUnauthorized;
          this.trigger('authenticate:login', { 
            username: username, 
            password: password, 
            // authorized: authorized, 
            unauthorized: unauthorized 
          }); 
        },
        
        onSignupButtonClick: function(event) {
          event.preventDefault();
           VirtualDojo.trigger("authenticate:signup");
        },

        // onAuthorized: function() {
        //   console.log("autentication success!");
        //   // route user to /dashboard
        //   // window.location.replace('#')
        // },

        onUnauthorized: function() {
          console.log("autentication failed");
          // show error message 
          // route back to login
        }
      });
    });

    return VirtualDojo.AuthApp.Login.View;
  }
);



 