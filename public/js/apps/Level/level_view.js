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
          var extractFromUrl = VirtualDojo.getCurrentRoute().split("/");
          var requestData = {
            'disciplineId': extractFromUrl[1],
            'classNum': extractFromUrl[3],
            'levelNum': extractFromUrl[5]-1
          }
          VirtualDojo.trigger("show:video", requestData)
        },

        nextLevel: function(e) {
          e.preventDefault(e);
          console.log('next button clicked');
          var extractFromUrl = VirtualDojo.getCurrentRoute().split("/");
          var requestData = {
            'disciplineId': extractFromUrl[1],
            'classNum': extractFromUrl[3],
            'levelNum': extractFromUrl[5]+1
          }
          VirtualDojo.trigger("show:video", requestData)
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
        }

      });

    })
    return VirtualDojo.LevelApp.View;
  })