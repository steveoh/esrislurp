'use strict';

var fs = require('fs');
var moduleBuilder = require('../esriModuleBuilder.js');
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

function stripLineBreaks(s) {
  return s.replace(/(\r\n|\n|\r)/gm,'');
}

exports.buildModule = function(test){
    test.expect(1);

    function onSuccess(success) {
      var expected = stripLineBreaks(fs.readFileSync('test/fixtures/built_module').toString());
      var actual = stripLineBreaks(success);

      test.equal(actual, expected, 'should build module');

      test.done();
    }

    function onError(errorMessage) {
      test.ifError(errorMessage);
      test.done();
    }

    moduleBuilder('test/fixtures','3.test', onSuccess, onError);
  };
