import type { CSSProperties } from 'react';
import { Mono, Tree } from '@/components/alpwise';
import { Scene } from '@/components/motion';
import { d } from '@/components/motion/delay';
import { sectors } from '@/content/site';
import { SectionHead } from './SectionHead';

/** Per chi lavoriamo: tre tipi di cliente e cosa serve di solito. */
export function Sectors() {
  return (
    <Scene as="section" id="per-chi" className="al-section al-anchor">
      <div className="al-container">
        <SectionHead
          label="Per chi/"
          title="Lavoriamo con chi ha un'attività da far crescere"
          lead="Negozi, studi professionali, aziende B2B. Dimensioni diverse, stesso bisogno: strumenti chiari che fanno risparmiare tempo."
        />
        <div className="al-sectors" data-m="stagger" style={d(700)}>
          {sectors.map((s, i) => (
            <article key={s.label} className="al-sector" style={{ '--i': i } as CSSProperties}>
              <Mono>{s.label}</Mono>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="al-sector-fit"><Mono>Di solito serve/</Mono><Tree items={s.fit} /></div>
            </article>
          ))}
        </div>
      </div>
    </Scene>
  );
}
