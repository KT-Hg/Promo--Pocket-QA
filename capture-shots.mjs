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
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ext = resolve(process.env.EXT_REPO || join(here, '..', 'Pocket QA'));
if (!existsSync(join(ext, 'manifest.json')) || !existsSync(join(ext, 'tools', 'lib', 'cdp-browser.mjs'))) {
  console.error('✗ No extension repo with tools/lib/cdp-browser.mjs at', ext, '— set EXT_REPO.');
  process.exit(1);
}
const { launchWithExtension, asActiveTab, sleep } = await import(pathToFileURL(join(ext, 'tools', 'lib', 'cdp-browser.mjs')));

// The web page the popup shots are taken "on" (served below as <base>/page): the popup treats it as the active,
// activated tab, the way the extension's own e2e tests open it. Its Apply button always fails, for a real failed run.
const PAGE = `<!doctype html><meta charset="utf-8"><title>Checkout — Shop</title>
<style>body { font: 16px/1.6 system-ui, sans-serif; margin: 40px auto; max-width: 640px; color: #1f2937 }</style>
<h1>Checkout</h1>
<p>Orders over $50 ship free. A coupon applies before tax and expires at midnight on its end date.</p>
<p>Returns are accepted within 30 days of delivery, in the original packaging, with the receipt.</p>
<p><label>Email <input id="email"></label> <label>Coupon <input id="coupon"></label>
<button id="apply" onclick="document.getElementById('toast').textContent = 'Error: coupon expired'">Apply</button></p>
<p id="toast"></p>`;
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
  const pick = (sel, value) => { const s = $(sel); s.value = value; s.dispatchEvent(new Event('change', { bubbles: true })); };
  // The popup: a main tab, a card by its ? button, a card opened, an element named for the capture
  const tab = id => $('#tabNav .tab-btn[data-tab="' + id + '"]').click();
  const card = name => $('[data-card="' + name + '"]').closest('.card');
  const opened = el => { el.classList.remove('collapsed'); return el; };
  const mark = (el, k = 'a') => { el.setAttribute('data-shot', k); return '[data-shot="' + k + '"]'; };
`;

// Image Diff's two inputs: a diagram shot, and the same with one row painted over
let diffPair;
const diffImages = () => diffPair ??= (() => {
  const a = join(here, 'screenshots', 'shot-sql-diagram.png'), b = join(mkdtempSync(join(tmpdir(), 'pqa-diff-')), 'after.png');
  execFileSync('python', ['-c', 'import sys; from PIL import Image, ImageDraw; i = Image.open(sys.argv[1]).convert("RGB"); '
    + 'ImageDraw.Draw(i).rectangle((420, 386, 636, 404), fill=(254, 226, 226)); i.save(sys.argv[2])', a, b]);
  return [a, b];
})();

// Popup shots' data, sent through the extension's own messages
const vars = (variables, order) => ({ type: 'SAVE_VARIABLES', variables, order: order || Object.keys(variables) });
const css = sel => ({ selector: sel, selectors: { css: sel } });
const click = (sel, label) => ({ type: 'click', ...css(sel), ...(label && { label }) });
const own = (value, startAt, endAt) => ({ value, scenarioId: '__self__', scenarioName: '↻ This scenario (jump)', startAt, endAt });
// A checkout whose coupon always fails: played, it leaves a real Failed run on the Last run card
const failingRun = async ({ scenario, play, set }) => {
  const id = await scenario('Checkout with coupon', [
    { type: 'input', ...css('#email'), value: 'qa@shop.test', label: 'Type the login email' },
    { type: 'input', ...css('#coupon'), value: 'SPRING25' },
    click('#apply', 'Apply the coupon'),
    { type: 'assert', conditionType: 'textContains', ...css('#toast'), expectedValue: 'Saved', label: 'Check the toast' }
  ]);
  await set({ lastSelectedScenario: id });
  await play(id);
};

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
  },
  {
    // DB Test Session's manager page: its Settings dialog (the parts held back by TABLE_COPIES stay hidden, as shipped)
    name: 'db-settings',
    page: 'dbtest.html',
    size: [1100, 900],
    setup: `
      await until(() => $('#btnSettings'), 'the page to start');
      await english('#btnLang');
      await themed('#toggleTheme', THEME);
      $('#btnSettings').click();
      await until(() => $('#settingsDlg').open, 'the Settings dialog');
      await wait(300);
      return '#settingsDlg';
    `
  },
  {
    // Record & Play's action list: a Condition, a Switch block of two cases, an Upload File step, a disabled step
    name: 'pop-actions',
    page: 'popup.html',
    size: [480, 1400],
    seed: async ({ send, set, scenario, base }) => {
      await send(vars({ role: 'admin', email: 'qa@shop.test' }));
      const id = await scenario('Checkout', [
        { type: 'navigate', url: base + '/page' },
        { type: 'input', ...css('#email'), value: '${email}', label: 'Type the login email' },
        click('#apply', 'Apply the coupon'),
        { type: 'condition', conditionType: 'elementVisible', ...css('.promo'), skipCount: 1 },
        click('.promo .close'),
        { type: 'switch', switchVar: '${role}', cases: [own('admin', 7, 8), own('user', 9, 9)] },
        click('#admin-orders'),
        { type: 'assert', conditionType: 'textContains', ...css('#toast'), expectedValue: 'Saved' },
        click('#my-orders'),
        { type: 'uploadFile', ...css('#invoice'), uploadMode: 'input', folderPath: 'C:\\\\data', fileNames: ['invoice.pdf'] },
        click('#logout')
      ]);
      await send({ type: 'TOGGLE_ACTION_DISABLED', scenarioId: id, index: 10 });
      await set({ lastSelectedScenario: id });
    },
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabRecord');
      if (!$('#actions').getClientRects().length) $('#preview').click();
      await until(() => document.querySelectorAll('#actions > li').length >= 11, 'the action list');
      $('#actions').style.maxHeight = 'none';   // the whole list, as a taller popup shows it, instead of a 200px scroller
      await wait(300);
      return mark($('#actions'));
    `
  },
  {
    name: 'pop-manage',
    page: 'popup.html',
    size: [480, 1200],
    seed: async ({ scenario }) => {
      for (const name of ['Login', 'Checkout with coupon', 'Refund an order', 'Nightly smoke']) await scenario(name, [click('#go')]);
    },
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabRecord');
      await wait(300);
      return mark(opened(card('manage')));
    `
  },
  {
    name: 'pop-sequence',
    page: 'popup.html',
    size: [480, 1400],
    seed: async ({ scenario }) => {
      for (const name of ['Login', 'Checkout with coupon', 'Refund an order']) await scenario(name, [click('#go')]);
    },
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabRecord');
      const c = opened($('#sequencePlaybackCard'));
      for (const name of ['Login', 'Checkout with coupon', 'Refund an order']) {
        pick('#sequenceScenarioList', [...$('#sequenceScenarioList').options].find(o => o.textContent.includes(name)).value);
        $('#addToRunList').click();
        await wait(200);
      }
      await until(() => document.querySelectorAll('#runListDisplay li').length === 3, 'the sequence');
      return mark(c);
    `
  },
  {
    name: 'pop-schedule',
    page: 'popup.html',
    size: [480, 1400],
    seed: async ({ scenario }) => {
      for (const name of ['Nightly smoke', 'Checkout with coupon']) await scenario(name, [click('#go')]);
    },
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabData');
      const c = opened($('#scheduledPlaybackCard'));
      const add = async (name, h, m, ampm, label, daily) => {
        pick('#scheduleScenarioSelect', [...$('#scheduleScenarioSelect').options].find(o => o.textContent.includes(name)).value);
        pick('#stHour', h); pick('#stMin', m); pick('#stAmPm', ampm);
        type('#scheduleLabel', label);
        $('#scheduleRepeat').checked = daily;
        $('#addSchedule').click();
        await wait(300);
      };
      await add('Nightly smoke', '8', '00', 'AM', 'Before stand-up', true);
      await add('Checkout with coupon', '1', '30', 'PM', 'After the deploy', false);
      await until(() => document.querySelectorAll('#scheduleList li').length === 2, 'the schedules');
      return mark(c);
    `
  },
  {
    name: 'pop-lastrun',
    page: 'popup.html',
    size: [480, 900],
    seed: failingRun,
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabRecord');
      await until(() => !$('#lastRunCard').hidden, 'the Last run card');
      return '#lastRunCard';
    `
  },
  {
    name: 'pop-bugreport',
    page: 'popup.html',
    size: [480, 900],
    seed: failingRun,
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabRecord');
      await until(() => !$('#lastRunCard').hidden && !$('#lastRunBugReport').hidden, 'the Bug report button');
      $('#lastRunBugReport').click();
      await until(() => $('#bugReportModal').classList.contains('show'), 'the bug report');
      await wait(400);
      return mark($('#bugReportModal').firstElementChild);
    `
  },
  {
    // Data → Variables: userEmail renamed to loginEmail — the toast counts what followed
    name: 'pop-rename',
    page: 'popup.html',
    size: [480, 400],   // short, so the toast (pinned to the bottom) sits right under the Variables card
    seed: async ({ send, scenario }) => {
      await send(vars({ userEmail: 'qa@shop.test', plan: 'pro', coupon: 'SPRING25' }));
      await scenario('Login', [{ type: 'input', ...css('#email'), value: '${userEmail}', label: 'Type ${userEmail}' }]);
      await scenario('Checkout with coupon', [{ type: 'input', ...css('#email'), value: '${userEmail}' }, { type: 'input', ...css('#coupon'), value: '${coupon}' }]);
    },
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabData');
      const c = opened(card('variables'));
      await until(() => $('li.var-row[data-key="userEmail"]'), 'the variables');
      $('li.var-row[data-key="userEmail"] .vr-edit').click();
      await until(() => $('#randomModal').classList.contains('show'), 'the variable dialog');
      $('#randomVarName').value = 'loginEmail';
      $('#confirmRandom').click();
      await until(() => /scenario/.test($('#toast').textContent), 'the toast');
      await wait(400);
      return [mark(c), '#toast'];
    `
  },
  {
    name: 'pop-backup',
    page: 'popup.html',
    size: [480, 1400],
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabSettings');
      await wait(300);
      return mark(opened($('#backupRestoreCard')));
    `
  },
  {
    name: 'pop-shot-settings',
    page: 'popup.html',
    size: [480, 1600],
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabSettings');
      await wait(300);
      return mark(opened(card('screenshot')));
    `
  },
  {
    name: 'pop-highlights',
    page: 'popup.html',
    size: [480, 1200],
    seed: async ({ set, base }) => {
      const at = (text, color, note, url) => ({ id: 'h' + text.length + color, text, color, note, createdAt: 1793600000000, srcUrl: url });
      await set({ hl_v1: {
        [base + '/page']: [
          at('A coupon applies before tax', 'yellow', 'Check the total with a 10% coupon', base + '/page'),
          at('expires at midnight on its end date', 'pink', 'Which time zone?', base + '/page'),
          at('within 30 days of delivery', 'green', '', base + '/page')
        ],
        'https://docs.shop.test/returns': [at('Refunds go back to the original card', 'blue', 'Ask finance about gift cards', 'https://docs.shop.test/returns')]
      } });
    },
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabHighlight');
      await until(() => document.querySelectorAll('#hlList li').length, 'the highlights');
      await wait(300);
      return mark($('#tabHighlight'));
    `
  },
  {
    name: 'pop-image-diff',
    page: 'popup.html',
    size: [480, 900],
    files: { '#diffFileA': () => [diffImages()[0]], '#diffFileB': () => [diffImages()[1]] },
    setup: `
      await themed('#toggleTheme', THEME);
      tab('tabCapture');
      $('#diffScreenshots').click();
      await until(() => $('#diffModal').classList.contains('show'), 'Image Diff');
      $('#diffFileA').dispatchEvent(new Event('change', { bubbles: true }));
      $('#diffFileB').dispatchEvent(new Event('change', { bubbles: true }));
      await wait(300);
      $('#diffRun').click();
      await until(() => $('#diffStats').textContent.trim(), 'the comparison');
      await wait(500);
      return mark($('#diffModal').firstElementChild);
    `
  }
];

const wanted = process.argv.slice(2);
const unknown = wanted.filter(n => !SHOTS.some(s => s.name === n));
if (unknown.length) { console.error('✗ No such shot:', unknown.join(', '), '— known:', SHOTS.map(s => s.name).join(', ')); process.exit(1); }

let browser, server;
try { browser = await launchWithExtension(ext); } catch (e) { console.error('✗', e.message); process.exit(1); }
let failed = 0;
try {
  const sw = await browser.serviceWorker();
  if (!sw) throw new Error('the extension did not start (no service worker)');
  const extUrl = p => `chrome-extension://${sw.extId}/${p}`;
  server = createServer((req, res) => res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(PAGE));
  // A fixed port, so the URL the popup and the bug report show is the same every run (any free one if it is taken)
  await new Promise((r, j) => server.once('error', j).listen(4170, '127.0.0.1', r)).catch(() => new Promise(r => server.listen(0, '127.0.0.1', r)));
  const base = `http://127.0.0.1:${server.address().port}`;
  // What a shot's `seed(ctx)` gets: `send` a message to the extension's worker (from an extension page, as the e2e
  // tests do), `set` storage, `play` a scenario on the web page until the run ends
  const extPage = await browser.openPage(extUrl('dbtest.html'));
  const web = await browser.openPage(`${base}/page`, { width: 1000, height: 700 });
  const send = msg => extPage.evaluate(`new Promise(r => chrome.runtime.sendMessage(${JSON.stringify(msg)}, x => r(x ?? null)))`);
  const set = items => extPage.evaluate(`chrome.storage.local.set(${JSON.stringify(items)})`);
  const webTabId = await extPage.evaluate(`new Promise(r => chrome.tabs.query({ url: ${JSON.stringify(base + '/page*')} }, t => r(t[0]?.id)))`);
  const scenario = async (name, actions) => {
    const { id } = await send({ type: 'CREATE_SCENARIO', name });
    for (const action of actions) await send({ type: 'ADD_MANUAL_ACTION', scenarioId: id, action });
    return id;
  };
  const play = async scenarioId => {
    await web.bringToFront();
    await send({ type: 'START_PLAYBACK_SCENARIO', scenarioId });
    await sleep(500);
    for (let t = 0; t < 30_000 && (await send({ type: 'GET_EXTENSION_STATUS' }))?.playing; t += 250) await sleep(250);
  };
  const ctx = { base, send, set, scenario, play };
  for (const shot of SHOTS.filter(s => !wanted.length || wanted.includes(s.name))) {
    for (const theme of ['light', 'dark']) {
      const out = join(here, 'screenshots', 'shot-' + shot.name + (theme === 'dark' ? '-dark' : ''));
      const [width, height] = shot.size;
      // Pages remember their last state (open tab, mode, theme): every shot starts from none
      await sw.evaluate('chrome.storage.local.clear().then(() => chrome.storage.sync.clear())');
      if (shot.seed) await shot.seed(ctx);
      const page = shot.page === 'popup.html'
        ? await browser.openPage(extUrl('popup.html'), { initScript: asActiveTab(`${base}/page`), width, height })
        : await browser.openPage(extUrl(shot.page), { width, height });
      try {
        if (shot.page === 'popup.html') {
          await page.evaluate(`chrome.storage.local.set({ activatedTabs: [${webTabId}] })`);
          await page.reload();
          await sleep(1500);
        }
        // <input type="file"> filled the way a user picking files would: DOM.setFileInputFiles
        for (const [sel, files] of Object.entries(shot.files || {})) {
          const { root } = await page.send('DOM.getDocument');
          const { nodeId } = await page.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
          await page.send('DOM.setFileInputFiles', { nodeId, files: files() });
        }
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
  server?.close();
}
process.exit(failed ? 1 : 0);
