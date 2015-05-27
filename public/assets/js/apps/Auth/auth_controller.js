VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
  AuthApp.Controller = Marionette.Controller.extend({
    renderLoginPage: function(){
      AuthApp.Login.Controller.showLogin();
    }

  // initialize: (options) ->
  //   @region = options.region
  //   @loginView = options.loginView
  //   @listenTo @loginView, 'authenticate', (data) =>
  //     @authenticate data.username, data.password, data.authorized, data.unauthorized
 
  // authenticate: (username, password, authorized, unauthorized ) ->
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
  //   }
 
  // login: ->
  //   view = new AuthenticationModule.LoginView()
  //   @region.show(view)
 
  // logout: ->
  //   $.get '/api/logout', =>
  //     view = new LogoutView()
  //     @region.show(view)

    })

});