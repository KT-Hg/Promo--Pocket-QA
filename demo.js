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
 * No build step, no dependencies — plain ES5-ish DOM code so it runs anywhere.
 */
(function () {
  'use strict';

  /* ── Tiny DOM helpers ───────────────────────────────────────────────────── */
  var $  = function (id) { return document.getElementById(id); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var on = function (el, ev, fn) { if (el) el.addEventListener(ev, fn); };
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Reference tables copied from the real source (for rendering only) ───── */
  var ACTION_ICONS = {
    click: '🖱', input: '⌨', navigate: '🔗', script: '⚡', hover: '👆',
    wait: '⏱', condition: '❓', switch: '🔀', dragdrop: '↕', readdom: '📖',
    screenshot: '📷', screenshot_full: '📄', screenshot_element: '📌',
    screenshot_tovar: '📸', dropdown: '🔽', uploadFile: '📂'
  };
  var HL_LABELS = { yellow: 'Yellow', green: 'Green', pink: 'Pink', blue: 'Blue', orange: 'Orange' };
  // Swatch fill colours — copied from highlight.js HL_COLORS.dot.
  var HL_DOTS = { yellow: '#fde047', green: '#86efac', pink: '#f9a8d4', blue: '#93c5fd', orange: '#fdba74' };
  var HL_ORDER = ['yellow', 'green', 'pink', 'blue', 'orange'];

  /* ───────────────────────────────────────────────────────────────────────────
   * 1. THEME TOGGLE  (persisted, like the real settings) — INTERACTIVE
   * ────────────────────────────────────────────────────────────────────────── */
  (function theme() {
    var root = document.documentElement;
    var saved = null;
    // The popup keeps its OWN theme, independent of the landing page. It uses a
    // separate storage key and never messages the parent, so toggling the
    // popup's theme does not change the page around it (and vice-versa).
    try { saved = localStorage.getItem('demoPopupTheme'); } catch (e) {}
    if (saved) root.setAttribute('data-theme', saved);

    function sync() {
      var btn = $('toggleTheme');
      if (!btn) return;
      var dark = root.getAttribute('data-theme') === 'dark';
      var icon = btn.querySelector('span');
      if (icon) icon.textContent = dark ? '☀️' : '🌙';
    }
    on($('toggleTheme'), 'click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      var next = dark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('demoPopupTheme', next); } catch (e) {}
      sync();
    });
    sync();
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 2. MAIN TAB NAVIGATION — INTERACTIVE
   * ────────────────────────────────────────────────────────────────────────── */
  on($('tabNav'), 'click', function (e) {
    var btn = e.target.closest('.tab-btn');
    if (!btn) return;
    var id = btn.getAttribute('data-tab');
    $$('.tab-btn', $('tabNav')).forEach(function (b) { b.classList.toggle('active', b === btn); });
    $$('.tab-panel').forEach(function (p) { p.classList.toggle('active', p.id === id); });
    document.querySelector('.main-content') && (document.querySelector('.main-content').scrollTop = 0);
  });

  /* ───────────────────────────────────────────────────────────────────────────
   * 3. CAPTURE SUB-TABS — INTERACTIVE
   * ────────────────────────────────────────────────────────────────────────── */
  on($('captureTabNav'), 'click', function (e) {
    var btn = e.target.closest('.capture-tab-btn');
    if (!btn) return;
    var key = btn.getAttribute('data-capture-tab');
    $$('.capture-tab-btn', $('captureTabNav')).forEach(function (b) { b.classList.toggle('active', b === btn); });
    $$('.capture-group').forEach(function (g) {
      g.style.display = (g.id === 'captureGroup-' + key) ? '' : 'none';
    });
  });

  /* ───────────────────────────────────────────────────────────────────────────
   * 4. SEED "ACTIVATED" STATUS  (display only)
   * ────────────────────────────────────────────────────────────────────────── */
  (function seedStatus() {
    var dot = $('statusDot');
    if (dot) dot.className = 'status-dot active';
    var status = $('activationStatus');
    if (status) status.textContent = 'Active on this tab';
    // Activate / Remove buttons stay hidden (demo is already "active").
  })();

  /* ───────────────────────────────────────────────────────────────────────────
   * 5. DEMO DATA — ACTION LIST  (display only; buttons are inert)
   * ────────────────────────────────────────────────────────────────────────── */
  var demoActions = [
    { type: 'navigate', value: 'https://app.example.com/login' },
    { type: 'input', value: '#email  →  ${email}', label: 'Type the login email' },
    { type: 'input', value: '#password  →  ••••••••' },
    { type: 'click', value: 'button.btn-login', delay: 500 },
    { type: 'wait', value: '1500ms' },
    { type: 'condition', value: 'Element Exists: .dashboard' },
    { type: 'screenshot', value: 'Visible viewport' },
    { type: 'click', value: '#logout', disabled: true }
  ];

  function buildActionLi(a, i) {
    var li = document.createElement('li');
    li.className = 'action action-' + a.type + (a.disabled ? ' action-disabled' : '');
    li.dataset.index = i;
    var delayText = (a.delay && a.type !== 'wait') ? ' (' + a.delay + 'ms)' : '';
    var labelHtml = a.label
      ? '<span style="display:block;font-size:10px;color:var(--primary);opacity:0.8;font-style:italic;margin-top:1px;">' + esc(a.label) + '</span>'
      : '';
    li.innerHTML =
      '<span class="index">' + (i + 1) + '.</span>' +
      '<span class="type">' + (ACTION_ICONS[a.type] || '') + esc(a.type) + '</span>' +
      '<span class="value" title="' + esc(a.value) + esc(delayText) + '">' +
        esc(a.value) + esc(delayText) + labelHtml +
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
    demoActions.forEach(function (a, i) { ul.appendChild(buildActionLi(a, i)); });
    var badge = $('actionCount');
    if (badge) { badge.textContent = demoActions.length; badge.style.display = demoActions.length ? 'inline-block' : 'none'; }
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
  // Folder selects
  ['scenarioFolder', 'filterFolder', 'moveToFolderSelect', 'exportFolderSelect'].forEach(function (id) {
    var sel = $(id);
    if (!sel) return;
    ['Smoke tests', 'Regression', 'Demos'].forEach(function (f) {
      var o = document.createElement('option'); o.value = f; o.textContent = f; sel.appendChild(o);
    });
  });

  /* ───────────────────────────────────────────────────────────────────────────
   * 9. STATIC GUARD — block every interaction except tab switching + theme.
   *     Runs in the capture phase so it pre-empts any control before it acts,
   *     and prevents inputs/selects gaining focus (so nothing can be edited).
   *     demo.css pairs this with a `not-allowed` cursor on the same controls.
   * ────────────────────────────────────────────────────────────────────────── */
  var ALLOW = '.tab-btn, .capture-tab-btn, #toggleTheme';
  function staticGuard(e) {
    if (e.target.closest && e.target.closest(ALLOW)) return; // tabs + theme stay live
    e.preventDefault();
    e.stopPropagation();
  }
  ['mousedown', 'click', 'dblclick', 'change', 'input', 'submit'].forEach(function (ev) {
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
    if (tab && $(tab)) {
      $$('.tab-btn', $('tabNav')).forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-tab') === tab); });
      $$('.tab-panel').forEach(function (p) { p.classList.toggle('active', p.id === tab); });
    }
  })();

  console.log('%cFast Recorder & Playback — static demo preview ready', 'color:#3b82f6;font-weight:bold');
})();
