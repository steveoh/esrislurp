var extractModuleFiles = require('./extractModuleFiles');
var dumpModuleToFile = require('./dumpModuleToFile');
var path = require('path');
var async = require('async');


/**
 * Creates a module for both standard and compact from files listed in specified Esri JS API Archive.
 * @param {string} esriApiArchive - path to Esri JS API Archive used for module
 * @param {string} destination - directory to output modules
 * @param {addModuleCallback} callback - called on completion of module being added.
 */
function addModule(esriApiArchive, destination, callback) {
  extractModuleFiles(esriApiArchive, function(err, module){
    if(err) {
      return callback(err);
    }

    var standardFileName = path.join(destination, 'esriModules-' + module.version + ".js");
    var compactFileName = path.join(destination, 'esriModules-' + module.version + "compact.js");

    async.parallel([
      function(cb){
        dumpModuleToFile(module.standard, standardFileName, cb);
      },
      function(cb){
        dumpModuleToFile(module.compact, compactFileName, cb);
      },
    ], function(err){
      callback(err, module.version);
    });


  });
}

/**
 * Callback for addModule.
 * @callback addModuleCallback
 * @param {Error} error - if no problems, this will be null
 * @param {string} version of the module added
 */


module.exports = addModule;
