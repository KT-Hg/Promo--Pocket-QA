#!/usr/bin/env node
/**
 * sync-from-source.mjs — Regenerate popup-demo.html from vendor/popup.html
 * ----------------------------------------------------------------------------
 * This repo is SELF-CONTAINED. The pixel-perfect popup preview reuses a
 * vendored snapshot of the extension's real UI:
 *   • vendor/popup/*.css → linked directly by the demo, one <link> each, in the
 *                          same order popup.html links css/popup/*.css.
 *   • vendor/popup.html → the raw markup snapshot. popup-demo.html is generated
 *                         from it (copy + re-apply the demo transforms).
 *   • demo.js           → mocks behaviour by element id/class (STATIC preview).
 *
 * The vendored snapshot is refreshed from the extension repo by
 * `update-vendor.mjs` (a manual cross-repo step). This script only regenerates
 * popup-demo.html from whatever is currently in vendor/ — it needs no access to
 * the extension repo, so the demo can always be rebuilt standalone.
 *
 * Usage:  node sync-from-source.mjs
 * Exit:   0 = synced (or already up to date), 1 = transform target missing.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

/* Cache-busting stamp. Browsers (and the GitHub Pages CDN) hold on to demo.js /
 * demo.css hard, and a stale copy of either silently disables the fence that
 * keeps a visitor's installed extension out of this frame — the picker bar then
 * shows up inside the mock popup again. Hashing the asset into its URL means a
 * changed file is always a changed URL. Deterministic: same input, same output. */
/* The shipped version, vendored by update-vendor.mjs. demo.js reads it back off
 * the <meta> to fill the Settings > Version card, which the real popup fills
 * from chrome.runtime.getManifest() — a card left at "—" is one of the tells
 * that gives a static preview away. */
const versionFile = join(here, 'vendor', 'version.txt');
const extVersion = existsSync(versionFile) ? readFileSync(versionFile, 'utf8').trim() : '';

const stamp = (rel) => {
  const f = join(here, rel);
  if (!existsSync(f)) return rel;
  // Hash the LF form — what git stores and Pages serves — so a CRLF checkout
  // (core.autocrlf) stamps the same URL instead of churning every stamp.
  const text = readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
  return rel + '?v=' + createHash('md5').update(text).digest('hex').slice(0, 8);
};
const SRC = join(here, 'vendor', 'popup.html');
const OUT = join(here, 'popup-demo.html');

if (!existsSync(SRC)) {
  console.error('✗ Source not found:', SRC);
  console.error('  Run `node update-vendor.mjs` first to populate vendor/ from the extension repo.');
  process.exit(1);
}

let html = readFileSync(SRC, 'utf8');
const fail = [];

/* Match the source's line endings (popup.html is CRLF on Windows) so the
 * generated file keeps the EOL convention and string matches work. */
const usesCRLF = html.includes('\r\n');
const eol = (s) => (usesCRLF ? s.replace(/\n/g, '\r\n') : s);

/* ── Transform 1: <head> — repoint CSS, add demo.css, set theme + viewport ──
 * The extension links its stylesheet in pieces (css/popup/01-base.css …), so
 * the link list is read from the head itself and each one is repointed at its
 * vendored copy (css/X → vendor/X), in the same order — the cascade is then
 * identical to the real popup's. Anything else in the head still has to match
 * verbatim, so a structural change fails loudly instead of slipping through. */
const css = [...html.split('</head>')[0].matchAll(/<link rel="stylesheet" href="css\/([^"]+)" \/>/g)].map((m) => m[1]);
const HEAD_FROM =
`<!DOCTYPE html>
<!-- popup.html — Tab-based Popup UI layout and styles (Redesign v2) -->
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pocket QA</title>

${css.map((f) => `  <link rel="stylesheet" href="css/${f}" />`).join('\n')}
</head>`;

const HEAD_TO =
`<!DOCTYPE html>
<!--
  popup-demo.html — Standalone, STATIC preview of the extension popup.
  AUTO-GENERATED from vendor/popup.html by sync-from-source.mjs — do NOT edit
  by hand; re-run the sync script instead. Real chrome.* logic is gone; demo.js
  keeps only tab switching + the theme toggle live and seeds demo data — every
  other control is display-only. Rendered inside an <iframe> by index.html.
-->
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=480, initial-scale=1" />
  <meta name="ext-version" content="${extVersion}" />
  <title>Pocket QA — Popup Preview</title>

  <!-- Reuse the vendored extension stylesheets → guarantees pixel-perfect UI -->
${css.map((f) => `  <link rel="stylesheet" href="${stamp('vendor/' + f)}" />`).join('\n')}
  <link rel="stylesheet" href="${stamp('demo.css')}" />
</head>`;

if (!css.length) fail.push('<link rel="stylesheet" href="css/…"> tags in the head');
css.filter((f) => !existsSync(join(here, 'vendor', f)))
  .forEach((f) => fail.push('vendor/' + f + ' (linked by vendor/popup.html; run update-vendor.mjs)'));
if (html.includes(eol(HEAD_FROM))) html = html.replace(eol(HEAD_FROM), eol(HEAD_TO));
else fail.push('head block (top of vendor/popup.html, through </head>, changed format)');

/* ── Transform 2: swap the module loader for demo.js ─────────────────────── */
const SCRIPT_FROM = `  <script type="module" src="popup/init.js"></script>`;
const SCRIPT_TO =
`  <!-- Demo interactivity (replaces popup/init.js + chrome.* logic) -->
  <script src="${stamp('demo.js')}"></script>`;

if (html.includes(eol(SCRIPT_FROM))) html = html.replace(eol(SCRIPT_FROM), eol(SCRIPT_TO));
else fail.push('init.js <script> tag');

if (fail.length) {
  console.error('✗ Sync FAILED — these transform targets were not found:');
  fail.forEach((f) => console.error('   • ' + f));
  console.error('  popup.html structure changed; update sync-from-source.mjs to match.');
  process.exit(1);
}

/* ── Write only if changed ───────────────────────────────────────────────── */
const prev = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
const changed = prev !== html;
if (!changed) { console.log('✓ popup-demo.html already up to date.'); process.exit(0); }
writeFileSync(OUT, html, 'utf8');
console.log('✓ popup-demo.html regenerated from vendor/popup.html.');

/* ── Reminder (only when markup changed): which interactive element ids exist
 *    that demo.js may not wire up explicitly. ─────────────────────────────── */
try {
  const demo = readFileSync(join(here, 'demo.js'), 'utf8');
  const ids = [...html.matchAll(/<(?:button|input|select|textarea)[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
  const missing = [...new Set(ids)].filter((id) => !demo.includes(`'${id}'`) && !demo.includes(`"${id}"`) && !demo.includes(`$('${id}')`));
  if (missing.length) {
    console.log('\nℹ ' + missing.length + ' control id(s) are not referenced in demo.js.');
    console.log('  This is expected: the demo is a STATIC preview — only tab switching + theme are');
    console.log('  live and a capture-phase guard blocks the rest. These controls are display-only:');
    console.log('  ' + missing.slice(0, 40).join(', ') + (missing.length > 40 ? ' …' : ''));
  }
} catch { /* demo.js optional */ }
