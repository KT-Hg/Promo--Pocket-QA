/**
 * feature.js — Feature detail pages (feature.html?id=<key>).
 * One template, driven by the `id` query param, so nav/footer/CSS live in a
 * single place instead of being copy-pasted across nine near-identical pages.
 * Keep in sync with the `.feature` cards in index.html (href="feature.html?id=…").
 */
(function () {
  'use strict';

  /* ── Content ──────────────────────────────────────────────────────────────
   * `tab` is the real popup tab id (see vendor/popup.html / popup-demo.html)
   * used to deep-link the embedded preview — popup-demo.html already supports
   * ?tab=…&theme=… (see README "Deep links"). */
  var FEATURES = {
    recording: {
      icon: '⏺',
      eyebrow: 'Record & Play',
      title: 'One-click recording',
      lead: 'Hit Start Recording and every click and every field you type into becomes an editable step — no selectors to write by hand.',
      points: [
        'Records clicks and typed input automatically — typing is debounced to one step per field, so a long value doesn’t turn into dozens of steps.',
        'Everything else is one of 16 action types you add by hand: hover, native dropdowns, drag-and-drop, navigate, wait, Run JS, conditions, switches, Read DOM, screenshots and file uploads.',
        'Every recorded step is editable and reorderable afterwards — fix a selector, change a value, or drag steps into a new order.',
        'Undo/redo up to 50 steps while you edit, cleared when you start a new scenario or load another one.',
        'Pick any element visually with 🎯 Pick element instead of writing a selector — CSS, XPath, ID, Name, Text or Full XPath.',
        'Child Condition targets a container and finds the right child by its value, text, id, class or input type — handy for lists and tables whose rows keep moving.'
      ],
      tab: 'tabRecord',
      tabLabel: 'Record & Play tab'
    },
    playback: {
      icon: '▶',
      eyebrow: 'Record & Play',
      title: 'Playback that keeps going',
      lead: 'Replay a scenario once, loop it, or chain several — and let it carry on through iframes, page reloads and file pickers that stop most recorders.',
      points: [
        'Run a single scenario, loop it N times with a delay between loops, or build a sequence where each scenario gets its own delay.',
        'Steps run inside iframes, and a run picks up where it left off after the page reloads mid-playback.',
        'Upload File injects local files into an <code>&lt;input type="file"&gt;</code> or a drag-and-drop zone — several at once, with <code>${variable}</code> file names.',
        'Native dropdowns that ignore a synthetic click get a real, trusted click instead.',
        'Run JS executes your own script on the page, even where the site’s Content Security Policy would block it.',
        'A progress bar shows where the run is, and an optional notification tells you when it has finished.'
      ],
      tab: 'tabRecord',
      tabLabel: 'Record & Play tab'
    },
    variables: {
      icon: '🔣',
      eyebrow: 'Data tab',
      title: 'Variables & logic',
      lead: 'Turn a one-off recording into a real script with variables, conditions and DOM reads — all saved per extension and reused with <code>${var}</code> anywhere.',
      points: [
        'Four variable types: static values, random values, pick-from-a-list, and fallback (use one value, fall back to another if it’s empty).',
        'Reference any variable as <code>${var}</code> inside a selector, an input value, a URL, or a Run JS step.',
        'Condition (If) and Switch (Variable → Scenario) steps branch playback based on live values.',
        'Read DOM → Variable captures text, an input’s value, or an attribute from the page into a variable mid-run.'
      ],
      tab: 'tabData',
      tabLabel: 'Data tab'
    },
    csv: {
      icon: '📊',
      eyebrow: 'Data tab',
      title: 'CSV data-driven runs',
      lead: 'Upload a CSV and replay the same scenario once per row — headers become <code>${variables}</code> automatically, so one recording drives an entire data set.',
      points: [
        'First row of the CSV becomes variable names — a header <code>email</code> becomes <code>${email}</code>, no mapping step required.',
        'Configurable delay between rows, from 0.5s up to 10s or a custom value, to stay gentle on the target site.',
        'Export results as Excel XLSX with screenshots embedded in cells, as HTML, or as a ZIP of screenshots + CSV.',
        'A live preview and status line show progress row by row while the run is in flight.'
      ],
      tab: 'tabData',
      tabLabel: 'Data tab'
    },
    screenshots: {
      icon: '📷',
      eyebrow: 'Capture tab',
      title: 'Powerful screenshots',
      lead: 'Six capture modes cover everything from a single visible viewport to a whole application window — each with an optional jump straight into the editor.',
      points: [
        'Visible, full-page, vertical/horizontal scrolling, marked segment, single element, and whole-window (OS-level) capture.',
        'Every capture mode has a "✂ Edit" twin that opens the image editor immediately after shooting.',
        '🔍 Image Diff compares two screenshots pixel-by-pixel, with an adjustable sensitivity threshold.',
        '🖼 Image Editor works on any image from the clipboard or a file, not just fresh captures.',
        'Screenshot → Variable steps feed a capture straight into a CSV run’s results.'
      ],
      tab: 'tabCapture',
      tabLabel: 'Capture tab',
      extra: {
        title: 'Inside the Image Editor',
        lead: 'Every capture — or any image from the clipboard or a file — can open in a full crop-and-annotate editor. It opens in its own detached window, not a cramped popup panel.',
        images: [{
          src: 'screenshots/shot-image-editor.png',
          srcDark: 'screenshots/shot-image-editor-dark.png',
          alt: 'The Image Editor open on a sample dashboard screenshot, with a rectangle and arrow annotation drawn on it and the Stamp panel open on the right showing timestamp watermark options.',
          caption: 'Crop, annotate and stamp any capture — here with a rectangle + arrow highlight and the Stamp panel open.'
        }],
        points: [
          'Seven tools on one sidebar: Crop, Draw, Rectangle, Ellipse, Arrow, Text and Blur — each with a one-key shortcut (C, D, R, E, A, T, B).',
          'Rotate 90° left/right, flip horizontal or vertical, and a full undo/redo history for every edit.',
          'Adjust panel: brightness, contrast, saturation and sharpness sliders, with one-tap reset.',
          'Resize panel: exact width/height with a lock-ratio option, or a 10–300% scale slider.',
          'Stamp panel: a timestamp or custom-text watermark, dropped into any of 9 positions, with font size and opacity control.',
          'Zoom in/out with a 1:1 reset, and a full keyboard-shortcuts panel a keypress away.'
        ]
      }
    },
    export: {
      icon: '🐍',
      eyebrow: 'Data tab',
      title: 'One-tap code export',
      lead: 'Turn any recorded scenario into real, runnable code — no rewriting your steps in another tool.',
      points: [
        '⚡ JS Bookmarklet — a self-contained script that replays the scenario straight in the browser.',
        '🐍 Selenium Python — a standalone .py file you can drop into an existing test suite or CI pipeline.',
        'Pick the scenario from a dropdown; export regenerates fresh code from its current steps every time.',
        'Works with variables and conditions already in the scenario — the exported code mirrors the same logic.',
        'Settings tab tunes step delay and element timeout before regenerating — Selenium also picks a starting URL.',
        'The JS export skips screenshot/switch steps with a clear warning — a bookmarklet can’t call the Extension API. Selenium doesn’t hit that limit.'
      ],
      tab: 'tabData',
      tabLabel: 'Data tab',
      extra: {
        title: 'From popup to code',
        lead: 'The same "Login flow" scenario, exported both ways — real output from the real generator, not a mockup.',
        // These shots are captured at the popup's real 480×600 size (see
        // README), so they're tall and narrow — lay them out side by side
        // instead of full-width-stacked like a landscape screenshot.
        imagesLayout: 'row',
        images: [
          {
            src: 'screenshots/shot-export-js.png',
            srcDark: 'screenshots/shot-export-js-dark.png',
            alt: 'The Export JS modal showing generated JavaScript bookmarklet code for the Login flow scenario, with Code/Variables/Actions/Settings tabs and a warning that 1 screenshot step was skipped.',
            caption: 'JS Bookmarklet — a full code preview with Variables, Actions and Settings tabs, ready to copy or download.'
          },
          {
            src: 'screenshots/shot-export-py.png',
            srcDark: 'screenshots/shot-export-py-dark.png',
            alt: 'The Export Python modal showing generated Selenium code for the same Login flow scenario, importing selenium webdriver and starting a Chrome driver.',
            caption: 'Selenium Python — the same scenario as a standalone script, imports and driver setup included.'
          }
        ],
        points: [
          'One scenario, two outputs — pick it once in the Data tab, then choose the format.',
          'The warning banner is real: whichever steps a format can’t express (screenshot/switch, for JS) are named, not silently dropped.',
          'Variables and Actions tabs (not pictured) list every variable and step behind the code before you copy it.'
        ]
      }
    },
    highlights: {
      icon: '🖍️',
      eyebrow: 'Highlight tab',
      title: 'Highlights & scheduling',
      lead: 'Mark up any page with colour-coded highlights that persist by URL pattern, and let scenarios run themselves on a schedule.',
      points: [
        'Five highlight colours, full-text search and a colour filter across every saved highlight.',
        'Per-page and total stats, broken down by page, so you can see highlight coverage at a glance.',
        'Add a note to any highlight; highlights come back on your next visit, even on content that loads late.',
        'URL Patterns with wildcards in the path and subdomain group several pages under one set of highlights — a builder turns the current tab’s URL into a pattern.',
        'Export every highlight as JSON.',
        'Scheduled Playback queues a scenario for a specific time, once or repeating daily, running in the background.'
      ],
      tab: 'tabHighlight',
      tabLabel: 'Highlight tab'
    },
    'sql-test-designer': {
      icon: '🧪',
      eyebrow: 'Data tab',
      title: 'SQL Test Case Designer',
      lead: 'Paste a SQL query and get a ready-made test case list — equivalence partitions, boundary values, a decision table, and the NULL/JOIN edge cases most manual test plans miss.',
      points: [
        'Generates EP/BVA (equivalence partitioning & boundary value analysis) cases straight from the query’s conditions.',
        'Builds a decision table covering combinations of the query’s logic — switching to MC/DC once the condition count passes a configurable limit.',
        'Surfaces NULL-handling and JOIN-specific scenarios that are easy to miss by hand.',
        'Opens in its own full page — test case tables get the room they need.',
        'Export the finished list as CSV, JSON, a per-table Data CSV, or a Verify SQL file to hand to a test suite or tracker.'
      ],
      tab: 'tabData',
      tabLabel: 'Data tab',
      extra: {
        title: 'Inside the analysis screen',
        lead: 'A dedicated three-column workspace, not a popup panel — everything a run needs stays visible at once.',
        images: [{
          src: 'screenshots/shot-sqlcases-analysis.png',
          srcDark: 'screenshots/shot-sqlcases-analysis-dark.png',
          alt: 'The SQL Test Case Designer: the query rail on the left with the pasted SQL, a generated case list in the middle with stats and technique filters, and a case inspector on the right with the rationale, fixture rows and the query to run.',
          caption: 'Left to right: the pasted query, the generated case list, and the inspector for one selected case — 71 cases from one query.'
        }],
        points: [
          'Left rail: the query itself, the techniques in play, the sample-value book, and an inferred schema — as tabs, so opening one never pushes the others off screen.',
          'Schema tab draws an ER diagram from the query alone — tables as boxes, foreign keys as lines — pan, zoom and drag a box out of the way.',
          'Compare mode diffs a "before" and "after" query and buckets every case as Changed, Unrelated or Stale.',
          'A live stat row over the case list — total cases, high-priority count, conditions, joins and tables touched.',
          'Search plus filters by priority, clause and column, a "only with a fixture" toggle, and a full/dense row switch.',
          'Click a case to open its inspector: the rationale, the fixture rows to prepare, and the query to run — self-checking against the recorded expected result.'
        ]
      }
    },
    'db-test-session': {
      icon: '↺',
      eyebrow: 'Data tab',
      title: 'DB Test Session & Rollback',
      lead: 'Change test data freely in Adminer — every write is recorded into a session, and one click puts the database back the way it was, with the exact SQL shown before it runs.',
      points: [
        'Start a session from the small panel Adminer shows bottom-right; nothing is recorded until you do.',
        'Captures the edit form, grid cell edits, bulk and whole-result deletes, mass edits, <code>INSERT</code>s and the <code>UPDATE</code>/<code>DELETE</code> you type on the SQL page.',
        '↺ Roll back all, or ↺ Undo last (<code>Alt+Shift+Z</code>) for the change you just made — always behind a preview of each change and the SQL underneath.',
        'A drift check re-reads every row first: if someone else changed it after you, you see the recorded and current values side by side and choose to skip or overwrite.',
        '↷ Re-apply puts the test’s values back when a rollback turned out to be the wrong call.',
        'Refuses what it can’t undo safely — tables without a key, statements with no <code>WHERE</code>, too many rows — and says why on the change itself.',
        'Nothing leaves your browser; export a session as <code>.sql</code> or <code>.json</code>. The manager page switches between English and Vietnamese.'
      ],
      tab: 'tabData',
      tabLabel: 'Data tab'
    }
  };
  var ORDER = ['recording', 'playback', 'variables', 'csv', 'screenshots', 'export', 'highlights', 'sql-test-designer', 'db-test-session'];

  /* ── Theme (same storage key as landing.js, so the two pages agree) ──────── */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('demoPageTheme'); } catch (e) {}
  if (saved) root.setAttribute('data-theme', saved);

  function currentTheme() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  function syncToggleIcon() {
    var btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = currentTheme() === 'dark' ? '☀️' : '🌙';
  }
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('demoPageTheme', theme); } catch (e) {}
    syncToggleIcon();
    // Not syncExtraShots() here — the screenshots follow the *popup's own*
    // theme (see below), not the page's. Reloading the preview frame below
    // fires its 'load' handler, which re-syncs them to match once the popup
    // comes back up with this same theme.
    syncPreviewFrame();
  }
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
  syncToggleIcon();

  /* ── Render the feature for the current ?id= ──────────────────────────────
   * Unknown/missing id → back to the features section rather than a blank page. */
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  var data = id && Object.prototype.hasOwnProperty.call(FEATURES, id) ? FEATURES[id] : null;
  if (!data) {
    window.location.replace('index.html#features');
    return;
  }

  document.title = data.title.replace(/<[^>]+>/g, '') + ' — Pocket QA';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', data.lead.replace(/<[^>]+>/g, ''));

  document.getElementById('crumbCurrent').textContent = data.title.replace(/<[^>]+>/g, '');
  document.getElementById('heroIcon').textContent = data.icon;
  document.getElementById('heroEyebrow').textContent = data.eyebrow;
  document.getElementById('heroTitle').innerHTML = data.title;
  document.getElementById('heroLead').innerHTML = data.lead;
  document.getElementById('previewTabLabel').innerHTML = data.tabLabel;

  var list = document.getElementById('detailPoints');
  data.points.forEach(function (text) {
    var li = document.createElement('li');
    li.innerHTML = text;
    list.appendChild(li);
  });

  /* ── Optional "extra" subsection — a deeper look at a screen the feature
   * opens (the Image Editor, the SQL analysis screen, …). Full-width, below
   * the two-column grid, so a longer point list has room to breathe. */
  if (data.extra) {
    var section = document.getElementById('detailExtra');
    document.getElementById('detailExtraTitle').innerHTML = data.extra.title;
    document.getElementById('detailExtraLead').innerHTML = data.extra.lead;
    if (data.extra.images && data.extra.images.length) {
      var shots = document.getElementById('detailExtraShots');
      if (data.extra.imagesLayout === 'row') shots.classList.add('detail-extra__shots--row');
      data.extra.images.forEach(function (img) {
        var figure = document.createElement('figure');
        figure.className = 'detail-extra__shot';
        var el = document.createElement('img');
        // No loading="lazy": this element is built while its ancestor still
        // carries `hidden` (unhidden a moment later) — a lazy image inside a
        // hidden (display:none) subtree never gets a layout box to test for
        // viewport intersection, so Chrome just never loads it. See the same
        // note that used to sit on the old static <img> in feature.html.
        el.alt = img.alt || '';
        if (img.srcDark) {
          // These are fixed screenshots of the same real popup UI shown in
          // "Live popup preview" below, so they follow *that* iframe's own
          // theme (see syncExtraShots) rather than the page's. Before the
          // iframe has actually loaded there's nothing to read yet, so the
          // page theme is just this first paint's best guess — the iframe's
          // 'load' handler corrects it a moment later regardless.
          el.dataset.srcLight = img.src;
          el.dataset.srcDark = img.srcDark;
        }
        el.src = (img.srcDark && currentTheme() === 'dark') ? img.srcDark : img.src;
        var figcaption = document.createElement('figcaption');
        figcaption.textContent = img.caption || '';
        figure.appendChild(el);
        figure.appendChild(figcaption);
        shots.appendChild(figure);
      });
      shots.hidden = false;
    }
    var extraList = document.getElementById('detailExtraPoints');
    (data.extra.points || []).forEach(function (text) {
      var li = document.createElement('li');
      li.innerHTML = text;
      extraList.appendChild(li);
    });
    section.hidden = false;
  }

  var frame = document.getElementById('previewFrame');
  function syncPreviewFrame() {
    if (frame) frame.src = 'popup-demo.html?tab=' + data.tab + '&theme=' + currentTheme();
  }
  syncPreviewFrame();

  /* ── Light/dark screenshots in the "extra" section ───────────────────────
   * These are fixed captures of the *same* real popup UI the "Live popup
   * preview" iframe shows below, so they follow that iframe's own theme —
   * not the page's. The two can disagree: the iframe boots with the page's
   * theme (via the ?theme= deep link above), but it has its own toggle
   * inside the popup UI itself (independent of the page's, by design — see
   * landing.js), and the screenshots need to track whichever theme the popup
   * actually ends up showing, not assume it always mirrors the page.
   *
   * Reading it needs the iframe to tell us, rather than us reaching into
   * previewFrame.contentDocument directly: this is all opened over file://
   * for a lot of visitors (see README), and some browsers' file:// origin
   * rules block that same-document access even for two files sitting in the
   * same folder — silently, with no error to notice, so a page/frame reach-in
   * here would just look like "nothing happens" without ever saying why.
   * postMessage doesn't need same-origin, so demo.js (§1 there) broadcasts
   * its theme on load and on every toggle instead. */
  var lastKnownPopupTheme = currentTheme(); // best guess until the frame's first message arrives
  function syncExtraShots() {
    document.querySelectorAll('#detailExtraShots img[data-src-dark]').forEach(function (img) {
      img.src = lastKnownPopupTheme === 'dark' ? img.dataset.srcDark : img.dataset.srcLight;
    });
  }
  window.addEventListener('message', function (e) {
    var msg = e.data;
    if (!msg || msg.source !== 'pocketQaPromoDemo' || msg.type !== 'theme') return;
    lastKnownPopupTheme = msg.theme === 'dark' ? 'dark' : 'light';
    syncExtraShots();
  });

  /* ── Prev / next feature ──────────────────────────────────────────────── */
  var idx = ORDER.indexOf(id);
  var prevId = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  var nextId = ORDER[(idx + 1) % ORDER.length];
  var prevLink = document.getElementById('prevFeatureLink');
  var nextLink = document.getElementById('nextFeatureLink');
  if (prevLink) {
    prevLink.href = 'feature.html?id=' + prevId;
    prevLink.textContent = '← ' + FEATURES[prevId].title.replace(/<[^>]+>/g, '');
  }
  if (nextLink) {
    nextLink.href = 'feature.html?id=' + nextId;
    nextLink.textContent = FEATURES[nextId].title.replace(/<[^>]+>/g, '') + ' →';
  }

  /* ── Reveal-on-scroll (same behaviour as landing.js) ─────────────────────── */
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
