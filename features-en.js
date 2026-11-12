/**
 * features-en.js — English content of the twelve feature pages (feature.html?id=<key>), written against the
 * extension README. features-vi.js mirrors this shape
 * for the Vietnamese text: when a string changes here, change it there too (check-layout.js → checkShape()).
 */
/* ── Content ──────────────────────────────────────────────────────────────
 * Per feature:
 *   title/lead  hero                         summary  (not shown)
 *   facts    [[value, label]] under the lead   points   "At a glance" list
 *   tab      the real popup tab id (vendor/popup.html) the live preview opens
 *            on — popup-demo.html supports ?tab=…&theme=… (README "Deep links")
 *   steps    [[title, text]] "How to use it"   notes    "Good to know" list
 *   sections [{ title, nav?, lead?, images?, imagesLayout?, table?: { head, rows },
 *               points?, code? }] — one full-width section each, in order.
 * Strings are HTML (code/kbd/b); `code` is plain text, shown verbatim. */
var FEATURES_EN = {
  recording: {
    title: 'Record in one click',
    summary: 'Clicks and typing become editable, reorderable steps — 17 action types in all, from hovers to file uploads.',
    lead: 'Turn Pocket QA on for a tab, hit Start Recording and do the task once. Every click and every field you type into becomes an editable step — no selectors to write by hand.',
    facts: [['17', 'action types'], ['8', 'selectors saved per element'], ['50', 'undo steps']],
    tab: 'tabRecord',
    tabLabel: 'Record & Play tab',
    points: [
      'Records clicks and typed input — typing is debounced to one step per field, and text typed just before a click is recorded before it.',
      'Only the tab the recording started on is recorded, and clicks the page’s own scripts fire are left out: the scenario holds what <em>you</em> did.',
      'Everything else is one of 17 action types added with <b>Add Manual Action</b> — hover, dropdowns, drag &amp; drop, waits, Run JS, conditions, asserts, switches, Read DOM, screenshots and file uploads.',
      'Every step stays editable: fix a selector, change a value, give it a label, disable it, or drag it to a new place.',
      'Undo/redo up to 50 steps while you edit, cleared when you start a new scenario or load another one.',
      '<b>Pick element</b> picks a target straight off the page instead of writing a selector.'
    ],
    steps: [
      ['Turn the tab on', 'Open the popup on the page you want to automate and click <b>Turn on</b> in the status bar — or just hit Start Recording, which asks.'],
      ['Record', 'Click <b>▶ Start Recording</b> (<span class="kbd">Alt+R</span>) and do the task once — clicks and typing are captured as you go.'],
      ['Stop &amp; save', 'Click <b>■ Stop</b> (<span class="kbd">Alt+S</span>), name the scenario and file it in a folder.'],
      ['Refine', 'Add what a recorder can’t see — a hover, a wait, an Assert — with Add Manual Action, and drag it into place.']
    ],
    sections: [
      // Seventeen actions as three short tables, so each fits one screen
      {
        title: 'Page actions',
        nav: 'Page actions',
        lead: 'Seventeen building blocks in all. Click and Input are recorded; the rest come from Add Manual Action.',
        table: {
          head: ['Action', 'What it does'],
          rows: [
            ['Click', 'A mouse click on the target element.'],
            ['Input', 'Sets a field’s value and fires <code>input</code>, <code>change</code> and <code>blur</code>, as typing would.'],
            ['Hover', 'Fires the mouse-over events — opens menus and tooltips.'],
            ['Dropdown', 'A real, trusted click for dropdowns that ignore a scripted one, and optionally <b>Choose item #</b>.'],
            ['Drag &amp; Drop', 'An HTML5 drag from a source selector onto a target.']
          ]
        }
      },
      {
        title: 'Control and logic',
        nav: 'Control &amp; logic',
        lead: 'The steps that turn a recording into a test: waits, scripts, checks and branches.',
        table: {
          head: ['Action', 'What it does'],
          rows: [
            ['Navigate', 'Goes to a URL — <code>${variables}</code> allowed.'],
            ['Wait', 'Pauses for a number of milliseconds.'],
            ['Run JS', 'Runs your script on the page, even past its Content Security Policy.'],
            ['Condition (If)', 'One of 12 checks; when it is false, the next N steps are skipped.'],
            ['Assert (Expect)', 'The same 12 checks, which must hold — a false one is recorded, the run goes on.'],
            ['Switch', 'From a variable’s value: another scenario, a jump, or one case’s block of steps.']
          ]
        }
      },
      {
        title: 'Data actions',
        nav: 'Data actions',
        lead: 'Read the page, keep pictures of it, and give it files.',
        table: {
          head: ['Action', 'What it does'],
          rows: [
            ['Read DOM → Variable', 'Stores text, an input’s value or an attribute in a variable for later steps.'],
            ['Screenshot', 'The viewport, the full page or one element.'],
            ['Screenshot → Variable', 'A capture kept in a variable, so each CSV row’s image lands in the results.'],
            ['Upload File', 'Local files into an <code>&lt;input type="file"&gt;</code> or a drop zone.']
          ]
        }
      },
      {
        title: 'The action list',
        nav: 'Action list',
        lead: 'Every step stays editable after recording: fix a selector, label it, turn it off, drag it elsewhere.',
        images: [{
          src: 'screenshots/shot-pop-actions.webp',
          srcDark: 'screenshots/shot-pop-actions-dark.webp',
          alt: 'The action list of a Checkout scenario: navigate, input, click, a Condition guarding one click, a Switch on ${role} with an admin case of two steps and a user case of one, an Upload File step in its own colour, and a disabled last step, each with Disable, Copy, Edit and Delete.',
          caption: 'A Condition, a Switch block of two cases, an upload, a step turned off.'
        }],
        points: [
          'A step’s number is its place in the list; a Switch’s cases indent under a header, one colour each.',
          'A Condition’s guarded steps indent under it with an amber edge, and fold away with ▾.',
          'Turning a Switch or Condition off turns off the steps under it; each can come back on alone.',
          'Undo and redo up to 50 edits; a field left wrong says so under its row.'
        ]
      },
      {
        title: 'Selectors that survive a redesign',
        nav: 'Selectors',
        lead: 'Up to eight selectors are stored per element, tried most precise first — a renamed class rarely breaks a run.',
        points: [
          'Order: the type you chose, then Full XPath, ID, XPath, CSS, CSS through shadow roots, data-testid, data-id, name, text.',
          '<b>Pick element</b>: hover the page and click — the fields fill in, iframes included.',
          '<b>Child Condition</b> finds the right row in a list by its value, text, id, class or type.',
          'Unstable ids (React’s <span class="nw"><code>:r0:</code></span>, UUIDs) are left out while recording.',
          'Not there yet? Playback waits for the element, up to the timeout, instead of failing.',
          '<code>${variables}</code> work in any selector, so one step can target a new row each run.'
        ]
      },
      {
        title: 'Save, folders and scenarios',
        nav: 'Scenarios',
        lead: 'Scenarios live in folders and are found as you type.',
        images: [{
          src: 'screenshots/shot-pop-manage.webp',
          srcDark: 'screenshots/shot-pop-manage-dark.webp',
          alt: 'The Manage Scenarios card: a search box, a folder filter, a sort menu, four saved scenarios and Play, Rename, Duplicate, Move and Delete buttons.',
          caption: 'Manage Scenarios: search, filter, sort, play.'
        }],
        points: [
          '<b>New</b> with a name makes the scenario at once: everything after it saves into it.',
          'Search as you type, filter by folder, sort four ways — the sort is remembered.',
          'Rename, duplicate, move or delete; renaming a folder keeps its scenarios linked.',
          'Deleting a folder moves its scenarios to No Folder, never deletes them.'
        ]
      }
    ],
    notes: [
      'The recorder captures clicks and typing only. Hovers, waits and drags are added by hand, so a recording never fills up with mouse noise.',
      'Pocket QA is off on a tab until you turn it on (or switch on <b>Allow on all tabs</b> in Settings) — the status bar says <b>Active</b> or <b>Off on this tab</b>.',
      'The Start/Stop hotkeys only fire on a tab Pocket QA is on, and only on a real key press: a page can’t start a recording by faking a keystroke.'
    ]
  },

  playback: {
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
      'A run panel on the page and Now Playing in the popup show the step in flight, with ■ Stop; a notification tells you how the run ended.'
    ],
    steps: [
      ['Pick a scenario', 'Select it under Manage Scenarios — or several, in order, under Sequence Scenarios.'],
      ['Choose how it runs', 'Set the loop count and delay, or a time under Scheduled Playback, at the bottom of Record & Play.'],
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
            ['Scheduled', 'Record & Play → Scheduled Playback', 'Starts a scenario at a set time, once or every day, from a background alarm.'],
            ['CSV data run', 'Record & Play → <span class="nw">CSV Data-Driven Run</span>', 'Runs it once per row of a CSV file — see <a href="feature.html?id=csv">CSV <span class="nw">data-driven</span>&nbsp;runs</a>.']
          ]
        }
      },
      {
        title: 'Sequences',
        nav: 'Sequences',
        lead: 'Several scenarios in a row, each with its own delay before it — one run, one verdict.',
        images: [{
          src: 'screenshots/shot-pop-sequence.webp',
          srcDark: 'screenshots/shot-pop-sequence-dark.webp',
          alt: 'The Sequence Scenarios card: a scenario picker with + Add, a delay menu, three queued scenarios with Disable, Copy, Edit and Delete, a sequence name field, Start Sequence, Stop and Save as Scenario.',
          caption: 'Three scenarios queued, each with its own delay.'
        }],
        points: [
          'Add a scenario as often as you like, each time with its own delay.',
          'Per item: turn it off, duplicate it, change its delay or delete it — or drag to reorder.',
          '<b>Save as Scenario</b> merges the queue into one scenario; the delays become Wait steps.',
          'The badge shows SEQ while it runs; Stop ends it after the scenario in flight.'
        ]
      },
      {
        title: 'Schedules',
        nav: 'Schedules',
        lead: 'A scenario at a set time, once or every day — it starts on its own, popup closed.',
        images: [{
          src: 'screenshots/shot-pop-schedule.webp',
          srcDark: 'screenshots/shot-pop-schedule-dark.webp',
          alt: 'The Scheduled Playback card: a scenario picker, hour and minute fields with AM/PM, a label, the page URL, a Repeat daily box, + Add, and two saved schedules — 8:00 AM daily and 1:30 PM once — with Disable, Copy, Edit and Delete.',
          caption: 'Two schedules: one every day, one once.'
        }],
        points: [
          'Pick a scenario and a time, add a label if you like, tick Repeat daily for every day.',
          'Edit, turn off or copy a schedule from its row.',
          'A background alarm checks every minute; a schedule never fires twice in one minute.',
          'Chrome has to be running at that time — a closed browser runs nothing.'
        ]
      },
      {
        title: 'Built for real pages',
        nav: 'Real pages',
        lead: 'The steps that usually force a recorder back to hand-written code are first-class here.',
        points: [
          '<b>Dropdown → Choose item #</b> picks an item by position: counted from 1 as the list shows it, <code>-1</code> for the last, <code>random</code> for any enabled item, or a <code>${variable}</code>.',
          'Virtualised lists (react-window, MUI) are scrolled until the chosen item is actually rendered.',
          '<b>Upload File</b> puts local files into an <code>&lt;input type="file"&gt;</code> or a drop zone, <code>${variable}</code> names allowed — a file missing from disk fails the step and names it.',
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
      'Window capture can’t be a playback step — it needs you to pick the window by hand. The Screenshot actions cover visible, full page and element.'
    ]
  },

  'run-results': {
    title: 'Assertions, verdicts & bug reports',
    summary: 'Assert what the page should show, get a Passed / Failed / Broken verdict for every run, and a bug report ready to paste.',
    lead: 'Every run ends with a verdict — Passed, Failed, Test broken or Stopped. When it didn’t pass, a bug report with the steps to reproduce and a screenshot of the failure is one click away.',
    facts: [['12', 'check types'], ['4', 'verdicts'], ['5 s', 'an Assert waits for the page']],
    tab: 'tabRecord',
    tabLabel: 'Record & Play tab',
    points: [
      '<b>Assert (Expect)</b> checks what the page should show — an element, a text, a value, the URL, a class or an attribute: 12 checks in all.',
      'Asserts are waited for: checked every 250 ms for up to 5 seconds, so a page still loading isn’t a failure.',
      'Asserts are soft: a false one is recorded and the run goes on — a CSV or scheduled run never stalls on a prompt.',
      'The first failure decides the verdict. A broken click that makes the next Assert fail is a broken test, not a failing app.',
      'The <b>Last run</b> card at the top of Record &amp; Play lists every failure — click one to jump to its step.',
      '<b>Bug report</b> writes the issue for you: steps to reproduce, URL, environment and the screenshot to attach.'
    ],
    steps: [
      ['Add an Assert', 'Add Manual Action → Assert (Expect): choose the check, its element and the value to expect.'],
      ['Run', 'Play, loop, sequence, CSV or schedule — Asserts never pause the run.'],
      ['Read the verdict', 'On the notification, the toolbar badge and the Last run card.'],
      ['Report it', 'Bug report → <b>Copy</b> the Markdown, <b>Download screenshot</b>, paste both into your tracker.']
    ],
    sections: [
      {
        title: 'Four verdicts, one rule',
        nav: 'Verdicts',
        lead: 'The first failure decides — it is most often the cause of everything after it.',
        table: {
          head: ['Verdict', 'When'],
          rows: [
            ['Passed', 'No failure, the run reached its end, and at least one Assert ran.'],
            ['Finished&nbsp;· no&nbsp;checks', 'No failure and it reached its end, but no Assert ran — nothing on the page was checked.'],
            ['Failed', 'The first failure is a false Assert — the page was wrong.'],
            ['Test&nbsp;broken', 'The first failure is anything else — an element not found, a script error, a broken block. The test couldn’t look.'],
            ['Stopped', 'No failure, but the run didn’t reach its end — you stopped it, or its tab closed. Never counted as Passed.']
          ]
        },
        points: [
          '<b>Notification</b>: <code>Failed — "Checkout"</code>, with how many checks failed and how many steps broke.',
          '<b>Badge</b>: a red cross, an amber ! or a grey square on the toolbar icon until the next run, or until you open the popup.',
          '<b>CSV runs</b>: each row’s verdict lands in its own Run Result column — <code>12 passed · 2 failed · 1 broken</code>.',
          '<b>Sequences</b> get one verdict, from every scenario’s failures in order.'
        ]
      },
      {
        title: 'The Last run card',
        nav: 'Last run',
        lead: 'At the top of Record &amp; Play, how the last Play or Resume came out — until the next one.',
        images: [{
          src: 'screenshots/shot-pop-lastrun.webp',
          srcDark: 'screenshots/shot-pop-lastrun-dark.webp',
          alt: 'The Last run card of a failed run of “Checkout with coupon”: the verdict, the time, one failure line — #4 Check the toast, expected text containing Saved, got Error: coupon expired — and a Bug report button.',
          caption: 'A real failed run: what was expected, what the page held.'
        }],
        points: [
          'The verdict, the scenario and when — and one line per failure, with its step number.',
          'A failed Assert says both sides: <code>Expected text "Saved", got "Error"</code>.',
          'Click a failure to jump to its step in the list.',
          '× hides the card until the next run.'
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
        }
      },
      {
        title: 'A bug report that writes itself',
        nav: 'Bug report',
        lead: 'On the Last run card of a failed or broken run: Markdown ready for Jira, GitHub or any tracker.',
        images: [{
          src: 'screenshots/shot-pop-bugreport.webp',
          srcDark: 'screenshots/shot-pop-bugreport-dark.webp',
          alt: 'The Bug report dialog for that run: Markdown with the failure, page, time, result and environment, then the steps to reproduce with typed values shown as dots, an Include typed values box, and Copy and Download screenshot buttons.',
          caption: 'The report for the run above, typed values hidden.'
        }],
        points: [
          'The first failure, page, time, result, browser, OS and Pocket QA version.',
          'Steps to reproduce as sentences; steps a Condition skipped are left out.',
          'Typed values stay ••• until you tick <b>Include typed values</b> — never remembered.',
          '<b>Download screenshot</b>: the page the moment the first failure happened.'
        ]
      }
    ],
    notes: [
      'A text, value, class or attribute check whose element isn’t there counts as <b>broken</b>, not failed — the test couldn’t check.',
      'A password field’s value never leaves the page: its Assert only says it didn’t match.',
      'No screenshot when the run’s tab wasn’t the one in front (a background run); the report says so instead of attaching the wrong page.',
      'Sequences and CSV runs leave no Last run card — their results are in the notification and in the CSV export.'
    ]
  },

  variables: {
    title: 'Variables & logic',
    summary: 'Static, random, pick-from-list and fallback variables, Read DOM, conditions and switch branches — reused anywhere as <code>${var}</code>.',
    lead: 'Turn a one-off recording into a real script: variables you reuse as <code>${var}</code> anywhere, values read off the page mid-run, and conditions and switches that branch on them.',
    facts: [['4', 'variable types'], ['12', 'condition checks'], ['3', 'layers of priority']],
    tab: 'tabData',
    tabLabel: 'Tools tab',
    points: [
      'Four variable types: <b>Static</b>, <b>Random</b> (letters, numbers, both, or a datetime stamp), <b>Pick</b> (one of a list) and <b>Fallback</b> (try A, then B, then C).',
      '<code>${var}</code> works in selectors, values, URLs, scripts, expected values, file names and more.',
      'Type <code>${</code> (or <span class="kbd">Ctrl+Space</span>) in a field for suggestions — your variables, the ones earlier steps write, and the loaded CSV’s columns.',
      '<b>Read DOM → Variable</b> reads text, visible text, an input’s value or an attribute mid-run — the whole of it, or just the part you mark.',
      '<b>Condition (If)</b> skips the next N steps when its check is false.',
      '<b>Switch</b> runs another scenario, jumps within this one, or runs only the matching case’s block of steps.'
    ],
    steps: [
      ['Define', 'Tools → Variables: add a name, pick a type, set its value.'],
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
          'A name that isn’t in the table stays <code>${name}</code> on the page, so a typo shows instead of an empty field.'
        ]
      },
      {
        title: 'Rename without breaking',
        nav: 'Rename',
        lead: 'Rename a variable in the Tools tab and every scenario that uses it follows.',
        images: [{
          src: 'screenshots/shot-pop-rename.webp',
          srcDark: 'screenshots/shot-pop-rename-dark.webp',
          alt: 'The Variables card after userEmail was renamed to loginEmail, and the toast: “loginEmail” saved · 3 references in 2 scenarios updated.',
          caption: 'userEmail → loginEmail: 3 references in 2 scenarios.'
        }],
        points: [
          'Every <code>${name}</code>, and the bare name in a Switch, Read DOM or Screenshot → Variable.',
          'The step open in the form and the Undo history follow too.',
          'A name another variable has, or one a scenario already writes, is refused.',
          'Exports, backups and CSV columns keep the old name — a loaded CSV’s column is pointed out.'
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
        images: [{
          src: 'screenshots/shot-pop-actions.webp',
          srcDark: 'screenshots/shot-pop-actions-dark.webp',
          alt: 'An action list with a Condition guarding one step and a Switch on ${role}: case admin runs steps 7 and 8, case user runs step 9, then the scenario goes on at step 10.',
          caption: 'Switch ${role}: admin runs 7–8, user runs 9, then 10.'
        }],
        points: [
          '<b>Condition (If)</b>: one of 12 checks — when it is false, the next N steps are skipped.',
          '<b>Switch</b>: each value runs another scenario, jumps, or runs only its own block.',
          '<b>Always</b>: no variable — a scenario or a #–# range of it plays every time.',
          'A new Switch goes in front of its steps; no case can cut through another Switch’s block.'
        ]
      }
    ],
    notes: [
      'Variables are global to the extension and saved in your browser — they’re not tied to one scenario.',
      'A Read DOM step that fails and is skipped leaves its variable empty, so a later Condition can test for that.',
      'Code exports write a Switch block as <code>if / else if</code>; a Switch into another scenario can’t be exported and is flagged, not dropped.'
    ]
  },

  csv: {
    title: 'CSV <span class="nw">data-driven</span>&nbsp;runs',
    summary: 'Upload a CSV — headers become <code>${variables}</code>. One scenario runs per row; results export to Excel, HTML or ZIP.',
    lead: 'Upload a CSV and replay the same scenario once per row — headers become <code>${variables}</code> automatically, so one recording drives an entire data set and every row gets its own verdict.',
    facts: [['1', 'recording, any number of rows'], ['3', 'export formats'], ['Per row', 'pass / fail verdict']],
    tab: 'tabRecord',
    card: 'csvRunCard',   // the hero opens the CSV card itself (demo.js ?card=)
    tabLabel: 'Record & Play tab',
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
      ['Upload the CSV', 'Record & Play → <span class="nw">CSV Data-Driven Run</span>: the header row names the variables, and a preview shows what was read.'],
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
          '<b>Folder name</b>: <code>abc ${name}</code> → <code>abc john/</code>, <code>abc kate/</code> — any column or run variable.',
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
      'Rename a variable after loading a CSV and the popup points out the column still under its old name.',
      'Exported tests can read the same CSV and run once per row — see <a href="feature.html?id=export">Code export</a>.'
    ]
  },

  screenshots: {
    title: 'Screenshots & image tools',
    summary: 'Visible, full-page, scrolling, segment, element and whole-window capture — with an editor, watermark and image diff.',
    lead: 'Six kinds of capture cover everything from the visible viewport to a whole application window — each with an Edit twin that opens the shot straight in the image editor.',
    facts: [['6', 'kinds of capture'], ['10', 'capture & record hotkeys'], ['3 · 5 · 10 s', 'countdown']],
    tab: 'tabCapture',
    tabLabel: 'Capture tab',
    points: [
      'Visible, Full Page, Scroll (Down / Across), Segment (Down / Across), Element and Window capture.',
      'Every mode has a <b>Edit</b> twin that opens the image editor right after the shot.',
      'A 3, 5 or 10-second countdown before a visible capture — time to open the dropdown or hover state you need in the shot.',
      'Watermark with <code>{url}</code> and <code>{datetime}</code> tokens, stamped onto the image.',
      '<b>Image Diff</b> compares two screenshots pixel by pixel, with an adjustable sensitivity.',
      'Save automatically with a filename prefix, or be asked where to save each one.'
    ],
    steps: [
      ['Pick a mode', 'Capture tab — filter by All, Visible, Scroll, Segment, Element or Window.'],
      ['Shoot', 'Click its button, or press its hotkey without opening the popup.'],
      ['Edit if needed', 'The Edit twin opens the editor: crop, annotate, blur, stamp.'],
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
            ['Scroll ↕&nbsp;Down / ↔&nbsp;Across', 'Scrolls the page and stitches a vertical or horizontal panorama.', '<span class="kbd">Alt+V</span> / <span class="kbd">Alt+H</span>'],
            ['Segment ⬍&nbsp;Down / ⬌&nbsp;Across', 'Mark the start, scroll to the end, stop — only the part you marked.', '<span class="kbd">Alt+Shift+V</span> / <span class="kbd">Alt+Shift+H</span>, then <span class="kbd">Alt+X</span>'],
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
        lead: 'Any capture — or any image from the clipboard or a file — opens in an editor of its own window.',
        images: [{
          src: 'screenshots/shot-image-editor.webp',
          srcDark: 'screenshots/shot-image-editor-dark.webp',
          alt: 'The Image Editor open on a sample dashboard screenshot, with a rectangle and arrow annotation drawn on it and the Stamp panel open on the right showing timestamp watermark options.',
          caption: 'A rectangle, an arrow and the Stamp panel.'
        }],
        points: [
          'Crop, Draw, Rectangle, Ellipse, Arrow, Text and Blur — one key each: C, D, R, E, A, T, B.',
          'Rotate, flip, and undo or redo every edit.',
          'Adjust brightness, contrast, saturation and sharpness; resize exactly or by 10–300%.',
          'Stamp a timestamp or your own text in one of 9 places; zoom, with 1:1 a key away.'
        ]
      },
      {
        title: 'Image Diff',
        nav: 'Image Diff',
        lead: 'Two screenshots, before and after a deploy: what changed, in pixels and on the picture.',
        images: [{
          src: 'screenshots/shot-pop-image-diff.webp',
          srcDark: 'screenshots/shot-pop-image-diff-dark.webp',
          alt: 'The Image Diff dialog: image A and image B chosen, sensitivity at 10, Compare pressed, the result 4,123 px (0.65% of total area), and a preview with the changed row marked in magenta, with Save result.',
          caption: 'One row changed: 4,123 px, 0.65% of the image.'
        }],
        points: [
          'Pick image A and image B from disk — any two images, not only captures.',
          'Sensitivity: low catches faint changes, high ignores noise.',
          'The count of changed pixels, its share of the area, and the changes marked on the picture.',
          '<b>Save result</b> keeps the marked-up image.'
        ]
      },
      {
        title: 'Files, names and settings',
        nav: 'Settings',
        lead: 'Where captures go and what they are called — set once in the Settings tab.',
        images: [{
          src: 'screenshots/shot-pop-shot-settings.webp',
          srcDark: 'screenshots/shot-pop-shot-settings-dark.webp',
          alt: 'The Screenshot settings card: save mode, filename prefix with a live example, include capture type in filename, countdown, watermark format and font size, segment scroll speed, and Save Settings.',
          caption: 'The Screenshot card in the Settings tab.'
        }],
        points: [
          '<b>Auto</b> saves to Downloads/screenshots with no prompt; <b>Ask</b> lets you name each one.',
          'Names are a prefix plus the time; add the kind (<code>_full</code>, <code>_elem</code>…) if you mix them.',
          'Watermark: <code>{url}</code> and <code>{datetime}</code> burned into the image, at the size you set.',
          'Segment scroll speed, vertical and horizontal — slower for lazy-loaded pages.'
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
    title: 'Code export in five formats',
    summary: 'Turn any scenario into a JS bookmarklet, Selenium Python or pytest, Playwright Test, Robot Framework or Selenium Java test.',
    lead: 'Turn any recorded scenario into real, runnable test code — five formats, generated fresh from the scenario’s current steps, with nothing dropped silently.',
    facts: [['5', 'output formats'], ['8', 'fallback locators per step'], ['4', 'overrides via env vars']],
    tab: 'tabData',
    tabLabel: 'Tools tab',
    points: [
      'JS Bookmarklet, Selenium Python (script or pytest), Playwright Test, Robot Framework and Selenium Java (TestNG).',
      'Playback is the standard: the code does what a run does — same locator fallbacks, and the extension’s own in-page helpers wherever a plain driver call would act differently.',
      'Every step is marked OK, Verify or Skip in the Actions tab, with the reason, and a comment says so in the code.',
      'Asserts stay waited-for and soft: each false one is reported, and the test fails at the end with all of them listed.',
      'Point the same file at staging, swap browsers, go headless or override variables from the environment — no&nbsp;<span class="nw">re-export</span>.',
      'A failing step names itself — <code>Step 3: click — Sign in: no element found by …</code> — and saves a screenshot of the page.'
    ],
    steps: [
      ['Pick the scenario', 'Tools → Export Code — the list is grouped by folder and starts on the scenario you have selected.'],
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
            ['JS Bookmarklet', '<code>&lt;name&gt;_bookmarklet.js</code>, or a one-line bookmark URL', 'The browser — a bookmark or the Console. Nothing to install.'],
            ['Selenium&nbsp;Python', '<code>&lt;name&gt;_selenium.py</code> (script) or <code>test_&lt;name&gt;.py</code> (pytest)', '<code>python</code> / <code>pytest</code> with Selenium 4'],
            ['Playwright&nbsp;Test', '<code>&lt;name&gt;.spec.js</code>', '<code>npx playwright test</code> — each step a <code>test.step</code>, with a trace on failure'],
            ['Robot&nbsp;Framework', '<code>&lt;name&gt;.robot</code>', '<code>robot</code> with SeleniumLibrary — steps read as keywords'],
            ['Selenium&nbsp;Java', '<code>&lt;Name&gt;Test.java</code>', '<code>mvn test</code> / <code>gradle test</code> with Selenium 4 and TestNG 7']
          ]
        }
      },
      {
        title: 'From popup to code',
        nav: 'Screenshots',
        lead: 'The same “Login flow” scenario exported two ways — real output. The warning line counts the steps to check; a click opens them in the Actions tab.',
        // Captured at the popup's real 480×600 size (see README), so they're
        // tall and narrow — side by side instead of full-width-stacked.
        imagesLayout: 'row',
        images: [
          {
            src: 'screenshots/shot-export-js.webp',
            srcDark: 'screenshots/shot-export-js-dark.webp',
            alt: 'The Export JS modal for the Login flow scenario at Step 1 of the generated bookmarklet code, with Code/Variables/Actions/Settings tabs and a warning that 1 step needs checking and 1 was skipped.',
            caption: 'JS Bookmarklet, with its Variables, Actions and Settings tabs.'
          },
          {
            src: 'screenshots/shot-export-py.webp',
            srcDark: 'screenshots/shot-export-py-dark.webp',
            alt: 'The Export Python modal for the same Login flow scenario at Step 1 of the generated Selenium code.',
            caption: 'Selenium Python; ↧ Steps jumps past the helpers.'
          }
        ]
      },
      {
        title: 'What each format covers',
        nav: 'Coverage',
        lead: 'Click, Input, Hover, Dropdown, Drag &amp; Drop, Wait, Read DOM and Condition run in all five. The rest:',
        table: {
          head: ['Step', 'Bookmarklet', 'Selenium', 'Playwright', 'Robot', 'Java'],
          rows: [
            ['Navigate', 'Verify', 'Yes', 'Yes', 'Yes', 'Yes'],
            ['Run JS', 'Verify', 'Verify', 'Verify', 'Verify', 'Verify'],
            ['Screenshots, Upload&nbsp;File', '—', 'Yes', 'Yes', 'Yes', 'Yes'],
            ['Inside an iframe', 'Same site', 'Yes', 'Yes', 'Yes', 'Yes'],
            ['Switch block on a variable', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes'],
            ['Switch to a scenario, #N, Always', '—', '—', '—', '—', '—'],
            ['Soft Assert', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes']
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
        code: 'PQA_BASE_URL=https://staging.example.com PQA_HEADLESS=1 PQA_username=bob pytest test_login_flow.py'
      }
    ],
    notes: [
      '<b>Data file (CSV)</b>: pytest, Playwright, Robot (through DataDriver) and Java run the test once per row of a CSV next to it.',
      'The bookmarklet stops at a Navigate and goes on from the next step when you click it again on the new page — a bookmarklet can’t survive a page load.',
      'Variable values are baked in at export time — edit the Variables table and export again, or override them with <code>PQA_&lt;name&gt;</code>.',
      'Steps turned off (⊘) aren’t exported. A scenario’s own text only ever lands in a string or a comment — an imported scenario can’t smuggle code in.'
    ]
  },

  highlights: {
    title: 'Highlights by URL pattern',
    summary: 'Highlight text on any page in five colours, with notes — restored on every visit and grouped by URL pattern.',
    lead: 'Mark up any page with colour-coded highlights and notes that come back on your next visit — grouped by URL patterns, so one set covers every page that shares a layout.',
    facts: [['5', 'colours'], ['Notes', 'on any highlight'], ['JSON', 'export']],
    tab: 'tabHighlight',
    tabLabel: 'Highlight tab',
    points: [
      'Turn Highlight ON, select text on the page, and pick yellow, green, pink, blue or orange from the tooltip.',
      'Add a note to any highlight; hover it later to read it.',
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
        title: 'On the page',
        nav: 'On the page',
        lead: 'Highlights are made where you read: select the text, pick a colour.',
        points: [
          'Select text → a small panel offers five colours and a note field.',
          'Click a highlight to change its colour, edit its note or delete just that one.',
          'Hover a highlight that has a note to read it, without clicking.',
          'They come back on the next visit, after a restart too — even on content that loads late.',
          'The switch in the popup hides them all; switched back on, every one returns.'
        ]
      },
      {
        title: 'In the popup',
        nav: 'In the popup',
        lead: 'The Highlight tab finds what you marked, on this page or any other.',
        images: [{
          src: 'screenshots/shot-pop-highlights.webp',
          srcDark: 'screenshots/shot-pop-highlights-dark.webp',
          alt: 'The Highlight tab: Highlight ON, Export, stats of 3 on this page, 4 in total, 2 pages, the current page, an Other pages menu, a search box with colour filters, three highlights in yellow, pink and green, and Clear page highlights.',
          caption: '3 highlights on this page, 4 across 2 pages.'
        }],
        points: [
          'Search the text, or filter by colour — each dot counts its highlights.',
          'How many on this page, in total, and on how many pages.',
          '<b>Other pages</b>: read another page’s highlights without opening it.',
          'Export them all as JSON, or clear only this page’s.'
        ]
      },
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
          'A builder makes one from the tab’s URL: click a part to cycle exact → <code>*</code> → off.',
          '<code>*</code> is one path segment, never crossing <code>?</code> or <code>#</code>.',
          'Adding or removing a pattern regroups what is stored — each highlight keeps its page.',
          '<code>#anchor</code> stays the same page; <code>#/route</code> is a page of its own.'
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
    title: 'SQL Test Case Designer',
    summary: 'Paste a SQL query and get EP/BVA, decision-table, NULL and JOIN test cases — with fixture data, exported as CSV or JSON.',
    lead: 'Paste a SQL query and get a ready-made test case list — equivalence partitions, boundary values, a decision table, and the NULL and JOIN edge cases most manual test plans miss — with the test data each case needs.',
    facts: [['4', 'technique families'], ['4', 'export formats'], ['VI / EN', 'interface']],
    tab: 'tabData',
    tabLabel: 'Tools tab',
    points: [
      'Parses <code>SELECT</code> (joins, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>ORDER BY</code>, <code>LIMIT</code>, <code>UNION</code>, CTEs, <code>CASE</code>) plus <code>INSERT</code>, <code>UPDATE</code> and <code>DELETE</code>.',
      'EP/BVA cases straight from the query’s conditions, with boundary steps that follow the inferred type.',
      'A decision table covering the query’s logic — in full up to a limit you set, then pairwise, then MC/DC as the conditions add up.',
      'NULL, three-valued logic and JOIN cardinality cases that are easy to miss by hand.',
      'Findings flag defects in the query itself — a comma join, <code>= NULL</code>, a <code>DELETE</code> with no <code>WHERE</code>.',
      'Everything runs locally in the page — your SQL never leaves the browser.'
    ],
    steps: [
      ['Open it', 'Tools → SQL Test Case Designer opens in its own tab.'],
      ['Paste a query', 'Or pick one of six examples. MySQL backticks, SQL Server brackets, ANSI quotes and <code>?</code> / <code>:name</code> / <code>@name</code> / <code>$1</code> parameters all parse.'],
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
            ['Decision table +&nbsp;coverage', 'The full 2ⁿ rule table up to the limit you set (4 conditions by default), then pairwise — every pair of conditions — up to 8, then MC/DC: one rule pair per condition. <code>CASE</code> gets branch coverage, including the hidden NULL branch of a missing <code>ELSE</code>.'],
            ['NULL &amp; 3-valued logic', '<code>&lt;&gt;</code> dropping NULL rows, <code>NOT IN</code> over a NULL, <code>COUNT(col)</code> vs <code>COUNT(*)</code>, NULL join keys that never match, NULL grouping keys collapsing into one group.'],
            ['JOIN / GROUP BY /&nbsp;ORDER–LIMIT', 'Each join at 1:1, orphan and 1:n; a <code>WHERE</code> on an outer-joined table silently making it inner; empty, single and multiple groups; ties in <code>ORDER BY</code>; pages at, below and past the row count.']
          ]
        }
      },
      {
        title: 'Schema and diagram',
        nav: 'Diagram',
        lead: 'No database is read: the schema comes from the query, shown as a list and as a diagram.',
        images: [{
          src: 'screenshots/shot-sql-diagram.webp',
          srcDark: 'screenshots/shot-sql-diagram-dark.webp',
          alt: 'The Table relationships dialog for a four-table join: customers, orders, order_items and products as boxes listing their columns with PK and FK tags, linked by crow’s-foot lines, with zoom and Fit buttons and a hint on how to move around.',
          caption: 'Schema → Diagram for a four-table join.'
        }],
        points: [
          'Columns, inferred types, the primary key, and foreign keys read off the join conditions.',
          'Crow’s-foot lines from each foreign key to its table: the hub and the leaves stand out.',
          'Drag a box, pan, scroll to zoom or press Fit; hover a table to pick out what it touches.',
          'A table with no key gets an added <code>id</code>, marked as such: a wrong guess shows up here.'
        ]
      },
      {
        title: 'Compare before and after',
        nav: 'Compare',
        lead: 'Paste the old and the new version of a query: every case is sorted by what the change did to it.',
        images: [{
          src: 'screenshots/shot-sql-compare.webp',
          srcDark: 'screenshots/shot-sql-compare-dark.webp',
          alt: 'Compare mode after a change to a report query: three counters — 16 Impacted, 39 Unrelated, 20 No longer applies — above the Changes detected tab, which lists a removed country filter and an age range moved from 18–65 to 21–65.',
          caption: '16 cases to rerun, 39 to keep, 20 to retire.'
        }],
        points: [
          '<b>Impacted</b>: it tests something the change touched — run it again.',
          '<b>Unrelated</b>: untouched by the change, still worth keeping for regression.',
          '<b>No longer applies</b>: its condition, join or clause is gone — retire it.',
          '<b>Changes detected</b>: the difference in twelve parts, from tables and joins to paging.'
        ]
      },
      {
        title: 'The case list and inspector',
        nav: 'Case list',
        lead: 'A three-column workspace in its own tab, not a popup panel.',
        images: [{
          src: 'screenshots/shot-sqlcases-analysis.webp',
          srcDark: 'screenshots/shot-sqlcases-analysis-dark.webp',
          alt: 'The SQL Test Case Designer: the query rail on the left with the pasted SQL, a generated case list in the middle with stats and technique filters, and a case inspector on the right with the rationale, fixture rows and the query to run.',
          caption: 'Query, case list and one case’s inspector — 71 cases from one query.'
        }],
        points: [
          'Over the list: cases, high priority, conditions, joins and tables.',
          'Search; filter by priority, clause, column or “has sample data”; full or dense rows.',
          'Each case names its technique, from EP and BVA to Pairwise and MC/DC; duplicates merge.',
          'The inspector: why the case matters, the rows to prepare and the query to run.'
        ]
      },
      {
        title: 'Findings, coverage and what was parsed',
        nav: 'Findings',
        lead: 'Three panels about the query itself, closed until needed — Findings opens on a real error.',
        images: [{
          src: 'screenshots/shot-sql-coverage.webp',
          srcDark: 'screenshots/shot-sql-coverage-dark.webp',
          alt: 'The Coverage panel for a WHERE clause of five conditions: pairwise, 6 of 32 combinations, condition coverage 100% and decision coverage 50% as bars, and the five numbered conditions below.',
          caption: 'Past the full-table limit: pairwise, 6 of 32 combinations.'
        }],
        points: [
          '<b>Findings</b>: 15 kinds of defect — a comma join, <code>= NULL</code>, <code>LIMIT</code> with no <code>ORDER BY</code>…',
          '<b>Coverage</b>: per clause, the decision-table mode, condition and decision coverage.',
          '<b>What was parsed</b>: tables, numbered conditions with their types, joins, paging.',
          'Values from Sample values, and parameters still without one, are named too.'
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
          'Each sample value shows how far it reaches — <code>66 cells</code>, or “not used by any case” — with ↺ to restore one and Reset all for the lot; they are kept across visits.',
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
            ['JSON', 'The cases plus the parsed analysis — tables, joins, numbered conditions, parameters, findings, coverage — and the sample values in force. Also as Copy JSON to clipboard.'],
            ['Data CSV', 'One file per table, every fixture row tagged with the case it belongs to.'],
            ['Verify SQL', 'The query per case, with its expected result as a comment above it.']
          ]
        }
      }
    ],
    notes: [
      'CTEs get cases of their own, marked <code>CTE · name ·</code>. A subquery nested in the statement is only flagged — paste it separately for its own cases.',
      'There is no live schema: column types come from comparison literals first and column names second. When neither settles it, the case says so.',
      'Expected results state what SQL semantics require, not what your current data contains.',
      'The interface opens in English and switches to Vietnamese with the globe button — cases are generated in the active language, so an export always matches the screen.'
    ]
  },

  'db-test-session': {
    title: 'DB Test Session & Rollback',
    summary: 'Every change you make to test data in Adminer is recorded — roll it all back in one click, with the SQL shown first.',
    lead: 'Change test data freely in Adminer — every write is recorded into a session, and one click puts the database back the way it was, with the exact SQL shown before it runs.',
    facts: [['8', 'kinds of write recorded'], ['1 click', 'to roll back'], ['0', 'bytes leave your browser']],
    tab: 'tabData',
    tabLabel: 'Tools tab',
    points: [
      'Start a session from the small panel Adminer shows bottom-right; nothing is recorded until you do.',
      'Captures the edit form, grid cell edits, bulk and <span class="nw">whole-result</span> deletes, mass edits, <code>INSERT</code>s and the <code>UPDATE</code>/<code>DELETE</code> you type on the SQL page.',
      '↺ Roll back all, or ↺ Undo last (<span class="kbd">Alt+Shift+Z</span>) for the change you just made — always behind a preview of each change and the SQL underneath.',
      'A drift check re-reads every row first: if someone changed it after you, you see recorded and current values side by side and choose to skip or overwrite.',
      '↷ Re-apply puts the test’s values back when a rollback turned out to be the wrong call.',
      'Refuses what it can’t undo safely — and says why, on the change itself.'
    ],
    steps: [
      ['Open Adminer', 'A small panel appears bottom-right. The Adminer panel switch on the Tools tab turns it off and on.'],
      ['▶ Start session', 'Name the test run — from now on every write is recorded.'],
      ['Test', 'Edit, delete and insert as usual; each change lands in the panel’s log.'],
      ['↺ Roll back all', 'Read the SQL preview, confirm, and the data is back.']
    ],
    sections: [
      {
        title: 'Inside a test session',
        nav: 'Screenshots',
        lead: 'One sample session — a coupon checked out, then refunded — from the Adminer panel and the manager page.',
        images: [
          {
            src: 'screenshots/shot-dbtools-rollback.webp',
            srcDark: 'screenshots/shot-dbtools-rollback-dark.webp',
            alt: 'The Undo SQL preview opened from the Adminer panel: a Step by step / Merged switch, one summary line per change with a skipped UPDATE products flagged, and the seven UPDATE, INSERT and DELETE statements to run; beside it the panel, recording, with its Roll back all and Undo last buttons and a log of recorded changes.',
            caption: '↺ Roll back all shows the SQL first; nothing runs until you confirm.'
          },
          {
            src: 'screenshots/shot-dbtools-manager.webp',
            srcDark: 'screenshots/shot-dbtools-manager-dark.webp',
            alt: 'The Test sessions & rollback page: sessions listed on the left, and the selected session’s seven changes on the right, with the before/after of a DELETE on cart_items and an UPDATE on orders open, and one change already undone.',
            caption: 'The manager page: every session, each change’s before and after.'
          }
        ],
        points: [
          'The panel stays small: recording or not, how many changes, the few buttons you need mid-test.',
          '<b>Merged</b> folds A→B→C on one row into one statement straight back to A.',
          'Undo or re-apply one change from its row, or tick several and roll back just those.',
          'Export a session as <code>.sql</code> or <code>.json</code>.'
        ]
      },
      {
        title: 'Sessions over time',
        nav: 'Sessions',
        lead: 'A session outlives the test run: end it, roll it back today, resume it tomorrow.',
        points: [
          '<b>■ End</b> keeps the session on the panel, still one click from Roll back all; <b>↻ Resume</b> records into it again.',
          'Click the session’s name for every session on this database, filtered as you type — Enter resumes the first.',
          'One session records per database: starting or resuming another ends it, and says so first.',
          'Not spent by a rollback: run the test again and the same undo is offered a second time.',
          '<b>↷ Re-apply</b> puts the test’s values back — except hand-typed SQL, listed as skipped with the reason.',
          'Shut, the panel still shows <b>⚠ n</b> for a warning; <b>⇤</b> moves it to the other corner.'
        ]
      },
      {
        title: 'What it records',
        nav: 'What it records',
        lead: 'Old values are read before the write, through each row’s own edit form — never from Adminer’s shortened grid.',
        table: {
          head: ['Where you changed it', 'What is captured', 'Undone with'],
          rows: [
            ['Row edit form, “Save and continue”', 'The row before each save.', '<code>UPDATE</code> back, changed columns only'],
            ['Delete on the edit form', 'The whole row.', '<code>INSERT</code> it back'],
            ['A cell edited in the grid', 'The row, before and after.', '<code>UPDATE</code> back'],
            ['Ticked rows or whole result → Delete', 'Every matching row, not just the page.', '<code>INSERT</code> them back'],
            ['Ticked rows → Edit', 'Each row before.', '<code>UPDATE</code> back'],
            ['<code>UPDATE</code> / <code>DELETE</code> on the SQL page', 'The rows, read before it runs.', '<code>UPDATE</code> / <code>INSERT</code> per row'],
            ['<code>INSERT</code> — form, Clone, SQL page', 'The new row’s key.', '<code>DELETE</code> of those rows']
          ]
        }
      },
      {
        title: 'Safe by design',
        nav: 'Safety',
        lead: 'Not a transaction — Adminer opens a new connection per request — but a changeset replayed backwards as SQL you read first.',
        points: [
          '<b>Drift check</b>: each row is re-read before it is undone; only the columns you wrote are compared.',
          '<b>Refused</b>, and said so on the change: no key, two tables, no <code>WHERE</code>, BLOB columns, a grid CSV import, more rows than the cap.',
          'Newest first, one change per submission, stopping at the first failure.',
          'Runs from the Adminer tab, where its session cookie is — or <b>Copy undo SQL</b> and run it yourself.',
          'A changeset belongs to one database and is never offered on another.'
        ]
      },
      {
        title: 'Settings and limits',
        nav: 'Settings',
        lead: 'The manager page’s Settings — for teams whose database or rules differ.',
        images: [{
          src: 'screenshots/shot-db-settings.webp',
          srcDark: 'screenshots/shot-db-settings-dark.webp',
          alt: 'The Settings dialog of the Test sessions page: enable the Adminer integration, let the extension run undo SQL itself, read the row back before undoing it, merge statements per row by default, snapshot rows before hand-written statements, a row cap of 200, an INSERT key-scan cap of 10000, and a Force engine menu.',
          caption: 'Settings on the Test sessions page.'
        }],
        points: [
          'Let the extension run the undo SQL itself, or only show it for you to run.',
          'Turn the drift check off, or make Merged the default.',
          'Row cap per statement (200) and the largest table scanned for an INSERT’s keys (10 000).',
          'Engine detected — MySQL, PostgreSQL, SQL Server, SQLite, Oracle — or forced.'
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

  'api-tests': {
    title: 'API Tests',
    summary: 'Keep API requests in folders, send them, check the response — environments, saved tokens, folder runs, Postman both ways.',
    lead: 'Keep your API requests next to your UI tests: paste a cURL, send it, check what comes back — and run a whole folder with the token one request saves.',
    facts: [['5', 'kinds of check'], ['v2.1', 'Postman export &amp; import'], ['CSV', 'run results']],
    tab: 'tabData',
    tabLabel: 'Tools tab',
    points: [
      'Paste a cURL from DevTools — method, URL, headers and body filled in; Copy cURL goes the other way.',
      'Checks on the status, a JSON path, a header, the body and the time — a verdict per Send.',
      'Environments per server, and values saved from a response, such as a login token.',
      'Auth set once on a folder — Bearer, Basic or API key — and shared by its requests.',
      'Run a folder one request at a time; it asks before any write and names the hosts.',
      'Export to Postman for Newman in CI, and import a Postman collection back.'
    ],
    steps: [
      ['Open it', 'Tools → API Tests → <b>Manage API tests</b> opens a full tab.'],
      ['Add a request', '<b>＋ Request</b>, or <b>Paste cURL</b> from DevTools → Network → Copy as cURL.'],
      ['Check it', 'Add checks, or click a key in the JSON response to check it.'],
      ['Run', 'Send one, or <b>▶ Run folder</b>; save the results as CSV or the folder for Postman.']
    ],
    sections: [
      {
        title: 'Send and read the response',
        nav: 'Send',
        lead: 'A request opens beside its folder: six tabs above, the answer below.',
        images: [{
          src: 'screenshots/shot-api-send.webp',
          srcDark: 'screenshots/shot-api-send-dark.webp',
          alt: 'The request Get order: GET ${baseUrl}/orders/42 in the Shop folder, its Headers tab with Accept: application/json, quick adds for Accept JSON, Bearer token and No cache, and the browser’s cookies under Also sent; below, the response — Passed, 200 OK in about 100 ms, 194 B decoded, and the URL with the variable filled in.',
          caption: 'Get order sent: Passed, 200 OK in about 100 ms.'
        }],
        points: [
          'Any method, <b>OPTIONS</b> too; a body as <b>JSON</b>, <b>Form</b> or <b>Text</b>, and <b>Format</b> tidies JSON.',
          '<b>Paste cURL</b> from DevTools fills a request in; <b>Copy cURL</b> gives one back, variables filled in.',
          'Headers as a table: untick one to keep it unsent, <b>Bulk edit</b> pastes many, <code>${</code> suggests variables.',
          'The status, time and size; an image or a file is shown, or saved with <b>Download</b>.',
          'No CORS in the way; the site’s cookies go along unless the <b>Settings</b> tab turns them off.'
        ]
      },
      {
        title: 'Checks and the verdict',
        nav: 'Checks',
        lead: 'Each request is checked on every Send — with no checks, it must answer 2xx.',
        images: [{
          src: 'screenshots/shot-api-checks.webp',
          srcDark: 'screenshots/shot-api-checks-dark.webp',
          alt: 'The request List paid orders, Checks tab: status is 200, ticked; JSON total = 3, crossed, with “Expected total = "3", got 2”; time under 500, ticked. The response reads Failed with the same reason, and 200 OK.',
          caption: 'One check of three does not hold: Failed, and why.'
        }],
        points: [
          '<b>Status</b> <code>201</code>, <code>2xx</code>, <code>200,201</code>, <code>not5xx</code>; a <b>JSON path</b> =, contains, exists, does not exist, &gt;, &lt;.',
          '<b>Header</b> exists, = or contains; <b>body</b> contains or not; the total <b>time</b> under a limit.',
          'Click a key in the JSON response to make it a check; <code>${var}</code> works in expected values.',
          '<b>Failed</b>: a check is false — the API is wrong. <b>Broken</b>: no response, a timeout, not JSON — the test is wrong.'
        ]
      },
      {
        title: 'Environments, saved values and auth',
        nav: 'Environments',
        lead: 'Log in once; every request after it sends the token.',
        images: [{
          src: 'screenshots/shot-api-env.webp',
          srcDark: 'screenshots/shot-api-env-dark.webp',
          alt: 'The Environments dialog: Dev in use, and Staging. Dev sets baseUrl to https://api.shop.example, email, password and token. Under From the Data tab, the Tools tab’s email is struck through with “set here”, and locale en-US still applies.',
          caption: 'Dev’s email wins over the Tools tab’s; locale still comes from it.'
        }],
        points: [
          '<code>${name}</code> comes from the Tools tab’s variables, then the environment in use, which wins.',
          '<b>Save values</b> writes a JSON path, a header, the status or part of the body into the environment.',
          'A login saves <code>token</code>; the folder’s <b>Bearer</b> <code>${token}</code> sends it with every request after.',
          '<b>Auth</b> on a folder or one request: Bearer, Basic, or an API key in a header or the query.'
        ]
      },
      {
        title: 'Running many',
        nav: 'Running',
        lead: 'One request at a time, so a value one saves is there for the next.',
        images: [{
          src: 'screenshots/shot-api-run.webp',
          srcDark: 'screenshots/shot-api-run-dark.webp',
          alt: 'The Shop folder after Run folder, with “Last run · 3 passed · 1 failed · 1 broken”: Log in POST, ticked; Get order GET, ticked; List paid orders GET, crossed, “Expected total = "3", got 2”; Cancel order DELETE, ticked, 204; Daily report GET, broken, “The response is not JSON”.',
          caption: 'A folder run: 3 passed, 1 failed, 1 broken — each says why.'
        }],
        points: [
          '<b>▶ Run folder</b>, Run all, <b>Run N shown</b> after a filter, Run selected, or Send on one row.',
          'A run with POST, PUT, PATCH or DELETE asks first, naming the hosts; ⏹ Stop ends it.',
          'Each request keeps its last result, after the page is closed too; filter by it.',
          '<b>Export ▾ → Results</b> saves them as CSV.'
        ]
      },
      {
        title: 'Postman and CI',
        nav: 'Postman',
        lead: 'A folder exported for Postman runs in CI with Newman; a Postman collection imports back.',
        images: [{
          src: 'screenshots/shot-api-import.webp',
          srcDark: 'screenshots/shot-api-import-dark.webp',
          alt: 'Import from Postman with a collection picked: Shop API — 4 folders, 7 requests. Requests go to shop.example.com, auth.partner.test and admin.shop.example.com. Left out or changed: scripts not run, an oauth2 auth set to None, form fields left out, a GraphQL body sent as JSON, PURGE sent as GET. Also add the environment, ticked.',
          caption: 'Before anything is added: where the requests go, and what is left out.'
        }],
        points: [
          'Collection v2.1: <code>${x}</code> becomes <code>{{x}}</code>, checks and saved values become test scripts.',
          'Tokens and passwords written in full are left blank unless you tick Include secret values.',
          'In CI: <code>npx newman run Shop.postman_collection.json</code>.',
          'Import a v2.0 / v2.1 collection or an environment: the hosts and what is left out show first; Postman’s scripts never run.'
        ]
      }
    ],
    notes: [
      'Cookie, Origin, Host, Referer and User-Agent can’t be set: the browser’s own cookies go along.',
      'A request other than GET carries <code>Origin: chrome-extension://…</code> — a server guarding against CSRF by Origin may answer 403.',
      '<code>Set-Cookie</code> lands in the browser: calling logout logs you out for real.',
      'No turning off SSL checks, no client certificate, no proxy; redirects are always followed. The time is the total only, and the size is after decompression.',
      'Environments keep tokens and passwords in full: the Environments dialog shows them, and a Backup carries them.'
    ]
  },
  settings: {
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
      'Notifications per category — run results, errors and warnings, capture results, scheduled runs — all four on from the start.',
      'Light and dark themes; drag the five tabs into your own order, and the last one you used reopens.',
      'A <b>?</b> on each card opens a short guide, in Vietnamese or English.'
    ],
    steps: [
      ['Set your hotkeys', 'Settings → Hotkeys: click Set and press the new combination.'],
      ['Tune captures', 'Save mode (automatic or ask), filename prefix, watermark, countdown and segment scroll speed.'],
      ['Choose&nbsp;notifications', 'All four are on from the start; untick the ones you don’t need.'],
      ['Back up', 'Backup / Restore saves everything to one file — restore it on any machine.']
    ],
    sections: [
      {
        title: 'Default hotkeys',
        nav: 'Hotkeys',
        table: {
          head: ['Action', 'Default'],
          rows: [
            ['Start / Stop Recording', '<span class="kbd">Alt+R</span> / <span class="kbd">Alt+S</span>'],
            ['Screenshot&nbsp;(Visible)', '<span class="kbd">Alt+P</span>'],
            ['Screenshot (Full Page)', '<span class="kbd">Alt+Shift+F</span>'],
            ['Screenshot (Scroll V / H)', '<span class="kbd">Alt+V</span> / <span class="kbd">Alt+H</span>'],
            ['Segment V / H — Start', '<span class="kbd">Alt+Shift+V</span> / <span class="kbd">Alt+Shift+H</span>'],
            ['Segment — Stop &amp; Capture', '<span class="kbd">Alt+X</span>'],
            ['Screenshot&nbsp;(Element)', '<span class="kbd">Alt+E</span>']
          ]
        },
        points: [
          'Press Set, then the combination itself; Esc cancels. Reset to defaults puts them all back.',
          'Real key presses only, on http, https and file pages; Start/Stop need the tab turned on.',
          'In Adminer, <span class="kbd">Alt+Shift+Z</span> undoes the last recorded database change.'
        ]
      },
      {
        title: 'Import, export and backup',
        nav: 'Backup',
        lead: 'Import / Export moves scenarios. Backup / Restore moves everything.',
        images: [{
          src: 'screenshots/shot-pop-backup.webp',
          srcDark: 'screenshots/shot-pop-backup-dark.webp',
          alt: 'The Backup / Restore card in the Settings tab: Backup All Data, a file picker, and Restore All Data.',
          caption: 'Backup / Restore in the Settings tab.'
        }],
        points: [
          '<b>Import / Export</b>: a scenario or a folder as JSON; a folder file recreates its folder.',
          '<b>Backup</b>: scenarios, folders, variables, highlights and patterns, schedules, settings.',
          '<b>Restore</b> replaces, not merges — and skips what belonged to the old machine.',
          'An import with Run JS or Upload File steps warns first, naming the folders it would read.'
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
var FEATURE_ORDER = ['recording', 'playback', 'run-results', 'variables', 'csv', 'screenshots', 'export', 'highlights', 'sql-test-designer', 'db-test-session', 'api-tests', 'settings'];
