'use client';

import { useEffect, useState } from 'react';
import { Button, cx, Navbar } from '@/components/alpwise';
import { nav } from '@/content/site';

const COMPACT = 80;    // oltre questa soglia la navbar diventa compatta
const FULL = 24;       // sotto questa torna piena (due soglie: niente sfarfallio al limite)

/** Navbar sticky: piena in cima, compatta (staccata dai bordi e più stretta) appena scorri. Resta sempre visibile. */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = scrollY;
      setAtTop((top) => (top ? y < COMPACT : y < FULL));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className={cx('al-sticky', !atTop && 'is-compact')}>
      <Navbar items={nav} cta={{ href: '/contatti', label: 'Inizia un progetto' }} onMenu={() => setOpen((o) => !o)} />
      {open && (
        <div className="al-mnav" id="menu-mobile">
          <nav aria-label="Menu">
            <ul>{nav.map((n) => <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>)}</ul>
          </nav>
          <Button href="/contatti" onClick={() => setOpen(false)}>Inizia un progetto</Button>
        </div>
      )}
    </div>
  );
}
