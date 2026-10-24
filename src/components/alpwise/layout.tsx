'use client';

import { useState } from 'react';
import { Button, cx, Icon, Logo, Sq } from './primitives';
import { Tree, type TreeItem } from './data';

export type NavItem = { label: string; href?: string; menu?: { title: string; items: TreeItem[] }[] };

export function Navbar({ items, cta, clear, openMenu, homeHref = '/', onMenu, className }: {
  items: NavItem[]; cta?: { href: string; label: string }; clear?: boolean; openMenu?: string; homeHref?: string; onMenu?: () => void; className?: string;
}) {
  const [open, setOpen] = useState<string | null>(openMenu ?? null);
  const active = items.find((i) => i.label === open && i.menu);
  return (
    <header className={cx('al-nav', clear && 'al-nav-clear', className)}>
      <a href={homeHref} aria-label="Alpwise Studio, home" style={{ display: 'inline-flex', color: 'inherit' }}><Logo size={32} lockup="nav" /></a>
      <nav aria-label="Principale">
        <ul className="al-nav-links">
          {items.map((it) => (
            <li key={it.label}>
              {it.menu ? (
                <button className="al-nav-item" aria-expanded={open === it.label} onClick={() => setOpen(open === it.label ? null : it.label)}>
                  {it.label}<Sq>{open === it.label ? '−' : '+'}</Sq>
                </button>
              ) : (
                <a className="al-nav-item" href={it.href}>{it.label}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {cta && <Button href={cta.href} size="sm" className="al-nav-cta">{cta.label}</Button>}
        <button className="al-icon-btn al-nav-menu" aria-label="Apri menu" onClick={onMenu}><Icon name="menu" /></button>
      </div>
      {active?.menu && <div className="al-mega">{active.menu.map((c) => <Tree key={c.title} title={c.title} items={c.items} />)}</div>}
    </header>
  );
}

export function Footer({ tagline, columns, legal, note }: { tagline?: string; columns: { title: string; links: TreeItem[] }[]; legal?: string; note?: string }) {
  return (
    <footer className="al-footer">
      <div className="al-footer-inner al-container">
        <div className="al-footer-grid">
          <div><p style={{ margin: 0, maxWidth: '34ch', color: 'var(--white)', fontSize: 18, lineHeight: '26px', fontWeight: 300 }}>{tagline}</p></div>
          {columns.map((c) => <Tree key={c.title} title={c.title} items={c.links} />)}
        </div>
        <span className="al-footer-word"><Logo size={100} /></span>
        <div className="al-footer-bottom"><span className="al-mono">{legal}</span><span className="al-mono">{note}</span></div>
      </div>
    </footer>
  );
}
