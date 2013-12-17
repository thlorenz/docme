'use strict';

var log            =  require('npmlog')
  , mutiny         =  require('mutiny')
  , pruneHtml      =  require('prune-html')
  , transformify   =  require('transformify')
  , jsdocGithubify =  require('jsdoc-githubify')

var stream = require('stream')
  , util = require('util');

var Writable = stream.Writable || require('readable-stream').Writable;

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
  var outstream = new MutinyWritable()
    , pruneTransform = transformify(pruneHtml.bind(null, [ 'h1', 'h2', 'h3', 'header' ]));

  function onend() {
    cb(null, outstream.apidocs);
  }
  
  log.verbose('docme', 'githubifying the jsdoc generated pages');

  mutiny(
      { getOutStream: function (file) { return outstream }, transform: [ jsdocGithubify, pruneTransform ] }
    , { root: htmldir, fileFilter: '*.html' }
  )
  .on('error', cb)
  .on('data', function (d) { log.verbose('docme', 'Processed:\n', d); })
  .on('end', onend)
};
