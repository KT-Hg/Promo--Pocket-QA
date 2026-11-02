#!/usr/bin/env node
/**
 * capture-shots.mjs — Screenshots of the real extension for the feature pages.
 * ----------------------------------------------------------------------------
 * Loads the unpacked extension in Edge or Chromium through the extension repo's
 * own CDP driver (tools/lib/cdp-browser.mjs, the one its e2e tests use), opens
 * one of its pages as chrome-extension://<id>/<page>, sets it up with the page's
 * own controls, and saves one element of it — light, then dark — as
 * screenshots/shot-<name>[-dark].png and .webp. Nothing is mocked: what is in the
 * picture is what the extension draws. Every run starts from a fresh profile,
 * so a shot comes out the same each time.
 *
 * The extension repo is found like update-vendor.mjs finds it:
 *   EXT_REPO="D:/path/to/Pocket QA" node capture-shots.mjs   (default ../Pocket QA)
 *
 * Usage:  node capture-shots.mjs [name…]     no name = every shot below
 * Needs:  Edge or Chromium (branded Chrome ignores --load-extension), Python with Pillow for the WebP twins.
 * Exit:   0 = all saved, 1 = no browser / extension / Pillow, or a shot failed.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ext = resolve(process.env.EXT_REPO || join(here, '..', 'Pocket QA'));
if (!existsSync(join(ext, 'manifest.json')) || !existsSync(join(ext, 'tools', 'lib', 'cdp-browser.mjs'))) {
  console.error('✗ No extension repo with tools/lib/cdp-browser.mjs at', ext, '— set EXT_REPO.');
  process.exit(1);
}
const { launchWithExtension } = await import(pathToFileURL(join(ext, 'tools', 'lib', 'cdp-browser.mjs')));
const WEBP = 'import sys; from PIL import Image; Image.open(sys.argv[1]).save(sys.argv[2], lossless=True, quality=100, method=6)';
try { execFileSync('python', ['-c', 'import PIL'], { stdio: 'ignore' }); } catch {
  console.error('✗ The WebP twins need Python with Pillow (pip install pillow).');
  process.exit(1);
}

// In every page before a shot's setup: wait for a condition, and put the page in English and a given theme
// through its own buttons (both are remembered by the page, so they are checked before each click).
const HELPERS = `
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const until = async (test, what, ms = 10000) => {
    for (let t = 0; t < ms; t += 100) { if (test()) return; await wait(100); }
    throw new Error('timed out waiting for ' + what);
  };
  const $ = s => document.querySelector(s);
  const english = async btn => { if (document.documentElement.lang !== 'en') { $(btn).click(); await until(() => document.documentElement.lang === 'en', 'English'); } };
  const themed = async (btn, theme) => { if ((document.documentElement.dataset.theme || 'light') !== theme) { $(btn).click(); await until(() => document.documentElement.dataset.theme === theme, theme); } };
  const type = (sel, text) => { const t = $(sel); t.value = text; t.dispatchEvent(new Event('input', { bubbles: true })); };
`;

// One entry per picture. `setup` runs in the page (with HELPERS and THEME) and returns the selector of the
// element to capture — or several, for the box around all of them; the shot is that box.
const SHOTS = [
  {
    name: 'sql-diagram',
    page: 'sqltest.html',
    size: [1100, 700],   // the dialog is 86vh: 700 makes it a whole 602px, no half-covered last row
    setup: `
      await until(() => $('#btnAnalyze') && $('#sqlInput').value, 'the page to start');
      await english('#toggleLang');
      await themed('#toggleTheme', THEME);
      type('#sqlInput', [
        'SELECT c.name, o.id, p.title, oi.qty',
        '  FROM customers c',
        '  JOIN orders o ON o.customer_id = c.id',
        '  JOIN order_items oi ON oi.order_id = o.id',
        '  JOIN products p ON p.id = oi.product_id',
        " WHERE o.status = 'PAID' AND oi.qty >= 2"
      ].join('\\n'));
      $('#btnAnalyze').click();
      await until(() => !$('[data-rt="schema"]').hidden, 'the Schema tab');
      $('[data-rt="schema"]').click();
      $('#btnDiagram').click();
      await until(() => !$('#diagramModal').hidden && document.querySelectorAll('.dgm-table').length === 4, 'the diagram');
      document.querySelectorAll('.toast').forEach(t => t.remove());
      await wait(600);   // the open transition
      $('#btnDgFit').click();   // the boxes fill the stage instead of sitting small in its middle
      await wait(400);
      return '#diagramModal .modal';
    `
  },
  {
    // Compare mode on the first example (the report query): the age range moved, the country filter went
    name: 'sql-compare',
    page: 'sqltest.html',
    size: [1600, 900],
    setup: `
      await until(() => $('#btnAnalyze') && $('#sqlInput').value, 'the page to start');
      await english('#toggleLang');
      await themed('#toggleTheme', THEME);
      [...document.querySelectorAll('#modeToggle button')].find(b => /Compare/.test(b.textContent)).click();
      await until(() => !$('#sqlAfterCard').hidden, 'the second query box');
      type('#sqlInputAfter', $('#sqlInput').value.replace('BETWEEN 18 AND 65', 'BETWEEN 21 AND 65').replace(/\\s+AND u\\.country IN \\('VN', 'SG'\\)/, ''));
      $('#btnAnalyze').click();
      await until(() => !$('#triage').hidden && !$('#insight').hidden, 'the triage');
      [...document.querySelectorAll('#insightTabs > button')].find(b => /Changes/.test(b.textContent)).click();
      document.querySelectorAll('.toast').forEach(t => t.remove());
      await wait(400);
      return ['#triage', '#insight'];
    `
  },
  {
    // The "Compound WHERE" example: its coverage card, with the decision table's mode and the per-clause numbers
    name: 'sql-coverage',
    page: 'sqltest.html',
    size: [1600, 900],
    setup: `
      await until(() => $('#btnAnalyze') && $('#sqlInput').value, 'the page to start');
      await english('#toggleLang');
      await themed('#toggleTheme', THEME);
      const sel = $('#sampleSelect');
      sel.value = '2'; sel.dispatchEvent(new Event('change', { bubbles: true }));
      $('#btnAnalyze').click();
      await until(() => !$('#insight').hidden, 'the analysis');
      [...document.querySelectorAll('#insightTabs > button')].find(b => /Coverage/.test(b.textContent)).click();
      document.querySelectorAll('.toast').forEach(t => t.remove());
      await wait(400);
      return '#insight';
    `
  }
];

const wanted = process.argv.slice(2);
const unknown = wanted.filter(n => !SHOTS.some(s => s.name === n));
if (unknown.length) { console.error('✗ No such shot:', unknown.join(', '), '— known:', SHOTS.map(s => s.name).join(', ')); process.exit(1); }

let browser;
try { browser = await launchWithExtension(ext); } catch (e) { console.error('✗', e.message); process.exit(1); }
let failed = 0;
try {
  const sw = await browser.serviceWorker();
  if (!sw) throw new Error('the extension did not start (no service worker)');
  for (const shot of SHOTS.filter(s => !wanted.length || wanted.includes(s.name))) {
    for (const theme of ['light', 'dark']) {
      const out = join(here, 'screenshots', 'shot-' + shot.name + (theme === 'dark' ? '-dark' : ''));
      const [width, height] = shot.size;
      // Pages remember their last state (open tab, mode, theme): every shot starts from none
      await sw.evaluate('chrome.storage.local.clear().then(() => chrome.storage.sync.clear())');
      const page = await browser.openPage(`chrome-extension://${sw.extId}/${shot.page}`, { width, height });
      try {
        const sel = await page.evaluate(`(async () => { const THEME = ${JSON.stringify(theme)}; ${HELPERS} ${shot.setup} })()`, 30_000);
        const box = await page.evaluate(`(() => {
          const rs = [].concat(${JSON.stringify(sel)}).map(s => document.querySelector(s).getBoundingClientRect());
          const x = Math.min(...rs.map(r => r.left)), y = Math.min(...rs.map(r => r.top));
          return { x, y, width: Math.max(...rs.map(r => r.right)) - x, height: Math.max(...rs.map(r => r.bottom)) - y };
        })()`);
        const { data } = await page.send('Page.captureScreenshot', { format: 'png', clip: { ...box, scale: 1 } });
        writeFileSync(`${out}.png`, Buffer.from(data, 'base64'));
        // The pages serve lossless WebP twins (README "Screenshot comparison"); Chrome's own WebP is lossy even at
        // quality 100, so Pillow makes it, as for the other shots
        execFileSync('python', ['-c', WEBP, `${out}.png`, `${out}.webp`]);
        const errors = page.errors();
        if (errors.length) console.warn(`  ⚠ ${shot.name} (${theme}) page errors:\n    ${errors.join('\n    ')}`);
        console.log(`✓ ${shot.name}${theme === 'dark' ? '-dark' : ''} — ${Math.round(box.width)}×${Math.round(box.height)}`);
      } catch (e) {
        failed++;
        console.error(`✗ ${shot.name} (${theme}): ${e.message}`);
      } finally {
        await page.close();
      }
    }
  }
} catch (e) {
  failed++;
  console.error('✗', e.message);
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
