# Promotional Page — Fast Recorder & Playback

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
| `vendor/popup.css`     | `css/popup.css`     | `popup-demo.html` (the real stylesheet → pixel-perfect) |
| `vendor/popup.html`    | `popup.html`        | source markup the demo is generated from |
| `vendor/icon128.png`   | `icons/icon128.png` | `index.html` favicon / logo |

- **Behaviour (`popup/*.js`) is NOT mirrored.** `demo.js` is a STATIC preview, not
  a sandbox. After a markup change `sync-from-source.mjs` prints control ids not
  referenced in `demo.js` — that's expected (they're display-only, neutralised by
  a capture-phase guard), **not** a TODO.
- `popup-demo.html` is **auto-generated** — never hand-edit it; edit the source and re-run the sync.

### Where the extension repo lives
`update-vendor.mjs` finds the extension repo via (first match wins):

1. CLI arg — `node update-vendor.mjs "D:/path/to/Fast Recorder & Playback"`
2. Env var — `EXT_REPO="D:/path/..." node update-vendor.mjs`
3. Default — `../Fast Recorder & Playback` (sibling folder on this machine)

## Why it's pixel-perfect
The popup demo **reuses the extension's actual stylesheet** (vendored as
`vendor/popup.css`) and the exact markup from `vendor/popup.html`. Nothing was
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
> `npx serve .`  (or `python -m http.server`) then visit `/`.

## Files
| File | Purpose | Lines |
|------|---------|-------|
| `index.html`     | Landing page: nav, hero, browser mockup, features, steps, CTA, footer (BEM markup) | ~210 |
| `promo.css`      | Landing-page styles only (BEM, fully self-contained, brand colours match the extension) | ~330 |
| `landing.js`     | Promo chrome: theme sync ↔ iframe, scroll reveals, toolbar-icon focus | ~80 |
| `popup-demo.html`| Verbatim copy of the popup markup; links the vendored `vendor/popup.css` + `demo.js` | ~1530 |
| `demo.css`       | A few tiny tweaks for the in-iframe demo context | ~25 |
| `demo.js`        | Static preview: tab switching + theme only, seeds demo data, blocks the rest (no `chrome.*`) | ~330 |
| `sync-from-source.mjs` | Regenerates `popup-demo.html` from `vendor/popup.html` (deterministic) | ~110 |
| `update-vendor.mjs`    | Refreshes `vendor/` from the extension repo, then re-syncs | ~55 |
| `vendor/`        | Vendored extension snapshot (`popup.html`, `popup.css`, `icon128.png`) | — |

## Architecture — why an `<iframe>`
The real `popup.css` styles global elements (`body`, `button`, `input`, `.card`…).
Loading it directly on the landing page would restyle the whole site. Rendering
the popup inside an `<iframe src="popup-demo.html">` gives perfect CSS isolation:
`popup.css` applies **only** inside the frame (where `body { width: 480px }` is
exactly right), while the landing page keeps its own `promo.css`. The two
documents communicate theme changes via `postMessage`.

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

The original vs demo pair is the parity proof: same CSS, same markup → same pixels.
