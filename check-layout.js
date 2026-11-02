/**
 * check-layout.js — Dev check for index.html and feature.html. Not linked from any page; load it into one:
 *   await new Promise(r => { const s = document.createElement('script'); s.src = 'check-layout.js?' + Date.now(); s.onload = r; document.head.append(s); });
 *   await checkLayout()
 * Reports for the current viewport (reload after resizing): sections taller than one screen,
 * anything that moves or resizes when the language switches, horizontal scroll, and — in both languages —
 * lines that end in a hyphen and one-word last lines. Empty arrays = pass.
 * Feature pages also: checkShape() (EN/VI complete) and hiddenByFit() (what the fit to one screen hides).
 */
// Feature pages: per section, the items site.js put behind "Show the rest" and how many screenshots or code
// samples it shrank to fit one screen — as fitted for the current viewport. hiddenByFit() → [] when nothing is.
window.hiddenByFit = () => {
  // A table row is named by its first cell (the others start with their column's name on phones)
  const en = e => { if (e.cells) e = e.cells[0]; return (e.querySelector('[lang="en"]') || e).textContent.trim().replace(/\s+/g, ' '); };
  return [...document.querySelectorAll('main > section')].map(s => ({
    section: en(s.querySelector('h1, h2')),
    hidden: [...s.querySelectorAll('.trim')].map(e => en(e).slice(0, 60)),
    shrunk: [...s.querySelectorAll('.fmedia img, .fmedia pre')].filter(m => m.style.maxHeight).length
  })).filter(r => r.hidden.length || r.shrunk);
};
// Feature pages: every translatable English string has a Vietnamese one at the same path (and nothing extra).
// In a feature page: checkShape() → [] when complete.
window.checkShape = (EN = window.FEATURES_EN, VI = window.FEATURES_VI) => {
  const skip = ['tab', 'src', 'srcDark', 'code', 'imagesLayout', 'summary'];   // English-only, or not shown
  const out = [];
  const walk = (e, v, path) => {
    if (typeof e === 'string') { if (typeof v !== 'string' || !v.trim()) out.push('missing ' + path); return; }
    if (Array.isArray(e)) {
      if (!Array.isArray(v)) { out.push('missing ' + path); return; }
      if (v.length !== e.length) out.push(`length ${path}: ${e.length} EN vs ${v.length} VI`);
      e.forEach((x, i) => walk(x, v[i], path + '[' + i + ']'));
      return;
    }
    if (!v || typeof v !== 'object') { out.push('missing ' + path); return; }
    Object.keys(e).filter(k => !skip.includes(k)).forEach(k => walk(e[k], v[k], path + '.' + k));
    Object.keys(v).filter(k => !(k in e)).forEach(k => out.push('extra ' + path + '.' + k));
  };
  Object.keys(EN).forEach(id => walk(EN[id], VI[id], id));
  Object.keys(VI).filter(id => !(id in EN)).forEach(id => out.push('extra ' + id));
  return out;
};

// From any page of the site: every feature page (or `ids`) in a full-viewport iframe, fitted for this viewport,
// with checkShape(), checkLayout() and hiddenByFit() run in it. A page passes with only empty lists in its entry.
window.auditFeatures = async (ids = window.FEATURE_ORDER) => {
  const out = {};
  for (const id of ids) {
    const f = Object.assign(document.createElement('iframe'), { style: 'position:fixed;inset:0;width:100vw;height:100vh;border:0;z-index:99999' });
    document.body.append(f);
    await new Promise(r => { f.onload = r; f.src = 'feature.html?id=' + id + '&_=' + Date.now(); });
    const w = f.contentWindow;
    await w.document.fonts.ready;
    await new Promise(r => setTimeout(r, 1300));   // site.js fits the sections after the fonts and images
    await new Promise(r => { const s = w.document.createElement('script'); s.src = 'check-layout.js?' + Date.now(); s.onload = r; w.document.head.append(s); });
    const lay = await w.checkLayout(), lines = lay.lines;
    out[id] = {
      shape: w.checkShape(), overflow: lay.overflow, shift: lay.shift, hscroll: lay.hscroll ? [lay.hscroll] : [],
      lines: [...lines.en.hyphen, ...lines.en.orphan, ...lines.vi.hyphen, ...lines.vi.orphan],
      hidden: w.hiddenByFit().filter(x => x.section !== 'Explore other features').map(x => `${x.section}: ${x.hidden.length}${x.shrunk ? ' +' + x.shrunk + ' shrunk' : ''} ${x.hidden.map(h => h.slice(0, 40)).join(' / ')}`),
      brokenImages: [...w.document.querySelectorAll('.shot img')].filter(i => !i.naturalWidth).map(i => i.src)
    };
    f.remove();
  }
  return out;
};

window.checkLayout = async () => {
  const d = document.documentElement;
  const style = document.createElement('style');
  style.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; }';
  document.head.append(style);
  document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  await document.fonts.ready;

  const header = document.querySelector('.site-header').offsetHeight;
  const visible = e => e.getClientRects().length > 0;
  const name = e => (e.id ? '#' + e.id : e.tagName.toLowerCase() + '.' + [...e.classList].join('.')) +
    ' "' + e.textContent.trim().replace(/\s+/g, ' ').slice(0, 32) + '"';
  const flip = () => { d.style.overflowAnchor = 'none'; d.lang = d.lang === 'vi' ? 'en' : 'vi'; };

  // One section = one screen. Below 1024px the hero is two screens: its copy, then the popup. Feature pages: a
  // screen under the header and the "On this page" bar; a section opened with "Read more" may be taller.
  const overflow = [];
  const fnav = document.querySelector('.fnav'), bar = fnav ? fnav.offsetHeight : 0;
  document.querySelectorAll('main > section').forEach(s => {
    if (s.querySelector('.collapsible.expanded')) return;
    const hero = s.classList.contains('hero');
    const units = hero && !matchMedia('(min-width: 1024px)').matches ? [...s.querySelectorAll('.hero-copy, .hero-demo')] : [s];
    units.forEach(u => {
      const h = u.getBoundingClientRect().height, max = u === s && hero ? innerHeight : innerHeight - header - (hero ? 0 : bar);
      if (h > max + 1) overflow.push(name(u) + ' ' + Math.round(h) + ' > ' + Math.round(max));
    });
  });

  // Nothing may move or resize on a language switch. Frames (sections, cards, rows) must not move at all; what
  // sits inside a frame (buttons, links, stats) may re-centre vertically in it, but keeps its x, width and height.
  const frames = '.site-header, main > section, .card, .perm, .faq details, .section-head, .hero-copy, .mockup, .demo-note, footer';
  const tracked = [...document.querySelectorAll(frames + ', .brand, #lang-btn, #theme-btn, .nav-links a, .btn, .stats li, .more-btn, .fnav a')].filter(visible);
  const rect = e => { const r = e.getBoundingClientRect(); return [r.left + scrollX, r.top + scrollY, r.width, r.height]; };
  const before = tracked.map(rect);
  flip();
  const after = tracked.map(rect);
  flip();
  d.style.overflowAnchor = '';
  const shift = [];
  tracked.forEach((e, i) => {
    const delta = before[i].map((v, k) => Math.abs(v - after[i][k]));
    if (!e.matches(frames)) delta[1] = 0;
    if (Math.max(...delta) > .5) shift.push(name(e) + ' Δx,y,w,h ' + delta.map(v => Math.round(v * 10) / 10).join(','));
  });

  // Line endings: a break right after "-", and a last line holding a single word (a group joined with &nbsp;
  // counts as several words, as in the rules)
  const range = document.createRange();
  const rectOf = (node, from, to) => { range.setStart(node, from); range.setEnd(node, to); const rs = range.getClientRects(); return rs[rs.length - 1]; };
  const lineCheck = () => {
    const hyphen = [], orphan = [];
    // A stat's label is a line of its own under the number (one word is fine there), so it is checked alone
    const sel = 'h1, h2, h3, p, li, dt, dd, small, summary, td, th, figcaption, .stats li > span';
    const blocks = [...document.querySelectorAll(sel)].filter(b => visible(b) && !b.querySelector(sel) && !b.matches('.stats li'));
    blocks.forEach(b => {
      const words = [];
      const walk = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
      for (let n; (n = walk.nextNode());) {
        if (!n.parentElement || !visible(n.parentElement)) continue;
        const t = n.data;
        for (let i = t.indexOf('-'); i !== -1; i = t.indexOf('-', i + 1)) {
          if (i + 1 >= t.length) continue;
          const a = rectOf(n, i, i + 1), c = rectOf(n, i + 1, i + 2);
          if (a && c && c.top > a.top + a.height / 2) hyphen.push(name(b) + ' …' + t.slice(Math.max(0, i - 12), i + 1));
        }
        const re = /[^ \t\n\r ]+/g;
        for (let m; (m = re.exec(t));) {
          const r = rectOf(n, m.index, m.index + m[0].length);
          if (r && r.height) words.push({ w: m[0], mid: r.top + r.height / 2, h: r.height });
        }
      }
      if (words.length < 2) return;
      const last = words[words.length - 1];
      const onLast = words.filter(x => Math.abs(x.mid - last.mid) < last.h / 2);
      if (onLast.length === 1 && Math.abs(words[0].mid - last.mid) >= last.h / 2) orphan.push(name(b) + ' → "' + last.w + '"');
    });
    return { hyphen, orphan };
  };
  const lines = { [d.lang]: lineCheck() };
  flip(); lines[d.lang] = lineCheck(); flip();
  d.style.overflowAnchor = '';

  // The fixed header never adds page scroll, so check its own contents stay on screen (both languages)
  const headerOut = [];
  const edges = () => document.querySelectorAll('.site-header .nav > *, .nav-tools > *').forEach(e => {
    const r = e.getBoundingClientRect();
    if (visible(e) && (r.left < -.5 || r.right > d.clientWidth + .5)) headerOut.push(d.lang + ' ' + name(e) + ' ' + Math.round(r.left) + '…' + Math.round(r.right));
  });
  edges(); flip(); edges(); flip();
  d.style.overflowAnchor = '';

  const mockup = document.querySelector('.mockup');
  style.remove();
  return {
    viewport: innerWidth + '×' + innerHeight, lang: d.lang,
    mockupScale: mockup ? (mockup.style.getPropertyValue('--s') || document.querySelector('.popup-anchor').style.getPropertyValue('--popup-s') || '1') : undefined,
    overflow, shift, hscroll: d.scrollWidth > d.clientWidth ? d.scrollWidth + ' > ' + d.clientWidth : false, headerOut, lines
  };
};
