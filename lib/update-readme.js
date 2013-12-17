'use strict';

var fs            =  require('fs')
  , updateSection =  require('update-section')

var start = '<!-- START docme generated API please keep comment here to allow auto update -->\n' +
            '<!-- DON\'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->'
  , end = '<!-- END docme generated API please keep comment here to allow auto update -->'

function matchesStart(line) {
  return (/<!-- START docme generated API /).test(line);
}

function matchesEnd(line) {
  return (/<!-- END docme generated API /).test(line);
}

var go = module.exports = 

/**
 * Updates the readme with the given api docs
 * 
 * @name updateReadme
 * @private
 * @function
 * @param {String} readme full path to the readme
 * @param {String} docs the api docs with which the readme is updated
 * @param {Function(Error)} cb called back when done or an error occurred
 */
function updateReadme(readme, docs, cb) {
  
 var apiDoc = 
    [ start 
    , ''
    ]
    .concat([ docs ])
    .concat([
      ''
    , end 
    ])
    .join('\n');

  fs.readFile(readme, 'utf8', function (err, md) {
    if (err) return cb(err);
    var updatedMd = updateSection(md, apiDoc, matchesStart, matchesEnd);
    fs.writeFile(readme, updatedMd, 'utf8', cb);
  });
};
