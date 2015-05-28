VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
  AuthApp.Controller = Marionette.Controller.extend({
    
    renderLoginPage: function(){
      console.log('renderLoginPage executed in auth_controller.js')
      AuthApp.LoginView = new AuthApp.Login.view();
      console.log('instantiate new AuthApp.Login.view')
      VirtualDojo.regions.main.show(AuthApp.LoginView);
      console.log('Show onto main region')
      this.listenTo(AuthApp.LoginView, 'authenticate', function(data) {
        console.log(data);
      console.log('listenTo handler connected')
      });
    },

    renderSignUpPage: function() {
      AuthApp.SignupView = new AuthApp.Signup.view();
      VirtualDojo.regions.main.show(AuthApp.SignupView);
      // this.listenTo(AuthApp.LoginView, 'authenticate', function(data) {
      //   console.log(data);
      // });
    },

    initialize: function() {
    },

  // (options) ->
  //   @region = options.region
  //   @loginView = options.loginView
  //     @authenticate data.username, data.password, data.authorized, data.unauthorized
   
    authenticate: function (username, password, authorized, unauthorized ) {
      // console.log(username, password, authorized, unauthorized)

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
 
  // login: ->
  //   view = new AuthenticationModule.LoginView()
  //   @region.show(view)
 
  // logout: ->
  //   $.get '/api/logout', =>
  //     view = new LogoutView()
  //     @region.show(view)

    })

});