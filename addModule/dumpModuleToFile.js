var Handlebars = require('handlebars');
var fs = require('fs');

var template = Handlebars.compile('module.exports = [{{#each files}}{{#if @index}},\n {{/if}}\'{{this}}\'{{/each}}];');

function dumpModuleToFile(files, fileName, callback) {
  console.log('Generating', fileName);
  fs.writeFile(fileName, template({files: files.sort()}), function(err){
    if(err) {
      return callback(err);
    }
    callback();
  });
}

module.exports = dumpModuleToFile;
