define([
    "app",
    "apps/Haha/haha/haha_view"
  ],
  function(VirtualDojo, HahaView) {

    VirtualDojo.module("HahaApp", function(HahaApp, VirtualDojo, Backbone, Marionette, $, _){
      HahaApp.Controller = {
            
        showHaha: function(){
          VirtualDojo.regions.main.show(new HahaView.view());
        }
      }
    });

    return VirtualDojo.HahaApp.Controller;
  }
);