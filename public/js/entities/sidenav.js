define([
    "app",
    "backbone.picky"
  ],
    function(VirtualDojo){

      VirtualDojo.module("Entities", function(Entities, VirtualDojo, Backbone, Marionette, $, _){
        
        Entities.Sidenav = Backbone.Model.extend({
          initialize: function() {
            var selectable = new Backbone.Picky.Selectable(this);
            _.extend(this, selectable);
          }
        });
      
        Entities.SidenavCollection = Backbone.Collection.extend({
          model: Entities.Sidenav,

          initialize: function() {
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
          }
        });

        var initializeSidenavItems = function() {
          Entities.sidenavItems = new Entities.SidenavCollection([
              { name: "Home", url: "dashboard", navigationTrigger: "dashboard:list"},
              { name: "Training Center", url: "trainingvids", navigationTrigger: "trainingvids:list"},
              { name: "Logout", url: "logout", navigationTrigger: "authenticate:logout"}
            ]);
        };

        var API = {
          getItems: function() {
            if (Entities.sidenavItems === undefined) {
              initializeSidenavItems();
            }
            console.log(Entities.sidenavItems);
            return Entities.sidenavItems;
          }
        };

        VirtualDojo.reqres.setHandler("entities:sidenav:items", function(){
          return API.getItems();
        });
      });
      
      return ;
    });
