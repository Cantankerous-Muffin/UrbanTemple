VirtualDojo.module("AuthApp.Login", function(Login, VirtualDojo, Backbone, Marionette, $, _){
  Login.page = Marionette.ItemView.extend({
    template: "#auth-login" 
  });
});


