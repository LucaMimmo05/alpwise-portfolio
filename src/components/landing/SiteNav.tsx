'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Button, cx, Mono, Navbar } from '@alpwisestudio/ui';
import { contact, nav } from '@/content/site';

const COMPACT = 80;    // oltre questa soglia la navbar diventa compatta
const FULL = 24;       // sotto questa torna piena (due soglie: niente sfarfallio al limite)
const MENU_ID = 'menu-mobile';

/**
 * Navbar sticky: piena in cima, compatta (staccata dai bordi e più stretta) appena scorri. Resta sempre visibile.
 * Su telefono il menu copre lo schermo sotto la barra: voci grandi che salgono una dopo l'altra, in fondo email e bottone.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);

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

  // Menu aperto: pagina ferma, Esc chiude, focus sulla prima voce e poi di nuovo sul bottone.
  useEffect(() => {
    if (!open) return;
    const btn = wrap.current?.querySelector<HTMLElement>('.al-nav-menu');
    document.body.style.overflow = 'hidden';
    menu.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const mq = matchMedia('(min-width: 768px)');
    const onWide = () => { if (mq.matches) setOpen(false); };
    addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => {
      document.body.style.overflow = '';
      removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
      btn?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <div ref={wrap} className={cx('al-sticky', !atTop && 'is-compact', open && 'is-menu-open')}>
      <Navbar items={nav} cta={{ href: '/contatti', label: 'Inizia un progetto' }} onMenu={() => setOpen((o) => !o)} menuOpen={open} menuId={MENU_ID} />
      <div ref={menu} id={MENU_ID} className={cx('al-mnav', open && 'is-open')} inert={!open} aria-hidden={!open}>
        <nav aria-label="Menu">
          <ul className="al-mnav-links">
            {nav.map((n, i) => (
              <li key={n.href}>
                <a href={n.href} onClick={close} style={{ '--i': i } as CSSProperties}>
                  <span>{n.label}</span>
                  {'hint' in n && n.hint && <Mono>{n.hint}</Mono>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="al-mnav-foot">
          {contact.email && <a className="al-mnav-mail" href={`mailto:${contact.email}`}>{contact.email}</a>}
          <Button size="lg" href="/contatti" onClick={close}>Inizia un progetto</Button>
        </div>
      </div>
    </div>
  );
}
