define([
    "app",
    "apps/Auth/login/login_view",
    "apps/Auth/signup/signup_view"
  ],
  function(VirtualDojo, LoginView, SignupView) {

    VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
      AuthApp.Controller = {
            
        showLoginPage: function(options){
          // options = {
          //   entryCallback: function()
          // }

          var loginView = new LoginView.view();
          VirtualDojo.regions.main.show(loginView);

          AuthApp.listenTo(loginView, 'authenticate:login', function(data) {
            AuthApp.Controller.authenticate(data.username, data.password, options.entryCallback, data.unauthorized);
          });
        },

        showSignUpPage: function() {
          var signupView = new SignupView.view();
          VirtualDojo.regions.main.show(signupView);
          AuthApp.listenTo(signupView, 'authenticate:signup', function(data) {
            AuthApp.Controller.signup(data.username, data.password)
          });
        },

        initialize: function() {
        },

        authenticate: function (username, password, authorized, unauthorized ) {
          console.log(username, password, authorized, unauthorized);
          var ajaxData = {
            username: username,
            password: password
          }

          var request = $.ajax({
            url: "/auth/login",
            type: "POST",
            // contentType: "application/json",
            data: ajaxData
          });

          request.done(function(data) {
            console.log("[AJAX] login data", data);
            authorized();
          });

          request.fail(function(req, textStatus, err) {
            console.log("[AJAX] login failed", textStatus, err);
            unauthorized();
          });
        },

        signup: function(username, password) {
        var ajaxData = {
            username: username,
            password: password
          }

          var request = $.ajax({
            url: "/auth/signup",
            type: "POST",
            // contentType: "application/json",
            data: ajaxData
          });

          request.done(function(data) {
            console.log("[AJAX] signup done data", data);
            authorized();
          });

          request.fail(function(req, textStatus, err) {
            console.log("[AJAX] signup failed", textStatus, err);
            unauthorized();
          });
        }
      }
    });

    return VirtualDojo.AuthApp.Controller;
  }
);