// collection view
define([
    "app",
    "chroma",
    "tpl!apps/Dashboard/progress/templates/progress_view.tpl"
  ],
  function(VirtualDojo, chroma, progressViewTpl) {
    VirtualDojo.module("DashApp.Progress.View", function(View, VirtualDojo, Backbone, Marionette, $, _){

      // single class item view
      View.Progress = Marionette.ItemView.extend({
        template: progressViewTpl,
        events: {
          "click div": "clickVideo"
        },

        clickVideo: function(e){
          e.preventDefault();
          var model = this.model;
          var disciplineId = model.get('id');
          var classNum = model.get('currentClassNum');
          var levelNum = model.get('levelNum');


          VirtualDojo.trigger("show:video", {
            'disciplineId': disciplineId,
            'classNum': classNum,
            'levelNum': levelNum
          })
        },
        serializeData: function() {
          var model = this.model;

          console.log(";;;;;;;;", this.model);
          // discipline
          
          // var currentClassNum = model.get("currentClassNum");
          // var currentRank = model.get("levelNum");
          // var percentage = (currentClassNum * 5 + currentRank) / 30 * 100;

          // model.set("percentage", percentage);
          
          var discipline = model.get("discipline");
          var disciplineTitle = model.get("title");
          var percentage = model.get("percentage");
          // class
          var currentLevelTitle = model.get("currentLevelTitle");
          
          // calculate the percentage 

          // var percentage = model.get("percentage");
          
          return {
            disciplineTitle: disciplineTitle,
            currentLevelTitle: currentLevelTitle,
            percentage: percentage
          };
        },

        initialize: function() {
          var model = this.model;
          var currentClassNum = model.get("currentClassNum");
          var currentRank = model.get("levelNum");
          var percentage = (currentClassNum * 5 + currentRank) / 30 * 100;
          model.set("percentage", percentage);
        },
        // update user progress bar based on percentage data 
        onShow: function() {
          var $progressBar = this.$(".progress-bar");
          var percentage = this.model.get("percentage")
          $progressBar.css("width", percentage + "%");

          var colorScale = chroma.scale(['lime', 'black']).mode('lab');
          var progressColor = colorScale(percentage/100).hex();
          $progressBar.css("background", progressColor);
        }
      });

      // my classes collection view
      View.Progresses = Marionette.CollectionView.extend({
        className: "progresses-container",
        childView: View.Progress
      });
    });

    return VirtualDojo.DashApp.Progress.View;
  }
);



 