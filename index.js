'use strict';

var log        =  require('npmlog')
  , runJsdoc   =  require('./lib/run-jsdoc')

var go = module.exports = function (args, jsdocargs, cb) {
  args = args || {};
  jsdocargs = jsdocargs || [];

  log.level = args.loglevel || 'info';  
  
  var projectRoot = args.projectRoot || process.cwd();

  // TODO: create tmp dir, run jsdoc in project root -- out to tmp dir, mutiny -> concat results -> update readme section
}
