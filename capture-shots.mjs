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
 * so a shot comes out the same each time. The one stand-in is the server the API
 * Tests shots call (api.shop.example): CDP answers its requests, below.
 *
 * The extension repo is found like update-vendor.mjs finds it:
 *   EXT_REPO="D:/path/to/Pocket QA" node capture-shots.mjs   (default ../Pocket QA)
 *
 * Usage:  node capture-shots.mjs [name…]     no name = every shot below
 *         node capture-shots.mjs parity      the demo popup against the real one, pixel by pixel (below)
 * Needs:  Edge or Chromium (branded Chrome ignores --load-extension), Python with Pillow for the WebP twins.
 * Exit:   0 = all saved, 1 = no browser / extension / Pillow, or a shot failed.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
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
// The API Tests shots: a "Shop" folder of requests to a server that does not exist. The page's own fetch() goes out
// as usual and CDP (Fetch.requestPaused) answers it here, so the picture shows a real-looking host, nothing leaves
// the machine, and the request, checks and verdict are the page's own.
const API = 'https://api.shop.example';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3In0.qa';
const API_ROUTES = {   // 'METHOD /path' → [status, body, content type]
  'POST /auth/login': [200, { access_token: TOKEN, token_type: 'Bearer', expires_in: 3600 }],
  'GET /orders/42': [200, { data: { id: 42, status: 'PAID', total: 128.5, currency: 'USD',
    customer: { id: 7, email: 'qa@shop.test' }, items: [{ sku: 'TEE-01', qty: 2, price: 39.5 }, { sku: 'MUG-03', qty: 1, price: 49.5 }] } }],
  'GET /orders': [200, { data: [{ id: 42, status: 'PAID', total: 128.5 }, { id: 44, status: 'PAID', total: 61 }], total: 2 }],
  'DELETE /orders/43': [204, ''],
  'GET /reports/today': [200, '<!doctype html><title>Daily report</title><h1>Daily report</h1>', 'text/html']
};
const answerApi = async page => {
  await page.send('Fetch.enable', { patterns: [{ urlPattern: API + '/*' }] });
  let next = page.waitEvent('Fetch.requestPaused', 600_000);
  (async () => {
    for (;;) {
      const e = await next.catch(() => null);
      if (!e) return;
      next = page.waitEvent('Fetch.requestPaused', 600_000);   // before answering: the next request may already be on its way
      const { requestId, request } = e.params;
      const [status, body, type = 'application/json'] = API_ROUTES[`${request.method} ${new URL(request.url).pathname}`]
        || [404, { error: 'Not found' }];
      await sleep(90);   // a server's answer, not an instant one
      await page.send('Fetch.fulfillRequest', {
        requestId, responseCode: status,
        responseHeaders: [{ name: 'Content-Type', value: `${type}; charset=utf-8` }, { name: 'X-Request-Id', value: 'req-7f3a9c' }],
        body: Buffer.from(typeof body === 'string' ? body : JSON.stringify(body)).toString('base64')
      }).catch(() => {});
    }
  })();
};
// What the API Tests page holds when a shot opens it: chrome.storage.local apiCasesState (apicases/model.js)
const jsonCheck = (path, op, expected = '') => ({ on: 'json', path, op, expected });
const API_STATE = {
  folders: [{ id: 'shop', name: 'Shop', auth: { type: 'bearer', token: '${token}' } }],
  cases: [
    { id: 'login', name: 'Log in', method: 'POST', url: '${baseUrl}/auth/login', headers: 'Content-Type: application/json',
      bodyType: 'json', body: '{\n  "email": "${email}",\n  "password": "${password}"\n}', auth: { type: 'none' },
      extracts: [{ varName: 'token', from: 'json', path: 'access_token' }] },
    { id: 'order', name: 'Get order', method: 'GET', url: '${baseUrl}/orders/42', headers: 'Accept: application/json',
      checks: [{ on: 'status', op: 'is', expected: '2xx' }, jsonCheck('data.status', 'equals', 'PAID'), jsonCheck('data.total', 'gt', '0'),
        { on: 'header', path: 'Content-Type', op: 'contains', expected: 'json' }] },
    { id: 'orders', name: 'List paid orders', method: 'GET', url: '${baseUrl}/orders?status=PAID',
      checks: [{ on: 'status', op: 'is', expected: '200' }, jsonCheck('total', 'equals', '3'), { on: 'time', op: 'lt', expected: '500' }] },
    { id: 'cancel', name: 'Cancel order', method: 'DELETE', url: '${baseUrl}/orders/43' },
    { id: 'report', name: 'Daily report', method: 'GET', url: '${baseUrl}/reports/today', checks: [jsonCheck('data.sales', 'exists')] }
  ].map(c => ({ folderId: 'shop', headers: '', bodyType: 'none', body: '', timeoutMs: 30_000, cookies: true, auth: { type: 'inherit' },
    checks: [], extracts: [], ...c })),
  environments: [
    { id: 'dev', name: 'Dev', vars: [['baseUrl', API], ['email', 'qa@shop.test'], ['password', 'Spring-2026!'], ['token', TOKEN]].map(([name, value]) => ({ name, value })) },
    { id: 'staging', name: 'Staging', vars: [{ name: 'baseUrl', value: 'https://staging.shop.example' }] }
  ],
  envId: 'dev', folderId: 'shop', caseId: 'order'
};
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
      await wait(500);   // the theme just switched: the failure line's colour is still easing from light to dark
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
      // It sits below a 1400px popup: a clip outside the viewport comes back as bare background
      const c = opened($('#backupRestoreCard'));
      c.scrollIntoView({ block: 'center' });
      await wait(500);
      return mark(c);
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
  },
  {
    // API Tests: "Get order" sent — the Headers tab, then the verdict, status, time, size and the URL as sent
    name: 'api-send',
    page: 'apitest.html',
    size: [1400, 900],
    api: true,
    seed: ({ set }) => set({ apiCasesState: API_STATE }),
    setup: `
      await until(() => $('.ac-send'), 'the open request');
      await themed('#toggleTheme', THEME);
      $('.ac-send').click();
      await until(() => $('.ac-verdict'), 'the response');
      document.querySelectorAll('.toast').forEach(t => t.remove());
      await wait(400);
      // Down to the line naming what was sent: the whole column shrinks to a third on the page and can't be read
      const insp = $('#insp'), sent = $('#insp .ac-resp-meta').nextElementSibling;
      insp.style.height = Math.ceil(sent.getBoundingClientRect().bottom - insp.getBoundingClientRect().top + 14) + 'px';
      insp.style.overflow = 'hidden';
      return '#insp';
    `
  },
  {
    // "List paid orders" sent with its Checks tab open: two checks hold, one does not — a Failed verdict and its reason
    name: 'api-checks',
    page: 'apitest.html',
    size: [1400, 900],
    api: true,
    seed: ({ set }) => set({ apiCasesState: { ...API_STATE, caseId: 'orders' } }),
    setup: `
      await until(() => $('.ac-send') && $('.rtab[data-k="checks"]'), 'the open request');
      await themed('#toggleTheme', THEME);
      $('.rtab[data-k="checks"]').click();
      $('.ac-send').click();
      await until(() => $('.ac-verdict'), 'the response');
      document.querySelectorAll('.toast').forEach(t => t.remove());
      await wait(400);
      // Down to the line naming what was sent: the whole column shrinks to a third on the page and can't be read
      const insp = $('#insp'), sent = $('#insp .ac-resp-meta').nextElementSibling;
      insp.style.height = Math.ceil(sent.getBoundingClientRect().bottom - insp.getBoundingClientRect().top + 14) + 'px';
      insp.style.overflow = 'hidden';
      return '#insp';
    `
  },
  {
    // Manage → the Environments dialog: Dev in use, its variables, and the Data tab's under them (Dev's email wins)
    name: 'api-env',
    page: 'apitest.html',
    size: [1400, 900],
    seed: async ({ send, set }) => {
      await send(vars({ email: 'demo@shop.test', locale: 'en-US' }));
      await set({ apiCasesState: API_STATE });
    },
    setup: `
      await until(() => $('.ac-send'), 'the page to start');
      await themed('#toggleTheme', THEME);
      $('#btnEnvs').click();
      await until(() => $('.modal.ac-envs'), 'the Environments dialog');
      await wait(300);
      return '.modal.ac-envs';
    `
  },
  {
    // ▶ Run folder: it asks first, since "Cancel order" is a DELETE — the question names the host
    name: 'api-ask',
    page: 'apitest.html',
    size: [1400, 900],
    seed: ({ set }) => set({ apiCasesState: API_STATE }),
    setup: `
      await until(() => $('#runBar button'), 'the run bar');
      await themed('#toggleTheme', THEME);
      [...document.querySelectorAll('#runBar button')].find(b => /Run folder/.test(b.textContent)).click();
      await until(() => !$('#askModal').hidden, 'the question');
      await wait(300);
      return '#askModal .modal';
    `
  },
  {
    // The Shop folder after ▶ Run folder (Send on the question): ✓ ✗ ⚠ per request, the tally on the run bar
    name: 'api-run',
    page: 'apitest.html',
    size: [1400, 760],
    api: true,
    seed: ({ set }) => set({ apiCasesState: API_STATE }),
    setup: `
      await until(() => $('#runBar button'), 'the run bar');
      await themed('#toggleTheme', THEME);
      [...document.querySelectorAll('#runBar button')].find(b => /Run folder/.test(b.textContent)).click();
      await until(() => !$('#askModal').hidden, 'the question');
      $('#askOk').click();
      await until(() => /Last run/.test($('#runBar').textContent) && !$('.ac-stop'), 'the run to end', 20000);
      document.querySelectorAll('.toast').forEach(t => t.remove());
      await wait(400);
      return ['#listHead', '#caseList'];
    `
  },
  {
    // Import → a Postman collection read and previewed: where its requests go, what is left out or changed
    name: 'api-import',
    page: 'apitest.html',
    size: [1400, 900],
    seed: ({ set }) => set({ apiCasesState: API_STATE }),
    setup: `
      await until(() => $('.ac-send'), 'the page to start');
      await themed('#toggleTheme', THEME);
      [...document.querySelectorAll('button')].find(b => b.textContent === 'Import').click();
      await until(() => $('.modal.ac-import .ac-file'), 'the Import dialog');
      // The extension's own sample collection (tests/fixtures), picked as a file would be
      const text = await (await fetch('tests/fixtures/postman-sample.json')).text();
      const dt = new DataTransfer();
      dt.items.add(new File([text], 'Shop.postman_collection.json', { type: 'application/json' }));
      const input = $('.modal.ac-import .ac-file');
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      await until(() => $('.ac-import-info').children.length, 'the preview');
      await wait(300);
      return '.modal.ac-import';
    `
  }
];

// ── Parity: `node capture-shots.mjs parity` ──────────────────────────────────────────────────────────────────
// The real popup, seeded with the data demo.js shows (§4–§8), next to popup-demo.html: every tab, both themes, at
// the toolbar popup's 480×600. Pillow reports where each pair differs and writes real | demo | diff strips to
// PARITY_OUT (default: a temp folder). README "Parity check" lists the differences that are expected, and why.
const PARITY_URL = 'https://app.example.com/login';   // the tab the demo's popup is "on"
// Highlight last: once its tab has been opened the real popup shows its badge (highlight.js loads then), and a
// fresh demo page does not
const PARITY_TABS = ['tabRecord', 'tabData', 'tabCapture', 'tabSettings', 'tabHighlight'];
const PARITY_PAGE = '<!doctype html><meta charset="utf-8"><title>Log in — App</title><h1>Log in</h1>'
  + '<p><input id="email"> <input id="password" type="password"> <button class="btn-login">Log in</button></p>';
const paritySeed = async ({ send, set, scenario }) => {
  // demo.js §6: one variable of each kind, in this order
  await send(vars({
    email: { activeType: 'p', p: ['john@acme.com', 'jane@acme.com', 'qa@acme.com', 'ops@acme.com'] },
    password: { activeType: 's', s: 'Spring-2026!' },
    orderId: { activeType: 'r', r: { type: 'alphanumeric', length: '8' } },
    role: { activeType: 'f', f: ['admin', 'editor', 'viewer'] }
  }));
  // demo.js §5 + §8: "Login flow" first, the other three after it
  const id = await scenario('Login flow', [
    { type: 'navigate', url: PARITY_URL },
    { type: 'input', ...css('#email'), value: '${email}', label: 'Email' },
    { type: 'input', ...css('#password'), value: '${password}', label: 'Password', secret: true },
    { type: 'click', ...css('button.btn-login'), label: 'Log in', delay: 500 },
    { type: 'assert', conditionType: 'textContains', ...css('.welcome'), expectedValue: 'Welcome back' },
    { type: 'condition', conditionType: 'elementVisible', ...css('.promo-modal'), skipCount: 1 },
    click('.promo-modal .close', 'Close'),
    { type: 'screenshot', value: 'Visible viewport' },
    click('#logout', 'Log out')
  ]);
  await send({ type: 'TOGGLE_ACTION_DISABLED', scenarioId: id, index: 8 });
  for (const name of ['Checkout — happy path', 'Bulk invoice upload', 'Profile update']) await scenario(name, [click('#go')]);
  for (const name of ['Smoke tests', 'Regression', 'Demos']) await send({ type: 'CREATE_FOLDER', name });
  // demo.js §7: five highlights on this page, others on two more pages
  const hl = (url, texts) => texts.map(([color, text], i) => ({ id: url.length + color + i, text, color, note: '', createdAt: 1793600000000 + i, srcUrl: url }));
  await set({
    lastSelectedScenario: id,
    // demo.js §5b: it played a few minutes ago and passed (its Assert held)
    lastRun: { scenarioId: id, scenarioName: 'Login flow', endedAt: Date.now() - 3 * 60_000, completed: true, verdict: { status: 'passed', checks: 1 }, failures: [] },
    // background.js onInstalled: a fresh install has the screenshot countdown on (storage was just cleared)
    screenshotCountdownEnabled: true, screenshotCountdownSeconds: 3,
    hl_v1: {
      [PARITY_URL]: hl(PARITY_URL, [
        ['yellow', 'Record any web workflow with a single click — no code required.'],
        ['green', 'CSV data-driven runs repeat a scenario across hundreds of rows automatically.'],
        ['pink', 'Export to Selenium Python or a JS bookmarklet in one tap.'],
        ['blue', 'Capture full-page, scrolling, and element screenshots.'],
        ['orange', 'Variables, conditions, and switch logic make scenarios truly dynamic.']]),
      'https://docs.example.com': hl('https://docs.example.com', [['yellow', 'Docs one'], ['green', 'Docs two'], ['blue', 'Docs three']]),
      'https://blog.example.com': hl('https://blog.example.com', [['pink', 'Blog one']])
    }
  });
};
// Per pair: the box that differs and how many pixels; a real | demo | diff strip for each
const PARITY_DIFF = `
import sys, json
from PIL import Image, ImageChops
out = []
for real, demo, strip in json.loads(sys.argv[1]):
    a, b = Image.open(real).convert('RGB'), Image.open(demo).convert('RGB')
    d = ImageChops.difference(a, b)
    mask = d.convert('L').point(lambda v: 255 if v > 24 else 0)
    n = mask.histogram()[255]
    s = Image.new('RGB', (a.width * 3 + 16, a.height), (255, 255, 255))
    s.paste(a, (0, 0)); s.paste(b, (a.width + 8, 0))
    s.paste(Image.composite(Image.new('RGB', a.size, (220, 38, 38)), a.point(lambda v: 128 + v // 2), mask), (a.width * 2 + 16, 0))
    s.save(strip)
    out.append({'strip': strip, 'box': mask.getbbox(), 'pixels': n, 'share': round(100 * n / (a.width * a.height), 2)})
print(json.dumps(out))
`;

const wanted = process.argv.slice(2);
const parity = wanted[0] === 'parity';
const unknown = parity ? [] : wanted.filter(n => !SHOTS.some(s => s.name === n));
if (unknown.length) { console.error('✗ No such shot:', unknown.join(', '), '— known:', SHOTS.map(s => s.name).join(', ')); process.exit(1); }

let browser, server;
try { browser = await launchWithExtension(ext); } catch (e) { console.error('✗', e.message); process.exit(1); }
let failed = 0;
try {
  const sw = await browser.serviceWorker();
  if (!sw) throw new Error('the extension did not start (no service worker)');
  const extUrl = p => `chrome-extension://${sw.extId}/${p}`;
  // /page is the sample web page; /promo/… is this repo, for the parity check's popup-demo.html
  const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };
  server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (!path.startsWith('/promo/')) return res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(PAGE);
    const file = resolve(here, '.' + path.slice(6));
    if (!file.startsWith(here) || !existsSync(file)) return res.writeHead(404).end();
    res.writeHead(200, { 'content-type': (TYPES[extname(file)] || 'application/octet-stream') + '; charset=utf-8' }).end(readFileSync(file));
  });
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
  if (parity) {
    // The tab the popup is on: https://app.example.com/login, answered here through CDP like the API shots
    const app = await browser.openPage('about:blank', { width: 1000, height: 700 });
    await app.send('Fetch.enable', { patterns: [{ urlPattern: 'https://app.example.com/*' }] });
    const paused = app.waitEvent('Fetch.requestPaused', 30_000);
    const loaded = app.goto(PARITY_URL);
    await app.send('Fetch.fulfillRequest', { requestId: (await paused).params.requestId, responseCode: 200,
      responseHeaders: [{ name: 'Content-Type', value: 'text/html; charset=utf-8' }], body: Buffer.from(PARITY_PAGE).toString('base64') });
    await loaded;
    const appTabId = await extPage.evaluate(`new Promise(r => chrome.tabs.query({ url: ${JSON.stringify(PARITY_URL + '*')} }, t => r(t[0]?.id)))`);
    const dir = process.env.PARITY_OUT || mkdtempSync(join(tmpdir(), 'pqa-parity-'));
    mkdirSync(dir, { recursive: true });
    await sw.evaluate('chrome.storage.local.clear().then(() => chrome.storage.sync.clear())');
    await paritySeed(ctx);
    await set({ activatedTabs: [appTabId] });
    const shoot = async (page, file) => writeFileSync(file, Buffer.from((await page.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
    const pairs = [];
    for (const theme of ['light', 'dark']) {
      await set({ lastTab: 'tabRecord' });   // the popup reopens on the tab it was left on
      const real = await browser.openPage(extUrl('popup.html'), { initScript: asActiveTab(PARITY_URL), width: 480, height: 600 });
      await sleep(1500);
      await real.evaluate(`(async () => { const THEME = ${JSON.stringify(theme)}; ${HELPERS} await themed('#toggleTheme', THEME); })()`);
      for (const id of PARITY_TABS) {
        const name = `${id}-${theme}`;
        await real.evaluate(`(() => { ${HELPERS} tab(${JSON.stringify(id)}); document.querySelector('.main-content')?.scrollTo(0, 0); })()`);
        await sleep(900);   // the panel's fade-in
        await shoot(real, join(dir, `${name}-real.png`));
        const demo = await browser.openPage(`${base}/promo/popup-demo.html?tab=${id}&theme=${theme}`, { width: 480, height: 600 });
        await sleep(900);
        await shoot(demo, join(dir, `${name}-demo.png`));
        await demo.close();
        pairs.push([join(dir, `${name}-real.png`), join(dir, `${name}-demo.png`), join(dir, `${name}-diff.png`)]);
      }
      const errors = real.errors();
      if (errors.length) console.warn(`  ⚠ popup (${theme}) page errors:\n    ${errors.join('\n    ')}`);
      await real.close();
    }
    for (const r of JSON.parse(execFileSync('python', ['-c', PARITY_DIFF, JSON.stringify(pairs)], { encoding: 'utf8' }))) {
      console.log(`${r.pixels ? '≠' : '='} ${r.strip.replace(/.*[\\/]/, '').replace('-diff.png', '').padEnd(18)} ${r.pixels ? `${r.share}% of the popup, box ${JSON.stringify(r.box)}` : 'identical'}`);
    }
    // README's picture of it: Record & Play, light — the busiest tab
    copyFileSync(join(dir, 'tabRecord-light-diff.png'), join(here, 'screenshots', 'shot-parity.png'));
    console.log('Strips (real | demo | diff):', dir, '— Record & Play light → screenshots/shot-parity.png');
  }
  for (const shot of SHOTS.filter(s => !parity && (!wanted.length || wanted.includes(s.name)))) {
    for (const theme of ['light', 'dark']) {
      const out = join(here, 'screenshots', 'shot-' + shot.name + (theme === 'dark' ? '-dark' : ''));
      const [width, height] = shot.size;
      // Pages remember their last state (open tab, mode, theme): every shot starts from none
      await sw.evaluate('chrome.storage.local.clear().then(() => chrome.storage.sync.clear())');
      if (shot.seed) await shot.seed(ctx);
      const page = shot.page === 'popup.html'
        ? await browser.openPage(extUrl('popup.html'), { initScript: asActiveTab(`${base}/page`), width, height })
        : await browser.openPage(extUrl(shot.page), { width, height });
      if (shot.api) await answerApi(page);
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
          // The clip is in page coordinates: a setup that scrolled its element into view needs the scroll added
          return { x: x + scrollX, y: y + scrollY, width: Math.max(...rs.map(r => r.right)) - x, height: Math.max(...rs.map(r => r.bottom)) - y };
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
