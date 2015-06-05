define([
    "app",
    "tpl!apps/Level/templates/level_view.tpl"
  ], 
  function(VirtualDojo,LevelViewTpl){

    VirtualDojo.module("LevelApp.View", function(View, VirtualDojo, Backbone, Marionette, $, _){


      View.Video = Marionette.ItemView.extend({
        template: LevelViewTpl,


        ui: {
          prevButton: ".prev",
          nextButton: ".next",
          submitVidBtn: ".submitvideBtn",
          urlInput: ".submitVideoUrl"
        },

        events: {
          'click @ui.prevButton' : 'prevLevel',
          'click @ui.nextButton' : 'nextLevel',
          'click @ui.submitVidBtn': 'submitVideo'
        },

        submitVideo: function(e) {
          e.preventDefault();
          var requestData = {
            username: UTConfig.username,
            classNum: this.model.get("classNum"),
            videoUrl: this.ui.urlInput.val()
          }

          // console.log(requestData);
          
          VirtualDojo.trigger('entities:feedback:post', requestData); 
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