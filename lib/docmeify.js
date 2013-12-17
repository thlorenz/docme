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
  this.apidoc = '';
}

MutinyWritable.prototype._write = function (chunk, encoding, cb) {
  this.apidoc += chunk;
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
  var outstreams =  [] 
    , pruneTransform = transformify(pruneHtml.bind(null, [ 'h1', 'h2', 'h3', 'header' ]));

  function getOutStream() {
    var s = new MutinyWritable();
    outstreams.push(s);
    return s;
  }

  function onend() {
    var apidocs = outstreams.map(function (x) { return x.apidoc }).join('');
    cb(null, apidocs);
  }
  
  log.verbose('docme', 'githubifying the jsdoc generated pages');

  mutiny(
      { getOutStream: getOutStream, transform: [ jsdocGithubify, pruneTransform ] }
    , { root: htmldir, fileFilter: '*.html' }
  )
  .on('error', cb)
  .on('data', function (d) { log.verbose('docme', 'Processed:\n', d); })
  .on('end', onend)
};
