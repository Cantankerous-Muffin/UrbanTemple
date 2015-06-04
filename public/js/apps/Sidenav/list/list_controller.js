define([
    "app",
    "apps/Sidenav/list/list_view"
  ], 
  function(VirtualDojo, View){

      VirtualDojo.module("SidenavApp.List", function(List, VirtualDojo, Backbone, Marionette, $, _) {
        List.Controller = {
          listSidenav: function() {
            require(["entities/sidenav"], function(){
              var links = VirtualDojo.request('entities:sidenav:items');
              
              var menu = new View.Menu({collection: links});

              menu.on("brand:clicked", function(){
                //below triggers the main dashboard page to list and show.********NEED WORK ON
                VirtualDojo.trigger("somechannelHereToShowTheMainDashbboardPage")
                console.log('Trigger from list_controller.js - function to populate dashboard main page')
              });

              menu.on("childview:navigate", function(childView, model) {
                var trigger = model.get("navigationTrigger");

                // see entities/sidenav for triggers
                VirtualDojo.trigger(trigger);

              });

              VirtualDojo.regions.sidenav.show(menu)

            });
          },

          setActiveItem: function(itemUrl) {
            var links = VirtualDojo.request("entities:sidenav:items");
            var linkToSelect = links.find(function(item){ return item.get("url") === headerUrl; });
            linkToSelect.select();
            links.trigger("reset");
          }
        }
      });
    return VirtualDojo.SidenavApp.List.Controller;
  }
);
