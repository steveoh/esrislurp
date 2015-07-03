'use strict';

var fs = require('fs');
var addModule = require('../addModule');
var fs = require('fs');
var path = require('path');
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

function stripLineBreaks(s) {
  return s.replace(/(\r\n|\n|\r)/gm,'');
}

exports.buildModule = function(test){
    test.expect(2);


    temp.mkdir('addModule', function(err, dirPath) {

      addModule('test/fixtures/arcgis_js_v3test_api.zip', dirPath, function(error, results) {
        test.ifError(error);
        var expected = fs.readFileSync(path.join('test', 'fixtures', 'expected_esriModules-3.test.js')).toString();
        var actual = fs.readFileSync(path.join(dirPath, 'esriModules-3.test.js')).toString();

        test.equal(actual, expected);
        test.done();
      });
    });
};
