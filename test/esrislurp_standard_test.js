'use strict';

var slurp = require('../esrislurp.js');
var temp = require("temp").track();

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

exports.buildModule = function(test){
    test.expect(1);

    function onSuccess(actual) {
      test.ok(true);
      test.done();
    }

    function onError(errorMessage) {
      test.ifError(errorMessage);
      test.done();
    }

    var previousPercent;
    function onProgress(progress) {
      var completePercent = Math.floor(progress.count / progress.total * 100);
      if(previousPercent !== completePercent && completePercent % 10 === 0) {
        console.log(completePercent +"%");
        previousPercent = completePercent;
      }
    }


    temp.mkdir('slurp', function(err, dirPath) {

      slurp(dirPath,'3.13', true, onSuccess, onError, onProgress);
    });
  };
