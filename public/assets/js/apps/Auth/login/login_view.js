VirtualDojo.module("AuthApp.Login", function(Login, VirtualDojo, Backbone, Marionette, $, _){
  Login.page = Marionette.ItemView.extend({
    
    template: "#auth-login", 

    ui: {
      inputUsername: "input#username",
      inputPassword: "input#password",
      loginButton: "button#loginButton"
    },

    events: {
      "click @ui.loginButton": "login"
    },

    login: function(event) {
      event.preventDefault();
      var username = this.ui.inputEmail.val();
      var password = this.ui.inputPassword.val();
      var authorized = this.onAuthorized;
      var unauthorized = this.onUnauthorized;
      this.trigger('authenticate', { username, password, authorized, unauthorized })  
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



 