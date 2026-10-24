/* Barra varianti, tema e "Riproduci". */
(() => {
  const html = document.documentElement;
  if (!html.dataset.theme) html.dataset.theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const variants = [...document.querySelectorAll('.x-variant')];
  const tabs = document.getElementById('x-tabs');
  let cur = -1;
  variants.forEach((v, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', v.id);
    b.textContent = String.fromCharCode(65 + i) + ' · ' + v.dataset.name;
    b.onclick = () => show(i, true);
    tabs.append(b);
  });
  function show(i, user) {
    if (cur >= 0) M.stopAll(variants[cur]);
    variants.forEach((v, k) => { v.hidden = k !== i; });
    [...tabs.children].forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    cur = i;
    if (user) scrollTo({ top: 0 });
    try { localStorage.setItem('x-variant:' + document.title, String(i)); } catch (e) {}
    requestAnimationFrame(() => M.start(variants[i]));
  }
  const themeBtns = [...document.querySelectorAll('[data-theme-set]')];
  const syncTheme = () => themeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.themeSet === html.dataset.theme)));
  themeBtns.forEach((b) => (b.onclick = () => { html.dataset.theme = b.dataset.themeSet; }));
  new MutationObserver(syncTheme).observe(html, { attributes: true, attributeFilter: ['data-theme'] });
  syncTheme();
  document.getElementById('x-replay').onclick = () => { scrollTo({ top: 0 }); requestAnimationFrame(() => M.start(variants[cur])); };
  let first = variants.findIndex((v) => '#' + v.id === location.hash);
  if (first < 0) { try { first = +(localStorage.getItem('x-variant:' + document.title) || 0); } catch (e) { first = 0; } }
  show(Math.min(Math.max(first, 0), variants.length - 1), false);
})();
