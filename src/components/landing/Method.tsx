import type { CSSProperties } from 'react';
import { Mono } from '@/components/alpwise';
import { Scene } from '@/components/motion';
import { steps } from '@/content/site';
import { SectionHead } from './SectionHead';

/** Metodo: linea del tempo che si traccia e accende i quattro passi in ordine. */
export function Method() {
  return (
    <Scene as="section" id="metodo" className="al-section al-anchor">
      <div className="al-container">
        <SectionHead label="Metodo/" title="Dal problema al software, in quattro passi" />
        <ol className="al-steps">
          {steps.map((s, i) => (
            <li key={s.label} className="al-step" style={{ '--i': i } as CSSProperties}>
              <span className="al-step-node" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <Mono>{s.label}</Mono>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Scene>
  );
}
