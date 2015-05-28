VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
  AuthApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "login": "renderLoginPage",
      "signup": "renderSignUpPage"
    }
  });
 
  // listen for login
  VirtualDojo.on("authenticate:login", function(){
		VirtualDojo.navigate("login");
		console.log('navigated to route: login');
  });

  // listen for signup 
  VirtualDojo.on("authenticate:signup", function(){
		VirtualDojo.navigate("signup");
  });


  AuthApp.on("start", function(){
    new AuthApp.Router({
	    controller: new AuthApp.Controller()
    });
  });
});
