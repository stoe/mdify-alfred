'use strict';

const path = require('path');
const alfy = require('alfy');
const MDify = require('mdify-node');

const source = alfy.input;

if (!source) {
  alfy.error('error.');
}

const destination = path.resolve(
  source.slice(0, source.indexOf('.docx')) + '.md'
);

const mdify = new MDify({
  source: path.resolve(source),
  destination,
  open: false
});
mdify.makeHTML().then(html => {
  mdify.makeMD(html);
});
