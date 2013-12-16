'use strict';

var spawn = require('child_process').spawn
  , log = require('npmlog')
  , through = require('through2') 

/**
 * Spawns the given bin with the given args from the cwd or current working directory.
 *
 * @name run
 * @memberof Internal
 * @private
 * @function
 * @param {String} bin full path to the binary to run
 * @param {Array.<String>} args the args to pass to the binary
 * @param {String=} cwd full path to the directory to run bin from, defaults to current directory
 * @param {Function} cb called back with err and/or program exit code
 * @return {Object} the spawned binary which exposes stdout and stderr streams
 */
module.exports = function run(bin, args, cwd, cb) {
  var stdout = '';

  if (typeof cwd === 'function') {
    cb = cwd;
    cwd = null;
  }

  var prog = spawn(
      bin
    , args
    , { cwd: cwd || process.cwd(), stdio: [ process.stdin, 'pipe', process.stderr ] }
  )

  log.silly('wicked', 'Running from:', cwd);
  log.verbose('wicked', 'Running:', bin, args.join(' '));

  // pipe stdout, so we can correctly handle 'git add' failing due to no changes
  prog.stdout
    .pipe(through(function (d) { stdout += d.toString() }))
    .pipe(process.stdout);

  // dont' pipe stderr in order to print out jsdoc errors

  prog.on('close', function (code) {
    if (code !== 0) { 
      var err = new Error('prog ' + args.join(' ') + ' returned with code ' + code);
      err.stdout = stdout;
      err.code = code;
      return cb(err);
    }
    cb();
  })

  return prog;
}
