/*
 * grunt-esri-slurp
 * https://github.com/steveoh/esrislurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';
var walk = require('walk'),
    S = require('string'),
    async = require('async'),
    fs = require('fs'),
    path = require('path'),
    os = require('os'),
    Handlebars = require('handlebars'),
    model = {
        files: []
    };

/*
    navigate to https://developers.arcgis.com/en/downloads/
    download the javascript api.
    navigate to arcgis_js_v311_api/arcgis_js_api/library/3.11/3.11/esri
    extract and make whatever changes you need to get to this format /jsapi/{version}/js/esri
    then run grunt generate_list
*/
module.exports = function(version) {
        var location = path.join('jsapi', version, 'js', 'esri'),
            resolved = '.' + path.sep + location,
            template = Handlebars.compile('module.exports = [{{#each files}}{{#if @index}},\n {{/if}}\'{{this}}\'{{/each}}];'),
            done = this.async();

        // Walker options
        var walker = walk.walk(resolved, {
            followLinks: false
        });

        var fix_windows = false;
        if (S(os.platform()).startsWith('win')) {
            fix_windows = true;
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
            }

            next();
        });

        walker.on('end', function() {
            var data = template(model);
            var fileLocation = path.join('.', 'tasks', 'esriModules-' + version + '.js');
            
            fs.writeFileSync(fileLocation, data);

            done();
        });
    });
};