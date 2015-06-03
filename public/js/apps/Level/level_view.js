define([
    "app",
    "tpl!apps/Level/video/templates/level_view.tpl"
  ], 
  function(VirtualDojo,LevelViewTpl){

    VirtualDojo.module("LevelApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){

      View.Video = Marionette.ItemView.extend({
        template: LevelViewTpl,

        navigate: function(e){
          e.preventDefault();
          this.trigger("navigate", this.model)
        },

        serializeData: function() {
            //bind model properties to data object properties here
          return {
            //return data object here
            title: this.model.get("title"),
            videoUrl: this.model.get("videoUrl"),
            description: this.model.get("description"),
            next: this.model.get("next"),
            prev: this.model.get("prev")
          }
        }

      });

    })
    return VirtualDojo.LevelApp.View;
  })