VirtualDojo.module("AuthApp.Login", function(Login, VirtualDojo, Backbone, Marionette, $, _){
  Login.Controller = {
    showLogin: function(){
      var view = new Login.page();
      VirtualDojo.regions.main.show(view);
    }
  };
});