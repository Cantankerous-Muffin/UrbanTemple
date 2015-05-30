define([
    "app",
    "apps/InstVideo/video/instVid_view"
  ],
  function(VirtualDojo, InstVidView) {

    VirtualDojo.module("InstVid", function(InstVid, VirtualDojo, Backbone, Marionette, $, _){
      InstVid.Controller = {
            
        showInstVid: function(){
          console.log('Showing InstVid!');
          VirtualDojo.regions.main.show(new InstVidView.view());
        }
      };
    });

    return VirtualDojo.InstVid.Controller;
  }
);


