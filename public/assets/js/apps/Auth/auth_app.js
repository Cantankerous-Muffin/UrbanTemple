VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
  AuthApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "login": "renderLoginPage",
    }
  });
 
  VirtualDojo.on("authenticate:login", function(){
		this.controller.renderLoginPage();
		VirtualDojo.navigate("login");
  });

  AuthApp.on("start", function(){
    new AuthApp.Router({
	    controller: new AuthApp.Controller({})
    });
  });
});
