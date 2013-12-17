# docme [![build status](https://secure.travis-ci.org/thlorenz/docme.png)](http://travis-ci.org/thlorenz/docme)

Generates github compatible API documentation from your project's jsdocs and adds them to your Readme.

## Installation

    npm install docme

## Usage

```
docme <readme> <docme-options> -- <jsdoc-options>

  Generates jsdocs for non-private members of the project in the current folder.
  It then updates the given README with the githubified version of the generated API docs.

  Note: overriding the jsdoc destination (-d, --destination) is not possible since docme will write files to a temp dir

OPTIONS:

  -l, --loglevel  level at which to log: silly|verbose|info|warn|error|silent -- default: info
  
  -h, --help      Print this help message.


EXAMPLES:
  
  Generate with default options and update README.md
    
    docme README.md

  Override [jsdocconf.json](http://usejsdoc.org/about-configuring-jsdoc.html):

    docme README.md-- --configure ./myconf.json

  Override loglevel and jsoc configuration:

    docme API.md --loglevel silly -- --configure ./myconf.json
```

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="docme"><span class="type-signature"></span>docme<span class="signature">(readme, args, jsdocargs, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Generates jsdocs for non-private members of the project in the current folder.
It then updates the given README with the githubified version of the generated API docs.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>readme</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>path to readme in which the API docs should be updated</p></td>
</tr>
<tr>
<td class="name"><code>args</code></td>
<td class="type">
<span class="param-type">Array.&lt;String></span>
</td>
<td class="description last"><p>consumed by docme</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>loglevel</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>(info) level at which to log: silly|verbose|info|warn|error|silent</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td class="name"><code>jsdocargs</code></td>
<td class="type">
<span class="param-type">Array.&lt;String></span>
</td>
<td class="description last"><p>consumed by jsdoc</p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back when docme finished updating the README</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/docme/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/docme/blob/master/index.js#L54">lineno 54</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
