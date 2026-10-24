'use client';

import { useEffect, useState } from 'react';
import { Button, cx, Navbar } from '@/components/alpwise';
import { nav } from '@/content/site';

const COMPACT = 80;    // oltre questa soglia la navbar diventa compatta
const FULL = 24;       // sotto questa torna piena (due soglie: niente sfarfallio al limite)
const REVEAL = 480;    // prima di questa soglia non si nasconde mai
const HIDE_AFTER = 160; // px di scroll continuo verso il basso prima di nascondersi
const SHOW_AFTER = 24;  // px verso l'alto per ricomparire

/** Navbar sticky: piena in cima, compatta quando scorri, nascosta scendendo, di nuovo visibile risalendo. */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = scrollY, dir = 0, travel = 0, raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY, dy = y - last;
      last = y;
      setAtTop((top) => (top ? y < COMPACT : y < FULL));
      if (dy) {
        const d = Math.sign(dy);
        if (d !== dir) { dir = d; travel = 0; }
        travel += Math.abs(dy);
      }
      if (y < REVEAL) setHidden(false);
      else if (dir > 0 && travel > HIDE_AFTER) setHidden(true);
      else if (dir < 0 && travel > SHOW_AFTER) setHidden(false);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className={cx('al-sticky', !atTop && 'is-compact', hidden && !open && 'is-hidden')} onFocusCapture={() => setHidden(false)}>
      <Navbar items={nav} cta={{ href: '/#contatti', label: 'Inizia un progetto' }} onMenu={() => setOpen((o) => !o)} />
      {open && (
        <div className="al-mnav" id="menu-mobile">
          <nav aria-label="Menu">
            <ul>{nav.map((n) => <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>)}</ul>
          </nav>
          <Button href="/#contatti" onClick={() => setOpen(false)}>Inizia un progetto</Button>
        </div>
      )}
    </div>
  );
}
