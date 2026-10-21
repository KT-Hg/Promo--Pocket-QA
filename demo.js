/**
 * demo.js — STATIC preview behaviour for the standalone popup demo.
 * ----------------------------------------------------------------------------
 * The real extension drives popup.html through popup/init.js + ~350 KB of
 * modules that call chrome.tabs / chrome.storage / chrome.debugger, none of
 * which exist on a normal web page.
 *
 * This promo demo is intentionally STATIC: it is a faithful, look-alike preview
 * of the popup, not a working sandbox. Only two things are interactive:
 *   1. Theme toggle  (light ⇄ dark)
 *   2. Tab switching — both the main tab nav and the Capture sub-tabs
 *
 * Everything else (recording, playback, add/edit/delete, collapsing cards,
 * modals, toggles, search, filters, …) is shown for display only. Those
 * controls are seeded with demo data so the UI looks complete, but a global
 * capture-phase blocker swallows clicks on them, and demo.css flags them with a
 * `not-allowed` cursor so visitors know it's a preview.
 *
 * That blocker doubles as the fence that keeps the REAL extension out of this
 * frame when a visitor has it installed — see the STATIC GUARD and
 * "KEEP THE REAL EXTENSION OUT" sections at the bottom.
 *
 * No build step, no dependencies — plain ES5-ish DOM code so it runs anywhere.
 */
(function () {
  'use strict';

  /* ── Tiny DOM helpers ───────────────────────────────────────────────────── */
  var $  = function (id) { return document.getElementById(id); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  // No per-element listeners on purpose: every event in this frame is handled by
  // the single capture-phase guard in §9 — see the note there.
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Reference tables copied from the real source (for rendering only) ───── */
  var ACTION_ICONS = {
    click: '🖱', input: '⌨', navigate: '🔗', script: '⚡', hover: '👆',
    wait: '⏱', condition: '❓', assert: '✅', switch: '🔀', dragdrop: '↕', readdom: '📖',
    screenshot: '📷', screenshot_full: '📄', screenshot_element: '📌',
    screenshot_tovar: '📸', dropdown: '🔽', uploadFile: '📂'
  };
  var HL_LABELS = { yellow: 'Yellow', green: 'Green', pink: 'Pink', blue: 'Blue', orange: 'Orange' };
  // Swatch fill colours — copied from highlight.js HL_COLORS.dot.
  var HL_DOTS = { yellow: '#fde047', green: '#86efac', pink: '#f9a8d4', blue: '#93c5fd', orange: '#fdba74' };
  var HL_ORDER = ['yellow', 'green', 'pink', 'blue', 'orange'];

  /* ───────────────────────────────────────────────────────────────────────────
   * 1. THEME TOGGLE  (persisted, like the real settings) — INTERACTIVE
   *    The click itself is dispatched by the STATIC GUARD (§9), not by a
   *    listener on the button — the guard has to be the only listener in the
   *    frame that ever sees a click. This just publishes the action.
   * ────────────────────────────────────────────────────────────────────────── */
  var toggleTheme = function () {};
  // Read-only broadcast of this frame's *own* theme, for whatever page embeds
  // this preview to react to (feature.html's screenshots follow it — see
  // syncExtraShots() there). One-way and informational only: the popup still
  // keeps its own theme independent of the page's — this doesn't let the page
  // change it, it just lets the page know what it currently is. postMessage
  // rather than the parent reaching into contentDocument directly, since the
  // page/frame split is file:// in local use and some browsers restrict
  // cross-document DOM access there even for same-folder files (see README).
  var notifyParentTheme = function () {};
  (function theme() {
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem('demoPopupTheme'); } catch (e) {}
    if (saved) root.setAttribute('data-theme', saved);

    function sync() {
      var btn = $('toggleTheme');
      if (!btn) return;
      var dark = root.getAttribute('data-theme') === 'dark';
      var icon = btn.querySelector('span');
      if (icon) icon.textContent = dark ? '☀️' : '🌙';
    }
    notifyParentTheme = function () {
      try {
        window.parent.postMessage({
          source: 'pocketQaPromoDemo', type: 'theme',
          theme: root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
        }, '*');
      } catch (e) {}
    };
    toggleTheme = function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      var next = dark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('demoPopupTheme', next); } catch (e) {}
      sync();
      notifyParentTheme();
    };
    sync();
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 2. MAIN TAB NAVIGATION — INTERACTIVE  (invoked by the guard, §9)
   * ────────────────────────────────────────────────────────────────────────── */
  function switchMainTab(btn) {
    var id = btn.getAttribute('data-tab');
    $$('.tab-btn', $('tabNav')).forEach(function (b) { b.classList.toggle('active', b === btn); });
    $$('.tab-panel').forEach(function (p) { p.classList.toggle('active', p.id === id); });
    // popup/init.js -> switchTab stamps this too, and popup.css keys the lock
    // overlays off it. Keeping it in sync is what makes the preview match.
    document.body.dataset.activeTab = id;
    var main = document.querySelector('.main-content');
    if (main) main.scrollTop = 0;
  }

  /* ───────────────────────────────────────────────────────────────────────────
   * 3. CAPTURE SUB-TABS — INTERACTIVE  (invoked by the guard, §9)
   * ────────────────────────────────────────────────────────────────────────── */
  function switchCaptureTab(btn) {
    var key = btn.getAttribute('data-capture-tab');
    $$('.capture-tab-btn', $('captureTabNav')).forEach(function (b) { b.classList.toggle('active', b === btn); });
    $$('.capture-group').forEach(function (g) {
      g.style.display = (g.id === 'captureGroup-' + key) ? '' : 'none';
    });
  }

  /* ───────────────────────────────────────────────────────────────────────────
   * 4. SEED "ACTIVATED" STATUS  (display only)
   * ────────────────────────────────────────────────────────────────────────── */
  (function seedStatus() {
    var dot = $('statusDot');
    if (dot) dot.className = 'status-dot active';
    var status = $('activationStatus');
    if (status) status.textContent = 'Active on this tab';
    // Activate / Remove buttons stay hidden (demo is already "active").

    // The real popup stamps its state onto <body> at runtime (popup/main.js ->
    // data-activation, popup/init.js -> data-active-tab) and popup.css keys off
    // it. Without data-activation="active" every [data-requires-activation] row
    // renders at 38% opacity with its Set button hidden and the "🔒 available
    // after activating" notice showing — the preview would contradict its own
    // "Active on this tab" header.
    document.body.dataset.activation = 'active';
    var open = document.querySelector('.tab-panel.active');
    document.body.dataset.activeTab = open ? open.id : 'tabRecord';
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 5. DEMO DATA — ACTION LIST  (display only; buttons are inert)
   *    Rows are built the way record/preview.js -> createActionListItem builds
   *    them (value-main / value-sub lines, a Condition's block). `guards` is how
   *    many of the next actions a Condition guards: those rows nest under it.
   * ────────────────────────────────────────────────────────────────────────── */
  var demoActions = [
    { type: 'navigate', value: 'https://app.example.com/login' },
    { type: 'input', value: '#email  →  ${email}', label: 'Type the login email' },
    { type: 'input', value: '#password  →  ••••••••' },
    { type: 'click', value: 'button.btn-login', delay: 500 },
    { type: 'assert', value: 'textContains: .welcome = "Welcome back"' },
    { type: 'condition', value: 'elementVisible: .promo-modal', guards: 1 },
    { type: 'click', value: '.promo-modal .close' },
    { type: 'screenshot', value: 'Visible viewport' },
    { type: 'click', value: '#logout', disabled: true }
  ];

  function buildActionLi(a, i, cond) {
    var li = document.createElement('li');
    li.className = 'action action-' + a.type + (a.disabled ? ' action-disabled' : '');
    li.dataset.index = i;
    if (cond != null) {
      // A row a Condition guards (preview.js -> _applyBlockStyle, "cond" colour).
      li.classList.add('sw-in-block');
      li.style.setProperty('--sw-depth', 1);
      li.style.setProperty('--sw-color', 'var(--sw-cond)');
      li.dataset.blocks = cond;
    }
    var delayText = (a.delay && a.type !== 'wait') ? ' (' + a.delay + 'ms)' : '';
    var typeAttrs = '', toggleHtml = '', subHtml = '';
    if (a.guards) {
      var n = a.guards;
      typeAttrs = ' class="type sw-type-toggle" title="Collapse / expand what this Condition guards"';
      toggleHtml = '<span class="sw-toggle" role="button" tabindex="0" data-switch="' + i + '" aria-label="Collapse or expand the actions this Condition guards" aria-expanded="true"><span class="chev" aria-hidden="true">▸</span></span>';
      var full = 'If true: runs ' + (i + 2) + (n > 1 ? '–' + (i + 1 + n) : '') + '\nIf false: skips them';
      subHtml = '<span class="sw-summary" title="' + esc(full) + '">if true → runs ' + n + ' action' + (n === 1 ? '' : 's') + '</span><span class="sw-hidden-count"></span>';
    }
    if (a.label) subHtml = '<span class="value-label">' + esc(a.label) + '</span>' + subHtml;
    li.innerHTML =
      '<span class="index" title="#' + (i + 1) + '">' + (i + 1) + '.</span>' +
      '<span' + (typeAttrs || ' class="type"') + '>' + (ACTION_ICONS[a.type] || '') + esc(a.type) + toggleHtml + '</span>' +
      '<span class="value" title="' + esc(a.value) + esc(delayText) + '">' +
        '<span class="value-main">' + esc(a.value) + esc(delayText) + '</span>' +
        (subHtml ? '<span class="value-sub">' + subHtml + '</span>' : '') +
      '</span>';

    var btnRow = document.createElement('div');
    btnRow.className = 'btn-row';
    [['secondary', a.disabled ? 'Enable' : 'Disable'], ['secondary', 'Copy'],
     ['secondary', 'Edit'], ['danger', 'Delete']].forEach(function (b) {
      var btn = document.createElement('button');
      btn.className = b[0];
      btn.textContent = b[1];
      btnRow.appendChild(btn);
    });
    li.appendChild(btnRow);
    return li;
  }

  (function renderActions() {
    var ul = $('actions');
    if (!ul) return;
    ul.innerHTML = '';
    var cond = null, left = 0;
    demoActions.forEach(function (a, i) {
      ul.appendChild(buildActionLi(a, i, left-- > 0 ? cond : null));
      if (a.guards) { cond = i; left = a.guards; }
    });
    var badge = $('actionCount');
    if (badge) { badge.textContent = demoActions.length; badge.style.display = demoActions.length ? 'inline-block' : 'none'; }
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 5b. LAST RUN CARD  (display only)
   *     run/last-run.js -> _render shows how the last Play came out, from the
   *     lastRun the background keeps. An install that has ever played a
   *     scenario shows it, so the preview does too: the scenario above, passed,
   *     a few minutes ago. A pass has no failures and no Bug report button.
   * ────────────────────────────────────────────────────────────────────────── */
  (function seedLastRun() {
    var card = $('lastRunCard');
    if (!card) return;
    card.dataset.status = 'passed';
    var set = function (sel, text) { var el = card.querySelector(sel); if (el) el.textContent = text; };
    set('.lr-verdict', '✓ Passed');           // shared/verdict.js -> verdictLabel
    set('.lr-name', 'Login flow');
    set('.lr-when', '3 minutes ago');         // Intl.RelativeTimeFormat, like _ago()
    card.querySelector('.lr-name').title = 'Login flow';
    card.hidden = false;
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 6. DEMO DATA — VARIABLES  (display only; buttons are inert)
   * ────────────────────────────────────────────────────────────────────────── */
  var TYPE_LABEL = { s: 'Static', r: 'Random', p: 'Pick', f: 'Fallback' };
  var demoVars = [
    { key: 'email', t: 'p', val: 'john@acme.com', sub: '4 options · random per run · CSV overrides' },
    { key: 'password', t: 's', val: '••••••••' },
    { key: 'orderId', t: 'r', val: '(generated)', sub: 'new value each run' },
    { key: 'role', t: 'f', val: 'admin', sub: '3 values · tries A→B→C in Child Condition · sticky per run' }
  ];

  function buildVarRow(v, i) {
    var li = document.createElement('li');
    li.className = 'var-row t-' + v.t;
    li.dataset.key = v.key;
    var sub = v.sub ? '<span class="vr-sub">' + esc(v.sub) + '</span>' : '';
    li.innerHTML =
      '<span class="vr-idx">' + (i + 1) + '.</span>' +
      '<span class="vr-type"><span class="vt-i ' + v.t + '">' + v.t.toUpperCase() + '</span> ' + TYPE_LABEL[v.t] + '</span>' +
      '<span class="vr-key" title="' + esc(v.key) + '">' + esc(v.key) + '</span>' +
      '<span class="vr-arr">→</span>' +
      '<span class="vr-val" title="' + esc(v.val) + '">' + esc(v.val) + sub + '</span>';
    var btnRow = document.createElement('div');
    btnRow.className = 'var-btn-row';
    var edit = document.createElement('button');
    edit.className = 'vr-edit'; edit.textContent = 'Edit';
    var del = document.createElement('button');
    del.className = 'vr-delete'; del.textContent = 'Delete';
    btnRow.appendChild(edit); btnRow.appendChild(del);
    li.appendChild(btnRow);
    return li;
  }

  (function renderVars() {
    var ul = $('variablesTableBody');
    if (!ul) return;
    ul.innerHTML = '';
    demoVars.forEach(function (v, i) { ul.appendChild(buildVarRow(v, i)); });
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 7. DEMO DATA — HIGHLIGHTS  (display only; buttons are inert)
   * ────────────────────────────────────────────────────────────────────────── */
  var demoHighlights = [
    { color: 'yellow', text: 'Record any web workflow with a single click — no code required.' },
    { color: 'green', text: 'CSV data-driven runs repeat a scenario across hundreds of rows automatically.' },
    { color: 'pink', text: 'Export to Selenium Python or a JS bookmarklet in one tap.' },
    { color: 'blue', text: 'Capture full-page, scrolling, and element screenshots.' },
    { color: 'orange', text: 'Variables, conditions, and switch logic make scenarios truly dynamic.' }
  ];

  function buildHlLi(h, i) {
    var li = document.createElement('li');
    li.className = 'action hl-' + h.color;
    var preview = h.text.length > 70 ? h.text.slice(0, 70) + '…' : h.text;
    li.innerHTML =
      '<span class="index">' + (i + 1) + '</span>' +
      '<span class="type">' + HL_LABELS[h.color] + '</span>' +
      '<span class="value">' + esc(preview) + '</span>';
    var btnRow = document.createElement('div');
    btnRow.className = 'btn-row';
    [['secondary', 'Disable'], ['secondary', 'Copy'], ['secondary', 'Edit'], ['danger', 'Delete']].forEach(function (b) {
      var btn = document.createElement('button');
      btn.className = b[0]; btn.textContent = b[1];
      btnRow.appendChild(btn);
    });
    li.appendChild(btnRow);
    return li;
  }

  (function renderHighlights() {
    var ul = $('hlList');
    if (ul) {
      ul.innerHTML = '';
      demoHighlights.forEach(function (h, i) { ul.appendChild(buildHlLi(h, i)); });
      var empty = $('hlEmpty');
      if (empty) empty.style.display = demoHighlights.length ? 'none' : '';
      var clearBtn = $('hlClearBtn');
      if (clearBtn) clearBtn.style.visibility = demoHighlights.length ? 'visible' : 'hidden';
    }
    refreshHlStats();
  })();

  function refreshHlStats() {
    var total = demoHighlights.length;
    var setText = function (id, v) { var el = $(id); if (el) el.textContent = v; };
    setText('hlStatPage', total); setText('hlStatTotal', total); setText('hlStatPages', total ? 1 : '—');
    setText('hlStatPageDetail', total); setText('hlStatTotalDetail', total); setText('hlStatPagesDetail', total ? 1 : '—');
    var badge = $('hlTabBadge');
    if (badge) { badge.textContent = total; badge.style.display = total ? 'inline-block' : 'none'; }
    var counts = {};
    demoHighlights.forEach(function (h) { counts[h.color] = (counts[h.color] || 0) + 1; });
    HL_ORDER.forEach(function (c) {
      var el = $('hlBadge' + c.charAt(0).toUpperCase() + c.slice(1));
      if (el) el.textContent = counts[c] || '';
    });
    var segs = HL_ORDER.filter(function (c) { return counts[c]; }).map(function (c) {
      return '<div class="hl-stat-colorbar-seg" style="background:' + HL_DOTS[c] +
        ';flex:' + counts[c] + ';" title="' + HL_LABELS[c] + ': ' + counts[c] + '"></div>';
    }).join('');
    var barPage = $('hlStatBarPage'), barTotal = $('hlStatBarTotal');
    if (barPage) barPage.innerHTML = segs;
    if (barTotal) barTotal.innerHTML = segs;
  }

  /* Seed the page/URL picker so it doesn't sit on the "Loading…" placeholder. */
  (function seedHlUrls() {
    var sel = $('hlUrlSelect');
    if (sel) {
      sel.innerHTML = '<option value="">This page · app.example.com (' + demoHighlights.length + ')</option>';
      [['docs.example.com', 3], ['blog.example.com', 1]].forEach(function (p) {
        var o = document.createElement('option');
        o.value = p[0]; o.textContent = p[0] + ' (' + p[1] + ')';
        sel.appendChild(o);
      });
    }
    var ctx = $('hlCurrentPage');
    if (ctx) ctx.style.display = '';
    var dom = $('hlPageDomain'); if (dom) dom.textContent = 'app.example.com';
    var cnt = $('hlPageCount'); if (cnt) cnt.textContent = demoHighlights.length;
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 8. SEED <select> LISTS so the UI looks populated  (display only)
   * ────────────────────────────────────────────────────────────────────────── */
  var demoScenarios = ['Login flow', 'Checkout — happy path', 'Bulk invoice upload', 'Profile update'];
  function fillScenarioSelect(sel, placeholder) {
    if (!sel) return;
    sel.innerHTML = placeholder ? '<option value="">' + placeholder + '</option>' : '';
    demoScenarios.forEach(function (name, i) {
      var o = document.createElement('option');
      o.value = String(i); o.textContent = name;
      sel.appendChild(o);
    });
  }
  fillScenarioSelect($('scenarioList'), '');
  fillScenarioSelect($('exportCodeSelect'), '-- Select scenario --');
  fillScenarioSelect($('csvScenarioSelect'), '-- Select scenario --');
  fillScenarioSelect($('scheduleScenarioSelect'), '-- Select scenario --');
  fillScenarioSelect($('sequenceScenarioList'), '');
  fillScenarioSelect($('exportScenarioSelect'), '-- Select scenario --');
  fillScenarioSelect($('switchCaseScenario'), '-- Select scenario --');
  // Folder selects
  ['scenarioFolder', 'filterFolder', 'moveToFolderSelect', 'exportFolderSelect'].forEach(function (id) {
    var sel = $(id);
    if (!sel) return;
    ['Smoke tests', 'Regression', 'Demos'].forEach(function (f) {
      var o = document.createElement('option'); o.value = f; o.textContent = f; sel.appendChild(o);
    });
  });
  // Export Code takes the scenario Manage Scenarios has (export/code-card.js),
  // and its format buttons are on once there is one, each titled with what it makes.
  (function seedExportCode() {
    var sel = $('exportCodeSelect');
    if (sel) sel.value = '0';
    $$('.export-code-grid > .export-code-btn').forEach(function (btn) {
      btn.disabled = !sel || !sel.value;
      btn.title = btn.disabled ? 'Select a scenario first' : btn.dataset.desc;
    });
  })();
  // run/time-picker.js -> prefillScheduleUrl: the start URL starts as this tab's.
  var scheduleUrl = $('scheduleUrl');
  if (scheduleUrl) scheduleUrl.value = 'https://app.example.com/dashboard';

  /* ───────────────────────────────────────────────────────────────────────────
   * 8b. SETTINGS › VERSION CARD  (display only)
   *     The real popup fills this from chrome.runtime.getManifest() plus the
   *     stored update-check status (popup/settings.js -> loadUpdateInfo). Left
   *     alone it renders three "—" placeholders, which no installed copy of the
   *     extension ever shows. The version comes from the <meta> that
   *     sync-from-source.mjs stamps out of vendor/version.txt, so it tracks the
   *     vendored snapshot instead of drifting behind it.
   * ────────────────────────────────────────────────────────────────────────── */
  (function seedVersionCard() {
    var meta = document.querySelector('meta[name="ext-version"]');
    var v = (meta && meta.getAttribute('content')) || '';
    if (!v) return;
    var setText = function (id, val) { var el = $(id); if (el) el.textContent = val; };
    setText('updateInfoCurrent', v);
    setText('updateInfoLatest', v);          // up to date — same as installed
    // formatWhen() in the real popup is `new Date(ts).toLocaleString()`; a check
    // runs daily, so an hour ago is what a healthy install actually shows.
    var checked = new Date(Date.now() - 60 * 60 * 1000);
    setText('updateInfoChecked', checked.toLocaleString());
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 8c. SETTINGS › SCREENSHOT + NOTIFICATIONS  (display only)
   *     popup/settings.js fills both cards from storage, falling back to its
   *     defaults when nothing was ever saved. Left alone the markup shows no
   *     save mode picked, an empty prefix, both speed boxes blank and every
   *     notification off — the defaults are what a fresh install shows.
   * ────────────────────────────────────────────────────────────────────────── */
  (function seedSettings() {
    var check = function (id, on) { var el = $(id); if (el) el.checked = on; };
    var val = function (id, v) { var el = $(id); if (el) el.value = v; };
    // loadScreenshotSettings()
    check('saveModeAuto', true);
    val('screenshotPrefix', 'screenshot');
    check('screenshotTypeInName', true);
    var hint = $('screenshotNameHint');
    if (hint) hint.textContent = 'Format: screenshot_full_2026-01-31_09-45-00.png (type tag: _full, _elem, _window, _scrollV…)';
    [['segScrollSpeedV', 2], ['segScrollSpeedH', 2], ['watermarkFontSize', 13]].forEach(function (s) {
      var slider = $(s[0]);
      val(s[0] + 'Num', s[1]);
      if (!slider) return;
      slider.value = s[1];
      // updateRangeFill(): the track is painted up to --pct.
      var min = parseFloat(slider.min) || 0, max = parseFloat(slider.max) || 100;
      slider.style.setProperty('--pct', ((s[1] - min) / (max - min) * 100).toFixed(2) + '%');
    });
    // loadNotificationSetting() — NOTIFY_TOGGLES defaults (bg/notify.js).
    check('notifyOnComplete', false);
    check('notifyOnError', true);
    check('notifyOnCapture', true);
    check('notifyOnSchedule', true);
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 8d. DATA › DB TEST SESSION CARD  (display only)
   *     Mirrors popup/init.js -> initDbGuardToggle: the Adminer switch defaults
   *     to on, and the "roll back after each Playback run" row is hidden while
   *     dbtools/features.js keeps TABLE_COPIES off — otherwise the static
   *     preview would advertise a switch no installed copy shows.
   * ────────────────────────────────────────────────────────────────────────── */
  (function seedDbCard() {
    var enabled = $('dbEnabledToggle');
    if (enabled) enabled.checked = true;
    var guard = $('dbGuardToggle');
    var row = guard && guard.closest('label');
    if (row) row.style.display = 'none';
    // initDbStatus: with the switch on, the line names the last session used.
    var line = $('dbStatus');
    if (line) {
      line.innerHTML = '<span class="dot"></span>' +
        '<span class="label"><span>Last session: </span><b>Checkout regression</b></span>' +
        '<span class="sub">12 changes · ended</span>';
      line.title = 'Open this session on the Test sessions & rollback page';
      line.hidden = false;
    }
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 9. STATIC GUARD — block every interaction except tab switching + theme.
   *     Runs in the capture phase on `document` so it pre-empts any control
   *     before it acts, and prevents inputs/selects gaining focus (so nothing
   *     can be edited). demo.css pairs this with a `not-allowed` cursor on the
   *     same controls.
   *
   *     It is deliberately the ONLY listener in this frame that sees an event:
   *     the two live controls are dispatched from here (§1–§3) and then the
   *     event is killed with stopImmediatePropagation(). That matters because a
   *     visitor may have the real extension installed — its content script is
   *     injected into every frame (manifest: all_frames) and listens for
   *     click/mouseover/keydown on `document` too. Since this script runs while
   *     the frame is still parsing and the content script only at
   *     document_idle, ours is registered first and stops the event before the
   *     extension can see it. Without that, ticking 🎯 Pick element in the real
   *     popup would let a click on this MOCK ui report a real ELEMENT_PICKED
   *     (and recording would capture the demo's own controls as steps).
   *
   *     Two event groups: CANCEL_EVENTS also lose their default action, the
   *     rest are only stopped from travelling (cancelling them would break
   *     scrolling, focus and text selection inside the preview).
   * ────────────────────────────────────────────────────────────────────────── */
  var ALLOW = '.tab-btn, .capture-tab-btn, #toggleTheme';
  var CANCEL_EVENTS = ['mousedown', 'click', 'dblclick', 'change', 'input', 'submit'];
  var SILENT_EVENTS = ['mouseover', 'mousemove', 'mouseup', 'keydown', 'keyup'];

  function staticGuard(e) {
    var live = e.target && e.target.closest ? e.target.closest(ALLOW) : null;
    if (live && e.type === 'click') {
      if (live.id === 'toggleTheme') toggleTheme();
      else if (live.classList.contains('tab-btn')) switchMainTab(live);
      else switchCaptureTab(live);
    }
    // Live controls keep their default action (so mousedown still focuses them
    // and Enter/Space still produces the click we handle above).
    if (!live && CANCEL_EVENTS.indexOf(e.type) !== -1) e.preventDefault();
    e.stopImmediatePropagation();
  }
  CANCEL_EVENTS.concat(SILENT_EVENTS).forEach(function (ev) {
    document.addEventListener(ev, staticGuard, true);
  });

  /* ───────────────────────────────────────────────────────────────────────────
   * 10. DEEP-LINK SUPPORT — ?tab=tabHighlight  &  ?theme=dark
   *     Lets the landing page (or a marketing link) open the preview on a
   *     specific tab / theme.
   * ────────────────────────────────────────────────────────────────────────── */
  (function deepLink() {
    var params = new URLSearchParams(location.search);
    var theme = params.get('theme');
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
      var icon = $('toggleTheme') && $('toggleTheme').querySelector('span');
      if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    var tab = params.get('tab');
    var btn = tab && $('tabNav') ? $('tabNav').querySelector('[data-tab="' + tab + '"]') : null;
    if (btn) switchMainTab(btn);

    // Theme is fully settled now (deep-link ?theme= wins over the saved one
    // above if both were present) — tell the parent what it ended up being.
    notifyParentTheme();
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 11. KEEP THE REAL EXTENSION OUT OF THE PREVIEW
   *     The guard (§9) fences off everything event-driven, but the extension
   *     also mounts UI from a runtime broadcast, which no page code can
   *     intercept: hitting 🎯 Pick element in the real popup sends
   *     START_PICK_MODE to every frame of the tab, so the live "🎯 Click an
   *     element to select it" bar and its hover outline would appear INSIDE
   *     this mock popup, and <body> would go crosshair.
   *
   *     Every overlay the extension injects carries one marker attribute
   *     (content.js → _EXT_OVERLAY_ATTR = "data-ext-overlay"), so a single rule
   *     catches all of them, now and for overlays added later. demo.css hides
   *     them by attribute too, so nothing flashes before we remove it here.
   *
   *     Scope: this frame only. The landing page around it is a normal web page
   *     and the extension keeps working there as it does anywhere else.
   * ────────────────────────────────────────────────────────────────────────── */
  (function keepExtensionOut() {
    var MARK = 'data-ext-overlay';
    var SEL = '[' + MARK + ']';

    function scrub(node) {
      if (!node || node.nodeType !== 1) return;
      if (node.hasAttribute(MARK)) { node.remove(); return; }
      $$(SEL, node).forEach(function (el) { el.remove(); });
    }
    scrub(document.documentElement);

    if (!('MutationObserver' in window)) return;
    new MutationObserver(function (records) {
      records.forEach(function (r) {
        if (r.type === 'childList') Array.prototype.forEach.call(r.addedNodes, scrub);
        // The picker paints its crosshair straight onto <body>.style.
        else if (r.target === document.body && r.target.style.cursor) r.target.style.cursor = '';
      });
    }).observe(document.documentElement, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['style']
    });
  })();

  /* A build marker for the one failure mode we cannot see from here: a browser
   * still running a cached copy of this file, where the fence above does not
   * exist yet. Check it from the frame's console: __promoDemoGuard. */
  try { window.__promoDemoGuard = 'extension-fence v2'; } catch (e) {}
  console.log('%cPocket QA — static demo preview ready %c(extension-fence v2)',
    'color:#3b82f6;font-weight:bold', 'color:#6b7280');
})();
