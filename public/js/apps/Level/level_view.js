define([
    "app",
    "tpl!apps/Level/video/templates/level_view.tpl"
  ], 
  function(VirtualDojo,LevelViewTpl){

    VirtualDojo.module("LevelApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){


      View.Video = Marionette.ItemView.extend({
        template: LevelViewTpl,

        events: {
          'click .submitvideo' : 'submitVideo',
          'click .prev' : 'prevLevel',
          'click .next' : 'nextLevel'
        },

        submitVideo: function(e) {
          e.preventDefault();
          console.log('submitVideo clicked');
          
        },

        prevLevel: function(e) {
          e.preventDefault();
          console.log('prev button clicked');
          if (this.model.get("prev")) {
            var requestData = {
              disciplineId: this.model.get("disciplineId"),
              classNum: this.model.get("classNum"),
              levelNum: this.model.get("levelNum") - 1
            }
            VirtualDojo.trigger("show:video", requestData);
          }
        },

        nextLevel: function(e) {
          e.preventDefault();
          console.log('next button clicked');
          if (this.model.get("next")) {
            var requestData = {
              disciplineId: this.model.get("disciplineId"),
              classNum: this.model.get("classNum"),
              levelNum: this.model.get("levelNum") + 1
            }
            console.log("rd", requestData)
            VirtualDojo.trigger("show:video", requestData);
          }
        },

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
        },

        initialize: function() {
          console.log("level model", this.model)
        }

      });

    })
    return VirtualDojo.LevelApp.View;
  })