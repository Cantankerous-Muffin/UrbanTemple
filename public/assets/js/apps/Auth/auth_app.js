VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
  AuthApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "login": "authenticate",
    }
  });

  var API = {
    authenticate: function(){
      AuthApp.Login.Controller.showLogin();
    },
  };
 
  VirtualDojo.on("authenticate:login", function(){
	API.authenticate();
	VirtualDojo.navigate("login");
  });

  AuthApp.on("start", function(){
    new AuthApp.Router({
      controller: API
    });
  });
});
