'use strict';

var log        =  require('npmlog')
  , runnel     =  require('runnel')
  , path       =  require('path')
  , runJsdoc   =  require('./lib/run-jsdoc')
  , initTmpDir =  require('./lib/init-tmp-dir')
  , docmeify   =  require('./lib/docmeify')

var go = module.exports = 

/**
 * Generates jsdocs for non-private members of the project in the current folder.
 * It then updates the given README with the githubified version of the generated API docs.
 * 
 * @name docme
 * @function
 * @param {String} readme path to readme in which the API docs should be updated
 * @param {Array.<String>} args consumed by docme
 * @param {String=} args.loglevel (info) level at which to log: silly|verbose|info|warn|error|silent
 * @param {Array.<String>} jsdocargs consumed by jsdoc
 * @param {Function(Error)} cb called back when docme finished updating the README
 */
function docme(readme, args, jsdocargs, cb) {
  args = args || {};
  jsdocargs = jsdocargs || [];

  log.level = args.loglevel || 'info';  
  
  var projectRoot = args.projectRoot || process.cwd()
    , projectName = path.basename(projectRoot)

  // TODO: mutiny -> concat results -> update readme section

  initTmpDir(projectName, function (err, tmpdir) {
    if (err) return cb(err);
    
    var tasks = [
        runJsdoc.bind(null, projectRoot, tmpdir, jsdocargs)
      , docmeify
      , cb
    ]
    runnel(tasks);
  })
}

// Test
if (!module.parent && typeof window === 'undefined') {
  go('', { loglevel: 'silly' }, [], function (err, res) {
    if (err) return console.error(err);
    console.log('Success!\n', res);  
  });
}
