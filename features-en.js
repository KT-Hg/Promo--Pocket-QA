/**
 * features-en.js — English content of the eleven feature pages (feature.html?id=<key>), written against the
 * extension README; `icon` is the inner markup of a 24×24 stroke icon. features-vi.js mirrors this shape
 * for the Vietnamese text: when a string changes here, change it there too (check-layout.js → checkShape()).
 */
/* ── Content ──────────────────────────────────────────────────────────────
 * Per feature:
 *   icon/eyebrow/title/lead  hero            summary  card text ("Explore other features")
 *   facts    [[value, label]] under the lead   points   "At a glance" list
 *   tab      the real popup tab id (vendor/popup.html) the live preview opens
 *            on — popup-demo.html supports ?tab=…&theme=… (README "Deep links")
 *   steps    [[title, text]] "How to use it"   notes    "Good to know" list
 *   sections [{ title, nav?, lead?, images?, imagesLayout?, table?: { head, rows },
 *               points?, code? }] — one full-width section each, in order.
 * Strings are HTML (code/kbd/b); `code` is plain text, shown verbatim. */
var FEATURES_EN = {
  recording: {
    icon: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/>',
    eyebrow: 'Record & Play',
    title: 'Record in one click',
    summary: 'Clicks and typing become editable, reorderable steps — 17 action types in all, from hovers to file uploads.',
    lead: 'Activate Pocket QA on a tab, hit Start Recording and do the task once. Every click and every field you type into becomes an editable step — no selectors to write by hand.',
    facts: [['17', 'action types'], ['8', 'selectors saved per element'], ['50', 'undo steps']],
    tab: 'tabRecord',
    tabLabel: 'Record & Play tab',
    points: [
      'Records clicks and typed input — typing is debounced to one step per field, and text typed just before a click is recorded before it.',
      'Only the tab the recording started on is recorded, and clicks the page’s own scripts fire are left out: the scenario holds what <em>you</em> did.',
      'Everything else is one of 17 action types added with <b>Add Manual Action</b> — hover, dropdowns, drag &amp; drop, waits, Run JS, conditions, asserts, switches, Read DOM, screenshots and file uploads.',
      'Every step stays editable: fix a selector, change a value, give it a label, disable it, or drag it to a new place.',
      'Undo/redo up to 50 steps while you edit, cleared when you start a new scenario or load another one.',
      '🎯 <b>Pick element</b> picks a target straight off the page instead of writing a selector.'
    ],
    steps: [
      ['Activate the tab', 'Open the popup on the page you want to automate and click <b>Activate</b> in the status bar.'],
      ['Record', 'Click <b>▶ Start Recording</b> (<span class="kbd">Alt+R</span>) and do the task once — clicks and typing are captured as you go.'],
      ['Stop &amp; save', 'Click <b>■ Stop</b> (<span class="kbd">Alt+S</span>), name the scenario and file it in a folder.'],
      ['Refine', 'Add what a recorder can’t see — a hover, a wait, an Assert — with Add Manual Action, and drag it into place.']
    ],
    sections: [
      // Seventeen actions as two tables, split by group, so each fits one screen
      {
        title: 'Page and control actions',
        nav: 'Page &amp; control',
        lead: 'Seventeen building blocks in all. Click and Input are recorded for you; the rest come from the Add Manual Action form, each with its own fields.',
        table: {
          head: ['Action', 'Group', 'What it does'],
          rows: [
            ['Click', 'Page', 'A mouse click on the target element.'],
            ['Input', 'Page', 'Sets a field’s value and fires <code>input</code>, <code>change</code> and <code>blur</code>, as a user’s typing would.'],
            ['Hover', 'Page', 'Fires <code>mouseover</code>, <code>mouseenter</code> and <code>mousemove</code> — opens menus and tooltips.'],
            ['Dropdown (open / choose item)', 'Page', 'A real, trusted click for dropdowns that ignore a scripted one, and optionally <b>Choose item #</b>.'],
            ['Drag &amp; Drop', 'Page', 'An HTML5 drag from a source selector onto a target selector.'],
            ['Navigate', 'Control', 'Goes to a URL — <code>${variables}</code> allowed.'],
            ['Wait', 'Control', 'Pauses for a number of milliseconds.'],
            ['Run JS', 'Control', 'Runs your own script on the page, even where its Content Security Policy blocks inline scripts.']
          ]
        }
      },
      {
        title: 'Logic and data actions',
        nav: 'Logic &amp; data',
        lead: 'The steps that turn a recording into a test: checks, branches, page reads, screenshots and file uploads.',
        table: {
          head: ['Action', 'Group', 'What it does'],
          rows: [
            ['Condition (If)', 'Logic', 'One of 12 checks; when it is false, the next N steps are skipped.'],
            ['Assert (Expect)', 'Logic', 'The same 12 checks, which must hold — a false one is recorded and the run goes on.'],
            ['Switch (branch)', 'Logic', 'Picks a scenario, a jump or a block of steps from a variable’s value.'],
            ['Read DOM → Variable', 'Data', 'Stores text, an input’s value or an attribute from the page in a variable.'],
            ['Screenshot&nbsp;(Visible)', 'Data', 'Captures the viewport.'],
            ['Screenshot (Full Page)', 'Data', 'Captures the whole page in one image.'],
            ['Screenshot&nbsp;(Element)', 'Data', 'Captures exactly one element’s box.'],
            ['Screenshot → Variable (CSV)', 'Data', 'Captures into a variable, so each CSV row’s image lands in the results.'],
            ['Upload File', 'Data', 'Puts local files into an <code>&lt;input type="file"&gt;</code> or a drag-and-drop zone.']
          ]
        }
      },
      {
        title: 'Selectors that survive a redesign',
        nav: 'Selectors',
        lead: 'While recording, up to eight selector candidates are stored for every element. Playback tries them most-precise-first until one finds it — so a renamed class or a moved button rarely breaks a run.',
        table: {
          head: ['#', 'Strategy', 'Looks for'],
          rows: [
            ['1', 'Full XPath', 'The exact recorded position in the document.'],
            ['2', 'ID', '<code>getElementById</code> — unique by definition.'],
            ['3', 'XPath', 'A relative XPath anchored on the nearest id.'],
            ['4', 'CSS', 'The computed CSS path.'],
            ['5', 'CSS through shadow roots', 'The same path, followed into open shadow roots (LitElement, Stencil, …).'],
            ['6', 'data-testid', '<code>[data-testid="…"]</code>'],
            ['7', 'data-id', '<code>[data-id="…"]</code>'],
            ['8', 'Name', '<code>[name="…"]</code>'],
            ['9', 'Text', 'An exact text match on the recorded tag — for links, buttons and headings up to 50 characters.']
          ]
        },
        points: [
          'The selector type you choose in the form — CSS, XPath, Full XPath, ID, Name or Text — is always tried first; the rest keep this order.',
          'Unstable ids are rejected while recording — React’s <span class="nw"><code>:r0:</code>-style</span> ids and UUIDs change on every load.',
          'Nothing found yet? Playback waits for the element to appear, up to the timeout, instead of failing on a slow page.',
          '<code>${variables}</code> work inside any selector, so one step can target a different row on every run.'
        ]
      },
      {
        title: 'Pick, target and organise',
        nav: 'Pick & organise',
        lead: 'The tools around the recorder that keep a scenario readable after the tenth edit.',
        points: [
          '🎯 <b>Pick element</b>: hover the page and click — the selector fields fill in for you, iframes included.',
          '<b>Child Condition</b> targets a container and finds the right child by its value, text, id, class or input type — for lists and tables whose rows keep moving. Works with Click, Input, Hover and Read DOM.',
          'Labels name a step in plain words; they show in the list, in exported code and in bug reports.',
          'A disabled step stays in the list with its number, so turning one off never renumbers the rest.',
          'Scenarios live in folders — rename, duplicate, move or delete them, and sort by newest, oldest or name.',
          'Typing <code>${</code> in any field suggests the variables you can use there.'
        ]
      }
    ],
    notes: [
      'The recorder captures clicks and typing only. Hovers, waits and drags are added by hand, so a recording never fills up with mouse noise.',
      'Recording and playback need the tab activated first — the status bar says whether it is.',
      'The Start/Stop hotkeys only fire on an activated tab, and only on a real key press: a page can’t start a recording by faking a keystroke.'
    ]
  },

  playback: {
    icon: '<path d="m17 2.5 3 3-3 3"/><path d="M4 11.5v-2a4 4 0 0 1 4-4h12"/><path d="m7 21.5-3-3 3-3"/><path d="M20 12.5v2a4 4 0 0 1-4 4H4"/>',
    eyebrow: 'Record & Play',
    title: 'Playback that keeps going',
    summary: 'Loop, sequence or schedule runs that carry on through iframes, page reloads, native dropdowns and file pickers.',
    lead: 'Replay a scenario once, loop it, chain several or schedule it — and let it carry on through iframes, page reloads, native dropdowns and file pickers that stop most recorders.',
    facts: [['5', 'ways to run'], ['Daily', 'scheduling'], ['Retry · Skip · Stop', 'when a step fails']],
    tab: 'tabRecord',
    tabLabel: 'Record & Play tab',
    points: [
      'Play once, loop N times with a delay between loops, or build a <b>Sequence</b> where each scenario gets its own delay.',
      'Schedule a scenario for a set time — once, or <b>Repeat daily</b> — and it starts on its own in the background.',
      'Steps run inside iframes, and a run picks up where it left off when the page reloads mid-playback.',
      'A step that fails asks <b>Retry / Skip / Stop</b>, so one flaky element doesn’t throw away the whole run.',
      'Native dropdowns that ignore a synthetic click get a real, trusted click instead.',
      'A progress panel shows the step in flight, and a notification tells you how the run ended.'
    ],
    steps: [
      ['Pick a scenario', 'Select it under Manage Scenarios — or several, in order, under Sequence Scenarios.'],
      ['Choose how it runs', 'Set the loop count and delay, or a time under Data → Scheduled Playback.'],
      ['Press ▶ Play', 'The Now Playing panel follows each step; <b>Stop</b> ends the run at any point.'],
      ['Read the result', 'The verdict shows on the Last run card, the toolbar badge and the notification.']
    ],
    sections: [
      {
        title: 'Five ways to run a scenario',
        nav: 'Run modes',
        table: {
          head: ['Mode', 'Where', 'What it does'],
          rows: [
            ['Single run', 'Record &amp; Play', 'Plays the selected scenario once, start to finish.'],
            ['Loop', 'Record &amp; Play', 'Repeats it N times with a delay between loops; variables are built fresh every loop.'],
            ['Sequence', 'Record &amp; Play → Sequence Scenarios', 'Runs several scenarios in order, each with its own delay — one run, one verdict.'],
            ['Scheduled', 'Data → Scheduled Playback', 'Starts a scenario at a set time, once or every day, from a background alarm.'],
            ['CSV data run', 'Data → <span class="nw">CSV Data-Driven Run</span>', 'Runs it once per row of a CSV file — see <a href="feature.html?id=csv">CSV <span class="nw">data-driven</span>&nbsp;runs</a>.']
          ]
        }
      },
      {
        title: 'Built for real pages',
        nav: 'Real pages',
        lead: 'The steps that usually force a recorder back to hand-written code are first-class here.',
        points: [
          '<b>Dropdown → Choose item #</b> picks an item by position: counted from 1 as the list shows it, <code>-1</code> for the last, <code>random</code> for any enabled item, or a <code>${variable}</code>.',
          'Virtualised lists (react-window, MUI) are scrolled until the chosen item is actually rendered.',
          '<b>Upload File</b> puts local files into an <code>&lt;input type="file"&gt;</code> or a drag-and-drop zone — several at once, with <code>${variable}</code> file names.',
          '<b>Run JS</b> executes your script on the page through the DevTools protocol, so the site’s Content Security Policy doesn’t block it.',
          '<b>Drag &amp; Drop</b> fires real HTML5 drag events from a source onto a target.',
          'Navigate and Wait run from the background worker, so a page change never cuts a run short.'
        ]
      },
      {
        title: 'Click through — or catch what a user couldn’t',
        nav: 'Click through',
        lead: 'Playback sends its events straight to the element, so by default a step acts on it whatever it looks like. Turn <b>Click through</b> off and a step fails the way a real user would be stuck.',
        points: [
          'Off for one action (the checkbox under Label) or for a whole scenario (⊘ on its toolbar).',
          'With it off, Click, Hover, Input, Dropdown, Drag &amp; Drop and Upload File fail when their element has no size, is disabled or read-only, or is covered by something else.',
          'The failure comes with the usual Retry / Skip / Stop prompt — so a test catches the button nobody could press.',
          'A step clicks through only when both it and its scenario allow it; a Switch into another scenario follows that scenario’s setting.'
        ]
      }
    ],
    notes: [
      'Upload File works in the page and its same-origin frames; in a frame of another origin it fails and says why.',
      'Scheduled runs use Chrome’s alarms, so Chrome has to be running at the scheduled time.',
      'Window capture can’t be a playback step — it needs you to pick the window by hand. The Screenshot actions cover visible, full page and element.'
    ]
  },

  'run-results': {
    icon: '<rect x="8" y="7" width="8" height="13" rx="4"/><path d="M12 11v9M8 12.5H4.5M19.5 12.5H16M8.3 16.5 5 19M15.7 16.5 19 19M8.8 9 6 6.5M15.2 9 18 6.5M10.2 7.4 9.3 5M13.8 7.4l.9-2.4"/>',
    eyebrow: 'Record & Play',
    title: 'Assertions, verdicts & bug reports',
    summary: 'Assert what the page should show, get a Passed / Failed / Broken verdict for every run, and a bug report ready to paste.',
    lead: 'Every run ends with a verdict — ✓ Passed, ✗ Failed, ⚠ Test broken or ⏹ Stopped. When it didn’t pass, a bug report with the steps to reproduce and a screenshot of the failure is one click away.',
    facts: [['12', 'check types'], ['4', 'verdicts'], ['5 s', 'an Assert waits for the page']],
    tab: 'tabRecord',
    tabLabel: 'Record & Play tab',
    points: [
      '<b>Assert (Expect)</b> checks what the page should show — an element, a text, a value, the URL, a class or an attribute: 12 checks in all.',
      'Asserts are waited for: checked every 250 ms for up to 5 seconds, so a page still loading isn’t a failure.',
      'Asserts are soft: a false one is recorded and the run goes on — a CSV or scheduled run never stalls on a prompt.',
      'The first failure decides the verdict. A broken click that makes the next Assert fail is a broken test, not a failing app.',
      'The <b>Last run</b> card at the top of Record &amp; Play lists every failure — click one to jump to its step.',
      '📋 <b>Bug report</b> writes the issue for you: steps to reproduce, URL, environment and the screenshot to attach.'
    ],
    steps: [
      ['Add an Assert', 'Add Manual Action → Assert (Expect): choose the check, its element and the value to expect.'],
      ['Run', 'Play, loop, sequence, CSV or schedule — Asserts never pause the run.'],
      ['Read the verdict', 'On the notification, the toolbar badge and the Last run card.'],
      ['Report it', '📋 Bug report → <b>Copy</b> the Markdown, <b>Download screenshot</b>, paste both into your tracker.']
    ],
    sections: [
      {
        title: 'Four verdicts, one rule',
        nav: 'Verdicts',
        lead: 'The first failure decides — it is most often the cause of everything after it.',
        table: {
          head: ['Verdict', 'When'],
          rows: [
            ['✓ Passed', 'No failure, and the run reached its end.'],
            ['✗ Failed', 'The first failure is a false Assert — the page was wrong.'],
            ['⚠ Test&nbsp;broken', 'The first failure is anything else — an element not found, a script error, a broken block. The test couldn’t look.'],
            ['⏹ Stopped', 'No failure, but the run didn’t reach its end — you stopped it, or its tab closed. Never counted as Passed.']
          ]
        },
        points: [
          '<b>Notification</b>: <code>✗ Failed — "Checkout"</code>, with how many checks failed and how many steps broke.',
          '<b>Badge</b>: ✗ red, ! amber or ■ grey on the toolbar icon until the next run, or until you open the popup.',
          '<b>CSV runs</b>: each row’s verdict lands in its own Run Result column — <code>12 passed · 2 failed · 1 broken</code>.',
          '<b>Sequences</b> get one verdict, from every scenario’s failures in order.'
        ]
      },
      {
        title: '12 checks for Conditions and Asserts',
        nav: '12 checks',
        lead: 'The same list drives both: a Condition decides whether to skip steps, an Assert decides whether the run passes.',
        table: {
          head: ['Check', 'Holds when'],
          rows: [
            ['Element exists / does not exist', 'The selector finds an element — or finds none.'],
            ['Element is visible / is hidden', 'The element is shown on the page — or isn’t.'],
            ['Text contains / Text equals', 'The element’s text includes — or exactly matches — the expected value.'],
            ['Value contains / Value equals', 'A field’s current value includes — or exactly matches — it.'],
            ['URL contains / URL equals', 'The page address includes — or exactly matches — it.'],
            ['Has class', 'The element carries the given class.'],
            ['Has attribute', 'The element carries the given attribute.']
          ]
        },
        points: [
          'A failing Assert says what it expected and what the page held: <code>Expected text "Saved", got "Error"</code>.',
          'A text, value, class or attribute check whose element isn’t there counts as <b>broken</b>, not failed — the test couldn’t check.',
          'A password field’s value never leaves the page: its Assert only says it didn’t match.'
        ]
      },
      {
        title: 'A bug report that writes itself',
        nav: 'Bug report',
        lead: 'On the Last run card of a run that failed or broke, 📋 Bug report opens Markdown ready for Jira, GitHub or any tracker that reads it.',
        points: [
          'The first failure, the page URL, when it happened (and in which loop), the result, the browser, OS and Pocket QA version.',
          '<b>Steps to reproduce</b> as sentences — steps a Condition skipped are left out, a Switch case that ran is kept.',
          'Values stay hidden (•••) — what was typed, uploaded or compared — until you tick <b>Include typed values</b>; that choice is never remembered.',
          'The screenshot is the page the moment the first failure happened, taken before the failure prompt could cover it.'
        ],
        code: [
          '## ✗ Failed — Checkout, step #4',
          '',
          '- **Failure:** ✗ #4 Check toast — Expected text "Saved", got "Error"',
          '- **Page:** https://shop.example.com/cart',
          '- **When:** 2026-10-21 14:32:05',
          '- **Result:** ✗ Failed — 1 check failed',
          '- **Environment:** Chrome · Windows · Pocket QA 1.0.24',
          '',
          '### Steps to reproduce',
          '',
          '1. Go to https://shop.example.com/cart',
          '2. Type ••• into #coupon',
          '3. Click "Apply" (#apply)',
          '4. ✗ Check that the text of #toast is "Saved"',
          '',
          '### Screenshot',
          '',
          'Attached: pocketqa-bug-Checkout-….jpg — the page when step #4 failed.'
        ].join('\n')
      }
    ],
    notes: [
      'The example report above is illustrative — the layout is the real one, the shop and its values are made up.',
      'No screenshot when the run’s tab wasn’t the one in front (a background run); the report says so instead of attaching the wrong page.',
      'Sequences and CSV runs leave no Last run card — their results are in the notification and in the CSV export.',
      'Variable names always show in the report (<code>${password}</code>); their values only with Include typed values ticked.'
    ]
  },

  variables: {
    icon: '<path d="M8 4c-1.7 0-3 .8-3 2.5v3c0 1-.8 2-2 2.5 1.2.5 2 1.5 2 2.5v3C5 19.2 6.3 20 8 20M16 4c1.7 0 3 .8 3 2.5v3c0 1 .8 2 2 2.5-1.2.5-2 1.5-2 2.5v3c0 1.7-1.3 2.5-3 2.5M10 9.5l4 5M14 9.5l-4 5"/>',
    eyebrow: 'Data tab',
    title: 'Variables & logic',
    summary: 'Static, random, pick-from-list and fallback variables, Read DOM, conditions and switch branches — reused anywhere as <code>${var}</code>.',
    lead: 'Turn a one-off recording into a real script: variables you reuse as <code>${var}</code> anywhere, values read off the page mid-run, and conditions and switches that branch on them.',
    facts: [['4', 'variable types'], ['12', 'condition checks'], ['3', 'layers of priority']],
    tab: 'tabData',
    tabLabel: 'Data tab',
    points: [
      'Four variable types: <b>Static</b>, <b>Random</b> (letters, numbers, both, or a datetime stamp), <b>Pick</b> (one of a list) and <b>Fallback</b> (try A, then B, then C).',
      '<code>${var}</code> works in selectors, values, URLs, scripts, expected values, file names and more.',
      'Type <code>${</code> (or <span class="kbd">Ctrl+Space</span>) in a field for suggestions — your variables, the ones earlier steps write, and the loaded CSV’s columns.',
      '<b>Read DOM → Variable</b> reads text, visible text, an input’s value or an attribute mid-run — the whole of it, or just the part you mark.',
      '<b>Condition (If)</b> skips the next N steps when its check is false.',
      '<b>Switch</b> runs another scenario, jumps within this one, or runs only the matching case’s block of steps.'
    ],
    steps: [
      ['Define', 'Data → Variables: add a name, pick a type, set its value.'],
      ['Use', 'Type <code>${name}</code> in any step field — the suggestion list fills it in.'],
      ['Capture', 'Add a Read DOM step to store something from the page as a new variable.'],
      ['Branch', 'Add a Condition or a Switch that acts on what the page shows or a variable holds.']
    ],
    sections: [
      {
        title: 'Four types of variable',
        nav: 'Variable types',
        lead: 'Pick the type in the form — the popup writes the syntax for you.',
        table: {
          head: ['Type', 'Stored as', 'At run time'],
          rows: [
            ['Static', '<code>https://staging.example.com</code>', 'Used as-is.'],
            ['Random', '<code>{random:alphanumeric:8}</code>', 'Fresh every run — letters, numbers, both, or <code>datetime</code>&nbsp;(<span class="nw">YYYY-MM-DD_HH-MM-SS</span>).'],
            ['Pick', '<code>{pick:alice|bob|carol}</code>', 'One value chosen at random per run; a CSV column of the same name overrides it.'],
            ['Fallback', '<code>{fallback:A|B|C}</code>', 'Tried in order until one matches on the page; it sticks for the rest of the run.']
          ]
        },
        points: [
          '<b>Priority</b>: a CSV row’s column beats a value Read DOM wrote during the run, which beats the saved variable.',
          'Values are resolved fresh at the start of every loop and never written back — a run can’t overwrite your saved variables.',
          'Sort the table by name, type, recently edited or a custom drag order.'
        ]
      },
      {
        title: 'Read DOM → Variable',
        nav: 'Read DOM',
        lead: 'Take a value off the page and use it in the steps that follow — an order number, a generated id, a price.',
        points: [
          '<b>Read from</b>: Text content, Visible text (what the user sees — a &lt;select&gt;’s chosen option, an input’s value), Input value, or any Attribute.',
          '<b>Save part of the text</b>: copy it as it reads and put <code>${name}</code> on the part to keep — <code>Order #${orderId} ·</code> — and each one becomes a variable.',
          '<b>Try on</b>: paste a sample text and see what the pattern extracts before you run it.',
          'Works with Child Condition, and with an element picked inside an iframe.'
        ]
      },
      {
        title: 'Conditions, switches and blocks',
        nav: 'Branching',
        lead: 'Branch on what the page shows or what a variable holds, without leaving the popup.',
        points: [
          '<b>Condition (If)</b>: one of 12 checks on an element, its text, value, class or attribute, or the URL — false skips the next N steps.',
          '<b>Switch on a variable</b>: each value runs another scenario, jumps to an action in this one, or runs only its own block of steps.',
          '<b>Always</b> mode: no variable — the chosen scenario (or a #–# range of it) plays every time, then this one carries on. Write the login once, reuse it everywhere.',
          'Steps inside a block are numbered by case (1.1, 1.2, 2.1…); dragging, deleting and undo keep every range right.'
        ],
        code: [
          '#1 Switch ${plan}   "free" → #2..#3   |   "pro" → #4..#5   |   anything else → nothing',
          '#6 Continue',
          '',
          'plan = free   → runs 1, 2, 3, 6',
          'plan = pro    → runs 1, 4, 5, 6',
          'anything else → runs 1, 6'
        ].join('\n')
      }
    ],
    notes: [
      'Variables are global to the extension and saved in your browser — they’re not tied to one scenario.',
      'A Read DOM step that fails and is skipped leaves its variable empty, so a later Condition can test for that.',
      'Code exports write a Switch block as <code>if / else if</code>; a Switch into another scenario can’t be exported and is flagged, not dropped.'
    ]
  },

  csv: {
    icon: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 4.5v15"/>',
    eyebrow: 'Data tab',
    title: 'CSV <span class="nw">data-driven</span>&nbsp;runs',
    summary: 'Upload a CSV — headers become <code>${variables}</code>. One scenario runs per row; results export to Excel, HTML or ZIP.',
    lead: 'Upload a CSV and replay the same scenario once per row — headers become <code>${variables}</code> automatically, so one recording drives an entire data set and every row gets its own verdict.',
    facts: [['1', 'recording, any number of rows'], ['3', 'export formats'], ['Per row', 'pass / fail verdict']],
    tab: 'tabData',
    tabLabel: 'Data tab',
    points: [
      'The first row names the variables: a column <code>email</code> becomes <code>${email}</code>, no mapping step.',
      'A row’s columns override saved variables of the same name, for that row only.',
      'Configurable delay between rows, from 0.5 s up to 10 s or a custom value, to stay gentle on the target site.',
      'Live progress row by row, with a countdown to the next row.',
      'Screenshot → Variable steps put each row’s capture into the results.',
      'Export as Excel XLSX with images in cells, HTML with embedded images, or a ZIP of screenshots + CSV.'
    ],
    steps: [
      ['Record with&nbsp;variables', 'Put <code>${name}</code> where the data goes — a login, a search term, a quantity.'],
      ['Upload the CSV', 'Data → <span class="nw">CSV Data-Driven Run</span>: the header row names the variables, and a preview shows what was read.'],
      ['Run', 'One execution per row, each row’s verdict collected as it goes.'],
      ['Export', 'XLSX, HTML or ZIP — each ending in Run Result and Action Failed columns.']
    ],
    sections: [
      {
        title: 'Results you can hand over',
        nav: 'Results',
        table: {
          head: ['Format', 'What you get'],
          rows: [
            ['Excel XLSX', 'One row per CSV row, screenshots embedded in their cells, Run Result and Action Failed at the end.'],
            ['HTML', 'A self-contained report with the images embedded — opens in any browser.'],
            ['ZIP', '<code>results.csv</code> plus one folder per row holding that row’s screenshots.']
          ]
        },
        points: [
          '<b>Run Result</b> is the row’s verdict — Passed, Failed, Test broken or Stopped.',
          '<b>Action Failed</b> lists each failure with its reason: <code>[7] assert "Check toast": Expected text "Saved", got "Error"</code>.',
          'A finished run counts its rows the same way: <code>12 passed · 2 failed · 1 broken</code>.',
          'Your own CSV may have a column called Run Result — the added columns are told apart by position, so it keeps its values.'
        ]
      },
      {
        title: 'ZIP folders named your way',
        nav: 'ZIP layout',
        lead: 'The ZIP export’s <b>Advanced</b> section names each row’s folder from its own data — ready to file, no renaming afterwards.',
        points: [
          '<b>Folder name</b> template: <code>abc ${name}</code> → <code>abc john/</code>, <code>abc kate/</code> — any CSV column, or a variable the run wrote.',
          '<b>Add row number</b>: <code>abc john_01</code>, <code>abc kate_02</code>.',
          'Two rows that land on one name get <code>_2</code>, <code>_3</code>; characters Windows refuses become <code>_</code>.',
          'Inside a folder each image is named by its Screenshot → Variable step’s Filename — <code>a/b</code> makes a subfolder.',
          'Change the names after a run and download again — no new run needed.'
        ],
        code: [
          'results.csv',
          'abc john_01/',
          '    login.png',
          '    checkout/receipt.png',
          'abc kate_02/',
          '    login.png',
          '    checkout/receipt.png'
        ].join('\n')
      }
    ],
    notes: [
      'Changing the export format after a run clears the accumulated results — pick the format first.',
      'The delimiter is detected and quoted values are read properly, so a CSV saved from Excel just works.',
      'Exported tests can read the same CSV and run once per row — see <a href="feature.html?id=export">Code export</a>.'
    ]
  },

  screenshots: {
    icon: '<path d="M4 8h3l1.8-2.5h6.4L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>',
    eyebrow: 'Capture tab',
    title: 'Screenshots & image tools',
    summary: 'Visible, full-page, scrolling, segment, element and whole-window capture — with an editor, watermark and image diff.',
    lead: 'Six kinds of capture cover everything from the visible viewport to a whole application window — each with a ✂ twin that opens the shot straight in the image editor.',
    facts: [['6', 'kinds of capture'], ['10', 'capture & record hotkeys'], ['3 · 5 · 10 s', 'countdown']],
    tab: 'tabCapture',
    tabLabel: 'Capture tab',
    points: [
      'Visible, Full Page, Scroll (vertical / horizontal), Segment (vertical / horizontal), Element and Window capture.',
      'Every mode has a <b>✂ Edit</b> twin that opens the image editor right after the shot.',
      'A 3, 5 or 10-second countdown before a visible capture — time to open the dropdown or hover state you need in the shot.',
      'Watermark with <code>{url}</code> and <code>{datetime}</code> tokens, stamped onto the image.',
      '🔍 <b>Image Diff</b> compares two screenshots pixel by pixel, with an adjustable sensitivity.',
      'Save automatically with a filename prefix, or be asked where to save each one.'
    ],
    steps: [
      ['Pick a mode', 'Capture tab — filter by All, Visible, Scroll, Segment, Element or Window.'],
      ['Shoot', 'Click its button, or press its hotkey without opening the popup.'],
      ['Edit if needed', 'The ✂ twin opens the editor: crop, annotate, blur, stamp.'],
      ['Save', 'Downloaded automatically, or to a folder you choose.']
    ],
    sections: [
      {
        title: 'Six kinds of capture',
        nav: 'Capture modes',
        table: {
          head: ['Mode', 'How it works', 'Hotkey'],
          rows: [
            ['Visible', 'The viewport, as you see it.', '<span class="kbd">Alt+P</span>'],
            ['Full Page', 'The whole page in one image — fixed headers handled, zoom set to 100% for the shot.', '<span class="kbd">Alt+Shift+F</span>'],
            ['Scroll V / H', 'Scrolls the page and stitches a vertical or horizontal panorama.', '<span class="kbd">Alt+V</span> / <span class="kbd">Alt+H</span>'],
            ['Segment V / H', 'Mark the start, scroll to the end, stop — only the part you marked.', '<span class="kbd">Alt+Shift+V</span> / <span class="kbd">Alt+Shift+H</span>, then <span class="kbd">Alt+X</span>'],
            ['Element', 'Exactly one element’s box.', '<span class="kbd">Alt+E</span>'],
            ['Window', 'Any application window on screen — browser chrome and DevTools included.', '—']
          ]
        }
      },
      {
        title: 'Window capture',
        nav: 'Window capture',
        lead: 'Every other mode goes through the page, which can’t see past the viewport. Window capture goes through the operating system instead.',
        points: [
          'Photographs any app window exactly as it is on screen — a browser with DevTools docked, an editor, a terminal — in physical pixels.',
          'Asks for the optional screen-capture permission the first time; declining leaves every other feature untouched.',
          'Only windows are offered, never whole screens. Blank first frames are detected and retried, never saved as a black image.',
          'The countdown starts after you pick the window and shows in a small always-on-top window and on the toolbar badge — neither ends up in the shot.',
          'Cancel at any point with the Cancel button or <span class="kbd">Esc</span>.'
        ]
      },
      {
        title: 'Inside the Image Editor',
        nav: 'Image Editor',
        lead: 'Every capture — or any image from the clipboard or a file — can open in a full crop-and-annotate editor. It opens in its own window, not a cramped popup panel.',
        images: [{
          src: 'screenshots/shot-image-editor.webp',
          srcDark: 'screenshots/shot-image-editor-dark.webp',
          alt: 'The Image Editor open on a sample dashboard screenshot, with a rectangle and arrow annotation drawn on it and the Stamp panel open on the right showing timestamp watermark options.',
          caption: 'Crop, annotate and stamp any capture — here with a rectangle + arrow highlight and the Stamp panel open.'
        }],
        points: [
          'Seven tools on one sidebar: Crop, Draw, Rectangle, Ellipse, Arrow, Text and Blur — each with a one-key shortcut (C, D, R, E, A, T, B).',
          'Rotate 90° left/right, flip horizontal or vertical, and a full undo/redo history for every edit.',
          'Adjust panel: brightness, contrast, saturation and sharpness sliders, with one-tap reset.',
          'Resize panel: exact width/height with a lock-ratio option, or a 10–300% scale slider.',
          'Stamp panel: a timestamp or custom-text watermark in any of 9 positions, with font size and opacity control.',
          'Zoom in/out with a 1:1 reset, and a keyboard-shortcuts panel a keypress away.'
        ]
      }
    ],
    notes: [
      'A minimised window can’t be captured — restore it first.',
      'Segment captures keep your browser zoom on purpose: the marked range was measured at that zoom.',
      'Window capture can’t be a recorded step. Inside a scenario, the Screenshot actions cover visible, full page and element.',
      'On pages a content script can’t reach (chrome:// pages, the Web Store), the countdown runs on the toolbar badge instead.'
    ]
  },

  export: {
    icon: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    eyebrow: 'Data tab',
    title: 'Code export in five formats',
    summary: 'Turn any scenario into a JS bookmarklet, Selenium Python or pytest, Playwright Test, Robot Framework or Selenium Java test.',
    lead: 'Turn any recorded scenario into real, runnable test code — five formats, generated fresh from the scenario’s current steps, with nothing dropped silently.',
    facts: [['5', 'output formats'], ['8', 'fallback locators per step'], ['4', 'environment overrides']],
    tab: 'tabData',
    tabLabel: 'Data tab',
    points: [
      '⚡ JS Bookmarklet, 🐍 Selenium Python (script or pytest), 🎭 Playwright Test, 🤖 Robot Framework and ☕ Selenium Java (TestNG).',
      'Playback is the standard: the code does what a run does — same locator fallbacks, and the extension’s own in-page helpers wherever a plain driver call would act differently.',
      'Every step is marked ✓ OK, ⚠ Verify or — Skip in the Actions tab, with the reason, and a comment says so in the code.',
      'Asserts stay waited-for and soft: each false one is reported, and the test fails at the end with all of them listed.',
      'Point the same file at staging, swap browsers, go headless or override variables from the environment — no&nbsp;<span class="nw">re-export</span>.',
      'A failing step names itself — <code>Step 3: click — Sign in: no element found by …</code> — and saves a screenshot of the page.'
    ],
    steps: [
      ['Pick the scenario', 'Data → Export Code — the list is grouped by folder and starts on the scenario you have selected.'],
      ['Pick a format', 'Five buttons; all open the same four-tab window: Code, Variables, Actions, Settings.'],
      ['Tune it', 'Starting URL, browser, headless, delays, timeouts, a CSV data file — the code follows as you type.'],
      ['Copy or download', 'Then run it with <code>pytest</code>, <code>npx playwright test</code>, <code>robot</code> or <code>mvn test</code>.']
    ],
    sections: [
      {
        title: 'Five formats',
        nav: 'Formats',
        table: {
          head: ['Format', 'File', 'Runs with'],
          rows: [
            ['⚡ JS Bookmarklet', '<code>&lt;name&gt;_bookmarklet.js</code>, or a one-line bookmark URL', 'The browser — a bookmark or the Console. Nothing to install.'],
            ['🐍 Selenium&nbsp;Python', '<code>&lt;name&gt;_selenium.py</code> (script) or <code>test_&lt;name&gt;.py</code> (pytest)', '<code>python</code> / <code>pytest</code> with Selenium 4'],
            ['🎭 Playwright&nbsp;Test', '<code>&lt;name&gt;.spec.js</code>', '<code>npx playwright test</code> — each step a <code>test.step</code>, with a trace on failure'],
            ['🤖 Robot&nbsp;Framework', '<code>&lt;name&gt;.robot</code>', '<code>robot</code> with SeleniumLibrary — steps read as keywords'],
            ['☕ Selenium&nbsp;Java', '<code>&lt;Name&gt;Test.java</code>', '<code>mvn test</code> / <code>gradle test</code> with Selenium 4 and TestNG 7']
          ]
        },
        points: [
          'File names keep letters of any language, as in <code>đăng_nhập_selenium.py</code> or <code>ĐăngNhậpTest.java</code>.',
          'The Code tab colours the output, jumps to Step 1 past the helpers, and wraps long lines if you like.',
          '<b>↻ Reload scenario</b> picks up edits made while the window is open; each format’s settings are remembered.'
        ]
      },
      {
        title: 'From popup to code',
        nav: 'Screenshots',
        lead: 'The same “Login flow” scenario, exported two ways — real output from the real generator, not a mockup.',
        // Captured at the popup's real 480×600 size (see README), so they're
        // tall and narrow — side by side instead of full-width-stacked.
        imagesLayout: 'row',
        images: [
          {
            src: 'screenshots/shot-export-js.webp',
            srcDark: 'screenshots/shot-export-js-dark.webp',
            alt: 'The Export JS modal for the Login flow scenario at Step 1 of the generated bookmarklet code, with Code/Variables/Actions/Settings tabs and a warning that 1 step needs checking and 1 was skipped.',
            caption: 'JS Bookmarklet — the code with Variables, Actions and Settings tabs, ready to copy or download.'
          },
          {
            src: 'screenshots/shot-export-py.webp',
            srcDark: 'screenshots/shot-export-py-dark.webp',
            alt: 'The Export Python modal for the same Login flow scenario at Step 1 of the generated Selenium code.',
            caption: 'Selenium Python — the same scenario as a standalone script; ↧ Steps jumps past the helpers to Step 1.'
          }
        ],
        points: [
          'The warning line is real: steps a format can’t express are counted and named — a click opens them in the Actions tab.',
          'Variables lists every variable the code bakes in; Actions lists every step with ✓ OK, ⚠ Verify or — Skip.'
        ]
      },
      {
        title: 'What each format covers',
        nav: 'Coverage',
        lead: 'Where a format can’t do what playback does, the step says so — in the Actions tab and as a comment in the code.',
        table: {
          head: ['Step', 'Bookmarklet', 'Selenium', 'Playwright', 'Robot', 'Java'],
          rows: [
            ['Click, Input, Hover, Dropdown, Drag &amp; Drop, Wait, Read DOM,&nbsp;Condition', '✓', '✓', '✓', '✓', '✓'],
            ['Navigate', '⚠ one click per page', '✓', '✓', '✓', '✓'],
            ['Run JS', '⚠ pasted as is', '⚠&nbsp;<code>execute_script</code>', '⚠&nbsp;<code>page.evaluate</code>', '⚠&nbsp;<code>Execute Javascript</code>', '⚠&nbsp;<code>executeScript</code>'],
            ['Screenshots', '—', '✓', '✓', '✓', '✓'],
            ['Upload File (input or drop zone)', '—', '✓', '✓', '✓', '✓'],
            ['Step recorded inside an iframe', '⚠ same site only', '✓', '✓', '✓', '✓'],
            ['Switch block on a variable', '✓ <code>if / else if</code>', '✓ <code>if / elif</code>', '✓', '✓ <code>IF / ELSE IF</code>', '✓'],
            ['Switch to another scenario, to #N, Always', '—', '—', '—', '—', '—'],
            ['Assert (soft, waited for)', '✓ one alert at the end', '✓ <code>AssertionError</code> at the&nbsp;end', '✓ <code>expect.soft</code>', '✓ Continue On Failure', '✓ <code>SoftAssert</code>']
          ]
        }
      },
      {
        title: 'Run it anywhere, without exporting again',
        nav: 'Environment',
        lead: 'The Selenium, Playwright, Robot and Java exports read a few environment variables, so one file covers every environment.',
        table: {
          head: ['Variable', 'What it does', 'Formats'],
          rows: [
            ['<code>PQA_BASE_URL</code>', 'Another site to run on — every URL on the first page’s site goes to the same page there.', 'Selenium, Playwright, Robot, Java'],
            ['<code>PQA_BROWSER</code>', '<code>Chrome</code>, <code>Edge</code>, <code>Firefox</code> or <code>Safari</code>, instead of the exported one.', 'Selenium, Robot, Java'],
            ['<code>PQA_HEADLESS</code>', '<code>1</code> for no browser window, <code>0</code> for a window.', 'Selenium, Robot, Java'],
            ['<code>PQA_&lt;name&gt;</code>', 'The value of variable <code>&lt;name&gt;</code> — <code>PQA_username=bob</code>.', 'Selenium, Playwright, Robot, Java']
          ]
        },
        points: [
          '<b>Data file (CSV)</b>: pytest, Playwright, Robot (through DataDriver) and Java run the test once per row of a CSV next to it.',
          'Headless runs get a 1920 × 1080 window, so responsive pages show their desktop layout.',
          'A scenario’s own text only ever lands in a string or a comment — an imported scenario can’t smuggle code into your export.'
        ],
        code: 'PQA_BASE_URL=https://staging.example.com PQA_HEADLESS=1 PQA_username=bob pytest test_login_flow.py'
      }
    ],
    notes: [
      'The bookmarklet stops at a Navigate and goes on from the next step when you click it again on the new page — a bookmarklet can’t survive a page load.',
      'Variable values are baked in at export time — edit the Variables table and export again, or override them with <code>PQA_&lt;name&gt;</code>.'
    ]
  },

  highlights: {
    icon: '<path d="m14.5 4 5 5-8 8h-4v-4z"/><path d="M4 21h16"/>',
    eyebrow: 'Highlight tab',
    title: 'Highlights by URL pattern',
    summary: 'Highlight text on any page in five colours, with notes — restored on every visit and grouped by URL pattern.',
    lead: 'Mark up any page with colour-coded highlights and notes that come back on your next visit — grouped by URL patterns, so one set covers every page that shares a layout.',
    facts: [['5', 'colours'], ['📝', 'a note on any highlight'], ['JSON', 'export']],
    tab: 'tabHighlight',
    tabLabel: 'Highlight tab',
    points: [
      'Turn Highlight ON, select text on the page, and pick yellow, green, pink, blue or orange from the tooltip.',
      'Add a 📝 note to any highlight; hover it later to read it.',
      'Highlights come back on your next visit — even on content that loads late.',
      'Full-text search across every saved highlight, with a colour filter.',
      'Stats for this page, in total and per page, with a colour breakdown.',
      'Export every highlight as JSON.'
    ],
    steps: [
      ['Switch it on', 'Highlight tab → Highlight ON.'],
      ['Select text', 'A small tooltip offers the five colours and a note.'],
      ['Come back', 'Highlights are restored on revisit, by page or by URL pattern.'],
      ['Browse', 'Search, filter and jump between highlighted pages from the popup.']
    ],
    sections: [
      {
        title: 'URL patterns',
        nav: 'URL patterns',
        lead: 'By default a highlight belongs to the page it was made on. A pattern — with wildcards in the path <em>and</em> the subdomain — groups several pages under one shared set.',
        table: {
          head: ['Pattern', 'Matches'],
          rows: [
            ['<code>site.com/*/settings</code>', '<code>site.com/team/settings</code>, <code>site.com/billing/settings</code>'],
            ['<code>*.myapp.com/app/*</code>', '<code>eu.myapp.com/app/orders</code>, <code>us.myapp.com/app/users</code>'],
            ['<code>site.com/products</code>', '<code>site.com/products?page=2</code> — a pattern that names no query matches any query']
          ]
        },
        points: [
          'A builder turns the current tab’s URL into a pattern — no syntax to remember.',
          'Adding or removing a pattern regroups highlights already stored. Each one remembers the page it was made on, so none go missing when the rules change.',
          '<code>#anchor</code> links count as the same page; <code>#/route</code> and <code>#!/route</code> hashes count as real pages, the way single-page apps use them.'
        ]
      }
    ],
    notes: [
      'Highlights are stored in your browser and never leave it, except in the JSON you export.',
      'With Highlight OFF, the highlight engine isn’t even injected into pages.',
      'The Highlight tab’s badge shows how many highlights the current page has.'
    ]
  },

  'sql-test-designer': {
    icon: '<path d="M9.5 3h5M10.5 3v6.2L5.2 18.4A1.7 1.7 0 0 0 6.7 21h10.6a1.7 1.7 0 0 0 1.5-2.6L13.5 9.2V3"/><path d="M7.6 15h8.8"/>',
    eyebrow: 'Data tab',
    title: 'SQL Test Case Designer',
    summary: 'Paste a SQL query and get EP/BVA, decision-table, NULL and JOIN test cases — with fixture data, exported as CSV or JSON.',
    lead: 'Paste a SQL query and get a ready-made test case list — equivalence partitions, boundary values, a decision table, and the NULL and JOIN edge cases most manual test plans miss — with the test data each case needs.',
    facts: [['4', 'technique families'], ['4', 'export formats'], ['VI / EN', 'interface']],
    tab: 'tabData',
    tabLabel: 'Data tab',
    points: [
      'Parses <code>SELECT</code> (joins, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>, <code>LIMIT</code>, <code>UNION</code>, CTEs, <code>CASE</code>) plus <code>INSERT</code>, <code>UPDATE</code> and <code>DELETE</code>.',
      'EP/BVA cases straight from the query’s conditions, with boundary steps that follow the inferred type.',
      'A decision table covering the query’s logic — switching to MC/DC once the condition count passes a configurable limit.',
      'NULL, three-valued logic and JOIN cardinality cases that are easy to miss by hand.',
      'Findings flag defects in the query itself — a comma join, <code>= NULL</code>, a <code>DELETE</code> with no <code>WHERE</code>.',
      'Everything runs locally in the page — your SQL never leaves the browser.'
    ],
    steps: [
      ['Open it', 'Data → SQL Test Case Designer opens in its own tab.'],
      ['Paste a query', 'MySQL backticks, SQL Server brackets, ANSI quotes and <code>?</code> / <code>:name</code> / <code>@name</code> / <code>$1</code> parameters all parse.'],
      ['Review the cases', 'Filter by priority, clause or column; click a case for the rows it needs.'],
      ['Export', 'CSV for TestRail or Jira, JSON, a per-table Data CSV, or Verify SQL.']
    ],
    sections: [
      {
        title: 'Techniques',
        nav: 'Techniques',
        table: {
          head: ['Technique', 'What it produces'],
          rows: [
            ['EP + BVA', 'One value per equivalence class of each predicate, plus the boundary and its two neighbours. The step follows the type — 1 for an integer, 0.01 for money, a day for a date; strings get length, empty and whitespace cases.'],
            ['Decision table +&nbsp;coverage', 'The full 2ⁿ rule table while the condition count stays under the limit, then MC/DC — one rule pair per condition. <code>CASE</code> gets branch coverage, including the hidden NULL branch of a missing <code>ELSE</code>.'],
            ['NULL &amp; 3-valued logic', '<code>&lt;&gt;</code> dropping NULL rows, <code>NOT IN</code> over a NULL, <code>COUNT(col)</code> vs <code>COUNT(*)</code>, NULL join keys that never match, NULL grouping keys collapsing into one group.'],
            ['JOIN / GROUP BY /&nbsp;ORDER–LIMIT', 'Each join at 1:1, orphan and 1:n; a <code>WHERE</code> on an outer-joined table silently making it inner; empty, single and multiple groups; ties in <code>ORDER BY</code>; pages at, below and past the row count.']
          ]
        }
      },
      {
        title: 'Inside the analysis screen',
        nav: 'Workspace',
        lead: 'A dedicated three-column workspace, not a popup panel — everything a run needs stays visible at once.',
        images: [{
          src: 'screenshots/shot-sqlcases-analysis.webp',
          srcDark: 'screenshots/shot-sqlcases-analysis-dark.webp',
          alt: 'The SQL Test Case Designer: the query rail on the left with the pasted SQL, a generated case list in the middle with stats and technique filters, and a case inspector on the right with the rationale, fixture rows and the query to run.',
          caption: 'Left to right: the pasted query, the generated case list, and the inspector for one selected case — 71 cases from one query.'
        }],
        points: [
          'Left rail: the query, the techniques in play, the <span class="nw">sample-value</span> book and the inferred schema — as tabs, so opening one never pushes the others off screen.',
          'The Schema tab draws an ER diagram from the query alone — tables as boxes, foreign keys as lines; pan, zoom and drag.',
          'Compare mode diffs a “before” and “after” query and buckets every case as Changed, Unrelated or Stale.',
          'A live stat row over the case list — total cases, high priority, conditions, joins and tables touched.',
          'Search plus filters by priority, clause and column, an “only with a fixture” toggle, and a full/dense row switch.',
          'Click a case for its inspector: the rationale, the fixture rows to prepare, and the query to run.'
        ]
      },
      {
        title: 'Test data and sample values',
        nav: 'Test data',
        lead: 'Each case comes with the rows to type in before you run it, and the query to run afterwards — <span class="nw">read-and-type</span> fixtures for a manual tester.',
        points: [
          'One block per table, the value under test highlighted, child rows already pointing at their parent.',
          'Row-count conditions are honoured: <code>HAVING COUNT(o.id) &gt; 3</code> seeds four child rows, an orphan-join case seeds none.',
          'The query to run comes with its expected result next to it, so a manual run checks itself.',
          'The schema is inferred from the query — types from the literals, keys from names and join conditions — and shown, so a wrong guess is visible before anyone types data in.',
          '<b>Sample values</b>: set a bind parameter (<code>:min = 18</code>) and its boundary cases become a real 17 / 18 / 19; change a column sample and every case and fixture using it follows.',
          'Keys aren’t editable — they link the fixture rows, and typing over them would break the join the fixture exists to test.'
        ]
      },
      {
        title: 'Export',
        nav: 'Export',
        table: {
          head: ['Format', 'Contents'],
          rows: [
            ['CSV', 'UTF-8 with BOM, every field quoted — opens cleanly in Excel (Vietnamese diacritics included) and imports into TestRail or Jira.'],
            ['JSON', 'The cases plus the parsed analysis — tables, joins, numbered conditions, parameters, findings, coverage — and the sample values in force.'],
            ['Data CSV', 'One file per table, every fixture row tagged with the case it belongs to.'],
            ['Verify SQL', 'The query per case, with its expected result as a comment above it.']
          ]
        }
      }
    ],
    notes: [
      'Only the outer statement is analysed. CTEs and subqueries are flagged — paste each one separately for its own cases.',
      'There is no live schema: column types come from comparison literals first and column names second. When neither settles it, the case says so.',
      'Expected results state what SQL semantics require, not what your current data contains.',
      'The interface is Vietnamese by default and English via 🌐 — cases are generated in the active language, so an export always matches the screen.'
    ]
  },

  'db-test-session': {
    icon: '<ellipse cx="11" cy="5.5" rx="7" ry="2.5"/><path d="M4 5.5v12c0 1.4 3.1 2.5 7 2.5M18 5.5V10M4 11.5c0 1.4 3.1 2.5 7 2.5"/><path d="M14.5 17.5H19a2.5 2.5 0 0 0 0-5h-3"/><path d="m16.5 15.5-2 2 2 2"/>',
    eyebrow: 'Data tab',
    title: 'DB Test Session & Rollback',
    summary: 'Every change you make to test data in Adminer is recorded — roll it all back in one click, with the SQL shown first.',
    lead: 'Change test data freely in Adminer — every write is recorded into a session, and one click puts the database back the way it was, with the exact SQL shown before it runs.',
    facts: [['8', 'kinds of write recorded'], ['1 click', 'to roll back'], ['0', 'bytes leave your browser']],
    tab: 'tabData',
    tabLabel: 'Data tab',
    points: [
      'Start a session from the small panel Adminer shows bottom-right; nothing is recorded until you do.',
      'Captures the edit form, grid cell edits, bulk and <span class="nw">whole-result</span> deletes, mass edits, <code>INSERT</code>s and the <code>UPDATE</code>/<code>DELETE</code> you type on the SQL page.',
      '↺ Roll back all, or ↺ Undo last (<span class="kbd">Alt+Shift+Z</span>) for the change you just made — always behind a preview of each change and the SQL underneath.',
      'A drift check re-reads every row first: if someone changed it after you, you see recorded and current values side by side and choose to skip or overwrite.',
      '↷ Re-apply puts the test’s values back when a rollback turned out to be the wrong call.',
      'Refuses what it can’t undo safely — and says why, on the change itself.'
    ],
    steps: [
      ['Open Adminer', 'A small panel appears bottom-right. The Adminer panel switch on the Data tab turns it off and on.'],
      ['▶ Start session', 'Name the test run — from now on every write is recorded.'],
      ['Test', 'Edit, delete and insert as usual; each change lands in the panel’s log.'],
      ['↺ Roll back all', 'Read the SQL preview, confirm, and the data is back.']
    ],
    sections: [
      {
        title: 'Inside a test session',
        nav: 'Screenshots',
        lead: 'One sample session — a coupon checked out, then refunded — seen from the Adminer panel and from the manager page. Real UI, and the SQL is the real generator’s output.',
        images: [
          {
            src: 'screenshots/shot-dbtools-rollback.webp',
            srcDark: 'screenshots/shot-dbtools-rollback-dark.webp',
            alt: 'The Undo SQL preview opened from the Adminer panel: a Step by step / Merged switch, one summary line per change with a skipped UPDATE products flagged, and the seven UPDATE, INSERT and DELETE statements to run; beside it the panel, recording, with its Roll back all and Undo last buttons and a log of recorded changes.',
            caption: '↺ Roll back all opens the SQL first — one line per change, the skipped one says why, and nothing runs until you confirm.'
          },
          {
            src: 'screenshots/shot-dbtools-manager.webp',
            srcDark: 'screenshots/shot-dbtools-manager-dark.webp',
            alt: 'The Test sessions & rollback page: sessions listed on the left, and the selected session’s seven changes on the right, with the before/after of a DELETE on cart_items and an UPDATE on orders open, and one change already undone.',
            caption: 'The manager page — every session on the left, each change’s before/after on the right, undone one at a time or all at once.'
          }
        ],
        points: [
          'The panel stays small: whether it’s recording, how many changes, and the few buttons you need mid-test.',
          'Step by step replays each change as recorded; Merged folds several edits of one row (A→B→C) into a single statement straight back to A.',
          'Every recorded line in the panel’s log links to that change on the manager page, diff already open.',
          'Undo or re-apply a single change from its own row, or tick several and roll back just those.',
          'A session isn’t spent by one rollback: run the test again and it offers the same undo a second time.',
          'Export a session as <code>.sql</code> or <code>.json</code>; the manager page switches between English and Vietnamese.'
        ]
      },
      {
        title: 'What it records',
        nav: 'What it records',
        lead: 'Old values are read before the write — through each row’s own edit form, because Adminer shortens long text in its grid and a shortened value restored as if it were whole would corrupt the row.',
        table: {
          head: ['Where you changed it', 'What is captured', 'Undone with'],
          rows: [
            ['Row edit form', 'The values in the form when it loaded — before you touched them.', '<code>UPDATE</code> back, only the columns that changed'],
            ['“Save and continue editing”', 'The row before and after each save, read back so <code>now()</code> is the real value.', '<code>UPDATE</code> back, one change per save'],
            ['Delete on the edit form', 'The whole row.', '<code>INSERT</code> it back'],
            ['A cell edited in the grid', 'Each edited row, read before the save and again after.', '<code>UPDATE</code> back'],
            ['Ticked rows or whole result → Delete', 'Every row about to go — for a whole result, all matching rows, not just the page.', '<code>INSERT</code> them back'],
            ['Ticked rows → Edit (mass edit)', 'Each row before.', '<code>UPDATE</code> back'],
            ['<code>UPDATE</code> / <code>DELETE</code> on the SQL page', 'The affected rows, read before the statement runs.', '<code>UPDATE</code> / <code>INSERT</code> per row'],
            ['<code>INSERT</code> — form, Clone or SQL page', 'The new row’s key.', '<code>DELETE</code> of exactly those rows']
          ]
        }
      },
      {
        title: 'Safe by design',
        nav: 'Safety',
        lead: 'It isn’t a transaction — Adminer opens a new connection per request — so it’s a changeset kept by the extension, replayed backwards as ordinary SQL you read before it runs.',
        points: [
          '<b>Drift check</b>: before undoing a change it re-reads the row. Only the columns that change wrote are compared, so a colleague editing another column isn’t a conflict.',
          '<b>Refusals</b>: a table with no primary or unique key, a statement with no <code>WHERE</code> or writing two tables, more rows than the cap (200 by default) — each shown on the change, never swallowed.',
          'Statements run newest first, one change per submission, and stop at the first failure — what is marked undone is what actually was.',
          'Rollback runs from the Adminer tab itself, where Adminer’s session cookie is; with none open, <b>Open Adminer</b> opens one and carries on.',
          'A changeset belongs to one database (origin, driver, server, database) and is never offered on another.'
        ]
      }
    ],
    notes: [
      'Only writes made through Adminer are recorded — changes your application makes on its own aren’t in the log.',
      'It says so when it can’t put something back: a column with <code>ON UPDATE CURRENT_TIMESTAMP</code>, or rows removed by <code>ON DELETE CASCADE</code>.',
      'Finding an <code>INSERT</code>’s rows by comparing keys can also catch a row someone else inserted in the same second — those are marked “found by difference”.',
      'Nothing leaves your browser: the changeset lives in the extension’s local storage.'
    ]
  },

  settings: {
    icon: '<path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17" r="2"/>',
    eyebrow: 'Settings tab',
    title: 'Hotkeys, backup & settings',
    summary: 'Configurable hotkeys, import/export and full backup, per-category notifications, and a popup that remembers how you work.',
    lead: 'The parts you set once: hotkeys for recording and every capture, notifications per category, import/export and a full backup — in a popup that remembers how you work.',
    facts: [['10', 'rebindable hotkeys'], ['4', 'notification categories'], ['1 file', 'full backup']],
    tab: 'tabSettings',
    tabLabel: 'Settings tab',
    points: [
      'Every hotkey can be rebound, and the bindings sync across your Chrome profile.',
      'Import and export scenarios or whole folders as JSON; back up and restore all data in one file.',
      'An import holding Run JS or Upload File steps warns you first, naming the folders the uploads read.',
      'Notifications per category: run results, errors and warnings, capture results, scheduled runs.',
      'Light and dark themes; drag the five tabs into your own order, and the last one you used reopens.',
      'A <b>?</b> on each card opens a short guide, in Vietnamese or English.'
    ],
    steps: [
      ['Set your hotkeys', 'Settings → Hotkeys: click Set and press the new combination.'],
      ['Tune captures', 'Save mode (automatic or ask), filename prefix, watermark, countdown and segment scroll speed.'],
      ['Choose&nbsp;notifications', 'Tick the categories you want to hear about.'],
      ['Back up', 'Backup / Restore saves everything to one file — restore it on any machine.']
    ],
    sections: [
      {
        title: 'Default hotkeys',
        nav: 'Hotkeys',
        table: {
          head: ['Action', 'Default'],
          rows: [
            ['Start Recording', '<span class="kbd">Alt+R</span>'],
            ['Stop Recording', '<span class="kbd">Alt+S</span>'],
            ['Screenshot&nbsp;(Visible)', '<span class="kbd">Alt+P</span>'],
            ['Screenshot (Full Page)', '<span class="kbd">Alt+Shift+F</span>'],
            ['Screenshot (Scroll V)', '<span class="kbd">Alt+V</span>'],
            ['Screenshot (Scroll H)', '<span class="kbd">Alt+H</span>'],
            ['Segment V — Start', '<span class="kbd">Alt+Shift+V</span>'],
            ['Segment H — Start', '<span class="kbd">Alt+Shift+H</span>'],
            ['Segment — Stop &amp; Capture', '<span class="kbd">Alt+X</span>'],
            ['Screenshot&nbsp;(Element)', '<span class="kbd">Alt+E</span>']
          ]
        },
        points: [
          'Start/Stop Recording only fire on a tab where Pocket QA is activated.',
          'Hotkeys react to real key presses only — a page can’t dispatch a fake one to start a recording or take a capture.',
          'In Adminer, <span class="kbd">Alt+Shift+Z</span> undoes the last recorded database change.'
        ]
      },
      {
        title: 'Import, export & backup',
        nav: 'Backup',
        points: [
          '<b>Import / Export</b>: one scenario or a whole folder as JSON — to share a test with a teammate or keep it in version control.',
          '<b>Backup / Restore</b>: every scenario, folder, variable and setting in one file.',
          'An import that holds Run JS or Upload File steps warns before it lands, so a shared file can’t quietly run code or read your folders.',
          'An export that uses newer features (Switch blocks) records the version that wrote it, so an older copy doesn’t misread it.'
        ]
      },
      {
        title: 'Notifications & updates',
        nav: 'Updates',
        points: [
          '<b>Run passed or stopped</b> — playback, sequence, CSV.',
          '<b>Errors &amp; warnings</b> — a failed run or action, a paused run, a closed tab, storage full.',
          '<b>Capture results</b> — where a screenshot was saved, when the popup is closed.',
          '<b>Scheduled runs</b> starting on their own.',
          'The Version card shows the installed version, the latest on the store and when it last checked — automatically, once a day, through Chrome’s own update check.'
        ]
      }
    ],
    notes: [
      'Once a newer version has been on the store past its grace period, a banner counts down the last 5 days; after that, starting new runs and captures waits for the update — stop, export and backup always keep working.',
      'The popup remembers its last tab, its tab order and which cards you collapsed.',
      'Everything is stored locally in your browser; only settings — hotkeys, screenshot naming, notification switches — sync through your Chrome profile.'
    ]
  }
};
var FEATURE_ORDER = ['recording', 'playback', 'run-results', 'variables', 'csv', 'screenshots', 'export', 'highlights', 'sql-test-designer', 'db-test-session', 'settings'];
