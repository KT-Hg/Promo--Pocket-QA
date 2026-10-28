# Promotional Page — Pocket QA

A marketing landing page that shows the **real extension popup UI**
(100% fidelity) as a **static preview**, with no extension installed. Only tab
switching and the theme toggle are interactive; every other control is seeded
with demo data and shown for display only.

This is a **standalone repository**. It does not depend on the extension repo at
runtime — the few extension files the preview needs are **vendored** under
[`vendor/`](vendor/) so the page can be cloned, opened, or deployed anywhere.

## Keeping the demo in sync with the extension (the "rule")
The preview reuses a **vendored snapshot** of the extension UI. Two steps:

| Step | Command | When |
|------|---------|------|
| 1. Pull latest extension source into `vendor/` **and** regenerate the demo | `node update-vendor.mjs` | After the extension's popup UI changes |
| 2. Regenerate `popup-demo.html` from the current `vendor/` snapshot only | `node sync-from-source.mjs` | After tweaking the generator (no extension needed) |

What gets vendored (by `update-vendor.mjs`):

| Vendored file | From the extension repo | Used by |
|---------------|-------------------------|---------|
| `vendor/popup/*.css`   | `css/popup/*.css` — every stylesheet `popup.html` links (`01-base.css` … `12-switch-blocks.css`), verbatim | `popup-demo.html` links each one, in the same order as `popup.html` (the real stylesheets → pixel-perfect) |
| `vendor/popup.html`    | `popup.html`        | source markup the demo is generated from |
| `vendor/icon128.png`   | `icons/icon128.png` | `index.html` favicon / logo |
| `vendor/version.txt`   | `manifest.json` → `version` | stamped into the demo as `<meta name="ext-version">`; `demo.js` fills the Settings › Version card from it. `update-vendor.mjs` also rewrites the version in both page footers and the sample report on `feature.html?id=run-results`, and `minimum_chrome_version` into "Chrome 109+" / the FAQ. The Version card and footers then swap in the live Chrome Web Store version at runtime (via shields.io), so this is only their fallback. |

- **The stylesheet list is read from `popup.html`'s `<head>`**, not hard-coded:
  `update-vendor.mjs` copies whatever it links under `css/` (and clears
  `vendor/popup/` first, so a file the extension dropped doesn't linger), and
  `sync-from-source.mjs` repoints each `<link>` at its `vendor/` copy. A
  stylesheet added, removed or renamed in the extension needs no script change;
  anything else in the `<head>` changing still fails the sync loudly.
- **Behaviour (`popup/*.js`) is NOT mirrored.** `demo.js` is a STATIC preview, not
  a sandbox. After a markup change `sync-from-source.mjs` prints control ids not
  referenced in `demo.js` — that's expected (they're display-only, neutralised by
  a capture-phase guard), **not** a TODO.
- `popup-demo.html` is **auto-generated** — never hand-edit it; edit the source and re-run the sync.

### Where the extension repo lives
`update-vendor.mjs` finds the extension repo via (first match wins):

1. CLI arg — `node update-vendor.mjs "D:/path/to/Pocket QA"`
2. Env var — `EXT_REPO="D:/path/..." node update-vendor.mjs`
3. Default — `../Pocket QA` (sibling folder on this machine)

## Why it's pixel-perfect
The popup demo **reuses the extension's actual stylesheets** (vendored as
`vendor/popup/*.css`, linked in the same order) and the exact markup from `vendor/popup.html`. Nothing was
re-implemented in CSS, so the demo can never visually drift from the shipped
product. Only the *behaviour* is mocked (the real popup needs `chrome.*` APIs
that don't exist on a web page).

## How to run
Just open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari) —
no build step, no server required:

```
index.html        ← open this
```

> Tip: some browsers restrict `file://` iframes. If the embedded popup doesn't
> load from disk, serve the folder over HTTP instead:
> `python -m http.server` then visit `/`. Not `npx serve`: its clean-URL redirect (`feature.html?id=x` → `/feature`) drops the query string, so every feature page and popup deep link falls back to its default.

## Files
| File | Purpose | Lines |
|------|---------|-------|
| `index.html`     | Landing page: nav, hero, browser mockup, features, steps, CTA, footer (BEM markup) | ~210 |
| `feature.html`   | Feature guide template (BEM), shared by all `.feature` cards — `feature.html?id=<key>`: hero + facts, sticky "On this page" bar, overview beside the live popup, steps, detail sections, notes, other features | ~150 |
| `promo.css`      | Landing-page styles only (BEM, fully self-contained, brand colours match the extension) | ~430 |
| `landing.js`     | Promo chrome: theme sync ↔ iframe, scroll reveals, toolbar-icon focus | ~80 |
| `store-version.js` | Footer version on both pages, read live from the Chrome Web Store via shields.io's JSON badge (the store itself has no CORS); the vendored version stays in the HTML as the fallback | ~20 |
| `feature.js`     | The eleven features' content (written against the extension README) + the renderer that fills `feature.html` from the `id` query param (sections, tables, scroll spy, deep-linked popup preview, light/dark screenshots) | ~1200 |
| `popup-demo.html`| Verbatim copy of the popup markup; links the vendored `vendor/popup/*.css` + `demo.js` | ~2010 |
| `demo.css`       | A few tiny tweaks for the in-iframe demo context | ~25 |
| `demo.js`        | Static preview: tab switching + theme only, seeds demo data, blocks the rest (no `chrome.*`) | ~590 |
| `sync-from-source.mjs` | Regenerates `popup-demo.html` from `vendor/popup.html` (deterministic) | ~145 |
| `update-vendor.mjs`    | Refreshes `vendor/` from the extension repo, then re-syncs | ~95 |
| `stamp-feature-js.mjs` | Cache-busts `feature.html`'s `<script src="feature.js?v=…">` with a content hash — run after every `feature.js` edit | ~35 |
| `vendor/`        | Vendored extension snapshot (`popup.html`, `popup/*.css`, `icon128.png`, `version.txt`) | — |
| `og-image.png`   | Link-preview image (`og:image`): the light hero at 1200×630 — see "Link preview image" below | — |

## Architecture — why an `<iframe>`
The real popup stylesheets style global elements (`body`, `button`, `input`, `.card`…).
Loading it directly on the landing page would restyle the whole site. Rendering
the popup inside an `<iframe src="popup-demo.html">` gives perfect CSS isolation:
the popup CSS applies **only** inside the frame (where `body { width: 480px }` is
exactly right), while the landing page keeps its own `promo.css`.

Theme is deliberately **not** synced on `index.html`: the page's toggle and the
popup's own toggle inside the frame are fully independent, on purpose (see
"Theme" in `landing.js`) — so a visitor can put the popup in dark mode without
the marketing page around it going dark too, and vice versa. `feature.html`
does read the popup's theme, one-way: `demo.js` `postMessage`s its current
theme to the parent on load and on every toggle (never the other way, and the
page's own toggle still doesn't touch the popup's), so the "Inside the …"
screenshots on feature pages can follow whichever theme the live popup preview
actually ends up showing, not assume it always mirrors the page.

## What's interactive in the demo
The preview is intentionally **static** — it showcases the UI without acting as a
working sandbox. Only two things respond:
- **Tabs** — Record & Play · Data · Capture · Highlight · Settings (+ Capture sub-tabs)
- **Theme** — light/dark toggle (🌙/☀️), persisted; independent of the landing page's own toggle

Everything else (Start Recording, Play, Enable/Copy/Edit/Delete, Add Manual Action,
collapsible cards, highlight search/filter, toggles, sliders, modals, …) is seeded
with realistic demo data so the UI looks complete, but is **display only**. A
capture-phase guard in `demo.js` swallows clicks on those controls, and `demo.css`
gives them a `not-allowed` cursor so visitors can tell it's a preview.

### Runtime state the preview has to fake
The popup CSS styles several things off state that only the running popup sets, so
the raw markup alone does **not** look like the real popup. `demo.js` reproduces
the state of a healthy, activated install:

| State | Set by the real popup in | Left alone, the preview shows |
|-------|--------------------------|-------------------------------|
| `<body data-activation="active">` | `popup/main.js` | every `[data-requires-activation]` hotkey row at 38% opacity with its **Set** button hidden, plus the 🔒 *"available after activating on the current tab"* notice — contradicting the demo's own "Active on this tab" header |
| `<body data-active-tab="…">` | `popup/init.js` → `switchTab` | lock overlays lose the selector that positions them per tab |
| Settings › Version card | `popup/settings.js` → `loadUpdateInfo` | three `—` placeholders no installed copy ever shows |
| Last run card (top of Record & Play) | `popup/run/last-run.js` → `_render`, from the stored `lastRun` | nothing — the card stays `hidden`, as if no scenario had ever been played. The demo shows a `✓ Passed` run of the selected scenario |
| Action list rows | `popup/record/preview.js` → `createActionListItem` | (demo.js builds them itself) — rows must use the real two-line `.value-main` / `.value-sub` markup, and rows a Condition guards nest under it (`sw-in-block`, `--sw-depth`, `--sw-color`), or the list no longer matches the real one |
| Export Code card | `popup/export/code-card.js` → takes Manage Scenarios' scenario | `-- Select scenario --` and all five format buttons disabled |
| Settings › Screenshot + Notifications | `popup/settings.js` → `loadScreenshotSettings` / `loadNotificationSetting` | no save mode picked, an empty prefix, blank speed boxes and every notification off — instead of the defaults a fresh install shows |
| Data › DB Test Session status line | `popup/init.js` → `initDbStatus` | the line stays `hidden` |
| Schedule start URL | `popup/run/time-picker.js` → `prefillScheduleUrl` | an empty field instead of this tab's address |

When a sync pulls in new markup, re-check this list: anything the real popup
fills from `chrome.*` at startup is a candidate for the same treatment.

## Visitors who already have the extension installed
The extension's content script is injected into **every frame** of a page
(`manifest.json` → `all_frames: true`), this preview iframe included. Left alone,
hitting 🎯 **Pick element** in the *real* popup broadcasts `START_PICK_MODE` to
every frame, so the live picker bar, its hover outline and the crosshair cursor
would show up **inside the mock popup** — and a click on the fake UI would report
a real `ELEMENT_PICKED` selector back into the user's scenario.

The preview fences itself off, in the iframe only:

| Where | What it does |
|-------|--------------|
| `demo.js` §9 | The guard is the **only** listener in the frame: it dispatches the two live controls itself, then `stopImmediatePropagation()`. It runs while the frame is parsing, the content script only at `document_idle`, so ours is registered first and the extension never sees a click/mouseover/keydown in here. |
| `demo.js` §11 | A `MutationObserver` removes any node carrying the extension's `data-ext-overlay` marker (`content.js` → `_EXT_OVERLAY_ATTR`) and clears the crosshair it paints on `<body>` — needed because that UI is mounted from a runtime message, which no page code can intercept. |
| `demo.css` | Hides `[data-ext-overlay]` outright, so nothing flashes before the observer removes it. |
| `sync-from-source.mjs` | Stamps `demo.js` / `demo.css` / `vendor/popup/*.css` URLs with a content hash (`demo.js?v=e282bf21`) — of the file's LF form, what git stores and Pages serves, so a CRLF checkout stamps the same URL. A stale cached copy of `demo.js` silently disables the fence above, and that is exactly what it looks like when the picker bar shows up inside the mock popup again. |

`feature.html` guards its own script the same way, just by hand — `stamp-feature-js.mjs` stamps `<script src="feature.js?v=…">` with a content hash. A stale cached `feature.js` doesn't break anything as loudly as the fence above; it just quietly keeps running whatever the page could already do before the last edit — e.g. a build that predates dark-mode screenshot support keeps showing the light PNG after the theme toggle, with no error to point at why. Run `node stamp-feature-js.mjs` after every `feature.js` edit, and hard-reload (Ctrl+Shift+R) if a change to that file doesn't seem to be taking effect in a browser that already had a `feature.html?id=…` page open.

**Is the fence actually live in my browser?** Open the console *in the preview
frame* (DevTools → frame selector, or right-click the popup → *This Frame* →
*Reload frame*) and check `__promoDemoGuard` — it reads `extension-fence v2`.
If it is `undefined`, the page is running a cached `demo.js`: hard-reload
(Ctrl+Shift+R), and on GitHub Pages give the deploy a minute first.

**Scope:** the iframe only. The landing page around it is a normal web page and
the extension keeps working there exactly as it does anywhere else. Not covered:
the highlight feature's injected `<mark>`/`<style>` nodes, which aren't marked as
overlays — they only appear if the visitor has saved highlights matching the
promo's URL.

## Deep links
The demo supports query params so you can link straight to a tab / theme:

```
popup-demo.html?tab=tabHighlight&theme=dark
popup-demo.html?tab=tabData
```

## Screenshot comparison
See [`screenshots/`](screenshots/):

| Shot | What it shows |
|------|---------------|
| `shot-popup-original.png` | The real `popup.html` rendered without the extension runtime (empty/“Checking…”) |
| `shot-popup-demo.png`     | The demo popup — identical styling, now populated & active |
| `shot-landing-hero.png`   | Full landing hero with the popup embedded in the browser mockup |
| `shot-tab-data.png`       | Data tab — variables, export-code, collapsibles |
| `shot-tab-highlight.png`  | Highlight tab in **dark** mode — colour-coded highlights, stats, switch |
| `shot-image-editor.png` / `-dark.png`   | `editor.html`'s Crop & Edit UI, used on `feature.html?id=screenshots` — real editor, sample dashboard image, an arrow + rectangle annotation and the Stamp panel open |
| `shot-sqlcases-analysis.png` / `-dark.png` | `sqlcases.html`'s full 3-column workspace, used on `feature.html?id=sql-test-designer` — query rail, a real generated case list (71 cases), and one case's fixture data open in the inspector |
| `shot-export-js.png` / `-dark.png`      | The real Export JS modal for a sample "Login flow" scenario — actual generated bookmarklet code at Step 1, stats and the to-check / skipped warning, used on `feature.html?id=export` (captured from v1.0.24) |
| `shot-export-py.png` / `-dark.png`      | The real Export Python modal for that same scenario — actual generated Selenium code at Step 1, used on `feature.html?id=export` (captured from v1.0.24) |
| `shot-dbtools-rollback.png` / `-dark.png` | The Adminer panel (`dbtools/panel.js`) beside the Undo SQL preview it opens for "↺ Roll back all" — a sample 7-change session, one change refused (no `WHERE`), Step by step / Merged switch, used on `feature.html?id=db-test-session` |
| `shot-dbtools-manager.png` / `-dark.png`  | `dbtools.html`, the Test sessions & rollback page, on that same session — the rail of sessions, a DELETE and an UPDATE diff open, one change already undone, used on `feature.html?id=db-test-session` |

These are real UI, not mockups — `editor.html` and `sqlcases.html` don't ship in this repo (only `popup.html` is vendored), so each was captured straight from the extension repo: `editor.html` needs `chrome.runtime` to receive an image, so a throwaway `chrome-stub.js` fed it a synthetic sample "dashboard" screenshot and a fake storage/theme response, the same trick `demo.js` plays on `popup.html`; `sqlcases.html` runs standalone and just needed a sample query analysed. The export shots go one step further: rather than the whole popup (which needs the full `popup/init.js` module graph and dozens of `chrome.*` calls), a throwaway copy of the extension's `popup/`, `shared/`, `css/` and `popup.html` swaps `popup/init.js` for a harness that calls only `initExportBookmarklet()` / `initExportSelenium()`, with a `chrome-stub.js` answering `GET_SCENARIOS` / `GET_VARIABLES` with one sample "Login flow" scenario (navigate, two inputs, a click, a `textContains` assert, a screenshot) and two variables. It picks the scenario, clicks the real format button, then the modal's own **↧ Steps** — so the code in the screenshots is genuinely generated, not typed by hand.

The DB Test Session shots are built the same way, from a throwaway harness that copies the extension's `dbtools/` modules, `dbtools.html` and `css/dbtools.css` into a temp folder (nothing is added to either repo). A small `chrome.storage` stub seeds one sample session in exactly the shape `dbtools/session.js` stores, plus `popupTheme` for light/dark, and nothing more is faked. `shot-dbtools-manager` is the real `dbtools.html` + `manager.js` rendering that session. `shot-dbtools-rollback` mounts the real panel via `mountPanel()`, writes the log lines `content-main.js` would write (`logRecorded`), and opens the real `preview()`. That preview gets the statements from a real `runRollback(…, { dryRun: true })` (and its `compact` twin for *Merged*), so the SQL is generated, not typed. The panel and the preview are both `position:fixed` overlays over Adminer. With no Adminer page behind them, they're re-anchored side by side on a plain stage, the same trick as the export modals below. Captured with headless Chrome (`--allow-file-access-from-files` so the ES modules load over `file://`) instead of html2canvas, so neither gotcha below applies.

The export modals use `position:fixed`, which sizes off the *browser viewport* — at a normal desktop viewport the modal comes out far wider than the real ~480px popup ever shows. So they're captured with headless Chrome at the popup's own window size: `chrome --headless=new --allow-file-access-from-files --window-size=480,600 --force-device-scale-factor=2 --virtual-time-budget=5000 --screenshot=… "file:///…/harness.html?fmt=js&theme=dark"` (`fmt=py` for Python). No re-anchoring, and neither html2canvas gotcha below applies.

Each shot has a `-dark` twin, captured the same way with `data-theme="dark"` set first (`popup.css`/`editor.css`'s `[data-theme="dark"]` / `body:not(.light)`) — `feature.js` swaps between the pair to follow the **"Live popup preview" iframe's own theme**, not the page's (see "Architecture — why an `<iframe>`" above for how the two stay in sync via `postMessage`, one-way, popup → page).

Two `html2canvas` gotchas worth knowing if these ever need re-capturing:
- **`<textarea>` value renders blank / unwrapped.** html2canvas can't render a form control's *native* text layout — the fix is to swap the real `<textarea>` for a plain `<div>` with the same box (font, padding, border) and `white-space: pre-wrap`, capture that, then swap back.
- **`<button>`/`<select>` render with the browser's default chrome** (square corners, black 1px border) **instead of the real CSS** — same native-widget cause. Fix: inject `button, select, input, textarea { appearance: none !important; }` before capturing.

If the real UI changes, redo the capture (funnelling both fixes above through it again) rather than hand-editing these PNGs.

**The page serves WebP, not these PNGs.** Every shot `feature.js` references is a lossless WebP twin — pixel-identical, about a third of the size (1.59 MB → 0.53 MB for all twelve). The PNGs stay as the capture originals. After a re-capture, regenerate the WebP for every shot `feature.js` points at (needs Pillow):

```
python -c "import re; from PIL import Image; [Image.open(w[:-5]+'.png').save(w, lossless=True, quality=100, method=6) for w in set(re.findall(r'screenshots/[\w-]+\.webp', open('feature.js', encoding='utf8').read()))]"
```

## Link preview image
`og-image.png` is the hero exactly as a visitor sees it, captured in the light theme at the 1200×630 size link previews use. Re-capture it whenever the hero changes:

```
chrome --headless=new --allow-file-access-from-files --blink-settings=preferredColorScheme=1 --window-size=1200,630 --hide-scrollbars --virtual-time-budget=5000 --screenshot=og-image.png "file:///<this folder>/index.html"
```

The canonical / `og:url` / `og:image` URLs in both pages point at the GitHub Pages deploy, `https://kt-hg.github.io/Promo--Pocket-QA/`; `feature.js` swaps in each feature's own URL, title and description.

The original vs demo pair is the parity proof: same CSS, same markup → same pixels.
