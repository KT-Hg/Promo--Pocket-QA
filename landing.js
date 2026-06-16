/**
 * landing.js — Promo page chrome: theme sync, scroll reveals, popup focus.
 * The popup's own behaviour lives in demo.js (inside the iframe).
 */
(function () {
  'use strict';
  var root = document.documentElement;
  var frame = document.getElementById('popupFrame');

  /* ── Theme (landing page only; INDEPENDENT of the popup) ──────────────────
   * The popup demo owns its own theme (see demo.js). The page theme toggle here
   * never messages the iframe, and we never react to the popup's theme — so the
   * two toggles are fully separate. Each persists under its own storage key. */
  var saved = null;
  try { saved = localStorage.getItem('demoPageTheme'); } catch (e) {}
  if (saved) root.setAttribute('data-theme', saved);

  function syncToggleIcon() {
    var btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('demoPageTheme', theme); } catch (e) {}
    syncToggleIcon();
  }
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
  syncToggleIcon();

  /* ── Toolbar extension button → bring popup into view + pulse ──────────── */
  var extBtn = document.getElementById('extBtn');
  if (extBtn) extBtn.addEventListener('click', function () {
    var demo = document.getElementById('demo');
    if (demo) demo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (frame) {
      frame.animate(
        [{ transform: 'scale(0.985)' }, { transform: 'scale(1)' }],
        { duration: 260, easing: 'ease-out' }
      );
    }
  });

  /* ── Scale the popup to fit on small screens ──────────────────────────────
   * The popup is a fixed 480x600 UI (its CSS assumes exactly 480px), so we can't
   * just shrink the iframe without breaking its layout. Instead we keep it at
   * 480px and zoom the whole thing down with transform:scale(). The scale factor
   * has to be a unitless number derived from the live available width — which
   * pure CSS can't compute — so we measure it here and feed promo.css two custom
   * properties (--popup-scale and the matching reserved height). */
  var anchor = document.querySelector('.popup-anchor');
  var DESIGN_W = 480, DESIGN_H = 600;
  var mq = window.matchMedia('(max-width: 560px)');
  function fitPopup() {
    if (!anchor) return;
    var host = anchor.parentElement;            // .browser__viewport
    if (mq.matches && host) {
      var avail = host.clientWidth;             // padding is 0 at this breakpoint
      var scale = Math.min(1, avail / DESIGN_W);
      anchor.style.setProperty('--popup-scale', String(scale));
      anchor.style.setProperty('--popup-scaled-h', (DESIGN_H * scale) + 'px');
    } else {
      anchor.style.removeProperty('--popup-scale');
      anchor.style.removeProperty('--popup-scaled-h');
    }
  }
  fitPopup();
  window.addEventListener('resize', fitPopup);
  window.addEventListener('load', fitPopup);     // re-measure once the iframe lays out

  /* ── Reveal-on-scroll ─────────────────────────────────────────────────── */
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
