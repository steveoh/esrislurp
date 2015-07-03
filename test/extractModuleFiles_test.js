'use strict';

var extractModuleFiles = require('../addModule/extractModuleFiles');
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
    var expectedResult = {
      version: '3.test',
      standard:
        [ 'dir1/dir11/included11.txt',
          'dir1/dir12/dir121/included121.txt',
          'dir1/dir12/included12.txt',
          'dir1/included1.txt',
          'dir2/dir21/included21.txt',
          'dir2/included2.txt',
          'dir3/dir31/included31.txt',
          'dir3/included3.txt',
          'included0.txt' ],
       compact:
        [ 'dir1/dir11/included11.txt',
          'dir1/dir12/included12.txt',
          'dir1/included1.txt',
          'dir2/dir21/included21.txt',
          'dir2/included2.txt',
          'included0.txt' ] };

    test.expect(2);

    extractModuleFiles('test/fixtures/arcgis_js_v3test_api.zip', function(error, results) {
      test.ifError(error);
      test.deepEqual(results, expectedResult);
      test.done();
    });
  };
