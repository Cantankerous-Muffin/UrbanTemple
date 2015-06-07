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
          var disciplineId = model.get('discipline').attributes.disciplineId;
          var classNum = model.get('currentClassNum');
          var levelNum = model.get('currentLevelNum');


          VirtualDojo.trigger("show:video", {
            'disciplineId': disciplineId,
            'classNum': classNum,
            'levelNum': levelNum
          })
        },
        serializeData: function() {
          var model = this.model;
          // discipline
          var discipline = model.get("discipline");
          var disciplineTitle = discipline.get("title");

          // class
          var currentLevelTitle = model.get("currentLevelTitle");
          var percentage = model.get("percentage");
          
          return {
            disciplineTitle: disciplineTitle,
            currentLevelTitle: currentLevelTitle,
            percentage: percentage
          };
        },
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



 