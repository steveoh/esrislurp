var addModule = require('./addModule');
var fs = require('fs');

var argv = require('yargs')
    .usage('Usage: $0 pathToArcGisJsApi.zip')
    .example('$0 arcgis_js_v312_api.zip')
    .demand(1, 'You must specify a path to the zip archive containing the Arcgis JS API')
    .help('h')
    .alias('h', 'help')
    .version(function() {
      return require('../package').version;
    })
    .check(function(argv){
      return fs.lstatSync(argv._[0]).isFile();
    })
    .argv;

var inputZip = argv._[0];
var destination = 'modules';

addModule(inputZip, destination, function(err, version){
  if(err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Module', version, 'added');
});
