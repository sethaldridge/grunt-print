/*
 * grunt-print
 * https://github.com/saldridge/grunt-print
 *
 * Copyright (c) 2014 Seth Aldridge
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    print: {
      main: {
        options: {
          template: 'test/fixtures/print.html'
        },
        files: {
          'tmp/print.html': ['test/fixtures/print.css']
        }
      },
      test: {
        options: {
          template: 'test/fixtures/main.html'
        },
        files: {
          'tmp/main.html': ['test/fixtures/main.css']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'print', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
