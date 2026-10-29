/**
 * site.js — Shared page chrome for index.html and feature.html.
 * Same mechanics as the portfolio: language and theme switch (View Transitions where supported) and
 * evenOut(), so a switch never moves anything. On the index it also fits the popup mockup to one screen.
 * Load it last, after anything that renders content.
 */
(() => {
  const d = document.documentElement;
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // Switch with an animation where the View Transitions API exists: a crossfade for the language,
  // a circle growing from the theme button for the theme. Otherwise (or with reduced motion) switch at once.
  const animate = (type, update) => {
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return update();
    d.dataset.vt = type;
    const t = document.startViewTransition(update);
    t.ready.then(() => {
      if (type !== 'theme') return;
      const b = $('#theme-btn').getBoundingClientRect(), css = p => getComputedStyle(d, p);
      const g = css('::view-transition-group(theme-btn)').transform, box = css('::view-transition');
      const m = /matrix/.test(g) ? new DOMMatrix(g) : new DOMMatrix([1, 0, 0, 1, b.left, b.top]);
      const x = m.e + b.width / 2, y = m.f + b.height / 2;
      const w = parseFloat(box.width) || innerWidth, h = parseFloat(box.height) || innerHeight;
      const r = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
      d.animate({clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`]},
        {duration: 550, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)'});
    }).catch(() => {});   // animation skipped (e.g. clicked again mid-way): the switch still happens
    t.finished.finally(() => delete d.dataset.vt);
  };
  // Scroll anchoring is off while the text swaps: it would follow a line that re-centres and drag the page.
  const noAnchor = () => { d.style.overflowAnchor = 'none'; requestAnimationFrame(() => requestAnimationFrame(() => d.style.overflowAnchor = '')); };
  // Each element's size in whichever language makes it larger.
  const larger = (els, size) => {
    const v = els.map(size), lang = d.lang;
    d.lang = lang === 'vi' ? 'en' : 'vi'; els.forEach((e, i) => v[i] = Math.max(v[i], size(e, i))); d.lang = lang;
    return v;
  };

  // Index hero: the popup is the real 480×600 UI, so the mockup is scaled whole, never squeezed.
  // Phones: the popup alone fills the screen width. Wider: browser + popup shrink to fit one screen
  // (never below 60%), leaving room for the caption in whichever language is longer.
  const hero = $('.hero'), demo = $('#demo'), mockup = $('.mockup'), note = $('.demo-note'), anchor = $('.popup-anchor');
  const phone = matchMedia('(max-width: 560px)');
  const px = (el, p) => parseFloat(getComputedStyle(el)[p]) || 0;
  const fitMockup = () => {
    if (!mockup) return;
    mockup.removeAttribute('style'); anchor.removeAttribute('style');
    const browser = mockup.firstElementChild, wide = innerWidth >= 1024, box = wide ? hero : demo;
    const room = () => innerHeight - (wide ? 0 : $('.site-header').offsetHeight) - px(box, 'paddingTop') - px(box, 'paddingBottom')
      - larger([note], e => e.offsetHeight)[0] - px(note, 'marginTop');
    if (phone.matches) {
      const bar = browser.offsetHeight - anchor.parentElement.offsetHeight;
      const s = Math.min(1, (demo.clientWidth - 2) / 480, (room() - bar) / 600);
      anchor.style.setProperty('--popup-s', s);
      anchor.style.setProperty('--popup-h', 600 * s + 'px');
      mockup.style.width = 480 * s + 2 + 'px';
      return;
    }
    const w = browser.offsetWidth, h = browser.offsetHeight;
    for (let i = 0; i < 2; i++) {   // twice: a narrower mockup can wrap the caption onto another line
      const s = Math.min(wide ? 1 : demo.clientWidth / w, Math.max(.6, Math.min(1, room() / h)));
      mockup.style.setProperty('--s', s);
      mockup.style.width = w * s + 'px';
      mockup.style.height = h * s + 'px';
    }
  };

  // Same footprint in both languages, so a switch never moves anything: names, menu links, buttons and stats
  // keep the width of their wider language; cards, list rows and section heads the height of their taller
  // one; and each section the height of its taller language. A table is held row by row (a <tr> takes
  // height, not min-height), so it can still give up rows below.
  const sections = [...$$('main > section')];
  const labelled = [...$$('.brand, #lang-btn, .nav-links a, .btn, .stats li, .more-btn, .fnav a, .crumb a')];
  const rows = [...$$('.card:not(.table-wrap), .table-wrap tr, .perm, .faq summary, .faq details > p, .section-head, .hero-copy, ' +
    '.demo-note, footer, .checks > li, .stats li')];
  const hold = (e, h) => e.style[e.tagName === 'TR' ? 'height' : 'minHeight'] = h ? h + 'px' : '';
  // A row holding rows (the hero copy and its stats, the permissions card and its lines) is measured again once
  // they are held: a stat taller in Vietnamese and a title longer in English would otherwise add up past it
  const parents = rows.filter(r => rows.some(c => c !== r && r.contains(c)));
  const flip = () => d.lang = d.lang === 'vi' ? 'en' : 'vi';

  // Feature pages: a section still taller than the screen keeps the first items of its lists ([data-fit] = how
  // many always stay) and puts the rest behind its "Read more". Trimmed in one language, then in the other, so
  // the same items show in both.
  const fnav = $('.fnav');
  const fitting = sections.map(s => [s, s.querySelector('.collapsible'), [...s.querySelectorAll('[data-fit]')]]).filter(([, box, gs]) => box && gs.length);
  const shown = g => [...g.children].filter(c => !c.classList.contains('trim'));
  const step = g => { const cs = getComputedStyle(g); return cs.display === 'grid' ? cs.gridTemplateColumns.split(' ').length : 1; };
  // Screenshots and code samples are never cut: they get shorter instead, down to a floor (code then scrolls)
  const media = [...$$('.fmedia .shot img, .fmedia pre.code')];
  const floor = m => m.tagName === 'IMG' ? 140 : 100;
  const bottom = e => e.getBoundingClientRect().bottom;
  const trim = () => {
    let cut = false;
    const room = innerHeight - $('.site-header').offsetHeight - (fnav ? fnav.offsetHeight : 0);
    fitting.forEach(([sec, box, groups]) => {
      if (box.classList.contains('expanded')) return;
      const max = room - px(sec, 'paddingTop') - px(sec, 'paddingBottom') - px(sec, 'borderTopWidth') - px(sec, 'borderBottomWidth') + .5;
      const col = sec.querySelector('.fmedia'), mine = media.filter(m => sec.contains(m)), lead = sec.querySelector('.section-sub');
      for (let over; (over = box.getBoundingClientRect().height - max) > 0;) {
        // Whatever reaches lowest (the taller column, or the last block) gives way: the screenshots or code shrink
        // by what is over, or a list gives up its last items — a whole grid row at a time, so no card is ever
        // left alone in its row. Last of all, the lead sentence under the title waits behind "Read more" too.
        const lists = groups.filter(g => shown(g).length - step(g) >= +g.dataset.fit);
        const tall = mine.filter(m => m.getBoundingClientRect().height > floor(m) + 1);
        const lowest = [...(tall.length ? [col] : []), ...lists].sort((a, b) => bottom(b) - bottom(a))[0] ||
          (lead && !lead.classList.contains('trim') && lead);
        if (!lowest) break;
        if (lowest === lead) { lead.classList.add('trim'); box.classList.add('trimmed'); }
        else if (lowest === col) tall.forEach(m => m.style.maxHeight = Math.max(floor(m), m.getBoundingClientRect().height - over) + 'px');
        else {
          shown(lowest).slice(-step(lowest)).forEach(c => c.classList.add('trim'));
          box.classList.add('trimmed');   // shows the button, which takes room too
        }
        cut = true;
      }
    });
    return cut;
  };

  const evenOut = () => {
    noAnchor();
    labelled.forEach(e => e.style.minWidth = ''); rows.forEach(e => hold(e)); sections.forEach(e => e.style.minHeight = '');
    media.forEach(m => m.style.maxHeight = '');
    fitting.forEach(([sec, box]) => {   // an opened section keeps all its items and its "Show less"
      sec.querySelectorAll('.trim').forEach(e => e.classList.remove('trim'));
      box.classList.toggle('trimmed', box.classList.contains('expanded'));
    });
    fitMockup();
    // Widths first: a button held at its wider language can wrap its row, and that row's height counts below
    larger(labelled, e => e.getBoundingClientRect().width).forEach((w, i) => labelled[i].style.minWidth = w ? w + 'px' : '');
    // A "Read more" shows only once its section is trimmed, so its width is held after that
    const holdButtons = () => {
      const btns = labelled.filter(e => e.matches('.trimmed > .more-btn') && !e.style.minWidth);
      if (btns.length) larger(btns, e => e.getBoundingClientRect().width).forEach((w, i) => btns[i].style.minWidth = w + 'px');
    };
    if (fitting.length) { trim(); flip(); trim(); flip(); holdButtons(); }
    const holdRows = () => {
      larger(rows, e => e.getBoundingClientRect().height).forEach((h, i) => hold(rows[i], h));
      parents.forEach(p => hold(p));
      if (parents.length) larger(parents, e => e.getBoundingClientRect().height).forEach((h, i) => hold(parents[i], h));
    };
    holdRows();
    // Rows held at their taller language can add a few px that neither language had alone: trim on, hold again
    if (fitting.length && trim()) { holdButtons(); rows.forEach(e => hold(e)); holdRows(); }
    larger(sections, s => s.getBoundingClientRect().height).forEach((h, i) => sections[i].style.minHeight = h + 'px');
  };
  let evenQueued = false;
  const queueEven = () => { if (!evenQueued) { evenQueued = true; requestAnimationFrame(() => { evenQueued = false; evenOut(); }); } };
  evenOut();
  document.fonts.ready.then(evenOut);
  addEventListener('resize', queueEven);
  $('#lang-btn').addEventListener('click', () => animate('lang', () => { noAnchor(); d.lang = d.lang === 'vi' ? 'en' : 'vi'; save('lang', d.lang); syncTitle(); }));
  $('#theme-btn').addEventListener('click', () => animate('theme', () => {
    d.dataset.theme = d.dataset.theme === 'dark' ? 'light' : 'dark'; save('theme', d.dataset.theme);
    document.dispatchEvent(new Event('themechange'));   // the feature page reloads its popup preview in the new theme
  }));

  // Mobile menu
  const header = $('.site-header'), menuBtn = $('#menu-btn');
  const setMenu = open => { header.classList.toggle('nav-open', open); menuBtn.setAttribute('aria-expanded', open); };
  menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('nav-open')));
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // "Read more" toggles on small screens; an FAQ answer opening or closing changes its section's height too
  $$('.more-btn').forEach(b => b.addEventListener('click', () => {
    b.setAttribute('aria-expanded', b.closest('.collapsible').classList.toggle('expanded'));
    evenOut();
  }));
  $$('.faq details').forEach(x => x.addEventListener('toggle', evenOut));

  // "See the popup" with the popup already in full view (desktop hero): nothing would scroll, so nudge it instead
  const frame = $('#popupFrame');
  const pulse = () => frame && frame.animate([{transform: 'scale(.985)'}, {transform: 'none'}], {duration: 260, easing: 'ease-out'});
  if (demo) {
    $$('a[href="#demo"]').forEach(a => a.addEventListener('click', () => { const r = demo.getBoundingClientRect(); if (r.top >= 0 && r.bottom <= innerHeight) pulse(); }));
    $('#extBtn').addEventListener('click', () => { demo.scrollIntoView({behavior: 'smooth', block: 'center'}); pulse(); });
  }

  // Fade-in on scroll + highlight the current section in the menu (one link per numbered section; the hero has none)
  if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(el => el.classList.add('in')); return; }
  const reveal = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
  }), {threshold: 0.12});
  $$('.reveal').forEach(el => reveal.observe(el));
  const links = [...$$('.nav-links a')];
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
  }), {rootMargin: '-45% 0px -50% 0px'});
  $$('main > section[id]').forEach(s => spy.observe(s));
})();
