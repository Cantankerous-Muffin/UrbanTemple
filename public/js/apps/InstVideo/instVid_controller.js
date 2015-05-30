define([
    "app",
    "apps/instVid/video/instVid_view.js"
  ],
  function(VirtualDojo, InstVidView) {

    VirtualDojo.module("InstVid", function(InstVid, VirtualDojo, Backbone, Marionette, $, _){
      InstVid.Controller = {
            
        showInstVid: function(){
          VirtualDojo.regions.main.show(new InstVidView.view());
        }
      };
    });

    return VirtualDojo.InstVid.Controller;
  }
);


