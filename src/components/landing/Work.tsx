'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Mono, Sq } from '@/components/alpwise';
import { Scene, useReducedMotion } from '@/components/motion';
import { d } from '@/components/motion/delay';
import { projectPlaceholders, projects } from '@/content/site';
import { SectionHead } from './SectionHead';

/** Lavori: indice dei progetti; col mouse un'anteprima segue il cursore. Senza progetti reali mostra segnaposto. */
export function Work() {
  const rows = projects.length
    ? projects.map((p) => ({ ...p, placeholder: false }))
    : projectPlaceholders.map((s, i) => ({ client: `Cliente ${i + 1}`, service: s, year: 'aaaa', href: '#contatti', placeholder: true }));
  const peek = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState<string | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!hover) return;
    const pos = { ...target.current };
    let raf = 0;
    const loop = () => {
      const k = reduced ? 1 : 0.18;
      pos.x += (target.current.x - pos.x) * k;
      pos.y += (target.current.y - pos.y) * k;
      if (peek.current) peek.current.style.translate = `${pos.x + 24}px ${pos.y - 100}px`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [hover, reduced]);

  return (
    <Scene as="section" id="lavori" className="al-section al-anchor">
      <div className="al-container">
        <SectionHead label="Lavori/" title="Progetti recenti" />
        <div className="al-work" data-m="stagger" style={d(350)}>
          {rows.map((r, i) => (
            <a key={r.client} className="al-work-row" href={r.href} style={{ '--i': i } as CSSProperties}
              onMouseEnter={(e) => { target.current = { x: e.clientX, y: e.clientY }; setHover(r.service); }}
              onMouseMove={(e) => { target.current = { x: e.clientX, y: e.clientY }; }}
              onMouseLeave={() => setHover(null)}>
              <span className={r.placeholder ? 'al-work-c al-ph' : 'al-work-c'}>{r.client}</span>
              <span className="al-work-s">{r.service}</span>
              <span className="al-work-y al-data">{r.year}</span>
              <Sq>→</Sq>
            </a>
          ))}
        </div>
      </div>
      <div ref={peek} className={hover ? 'al-work-peek al-stage is-on' : 'al-work-peek al-stage'} aria-hidden="true">
        <div className="al-hz" />
        <Mono>Case study/</Mono>
        <Mono>{hover ? `${hover}/` : ''}</Mono>
      </div>
    </Scene>
  );
}
