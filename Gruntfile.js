module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

  // requirejs: {
  //   compile: {
  //     options: {
  //       baseUrl: "public/js",
  //       mainConfigFile: "public/js/main.js",
  //       uglify: false,
  //       include: [
  //         '../grunt/vendor.js',
  //         '../grunt/urbantemple.js'
  //       ],
  //       out: "public/grunt/gRequire.js"
  //     }
  //   }
  // },
  
  jsdoc: {
    dist: {
      src: [
        'routes/user.js',
        'utils/*.js',
      ],
      options: {
        destination: 'doc',
      }
    }
  },

  // concat:{
  //   options: {
  //     seperator: ';'
  //   },
  //   app: {
  //     src: [
  //       // 'public/js/vendor/require.js',
  //       'public/js/main.js',
  //       'public/js/app.js',
  //       //apps
  //       'public/js/apps/Auth/*.js',
  //       'public/js/apps/Auth/login/*.js',
  //       'public/js/apps/Auth/signup/*.js',
  //       'public/js/apps/Class/*.js',
  //       'public/js/apps/Dashboard/*.js',
  //       'public/js/apps/Dashboard/feedbacks/*.js',
  //       'public/js/apps/Dashboard/Instructor/*.js',
  //       'public/js/apps/Dashboard/page/*.js',
  //       'public/js/apps/Dashboard/profile/*.js',
  //       'public/js/apps/Dashboard/progress/*.js',
  //       'public/js/apps/Feedback/*.js',
  //       'public/js/apps/Level/*.js',
  //       'public/js/apps/Sidenav/*.js',
  //       'public/js/apps/Sidenav/list/*.js',
  //       'public/js/apps/TrainingCenter/*.js',
  //       // entities
  //       'public/js/entities/*.js',
  //       'public/js/entities/models/*.js',
  //       //utilities
  //       'public/js/utilities/*.js',
        
  //     ],
  //     dest: 'public/grunt/urbantemple.js',
  //     nonull: true
  //   },
  //   vendor:{
  //     src:[
  //       'public/js/vendor/require.js',
  //       'public/js/vendor/underscore.js',
  //       'public/js/vendor/jquery.js',
  //       'public/js/vendor/backbone.js',
  //       'public/js/vendor/backbone.marionette.js',
  //       'public/js/vendor/almond.js',
  //       'public/js/vendor/backbone.localstorage.js',
  //       'public/js/vendor/backbone.picky.js',
  //       'public/js/vendor/backbone.syphon.js',
  //       'public/js/vendor/chroma.js',
  //       'public/js/vendor/jquery-ui-1.10.3.js',
  //       'public/js/vendor/jquery-ui.js',
  //       'public/js/vendor/json2.js',
  //       'public/js/vendor/spin.jquery.js',
  //       'public/js/vendor/spin.js',
  //       'public/js/vendor/text.js',
  //       'public/js/vendor/underscore-tpl.js',
  //     ],
  //     dest: 'public/grunt/vendor.js'
  //   }
  // },

  // uglify:{
  //   options:{
  //     banner: '/*! urbantemple <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  //   },
  //   dist:{
  //     files:{
  //       'public/grunt/urbantemple.min.js': ['<%= concat.app.dest %>'],
  //       // 'public/grunt/vendor.min.js': ['<%= concat.vendor.dest %>'],
  //       flatten: true,
  //     }
  //   }
  // },

  jshint: {
      files: [
        // Add filespec list here
        'Gruntfile.js',
        'public/js/*.js',
        // apps
        'public/js/apps/Auth/*.js',
        'public/js/apps/Auth/login/*.js',
        'public/js/apps/Auth/signup/*.js',
        'public/js/apps/Class/*.js',
        'public/js/apps/Dashboard/*.js',
        'public/js/apps/Dashboard/feedbacks/*.js',
        'public/js/apps/Dashboard/Instructor/*.js',
        'public/js/apps/Dashboard/page/*.js',
        'public/js/apps/Dashboard/profile/*.js',
        'public/js/apps/Dashboard/progress/*.js',
        'public/js/apps/Feedback/*.js',
        'public/js/apps/Level/*.js',
        'public/js/apps/Sidenav/*.js',
        'public/js/apps/Sidenav/list/*.js',
        'public/js/apps/TrainingCenter/*.js',
        // entities
        'public/js/entities/*.js',
        'public/js/entities/models/*.js',
        //utilities
        'public/js/utilities/*.js',
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc'
      }
  },

  // cssmin: {
  //   options: {

  //   },
  //   target:{
  //     files: {
  //       'public/grunt/main.min.css': [
  //           '../app/bower_components/bootstrap/dist/css/bootstrap.min.css',
  //         ]
  //     }
  //   }
  // },

});

  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-jsdoc');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  grunt.registerTask('verify', ['jshint', 'jsdoc']);


  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'cssmin']);


};




