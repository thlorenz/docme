'use strict';

var mkdir =  require('fs').mkdir
  , rmrf  =  require('rimraf')
  , os    =  require('os')
  , path  =  require('path');

module.exports = 

/**
 * Initializes a tmp dir into which to place intermediate files
 * 
 * @name initTmpDir
 * @private
 * @function
 * @param {String} dirname 
 * @param {Function(Error, String)} cb called back with the full path to the initialized tmp dir
 */
function initTmpDir (dirname, cb) {
  var dir = path.join(os.tmpDir(), dirname);

  rmrf(dir, function (err) {
    if (err) return cb(err);
    mkdir(dir, function (err) {
      if (err) return cb(err);
      cb(null, dir);
    });
  });
}
