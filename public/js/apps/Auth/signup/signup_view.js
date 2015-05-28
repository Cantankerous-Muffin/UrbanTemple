define([
    "app",
    "tpl!apps/Auth/signup/templates/signup_view.tpl"
  ],
  function(VirtualDojo, signupViewTpl) {
    VirtualDojo.module("AuthApp.Signup.View", function(SignupView, VirtualDojo, Backbone, Marionette, $, _){

      SignupView.view = Marionette.ItemView.extend({
        
        template: signupViewTpl, 

        ui: {
          inputUsername: "input#username",
          inputPassword: "input#password",
          signupButton: "button#signupButton",
          backButton: "button#backButton"
        },

        events: {
          "click @ui.backButton": "backToLogin",
          "click @ui.signupButton": "signup"
        },

        backToLogin: function(event) {
          event.preventDefault();
           VirtualDojo.trigger("auth:login:show");
        },

        signup: function(event) {
          event.preventDefault();
          var username = this.ui.inputUsername.val();
          if (!username) return;
          var password = this.ui.inputPassword.val();
          if (!password) return;

          var whenDone = this.whenDone;

          this.trigger('authenticate:signup', { 
            username: username, 
            password: password, 
            whenDone: whenDone
          }); 
        },

        whenDone: function() {
          console.log("[done] sign up");
        },
      });
    });
    
    return VirtualDojo.AuthApp.Signup.View
  }
);
