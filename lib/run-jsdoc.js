'use strict';

// I tried to use jsdoc's API, but that proved to be such a nuisance for the following reasons:
//  - main field not specified
//  - setting main do jsdoc.js somehow takes away my output and/or crashes
//  - setting main cli.js would work, but lots of code assumes to work from the command line, i.e. cwd is used directly
//
// Additionally the maintainers refused to add a 'main' field to their package.json (https://github.com/jsdoc3/jsdoc/pull/548)
// Therefore it can't be properly resolved and this brittle direct resolve will have to do :(

var path = require('path')
  , log = require('npmlog')
  , run = require('./run')

var jsdocpackfile = path.join(__dirname, '..', 'node_modules', 'jsdoc', 'package.json')
  , jsdocpack = require(jsdocpackfile)
  , jsdoc = path.resolve(path.dirname(jsdocpackfile), jsdocpack.bin.jsdoc)

/**
 * Runs the jsdoc binary from the projectroot.
 *
 * ### Note about jsdocargs
 *  - they shouldn't contain `--destination` option since destination is always inside wiki dir
 *  - if no `--configure` option is given, the default `./config/jsdocrc.json` config is passed to jsdoc
 * 
 * @name runJsdoc
 * @memberof Internal
 * @private
 * @function 
 * @param {String} projectroot root of project whose jsdoc comments are converted to html
 * @param {String} wikiroot in which the out folder with html files is created
 * @param {Array.<String>} jsdocargs extra args for jsdoc supplied via `-- --arg one --arg two ...`
 * @param {Function} cb called back with jsdoc output dir
 */
var go = module.exports = function runJsdoc(projectroot, wikiroot, jsdocargs, cb) {
  var out = path.join(wikiroot, 'out')

  var args = [ projectroot, '--destination', out  ].concat(jsdocargs);

  if (!~jsdocargs.indexOf('--configure') && !~jsdocargs.indexOf('-c')) {
    var config = path.join(__dirname, '..', 'config', 'jsdocrc.json')
    args = args.concat([ '--configure', config ]);
  } 

  run(jsdoc, args, projectroot, function (err) {
    cb(err, out);
  });
};
