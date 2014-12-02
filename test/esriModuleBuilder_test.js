'use strict';

var grunt = require('grunt');
var S = require('string');
var buildEsriModule = require('../esriModuleBuilder.js');
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

function stripTrailingNewLines(s) {
  return S(s).chompRight('\n').s;
}

exports.buildModule = function(test){
    test.expect(1);

    function onSuccess(actual) {
      var expected = grunt.file.read('test/expected/built_module');

      test.equal(stripTrailingNewLines(actual),
                 stripTrailingNewLines(expected),
                 'should build module');

      test.done();
    }

    function onError(errorMessage) {
      test.ifError(errorMessage);
      test.done();
    }

    buildEsriModule('test','3.test', onSuccess, onError);
  };
