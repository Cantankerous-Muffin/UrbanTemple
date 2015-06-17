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
            disciplineID: this.model.get("discipline_id"), 
            username: UTConfig.username,
            classNum: this.model.get("classNum"),
            videoUrl: this.ui.urlInput.val()
          }

          // console.log(requestData);
          
          VirtualDojo.trigger('entities:feedback:post', requestData); 
        },

        prevLevel: function(e) {
          e.preventDefault();
          if (this.model.get("levelNum") !== 1) {
            var requestData = {
              disciplineId: this.model.get("discipline_id"),
              classNum: this.model.get("classNum"),
              levelNum: this.model.get("levelNum") - 1
            }
            VirtualDojo.trigger("show:video", requestData);
          }
        },

        nextLevel: function(e) {
          e.preventDefault();
          if (this.model.get("levelNum") !== 5) {
            var requestData = {
              disciplineId: this.model.get("discipline_id"),
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
          var prev, next;
          
          if (this.model.get("levelNum") === 1 ) {
            prev = false;
          } else {
            prev = true;
          }

          if (this.model.get("levelNum") === 5 ) {
            next = false;
          } else {
            next = true;
          }

          return {
            //return data object here
            title: this.model.get("title"),
            videoUrl: this.model.get("videoURL"),
            description: this.model.get("description"),
            next: next,
            prev: prev
          }
        },

        initialize: function() {
        }

      });

    })
    return VirtualDojo.LevelApp.View;
  })