'use strict';

var fs = require('fs');
var unwind = require('../unwinder.js');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])

    test.ifError(value)
*/

exports.uwinder_tests = {
  setUp: function(done){
    done();
  },
  split_requires: function(test){
    var actual = fs.readFileSync('test/fixtures/wound_define').toString();
    actual = unwind(actual);
    var expected = fs.readFileSync('test/fixtures/unwound_define').toString();

    test.equal(actual, expected, 'should split requires');

    test.done();
  },
  fix_css_paths: function(test){
    var actual = fs.readFileSync('test/fixtures/wound_css').toString();
    actual = unwind(actual);
    var expected = fs.readFileSync('test/fixtures/unwound_css').toString();

    test.equal(actual, expected, 'should remove dojo prefix');

    test.done();
  },
  issue_17: function(test){
    var actual = fs.readFileSync('test/fixtures/wound_310_ArcGISTiledMapServiceLayer').toString();
    actual = unwind(actual);
    var expected = fs.readFileSync('test/fixtures/unwound_310_ArcGISTiledMapServiceLayer').toString();

    test.equal(actual, expected, 'should only modify requires list');

    test.done();
  },
  layer_files: function(test){
    var actual = fs.readFileSync('test/fixtures/wound_layer_files').toString();
    actual = unwind(actual);
    var expected = fs.readFileSync('test/fixtures/unwound_layer_files').toString();

    test.equal(actual, expected, 'should get rid of everything in a leading require statement');

    test.done();
  }
};
