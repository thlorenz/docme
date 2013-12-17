'use strict';

var log          =  require('npmlog')
  , runnel       =  require('runnel')
  , path         =  require('path')
  , fs           =  require('fs')
  , format       =  require('util').format
  , rmrf         =  require('rimraf')
  , exists       =  fs.exists || path.exitsts
  , runJsdoc     =  require('./lib/run-jsdoc')
  , initTmpDir   =  require('./lib/init-tmp-dir')
  , docmeify     =  require('./lib/docmeify')
  , updateReadme =  require('./lib/update-readme')

function clean(tmpdir, cb) {
  log.info('docme', 'Cleaning up ...');
  log.verbose('docme', 'Removing tmp dir', tmpdir);
  rmrf(tmpdir, cb);
}

function update(projectRoot, projectName, jsdocargs, readme, cb) {
  initTmpDir(projectName, function (err, tmpdir) {
    if (err) return cb(err);
    
    var tasks = [
        runJsdoc.bind(null, projectRoot, tmpdir, jsdocargs)
      , docmeify
      , updateReadme.bind(null, readme)
      , clean.bind(null, tmpdir)
      , cb
    ]
    runnel(tasks);
  })
}

function validateFile(fp, cb) {
  fs.stat(fp, function (err, stat) {
    if (err) return cb(err);
    if (!stat.isFile()) return cb(new Error(format('%s is not a file!', fp)));
    cb(null, fp);
  });
}

function resolveReadme(readme, cb) {
  var fp = path.resolve(readme);
  exists(fp, function (yes) {
    if (yes) return validateFile(fp, cb);
    cb(new Error(format('The readme: %s was not found from %s!', readme, process.cwd())));
  })
}

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

  resolveReadme(readme, function (err, fullPath) {
    if (err) return cb(err);
    log.info('docme', 'Updating API in "%s" with current jsdocs', readme);
    update(projectRoot, projectName, jsdocargs, fullPath, cb);
  });
}
