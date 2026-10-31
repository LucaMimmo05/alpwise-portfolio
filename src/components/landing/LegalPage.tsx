import type { ReactNode } from 'react';
import { Tag, Tree } from '@alpwisestudio/ui';
import { Scene, Words } from '@/components/motion';
import { d } from '@/components/motion/delay';
import { legal } from '@/content/site';
import { SiteFooter } from './SiteFooter';
import { SiteNav } from './SiteNav';

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Valore reale o, se manca, segnaposto tratteggiato con il nome del dato da fornire. */
export function Val({ v, ph }: { v: string | null | undefined; ph: string }) {
  return v ? <>{v}</> : <span className="al-ph">[{ph}]</span>;
}

/** Pagina legale: indice mono a sinistra (colonne 1–3), testo dalla colonna 4. */
export function LegalPage({ label, title, lead, sections }: { label: string; title: string; lead: ReactNode; sections: LegalSection[] }) {
  return (
    <>
      <SiteNav />
      <main>
        <Scene as="div" className="al-section">
          <div className="al-container">
            <div className="al-head">
              <span className="al-mono">{label}</span>
              <h1 className="al-legal-title" style={d(100)}><Words>{title}</Words></h1>
              <div className="al-legal-intro" data-m="fade-up" style={d(400)}>
                <p>{lead}</p>
                <div className="al-legal-meta">
                  <span className="al-mono">Ultimo aggiornamento/ <Val v={legal.updated} ph="gg.mm.aaaa" /></span>
                  <Tag tone="warning" dot>Bozza da far verificare a un consulente</Tag>
                </div>
              </div>
            </div>
            <div className="al-legal">
              <nav className="al-legal-toc" aria-label="Indice della pagina">
                <Tree title="Indice/" items={sections.map((s) => ({ label: s.title, href: `#${s.id}` }))} />
              </nav>
              <div className="al-legal-body">
                {sections.map((s) => (
                  <section key={s.id} aria-labelledby={s.id}>
                    <h2 id={s.id}>{s.title}</h2>
                    {s.body}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Scene>
      </main>
      <SiteFooter />
    </>
  );
}
