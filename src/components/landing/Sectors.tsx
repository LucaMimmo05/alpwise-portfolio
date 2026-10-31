'use client';

import { useEffect, useRef, useState } from 'react';
import { cx, Mono, Tag } from '@alpwisestudio/ui';
import { Scene } from '@/components/motion';
import { sectors } from '@/content/site';
import { SectionHead } from './SectionHead';

/**
 * Per chi lavoriamo: a sinistra una colonna fissa con indice, titolo e tag del settore attivo;
 * a destra un blocco per settore. Il blocco che attraversa la metà dello schermo diventa attivo.
 */
export function Sectors() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.k)); }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  const s = sectors[active];
  return (
    <Scene as="section" id="per-chi" className="al-section al-anchor">
      <div className="al-container">
        <SectionHead
          label="Per chi/"
          title="Lavoriamo con chi ha un'attività da far crescere"
          lead="Negozi, studi professionali, aziende B2B. Dimensioni diverse, stesso bisogno: strumenti chiari che fanno risparmiare tempo."
        />
        <div className="al-sectors">
          <div className="al-sectors-left">
            <ol className="al-sectors-index" aria-label="Settori">
              {sectors.map((x, i) => (
                <li key={x.label} className={cx(i === active && 'is-on')}>
                  <a href={`#settore-${i}`} aria-current={i === active ? 'true' : undefined}>{x.label}</a>
                </li>
              ))}
            </ol>
            <div key={active} className="al-sectors-active" aria-hidden="true">
              <h3>{s.title}</h3>
              <div className="al-sectors-tags">{s.fit.map((f) => <Tag key={f}>{f}</Tag>)}</div>
            </div>
          </div>
          <div className="al-sectors-right">
            {sectors.map((x, i) => (
              <article key={x.label} id={`settore-${i}`} data-k={i} ref={(el) => { blocks.current[i] = el; }}
                className={cx('al-sector-block', i === active && 'is-on')} aria-labelledby={`settore-${i}-t`}>
                <Mono>{x.label}</Mono>
                <h3 id={`settore-${i}-t`} className="sr-only">{x.title}</h3>
                <blockquote>“{x.problem}”</blockquote>
                <p>{x.text}</p>
                <div className="al-sectors-tags al-sector-block-tags">{x.fit.map((f) => <Tag key={f}>{f}</Tag>)}</div>
                <a className="al-link" href="/contatti">└─ Parliamone</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  );
}
