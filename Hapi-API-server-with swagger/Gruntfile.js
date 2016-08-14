module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jshint: {
      /* Linting Options */
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'models/*.js', 'controllers/*.js', 'routes/*.js', 'plugins/**/*.js'],
      client: ['public/js/**/*.js'],
      test: ['text/**/*.js']
    },

    nodemon: {
      server: {
        script: 'server.js'
      }
    },

    watch: {
      templates: {
        options: {
          livereload: true
        },
        files: 'public/templates/**/*.html',
        tasks:'exec:cmd'
      },
      js: {
        options: {
          livereload: true
        },
        files: 'public/js/**/*.js',
        tasks: 'exec:cmd'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['nodemon:server', 'watch', 'exec:cmd']
      }
    },

    exec: {
      cmd: 'rs' // Need to exit
    }

  });

  grunt.registerTask('hint', ['jshint:all', 'jshint:client']);

  grunt.registerTask('start', ['nodemon:server']);

  grunt.registerTask('serve', ['concurrent:dev']);

};