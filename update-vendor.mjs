#!/usr/bin/env node
/**
 * update-vendor.mjs — Refresh the vendored extension snapshot, then re-sync.
 * ----------------------------------------------------------------------------
 * This promo repo is standalone. It keeps a *vendored copy* of the two extension
 * files the pixel-perfect preview depends on:
 *   • <ext>/popup.html        → vendor/popup.html
 *   • <ext>/css/popup.css     → vendor/popup.css
 *   • <ext>/icons/icon128.png → vendor/icon128.png
 *
 * Run this whenever the extension's popup UI changes, to pull the latest source
 * into vendor/ and regenerate popup-demo.html. This is the (manual) cross-repo
 * step that replaced the old PostToolUse hook from when promo lived inside the
 * extension repo.
 *
 * Extension repo location (first match wins):
 *   1. CLI arg:   node update-vendor.mjs "D:/path/to/Pocket QA"
 *   2. Env var:   EXT_REPO="D:/path/..." node update-vendor.mjs
 *   3. Default:   ../Pocket QA  (sibling folder on this machine)
 *
 * Exit: 0 = vendored + synced, 1 = extension repo / files not found.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const ext = resolve(
  process.argv[2] || process.env.EXT_REPO || join(here, '..', 'Pocket QA')
);

const files = [
  { from: join(ext, 'popup.html'),               to: join(here, 'vendor', 'popup.html')  },
  { from: join(ext, 'css', 'popup.css'),         to: join(here, 'vendor', 'popup.css')   },
  { from: join(ext, 'icons', 'icon128.png'),     to: join(here, 'vendor', 'icon128.png') },
];

const missing = files.filter((f) => !existsSync(f.from));
if (missing.length) {
  console.error('✗ Extension source not found under:', ext);
  missing.forEach((f) => console.error('   • missing', f.from));
  console.error('  Pass the extension repo path as an argument or set EXT_REPO.');
  process.exit(1);
}

mkdirSync(join(here, 'vendor'), { recursive: true });
for (const f of files) {
  copyFileSync(f.from, f.to);
  console.log('✓ vendored', f.to.replace(here + '\\', '').replace(here + '/', ''));
}

/* ── Version: keep the promo's own copy in step with the extension ──────────
 * The demo's Version card and the landing page footer both quote the shipped
 * version. They used to be hand-edited, and drifted (footer said 1.0.7 while
 * the extension was on 1.0.13), which is exactly the kind of "the demo doesn't
 * match the real thing" gap this script exists to close. */
// Read straight from the extension's manifest — only the string is vendored,
// so sync-from-source.mjs stays able to run from vendor/ alone.
const version = JSON.parse(readFileSync(join(ext, 'manifest.json'), 'utf8')).version;
writeFileSync(join(here, 'vendor', 'version.txt'), version + '\n', 'utf8');
console.log('✓ vendored vendor/version.txt (' + version + ')');

for (const name of ['index.html', 'feature.html']) {
  const p = join(here, name);
  const src = readFileSync(p, 'utf8');
  const out = src.replace(/<div>v\d+\.\d+\.\d+ · Manifest V3/, `<div>v${version} · Manifest V3`);
  if (out !== src) {
    writeFileSync(p, out, 'utf8');
    console.log('✓ ' + name + ' footer → v' + version);
  } else if (!src.includes(`<div>v${version} · Manifest V3`)) {
    console.warn('⚠ ' + name + ' footer version not found — update it by hand.');
  }
}

/* Regenerate popup-demo.html from the freshly vendored popup.html. */
const out = execFileSync(process.execPath, [join(here, 'sync-from-source.mjs')], { encoding: 'utf8' });
process.stdout.write(out);
