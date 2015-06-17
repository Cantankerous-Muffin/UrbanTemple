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
          loginButton: "#loginButton",
          signupButton: "#signupLink"
        },

        events: {
          "click @ui.loginButton": "onLoginButtonClick",
          "click @ui.signupButton": "onSignupButtonClick",
          "keydown .login-form-item": "onLoginItemKeyDown"
        },

        onLoginButtonClick: function(event) {
          event && event.preventDefault();
          var username = this.ui.inputUsername.val();
          var password = this.ui.inputPassword.val();
          if (!username) return;
          if (!password) return;
          var unauthorized = this.onUnauthorized;

          VirtualDojo.trigger('authenticate:login', {
            username: username, 
            password: password, 
            unauthorized: unauthorized 
          }); 
        },
        
        onSignupButtonClick: function(event) {
          event.preventDefault();
           VirtualDojo.trigger("auth:signup:show");
        },

        onLoginItemKeyDown: function(event) {
          var code = event.keyCode || event.which;
           if(code == 13) { 
             this.onLoginButtonClick();
           }
        },

        onUnauthorized: function() {
          console.log("autentication failed");
        }
      });
    });

    return VirtualDojo.AuthApp.Login.View;
  }
);



