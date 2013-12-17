'use strict';
/*jshint asi: true */

var test = require('tap').test
  , runnel       =  require('runnel')
  , rmrf         =  require('rimraf')
  , runJsdoc     =  require('../lib/run-jsdoc')
  , initTmpDir   =  require('../lib/init-tmp-dir')
  , docmeify     =  require('../lib/docmeify')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

test('\none public and one private function', function (t) {
  var projectRoot = __dirname + '/one-public'
    , projectName = 'one-public'

  initTmpDir(projectName, function (err, tmpdir) {
    if (err) { t.fail(err); return t.end() }
    
    runnel(
        runJsdoc.bind(null, projectRoot, tmpdir, [])
      , docmeify
      , runTests 
    )
  })

  function runTests(err, docs) {
    if (err) { t.fail(err); return t.end() }

    inspect(docs.split('\n'));

    t.deepEqual(
        docs.split('\n')
      , [ '<div class="jsdoc-githubify">',
          '<section>',
          '<article>',
          '<div class="container-overview">',
          '<dl class="details">',
          '</dl>',
          '</div>',
          '<dl>',
          '<dt>',
          '<h4 class="name" id="someFunction"><span class="type-signature"></span>someFunction<span class="signature">(beep, boop)</span><span class="type-signature"></span></h4>',
          '</dt>',
          '<dd>',
          '<div class="description">',
          '<p>The function that does it all.</p>',
          '</div>',
          '<h5>Parameters:</h5>',
          '<table class="params">',
          '<thead>',
          '<tr>',
          '<th>Name</th>',
          '<th>Type</th>',
          '<th class="last">Description</th>',
          '</tr>',
          '</thead>',
          '<tbody>',
          '<tr>',
          '<td class="name"><code>beep</code></td>',
          '<td class="type">',
          '<span class="param-type">String</span>',
          '</td>',
          '<td class="description last"><p>for peeps</p></td>',
          '</tr>',
          '<tr>',
          '<td class="name"><code>boop</code></td>',
          '<td class="type">',
          '<span class="param-type">String</span>',
          '</td>',
          '<td class="description last"><p>for poops</p></td>',
          '</tr>',
          '</tbody>',
          '</table>',
          '<dl class="details">',
          '<dt class="tag-source">Source:</dt>',
          '<dd class="tag-source"><ul class="dummy">',
          '<li>',
          '<a href="https://github.com/thlorenz/docme/blob/master/public.js">public.js</a>',
          '<span>, </span>',
          '<a href="https://github.com/thlorenz/docme/blob/master/public.js#L2">lineno 2</a>',
          '</li>',
          '</ul></dd>',
          '</dl>',
          '</dd>',
          '</dl>',
          '</article>',
          '</section>',
          '</div>' ]
        , 'documents public function only'
    )
    t.end()  
  }
})


