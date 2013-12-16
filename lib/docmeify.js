'use strict';

var log = require('npmlog')
  , mutiny = require('mutiny');

var go = module.exports = 

/**
 * Generates github readme compatible `*.API.md` files from `*.html` jsdoc files
 * 
 * @name docmeify
 * @function
 * @param {String} htmldir 
 * @param {Function(Error, String)} cb called back with entire API section that was converted
 */
function docmeify(htmldir, cb) {
  
  log.verbose('docme', 'githubifying the jsdoc generated pages');

  cb(null, 'hello'); 
};
