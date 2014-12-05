/*
 * esrislurp
 * https://github.com/steveoh/esrislurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var walk = require('walk'),
  S = require('string'),
  path = require('path'),
  os = require('os'),
  Handlebars = require('handlebars');

function noop() {}

/*
Expected directory structure: /jsapi/{version}/js/esri
*/
module.exports = function(basePath, version, onSuccess, onError, onProgress) {
  onSuccess = onSuccess || noop;
  onError = onError || noop;
  onProgress = onProgress || noop;

  var location = path.join(basePath, 'jsapi', version, 'js', 'esri'),
    template = Handlebars.compile('module.exports = [{{#each files}}{{#if @index}},\n {{/if}}\'{{this}}\'{{/each}}];'),
    model = {
      count: 0,
      files: []
    };

  console.log('parsing:', location);

  // Walker options
  var walker = walk.walk(location, {
    followLinks: false
  });

  var fix_windows = false;
  if (S(os.platform()).startsWith('win')) {
    fix_windows = true;
    console.log('you are on windows');
  }

  walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    var fileName = path.join(root, stat.name);

    var moduleName = S(fileName.replace(location, '')).chompLeft(path.sep).s;

    if (fix_windows) {
      moduleName = S(moduleName).replaceAll(path.sep, '/');
    }

    if (moduleName[0] !== '.') {
      model.files.push(moduleName);
      model.count += 1;
      onProgress({
        count: model.count
      });
    }
    next();
  });

  walker.on('errors', function(root, stat, next) {
    // TODO: Use stat to display error
    // stat - a single stats object or an array with some added attributes
    // type - 'file', 'directory', etc
    // error
    // name - the name of the file, dir, etc
    onError('failure reading files');
  });

  walker.on('end', function() {
    model.files = model.files.sort();

    var data = template(model);
    onSuccess(data);
  });
};