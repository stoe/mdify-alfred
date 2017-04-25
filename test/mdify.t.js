'use strict';

import fs from 'fs';
import path from 'path';
import test from 'ava';
import execa from 'execa';
import alfyTest from 'alfy-test';

test.beforeEach(t => {
  t.context.alfy = alfyTest();
  t.context.testDocx = path.resolve('./test/fixtures/mdify.docx');
  t.context.testMd = path.resolve('./test/fixtures/mdify.md');
});

test.afterEach(t => {
  const file = t.context.testMd;

  fs.exists(file, exists => {
    if (exists) {
      fs.unlinkSync(file);
    }
  });
});

test('mdify', async t => {
  t.plan(3);

  const result = await execa('mdify', [t.context.testDocx, '--silent']);
  const mdExists = fs.existsSync(t.context.testMd);

  t.true(mdExists, `${t.context.testMd} not created`);

  t.is(result.cmd, `mdify ${t.context.testDocx} --silent`);
  t.is(result.failed, false);
});
