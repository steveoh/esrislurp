/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';

var version = '3.12';
var bumpFiles = [
  'package.json'
];
var files = [
  'Gruntfile.js',
  '*.js',
  'tasks/*.js',
  '<%= nodeunit.tests %>'
];

module.exports = function(grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: files,
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },
    clean: {
      tests: ['test/samplePackage']
    },
    nodeunit: {
      tests: ['test/*_test.js']
    },
    bump: {
      options: {
        files: bumpFiles,
        commitFiles: bumpFiles.concat('README.md'),
        push: false
      }
    },
    watch: {
      jshint: {
        files: files,
        tasks: ['test']
      },
      src: {
        files: files,
        options: {
          livereload: true
        }
      }
    },
    debug: {
      options: {
        open: true
      }
    }
  });

  grunt.registerTask('test', ['clean', 'jshint', 'nodeunit']);

  grunt.registerTask('default', ['test', 'watch']);

  grunt.registerTask('travis', ['jshint', 'nodeunit']);
};
