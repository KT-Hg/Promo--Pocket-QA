#!/usr/bin/env node
/**
 * stamp-assets.mjs — Cache-bust the pages' own scripts and stylesheets.
 * ----------------------------------------------------------------------------
 * There is no build step, so nothing else rewrites the `?v=` on a <script src>
 * or <link href> when the file changes. Without that query string changing too,
 * a returning visitor's browser (and the GitHub Pages CDN) can keep serving an
 * old cached site.js or features-en.js after an edit — and a new feature.js
 * running on old feature data fails quietly. Same failure mode
 * sync-from-source.mjs already guards against for demo.js / demo.css.
 *
 * Stamps every local .js / .css that index.html and feature.html load with the
 * first 8 hex chars of its MD5 — of the file's LF form, what git stores and
 * Pages serves, so a CRLF checkout stamps the same URL.
 *
 * Run this after every edit to one of those files:
 *   node stamp-assets.mjs
 *
 * Exit: 0 = stamped (or already current), 1 = a page or an asset is missing.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const hashOf = f => createHash('md5').update(readFileSync(f, 'utf8').replace(/\r\n/g, '\n')).digest('hex').slice(0, 8);
// src="x.js" / href="x.css" with an optional ?v=…; relative paths only (no "//", no "https:")
const assetRe = /((?:src|href)=")([\w./-]+\.(?:js|css))(?:\?v=[0-9a-f]+)?(")/g;

let failed = false;
for (const page of ['index.html', 'feature.html']) {
  const path = join(here, page);
  if (!existsSync(path)) { console.error('✗ ' + page + ' not found next to this script.'); failed = true; continue; }
  const src = readFileSync(path, 'utf8');
  const out = src.replace(assetRe, (m, pre, file, post) => {
    const asset = join(here, file);
    if (!existsSync(asset)) { console.error('✗ ' + page + ' loads ' + file + ', which does not exist.'); failed = true; return m; }
    return pre + file + '?v=' + hashOf(asset) + post;
  });
  if (out !== src) { writeFileSync(path, out, 'utf8'); console.log('✓ ' + page + ' stamped'); }
  else console.log('✓ ' + page + ' already up to date');
}
process.exit(failed ? 1 : 0);
