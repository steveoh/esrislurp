'use strict';

var dumpModuleToFile = require('../addModule/dumpModuleToFile');
var fs  = require('fs');
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

exports.buildModule = function(test){
    test.expect(2);


    temp.mkdir('dumpModuleToFile', function(err, dirPath) {

      var files =
          [ 'included0.txt',
            'dir1/dir11/included11.txt',
            'dir1/dir12/dir121/included121.txt',
            'dir1/dir12/included12.txt',
            'dir1/included1.txt',
            'dir2/dir21/included21.txt',
            'dir2/included2.txt',
            'dir3/dir31/included31.txt',
            'dir3/included3.txt'],
          outputName = path.join(dirPath, 'testoutput.js'),
          expectedContents = fs.readFileSync('test/fixtures/expected_built_module.js', "utf8");

      dumpModuleToFile(files, outputName, function(error) {
        test.ifError(error);
        test.equal(fs.readFileSync(outputName, "utf8"), expectedContents);
        test.done();
      });
    });
  };
