/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';

var version = '3.11';
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
        commitFiles: bumpFiles,
        push: false
      }
    },
    esri_slurp_modules: {
      options: {
        version: version
      }
    },
    watch: {
      jshint: {
        files: files,
        tasks: ['newer:jshint:main', 'jasmine:main:build']
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

  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    console.log(key);
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'jshint', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'watch']);

  grunt.registerTask('generate_list', ['esri_slurp_modules']);

  grunt.registerTask('travis', ['jshint', 'nodeunit']);
};