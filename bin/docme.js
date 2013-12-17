#!/usr/bin/env node
'use strict';

var log      =  require('npmlog')
  , docme    =  require('../')
  , minimist =  require('minimist')
  , path     =  require('path')
  , fs       =  require('fs')
  ;
function usage() {
  var usageFile = path.join(__dirname, 'usage.txt');
  fs.createReadStream(usageFile).pipe(process.stdout);
  return;
}

(function damnYouEsprima() {

var argv = minimist(process.argv.slice(2)
  , { boolean: [ 'h', 'help' ]
    , string: [ 'loglevel', 'l' ]
  });

argv.loglevel = argv.loglevel || argv.l || 'info';

if (argv.h || argv.help) return usage;

var readme = argv._.shift();
if (!readme) {
  log.error('docme', 'Missing readme!');
  return usage();
}

docme(readme, argv, argv._, function (err) {
  if (err) return log.error('docme', err);
  log.info('docme', 'Everything is OK');
});

})()
