module.exports = function (grunt) {

  //for http server 
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    'fileList': {
      'all': [
        'index.html',
        'app/**/*',
        'data/**/*',
        'css/**/*',
      ]
    },

    express: {
      all: {
        options: {
          port: 9001,
          hostname: "0.0.0.0",
          bases: [__dirname], 
          livereload: true
        }
      }
    },

    // grunt-watch will monitor the projects files
    watch: {
      all: {
        files: ['<%= fileList.all %>'],
        options: {
          livereload: 1341,
          atBegin: true
        },
        tasks: []
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>',
        app: 'Firefox'
      }
    }

  });

  // Creates the `local server` task
  grunt.registerTask('local', [
    'express',
    'open',
    'watch'
  ]);

};
