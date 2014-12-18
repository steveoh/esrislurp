/*
 * esrislurp
 * https://github.com/steveoh/esrislurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  beautify_js = require('js-beautify').js_beautify,
  beautify_css = require('js-beautify').css,
  mkdirp = require('mkdirp'),
  os = require('os'),
  request = require('request'),
  S = require('string'),
  unwind = require('./unwinder');

function noop() {}

module.exports = function(basePath, version, beautify, onSuccess, onError, onProgress) {
  onSuccess = onSuccess || noop;
  onError = onError || noop;
  onProgress = onProgress || noop;

  var packageLocation = S(basePath).ensureRight(path.sep).s;
  mkdirp.sync(packageLocation);

  var esriModules = require('./modules/esriModules-' + version);
  var esriVersionBaseUrl = 'http://js.arcgis.com/' + version;

  if (+version > 3.10) {
    esriVersionBaseUrl += 'amd/esri/';
  } else {
    esriVersionBaseUrl += 'amd/js/esri/';
  }

  var total = esriModules.length,
    count = 0;

  function signalProgessUpdate() {
    onProgress({
      count: count,
      total: total
    });
  }

  async.eachLimit(esriModules, 20, function(file, callback) {
    var subPath = S(path.dirname(file)).ensureRight('/').s,
      fileFolder = path.join(packageLocation, subPath),
      fileName = path.basename(file),
      httpUrl = esriVersionBaseUrl + subPath + fileName;

    if (!fs.existsSync(fileFolder)) {
      mkdirp.sync(fileFolder);
    }

    request({
        uri: httpUrl,
        encoding: 'binary'
      },
      function(error, response, body) {
        count += 1;
        if (body.length < 1) {
          signalProgessUpdate();
          callback(error, body);
          return;
        }

        var newFile = path.join(packageLocation, file);

        var extension = path.extname(file);
        if (extension === '.js' || extension === '.css') {
          body = unwind(body);

          if (beautify) {
            try {
              if (extension === '.js') {
                body = beautify_js(body);
              } else if (extension = '.css') {
                body = beautify_css(body);
              }
            } catch (e) {
              console.warn(os.EOL + 'error beautifying: ' + file + ' ' + e);
              // swallow it's not the end of the world if it's not beautiful
            }
          }
        }

        fs.writeFile(newFile, body, 'binary', function(err){
          if(err){
            console.warn(err);
          }
        });

        signalProgessUpdate();
        callback(error, body);
      });
  }, function(err) {
    if (err) {
      onError(err);
    } else {
      onSuccess();
    }
  });
};
