/*
 * esrislurp
 * https://github.com/steveoh/esrislurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var buildEsriModule = require('../esriModuleBuilder.js'),
    fs = require('fs'),
    path = require('path');

/*
    navigate to https://developers.arcgis.com/en/downloads/
    download the javascript api.
    navigate to arcgis_js_v311_api/arcgis_js_api/library/3.11/3.11/esri
    extract and make whatever changes you need to get to this format /jsapi/{version}/js/esri
    update the Gruntfile's version property
    then run grunt generate_list
*/
module.exports = function(grunt) {
    grunt.registerTask('esri_slurp_modules', 'build module list', function() {
        var options = this.options({
          basePath: '.'
        });
        var done = this.async();

        function onSuccess(data) {
          var fileLocation = path.join('.', 'modules', 'esriModules-' + options.version + '.js');
          grunt.log.writeln('writing modules: ' + fileLocation);

          fs.writeFileSync(fileLocation, data);

          grunt.log.ok();
          done();
        }

        function onError(error){
          grunt.log.error("Unable to generate_list: ", error);
          done(false);
        }


        buildEsriModule(options.basePath, options.version, onSuccess, onError);
    });
};
