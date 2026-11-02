/**
 * feature.js — Renders feature.html?id=<key> from features-en.js + features-vi.js, every
 * string as an EN/VI pair; a Vietnamese string that is missing falls back to the English one. Runs before
 * site.js, which then fits each section to one screen and evens out the two languages' sizes.
 */
(() => {
  const d = document.documentElement;
  const $ = s => document.querySelector(s);
  const EN = window.FEATURES_EN, VI = window.FEATURES_VI || {}, ORDER = window.FEATURE_ORDER;
  const id = new URLSearchParams(location.search).get('id');
  // Unknown or missing id → back to the features section rather than a blank page
  if (!id || !Object.prototype.hasOwnProperty.call(EN, id)) { location.replace('index.html#features'); return; }
  const E = EN[id], V = VI[id] || {};

  // A hyphenated word never breaks at its hyphen (or en dash, as in ORDER–LIMIT): wrap it in .nw — text between
  // tags only, never inside one
  const hyphenated = /(?<![\p{L}\p{N}–-])[\p{L}\p{N}]+(?:[–-][\p{L}\p{N}]+)+(?![\p{L}\p{N}–-])/gu;
  // …and the last two words stay together, so no last line holds a single word (`pretty` and `balance` alone
  // still left some in narrow table cells and stat labels). Unless the text already ends on an &nbsp;: gluing one
  // more word on made chunks too wide for a phone ("CSV data-driven runs" in a 121px card title)
  const typeset = html => {
    const parts = html.split(/(<[^>]+>)/);
    for (let i = parts.length - 1; i >= 0; i -= 2) {   // text parts sit at even indexes
      const at = parts[i].lastIndexOf(' ');
      if (parts[i].lastIndexOf('&nbsp;') > at) break;
      if (at !== -1) { parts[i] = parts[i].slice(0, at) + '&nbsp;' + parts[i].slice(at + 1); break; }
    }
    return parts.map((s, i) => i % 2 ? s : s.replace(hyphenated, '<span class="nw">$&</span>')).join('');
  };
  // One EN/VI pair; a missing or identical Vietnamese string renders once, for both languages
  const pair = (en, vi) => vi == null || vi === en ? typeset(en) : `<span lang="en">${typeset(en)}</span><span lang="vi">${typeset(vi)}</span>`;
  const plain = html => html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const list = (cls, en, vi = []) => { const ul = el('ul', cls); en.forEach((h, i) => ul.appendChild(el('li', null, pair(h, vi[i])))); return ul; };
  // A list that may shorten when its section would be taller than the screen: site.js keeps its first `keep`
  // items and puts the rest behind the section's "Show the rest"
  const fit = (node, keep) => { node.dataset.fit = keep; return node; };
  // An attribute holds one language: keep both and set the active one, again after every switch
  const attrs = [];
  const biAttr = (node, attr, en, vi) => attrs.push([node, attr, en, vi == null ? en : vi]);
  const syncAttrs = () => attrs.forEach(([n, a, en, vi]) => n.setAttribute(a, d.lang === 'vi' ? vi : en));
  const theme = () => d.dataset.theme === 'dark' ? 'dark' : 'light';

  // Head: titles for both languages (site.js swaps them), the rest in English for crawlers that run JS
  const title = h => plain(h) + ' — Pocket QA';
  d.dataset.titleEn = title(E.title);
  d.dataset.titleVi = title(V.title || E.title);
  syncTitle();
  const url = 'https://kt-hg.github.io/Promo--Pocket-QA/feature.html?id=' + id;
  $('meta[name="description"]').content = plain(E.lead);
  $('link[rel="canonical"]').href = url;
  $('meta[property="og:url"]').content = url;
  $('meta[property="og:title"]').content = d.dataset.titleEn;
  $('meta[property="og:description"]').content = plain(E.lead);

  // Hero
  $('#crumbCurrent').innerHTML = pair(E.title, V.title);
  $('#heroTitle').innerHTML = pair(E.title, V.title);
  $('#heroLead').innerHTML = pair(E.lead, V.lead);
  const vf = V.facts || [];
  E.facts.forEach((f, i) => $('#heroFacts').appendChild(el('li', null,
    `<strong>${pair(f[0], (vf[i] || [])[0])}</strong><span>${pair(f[1], (vf[i] || [])[1])}</span>`)));
  $('#demoNote').innerHTML = pair(
    `The real popup, open on its ${E.tabLabel}: switch tabs and its own <span class="kbd">🌙</span> theme. The other controls are display-only here.`,
    `Popup thật (bằng tiếng Anh), đang mở ở ${V.tabLabel || E.tabLabel}: đổi được tab và nút <span class="kbd">🌙</span> của popup. Các nút khác ở đây chỉ để xem.`);

  // Overview: one card per point, steps, notes
  const vp = V.points || [];
  const points = fit($('#detailPoints'), 1);
  E.points.forEach((p, i) => points.appendChild(el('li', 'card point reveal', pair(p, vp[i]))));
  const vs = V.steps || [], steps = fit($('#detailSteps'), 2);
  E.steps.forEach((s, i) => steps.appendChild(el('li', 'card step reveal',
    `<span class="step-num">${i + 1}</span><h3>${pair(s[0], (vs[i] || [])[0])}</h3><p>${pair(s[1], (vs[i] || [])[1])}</p>`)));
  const notes = fit($('#detailNotes'), 1), vn = V.notes || [];
  notes.dataset.n = E.notes.length;
  E.notes.forEach((h, i) => notes.appendChild(el('li', 'card note reveal', pair(h, vn[i]))));

  // Detail sections: one per FEATURES_EN[id].sections entry
  let popupTheme = theme();   // the screenshots follow the preview's own theme; best guess until it reports in
  const shots = (s, v) => {
    const box = fit(el('div', 'shots'), 1);   // side by side wherever they fit, so imagesLayout is no longer needed
    s.images.forEach((img, i) => {
      const vi = (v.images || [])[i] || {};
      const fig = box.appendChild(el('figure', 'card shot'));
      const pic = fig.appendChild(el('img'));
      biAttr(pic, 'alt', img.alt || '', vi.alt);
      if (img.srcDark) { pic.dataset.srcLight = img.src; pic.dataset.srcDark = img.srcDark; }
      pic.src = img.srcDark && popupTheme === 'dark' ? img.srcDark : img.src;
      if (img.caption) fig.appendChild(el('figcaption', null, pair(img.caption, vi.caption)));
    });
    return box;
  };
  const table = (t, vt = {}, label, labelVi) => {
    // Wide tables scroll inside their own box, never the page — focusable and labelled for keyboards
    const wrap = el('div', 'card table-wrap');
    wrap.tabIndex = 0;
    wrap.setAttribute('role', 'region');
    biAttr(wrap, 'aria-label', plain(label), labelVi && plain(labelVi));
    const tb = wrap.appendChild(el('table'));
    if (t.rows.every(r => /^\d+$/.test(plain(r[0])))) tb.classList.add('num-first');   // a "#" column stays narrow
    const head = tb.appendChild(el('thead')).appendChild(el('tr'));
    t.head.forEach((h, i) => { head.appendChild(el('th', null, pair(h, (vt.head || [])[i]))).scope = 'col'; });
    const body = fit(tb.appendChild(el('tbody')), 1);
    // Phones stack a table of up to three columns, one row per block; each cell then shows its column's name
    const stack = t.head.length <= 3;
    if (stack) wrap.classList.add('stack');
    const colName = k => stack && k ? `<span class="th-label">${pair(t.head[k], (vt.head || [])[k])}</span>` : '';
    t.rows.forEach((r, i) => {
      const tr = body.appendChild(el('tr'));
      r.forEach((c, k) => tr.appendChild(el('td', null, colName(k) + pair(c, ((vt.rows || [])[i] || [])[k]))));
    });
    return wrap;
  };
  const navItems = [['overview', 'Overview', 'Tổng quan'], ['how-to', 'How to use it', 'Cách dùng']];
  const sections = E.sections.map((s, i) => {
    const v = (V.sections || [])[i] || {};
    const sec = el('section');
    sec.id = 'section-' + (i + 1);
    const box = sec.appendChild(el('div', 'container collapsible'));
    const head = box.appendChild(el('div', 'section-head reveal'));
    head.appendChild(el('h2', 'section-title', pair(s.title, v.title)));
    if (s.lead) head.appendChild(el('p', 'section-sub', pair(s.lead, v.lead)));
    const media = [];
    if (s.images) media.push(shots(s, v));
    if (s.table) media.push(table(s.table, v.table, s.title, v.title));
    if (s.code) { const pre = el('pre', 'code'); pre.appendChild(el('code')).textContent = s.code; media.push(pre); }
    const pts = s.points && fit(list('checks', s.points, v.points), 1);
    // The table, screenshots or code beside the points (from 1024px), unless a table needs the full width
    const split = media.length && pts && !(s.table && s.table.head.length > 3);
    const body = box.appendChild(el('div', 'fbody' + (split ? ' split' : '')));
    if (media.length) body.appendChild(el('div', 'fmedia')).append(...media);
    if (pts) body.appendChild(pts).classList.toggle('cols', !split);
    navItems.push([sec.id, s.nav || s.title, v.nav || v.title]);
    return sec;
  });
  $('#detailSections').replaceWith(...sections);
  navItems.push(['notes', 'Good to know', 'Lưu ý'], ['more', 'More features', 'Tính năng khác']);
  // Alternate the background in page order, however many sections a feature has
  document.querySelectorAll('main > section:not(.fhero)').forEach((s, i) => s.classList.toggle('alt', i % 2 === 1));

  // Other features (the previous and next ones are among them)
  const more = fit($('#moreFeatures'), 1);
  ORDER.filter(k => k !== id).forEach(k => {
    const a = more.appendChild(el('a', 'card feature reveal', `<h3>${pair(EN[k].title, (VI[k] || {}).title)}</h3>`));
    a.href = 'feature.html?id=' + k;
  });

  // Every section: a link in the pill's menu, and a "Show the rest" button that site.js shows only when it
  // shortened a list
  const pill = $('#pageNav'), pillBtn = pill.querySelector('.fpill-btn'), menu = $('#pageNavMenu'), links = {};
  menu.setAttribute('role', 'navigation');
  biAttr(menu, 'aria-label', 'On this page', 'Trên trang này');
  navItems.forEach(([target, en, vi]) => {
    const sec = document.getElementById(target);
    const a = el('a', null, pair(en, vi));
    a.href = '#' + target;
    links[target] = menu.appendChild(a);
    const btn = sec.querySelector('.collapsible').appendChild(el('button', 'more-btn',
      '<span class="l-more"><span lang="en">Show the rest</span><span lang="vi">Xem phần còn lại</span></span><span class="l-less"><span lang="en">Show less</span><span lang="vi">Thu gọn</span></span>'));
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
  });
  // The pill names the section in view, and its ring fills as the page scrolls. Every section's name, in both
  // languages, sits stacked in the label (CSS), only the current one visible: the pill is as wide as the longest and
  // never changes width — scrolling to another section or switching language. Screen readers hear "On this page: <section>"
  let current = navItems[0][0];
  const name = k => navItems.find(([t]) => t === k);
  const names = {};
  const label = pill.querySelector('.fpill-label');
  navItems.forEach(([k, en, vi = en]) => { names[k] = label.appendChild(el('span', null, `<span lang="en">${en}</span><span lang="vi">${vi}</span>`)); });
  const labelPill = () => {
    const [, en, vi = en] = name(current);
    pillBtn.setAttribute('aria-label', d.lang === 'vi' ? 'Trên trang này: ' + plain(vi) : 'On this page: ' + plain(en));
  };
  const setCurrent = target => {
    current = target;
    navItems.forEach(([k]) => {
      k === target ? links[k].setAttribute('aria-current', 'true') : links[k].removeAttribute('aria-current');
      names[k].classList.toggle('cur', k === target);
    });
    labelPill();
  };
  setCurrent(current);
  const progress = () => {
    const max = d.scrollHeight - innerHeight;
    pill.style.setProperty('--p', max > 0 ? Math.round(scrollY / max * 100) : 0);
  };
  addEventListener('scroll', progress, {passive: true});
  progress();
  // The menu opens above the pill; a link, Esc or a click elsewhere closes it
  const setMenu = open => { menu.hidden = !open; pillBtn.setAttribute('aria-expanded', open); };
  pillBtn.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', e => { if (!pill.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); pillBtn.focus(); } });
  if ('IntersectionObserver' in window) {
    // A band near the top of the screen: whichever section crosses it is "current"
    const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setCurrent(e.target.id); }), {rootMargin: '-80px 0px -60% 0px'});
    navItems.forEach(([target]) => spy.observe(document.getElementById(target)));
    // The pill shows once the hero's bottom is above the middle of the screen, and hides again back up in the hero
    new IntersectionObserver(([e]) => { pill.classList.toggle('on', !e.isIntersecting); if (e.isIntersecting) setMenu(false); },
      {rootMargin: '-50% 0px 0px 0px'}).observe($('#top'));
  } else pill.classList.add('on');

  // The popup in the hero, opened on this feature's tab in the page's theme (reloaded when the page theme flips)
  const frame = $('#popupFrame'), full = $('#previewFullLink');
  const syncPreview = () => { const src = 'popup-demo.html?tab=' + E.tab + '&theme=' + theme(); frame.src = src; full.href = src; };
  syncPreview();
  document.addEventListener('themechange', syncPreview);
  // The screenshots are fixed captures of the same UI, so they follow the preview's theme, which demo.js
  // broadcasts on load and on every toggle (postMessage: works over file:// too)
  addEventListener('message', e => {
    const m = e.data;
    if (!m || m.source !== 'pocketQaPromoDemo' || m.type !== 'theme') return;
    popupTheme = m.theme === 'dark' ? 'dark' : 'light';
    document.querySelectorAll('.shot img[data-src-dark]').forEach(img => { img.src = popupTheme === 'dark' ? img.dataset.srcDark : img.dataset.srcLight; });
  });

  syncAttrs();
  new MutationObserver(() => { syncAttrs(); labelPill(); }).observe(d, {attributes: true, attributeFilter: ['lang']});
})();
