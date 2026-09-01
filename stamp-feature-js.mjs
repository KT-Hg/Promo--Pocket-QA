#!/usr/bin/env node
/**
 * stamp-feature-js.mjs — Cache-bust feature.html's <script src="feature.js">.
 * ----------------------------------------------------------------------------
 * feature.js has no build step, so nothing else rewrites the `?v=` on its own
 * <script> tag when the file changes. Without that query string changing too,
 * a returning visitor's browser can keep serving an old cached feature.js
 * after an edit here — same failure mode sync-from-source.mjs already guards
 * against for demo.js (see its header comment and the README's "Deep links" /
 * cache-busting note).
 *
 * Run this after every edit to feature.js:
 *   node stamp-feature-js.mjs
 *
 * Exit: 0 = stamped (or already current), 1 = feature.html/feature.js missing.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const jsPath = join(here, 'feature.js');
const htmlPath = join(here, 'feature.html');

if (!existsSync(jsPath) || !existsSync(htmlPath)) {
  console.error('✗ feature.js or feature.html not found next to this script.');
  process.exit(1);
}

const hash = createHash('md5').update(readFileSync(jsPath)).digest('hex').slice(0, 8);
const htmlSrc = readFileSync(htmlPath, 'utf8');
const tagRe = /(<script src="feature\.js)(?:\?v=[0-9a-f]+)?(")/;

if (!tagRe.test(htmlSrc)) {
  console.error('✗ Could not find <script src="feature.js"> in feature.html — update it by hand.');
  process.exit(1);
}

const htmlOut = htmlSrc.replace(tagRe, `$1?v=${hash}$2`);
if (htmlOut !== htmlSrc) {
  writeFileSync(htmlPath, htmlOut, 'utf8');
  console.log('✓ feature.html script tag → feature.js?v=' + hash);
} else {
  console.log('✓ feature.html already up to date (v=' + hash + ')');
}
