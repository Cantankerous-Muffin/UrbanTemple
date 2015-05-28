VirtualDojo.module("AuthApp.Signup", function(Signup, VirtualDojo, Backbone, Marionette, $, _){
  Signup.view = Marionette.ItemView.extend({
    
    template: "#auth-signup", 

    ui: {
      inputUsername: "input#username",
      inputPassword: "input#password",
      backButton: "button#backButton"
    },

    events: {
      "click @ui.backButton": "backToLogin"
    },

    backToLogin: function(event) {
      event.preventDefault();
       VirtualDojo.trigger("authenticate:login");
    },

    signup: function(event) {
      event.preventDefault();
      var username = this.ui.inputUsername.val();
      var password = this.ui.inputPassword.val();
      var authorized = this.onAuthorized;
      var unauthorized = this.onUnauthorized;
      this.trigger('authenticate:signup', { username, password, authorized, unauthorized })  
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



 