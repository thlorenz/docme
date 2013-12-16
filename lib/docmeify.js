'use strict';

var log            =  require('npmlog')
  , mutiny         =  require('mutiny')

var stream = require('stream')
  , util = require('util');

var header = '<!-- GENERATED WITH DOCME. Don\'t edit this section directly, instead run docme again to regenerate API docs -->\n'
  , footer = '\n<br>\n<h6><em>Generated with <a href="https://github.com/thlorenz/wicked">wicked</a>.</em></h6>';

var Writable = stream.Writable;

util.inherits(MutinyWritable, Writable);

function MutinyWritable (opts) {
  if (!(this instanceof MutinyWritable)) return new MutinyWritable(opts);

  opts = opts || {};
  
  Writable.call(this, opts);
  this.apidocs = '';
}

MutinyWritable.prototype._write = function (chunk, encoding, cb) {
  this.apidocs += chunk;
  cb();
}

var go = module.exports = 

/**
 * Generates github readme compatible `*.API.md` files from `*.html` jsdoc files
 * 
 * @name docmeify
 * @private
 * @function
 * @param {String} htmldir 
 * @param {Function(Error, String)} cb called back with entire API section that was converted
 */
function docmeify(htmldir, cb) {
  var outstream = new MutinyWritable();

  function onend() {
    cb(null, outstream.apidocs);
  }
  
  log.verbose('docme', 'githubifying the jsdoc generated pages');
  mutiny(
      { getOutStream: function (file) { return outstream }, transform: [ 'jsdoc-githubify' ] }
    , { root: htmldir, fileFilter: '*.html' }
  )
  .on('error', cb)
  .on('data', function (d) { log.verbose('docme', 'Processed:\n', d); })
  .on('end', onend)
};
