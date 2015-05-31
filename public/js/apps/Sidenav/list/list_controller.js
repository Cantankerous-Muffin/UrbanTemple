define([
    "app",
    "apps/Sidenav/list/list_view.js"
  ], 
  function(VirtualDojo, View){

      VirtualDojo.module("SidenavApp.List", function(List, VirtualDojo, Backbone, Marionette, $, _) {
        List.Controller = {
          listSidenav: function() {
            require(["entities/sidenav"], function(){
              var links = VirtualDojo.request('sidenav:entities')
            })
          }
        }
      })

  })