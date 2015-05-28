VirtualDojo.module("AuthApp.Login", function(Login, VirtualDojo, Backbone, Marionette, $, _){
  Login.view = Marionette.ItemView.extend({
    
    template: "#auth-login", 

    ui: {
      inputUsername: "input#username",
      inputPassword: "input#password",
      loginButton: "button#loginButton",
      signupButton: "button#signupButton"
    },

    events: {
      "click @ui.loginButton": "login",
      "click @ui.signupButton": "signup"
    },

    login: function(event) {
      event.preventDefault();
      var username = this.ui.inputUsername.val();
      var password = this.ui.inputPassword.val();
      var authorized = this.onAuthorized;
      var unauthorized = this.onUnauthorized;
      this.trigger('authenticate:login', { username, password, authorized, unauthorized })  
    },
    
    signup: function(event) {
       VirtualDojo.trigger("authenticate:signup");
    },

    onAuthorized: function() {
      console.log("autentication success!");
      // window.location.replace('#')
    },

    onUnauthorized: function() {
      console.log("autentication failed");
    }
  });
});



 