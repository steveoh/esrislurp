[![Build Status](https://travis-ci.org/steveoh/esrislurp.svg?branch=master)](https://travis-ci.org/steveoh/esrislurp)
[![Dependency Status](https://gemnasium.com/steveoh/esrislurp.svg)](https://gemnasium.com/steveoh/esrislurp)
[![NPM version](https://badge.fury.io/js/esrislurp.svg)](http://badge.fury.io/js/esrislurp)
# esrislurp may the slource™ be with you!

> Download and unwind esri js api amd modules and css to create a local package for builds, testing, and continuous integration. The best way to get the slource™.

## Getting Started
Unfortunately, Esri's Javascript API isn't available through more easier ways such as [NPM](https://www.npmjs.org/) or [Bower](http://bower.io/).  This tool is the next best thing.  It will download the entire Javascript API including CSS into the source directory of your project.


###Install
Install `esrislurp` from NPM:

```shell
npm install esrislurp --save-dev
```

###Usage

####esrislurp(baseDir, version, [beautify], [onSuccess], [onError], [onProgress])

#####baseDir
Type: `String`

A string value letting esrislurp know where to put the downloaded files.


#####version
Type: `String`
Valid Values: `"3.8"`|`"3.9"`|`"3.10"`|`"3.11"`

A string value representing the version of the esri js api to download.


#####beautify
Type: `Boolean`
Default value: `false`

A boolean value to make the js and css code beautiful.

#####onSuccess()
Type: `function`
Default value: `noop()`

A function which is called once all files have been successfully downloaded.

#####onError(errorMessage)
Type: `function`
Default value: `noop()`

A function which is called if an error occurs.  ``errorMessage`` is the error.  

#####onProgress(progress)
Type: `function`
Default value: `noop()`

A function which is called after each file is downloaed.  ``progess`` is an object with two attributes: `total`, which holds the total amount of files to be downloaded; and `count`, which holds the current amount of files downloaded.


### Example
```javascript
var esrislurp = require('esrislurp'),
    baseDir = 'src',
    version = '3.11',
    beautify = true;

function onSuccess() {
  console.log('Esri JS API successfully downloaded');
}

esrislurp(baseDir, version, beautify, onSuccess);
```

##Build Tools

###Grunt

See [grunt-esri-slurp](https://www.npmjs.org/package/grunt-esri-slurp)

###Gulp
```javascript
var gulp = require('gulp');
var esrislurp = require('esrislurp')

gulp.task('download-esri-api', function(cb) {
  esrislurp('src', '3.11', cb, cb);
});
```

## Release History
**1.1.0**: Update dependencies. Fix bugs to allow for all node versions to complete successfully. 

**1.0.3**: Remove string.js dependency from module builder.

**1.0.2**: Remove string.js dependency.

**1.0.1**: Update dependencies to remove log error messages.  

**1.0.0**: Fixed 3.13 module list for successful builds.  

**0.4.2**: Added esri version 3.13 from download page.  

**0.4.1**: Added esri version 3.13.  

**0.4.0**: Added esri modules back to version 3.5.  

## License
Copyright (c) 2014 steveoh. Licensed under the MIT license.
