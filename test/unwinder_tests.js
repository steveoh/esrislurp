'use strict';

var unwind = require('../unwinder.js');

exports.regular_expression = {
  setUp: function(done){
    done();
  },
  split_requires: function(test){
    var actual = grunt.file.read('test/expected/wound_define');
    actual = unwind(actual);
    var expected = grunt.file.read('test/expected/unwound_define');

    test.equal(actual, expected, 'should split requires');

    test.done();
  },
  fix_css_paths: function(test){
    var actual = grunt.file.read('test/expected/wound_css');
    actual = unwind(actual);
    var expected = grunt.file.read('test/expected/unwound_css');

    test.equal(actual, expected, 'should remove dojo prefix');

    test.done();
  },
  issue_17: function(test){
    var actual = grunt.file.read('test/expected/wound_310_ArcGISTiledMapServiceLayer');
    actual = unwind(actual);
    var expected = grunt.file.read('test/expected/unwound_310_ArcGISTiledMapServiceLayer');

    test.equal(actual, expected, 'should only modify requires list');

    test.done();
  },
  layer_files: function(test){
    var actual = grunt.file.read('test/expected/wound_layer_files');
    actual = unwind(actual);
    var expected = grunt.file.read('test/expected/unwound_layer_files');

    test.equal(actual, expected, 'should get rid of everything in a leading require statement');

    test.done();
  }
};