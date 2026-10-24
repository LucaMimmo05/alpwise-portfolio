/* Motore minimo: split di parole/caratteri, scene armate e avviate in vista, scramble, parole che ruotano. */
window.M = (() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => RM.matches;
  const hooks = [];
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·─';

  function wrapWord(node, i, mode) {
    if (mode === 'read') { const s = document.createElement('span'); s.className = 'm-r'; s.style.setProperty('--i', i); s.append(node); return s; }
    const o = document.createElement('span'); o.className = 'm-w';
    const w = document.createElement('span'); w.className = 'm-wi'; w.style.setProperty('--i', i);
    w.append(node); o.append(w); return o;
  }
  function split(root) {
    root.querySelectorAll('[data-split]').forEach((el) => {
      if (el.dataset.ready) return; el.dataset.ready = 1;
      const mode = el.dataset.split; let i = +(el.dataset.i0 || 0);
      if (mode === 'chars') {
        const t = el.textContent; el.setAttribute('aria-label', t); el.textContent = '';
        [...t].forEach((ch) => { const s = document.createElement('span'); s.className = 'm-c'; s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--i', i++); s.textContent = ch; el.append(s); });
        return;
      }
      const nodes = [...el.childNodes]; el.textContent = '';
      nodes.forEach((n) => {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach((t) => { if (!t) return; if (/^\s+$/.test(t)) el.append(' '); else el.append(wrapWord(document.createTextNode(t), i++, mode)); });
        } else if (n.nodeName === 'BR' || n.classList?.contains('sr-only')) el.append(n);
        else el.append(wrapWord(n, i++, mode));
      });
    });
    root.querySelectorAll('[data-m="stagger"]').forEach((el) => [...el.children].forEach((c, i) => c.style.setProperty('--i', i)));
    root.querySelectorAll('.m-cols').forEach((el) => { if (!el.children.length) for (let i = 0; i < 12; i++) { const c = document.createElement('i'); c.style.setProperty('--i', i); el.append(c); } });
  }

  function scramble(el) {
    const txt = el.dataset.text ?? (el.dataset.text = el.textContent);
    el.setAttribute('aria-label', txt);
    cancelAnimationFrame(el._raf);
    if (reduced()) { el.textContent = txt; return; }
    const delay = +(el.dataset.delay || 0), dur = +(el.dataset.dur || 650); let t0 = null;
    const tick = (t) => {
      if (t0 === null) t0 = t;
      const p = (t - t0 - delay) / dur;
      if (p < 0) { el.textContent = txt.replace(/\S/g, ' '); el._raf = requestAnimationFrame(tick); return; }
      const n = Math.floor(Math.min(p, 1) * txt.length);
      el.textContent = txt.slice(0, n) + txt.slice(n).replace(/\S/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]);
      if (p < 1) el._raf = requestAnimationFrame(tick); else el.textContent = txt;
    };
    el._raf = requestAnimationFrame(tick);
  }

  function rotate(el) {
    clearInterval(el._iv);
    const words = el.dataset.rotate.split('|'); let k = 0;
    const inner = el.querySelector('.rot') || el;
    inner.textContent = words[0];
    if (reduced()) return;
    el._iv = setInterval(() => {
      k = (k + 1) % words.length;
      const out = inner.animate([{ transform: 'none' }, { transform: 'translateY(-110%)' }], { duration: 380, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
      out.onfinish = () => { inner.textContent = words[k]; inner.animate([{ transform: 'translateY(110%)' }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.2,.7,0,1)', fill: 'forwards' }); };
    }, +(el.dataset.every || 2600));
  }

  function playScene(s) {
    s.classList.remove('armed'); s.classList.add('play');
    s.querySelectorAll('[data-scramble]').forEach(scramble);
    s.querySelectorAll('[data-rotate]').forEach(rotate);
    hooks.forEach((h) => s.matches(h.sel) && h.play?.(s));
  }
  function stopScene(s) {
    s.classList.remove('play', 'armed');
    s.querySelectorAll('[data-rotate]').forEach((el) => clearInterval(el._iv));
    hooks.forEach((h) => s.matches(h.sel) && h.stop?.(s));
  }

  let io;
  function start(root) {
    split(root);
    io?.disconnect();
    const scenes = [...root.querySelectorAll('[data-scene]')];
    scenes.forEach(stopScene);
    void root.offsetWidth; // riavvia le keyframe
    const vh = innerHeight;
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { playScene(e.target); io.unobserve(e.target); } }), { threshold: 0.18 });
    scenes.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) playScene(s);
      else { s.classList.add('armed'); io.observe(s); }
    });
  }
  function stopAll(root) { io?.disconnect(); root.querySelectorAll('[data-scene]').forEach(stopScene); }

  return { start, stopAll, on: (sel, h) => hooks.push({ sel, ...h }), reduced, scramble };
})();
