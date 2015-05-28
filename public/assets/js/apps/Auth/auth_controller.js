VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
  AuthApp.Controller = {
    
    renderLoginPage: function(){
      AuthApp.LoginView = new AuthApp.Login.view();
      VirtualDojo.regions.main.show(AuthApp.LoginView);
      AuthApp.listenTo(AuthApp.LoginView, 'authenticate:login', function(data) {
        AuthApp.Controller.authenticate(data.username, data.password, data.authorized, data.unauthorized)
      });
    },

    renderSignUpPage: function() {
      AuthApp.SignupView = new AuthApp.Signup.view();
      VirtualDojo.regions.main.show(AuthApp.SignupView);
      // this.listenTo(AuthApp.SignupView, 'authenticate', function(data) {
      //   console.log(data);
      // });
    },

    initialize: function() {
    },

    authenticate: function (username, password, authorized, unauthorized ) {
      console.log("happen?");
      console.log(username, password, authorized, unauthorized);

  //   url = '/api/login'
  //   console.log('Loggin in... ')
  //   formValues = {
  //     username: username,
  //     password: password
  //   }
  //   $.ajax {
  //     url:url,
  //     type:'POST',
  //     dataType:"json",
  //     data: formValues,
  //     success: (ok) ->
  //       if ok
  //         authorized()
  //       else
  //         unauthorized()
    }
  }
});