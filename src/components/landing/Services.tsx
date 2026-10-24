'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { Button, Mono, Sq, Tree } from '@/components/alpwise';
import { Scene } from '@/components/motion';
import { d } from '@/components/motion/delay';
import { services } from '@/content/site';
import { SectionHead } from './SectionHead';

/** Servizi a schede: a sinistra i tre mestieri, a destra il pannello del mestiere scelto. */
export function Services() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const n = (i + step + services.length) % services.length;
    setActive(n);
    tabs.current[n]?.focus();
  };
  const s = services[active];
  return (
    <Scene as="section" id="servizi" className="al-section al-anchor">
      <div className="al-container">
        <SectionHead label="Servizi/" title="Tre mestieri, un solo team" />
        <div className="al-svc" data-m="fade-up" style={d(450)}>
          <div className="al-svc-tabs" role="tablist" aria-label="Servizi" aria-orientation="vertical">
            {services.map((x, i) => (
              <button key={x.id} ref={(el) => { tabs.current[i] = el; }} className="al-svc-tab" role="tab" id={`svc-t-${x.id}`}
                aria-selected={i === active} aria-controls={`svc-p-${x.id}`} tabIndex={i === active ? 0 : -1}
                onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} onKeyDown={(e) => onKey(e, i)}>
                <Mono>{x.label}</Mono>
                <span className="al-svc-tab-t">{x.title}</span>
                <Sq>{i === active ? '−' : '+'}</Sq>
                <span className="al-svc-tab-bar" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div key={s.id} className="al-svc-panel" role="tabpanel" id={`svc-p-${s.id}`} aria-labelledby={`svc-t-${s.id}`}>
            <p className="al-svc-lead">{s.lead}</p>
            <p>{s.text}</p>
            <Tree items={s.points} />
            <div><Button href="/contatti" arrow>Richiedi un preventivo</Button></div>
          </div>
        </div>
      </div>
    </Scene>
  );
}
