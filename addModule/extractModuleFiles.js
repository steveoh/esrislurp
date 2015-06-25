var AdmZip = require('adm-zip');
var path = require('path');

var BASE_PATH_PATTERN = /^arcgis_js_[^/]+_api\/arcgis_js_api\/library\/([^/]+)\/$/;

function extractModuleFiles(esriApiArchive, callback) {

  var zip, results = {standard: [], compact: [], version: null},
      basePath, standardBasePath, compactBasePath;

  try {
    zip = new AdmZip(esriApiArchive);
  }
  catch (e) {
    callback(e);
  }
  zip.getEntries().forEach(function(entry) {
    if(!basePath) {
      var match = BASE_PATH_PATTERN.exec(entry.entryName);
      if(match) {
        basePath = match[0];
        results.version = match[1];
        standardBasePath = path.join(basePath, results.version, 'esri/');
        compactBasePath = path.join(basePath, results.version + 'compact', 'esri/');
      }
    }

    if(entry.isDirectory || !basePath) {
      return;
    }

    if(entry.entryName.indexOf(standardBasePath) === 0) {
      results.standard.push(path.relative(standardBasePath,entry.entryName));
    } else if(entry.entryName.indexOf(compactBasePath) === 0) {
      results.compact.push(path.relative(compactBasePath,entry.entryName));
    }

  });

  if(!results.version) {
    process.nextTick(function(){
      callback(new Error('Archive not recognized; unable to determine version'));
    });
  } else {
    process.nextTick(function(){
      callback(null, results);
    });
  }
}

module.exports = extractModuleFiles;
