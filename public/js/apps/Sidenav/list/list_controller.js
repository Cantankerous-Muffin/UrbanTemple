define([
    "app",
    "apps/Sidenav/list/list_view"
  ], 
  function(VirtualDojo, View){

      VirtualDojo.module("SidenavApp.List", function(List, VirtualDojo, Backbone, Marionette, $, _) {
        List.Controller = {
          listSidenav: function() {
            require(["entities/sidenav"], function(){
              var links = VirtualDojo.request('sidenav:entities');
              var buttons = new View.Buttons({collection: links});

              buttons.on("brand:clicked", function(){
                //below triggers the main dashboard page to list and show.********NEED WORK ON
                VirtualDojo.trigger("somechannelHereToShowTheMainDashbboardPage")
                console.log('Trigger from list_controller.js - function to populate dashboard main page')
              });

              buttons.on("childview:navigate", function(childView, model) {
                var trigger = model.get("navigationTrigger");
                //will trigger: "dashboard:list", "trainingvids:list" or "logout"
                VirtualDojo.trigger(trigger);

              })

              VirtualDojo.regions.sidenav.show(buttons)

            });
          },

          setActiveButton: function(buttonUrl) {
            var links = VirtualDojo.request("button:entities");
            var buttonToSelect = links.find(function(button){ return button.get("url") === headerUrl; });
            buttonToSelect.select();
            links.trigger("reset");
          }


        }
      })
    return VirtualDojo.SidenavApp.List.Controller;
  })