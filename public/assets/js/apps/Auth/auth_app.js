VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
  AuthApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "login": "renderLoginPage",
      "signup": "renderSignUpPage",
    }
  });
 
	 var API = {
    renderLoginPage: function(){
    	AuthApp.Controller.renderLoginPage();
    },

    renderSignUpPage: function() {
	  	// console.log("hit url");
    	AuthApp.Controller.renderSignUpPage();
    }
  };


  // listen for login
  VirtualDojo.on("authenticate:login", function(){
		VirtualDojo.navigate("login");
		API.renderLoginPage();
		console.log('navigated to route: login');
  });

  // listen for signup 
  VirtualDojo.on("authenticate:signup", function(){
		VirtualDojo.navigate("signup");
		API.renderSignUpPage();
  });


  AuthApp.on("start", function(){
    new AuthApp.Router({
	    // controller: new AuthApp.Controller()
	    controller: API
    });
  });
});
