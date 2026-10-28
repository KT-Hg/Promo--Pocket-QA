/**
 * store-version.js — Footer version, read live from the Chrome Web Store.
 * The store page can't be fetched cross-origin, so this goes through shields.io's
 * JSON badge (CORS-open, cached 5 min). The HTML keeps the vendored version as
 * the fallback for no-JS, offline, or shields.io being down.
 */
(function () {
  'use strict';
  var el = document.getElementById('extVersion');
  if (!el || !window.fetch) return;
  fetch('https://img.shields.io/chrome-web-store/v/hghkokkjbpedgjbpohpkgmejkeobocam.json')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      // Only a version number replaces the fallback, never "not found" etc.
      var m = /^v?(\d+(?:\.\d+){0,3})$/.exec(d.value);
      if (m) el.textContent = m[1];
    })
    .catch(function () {});
})();
