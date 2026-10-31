import type { CSSProperties } from 'react';
import { Fragment } from 'react';
import { Button } from '@alpwisestudio/ui';
import { Columns, RotatingWord, Scene, Scramble, Words } from '@/components/motion';
import { d } from '@/components/motion/delay';
import { contact, features, sectorWords } from '@/content/site';

const SERVICES = ['Siti vetrina', 'Software su misura', 'AI e automazioni'];

/** Hero centrata su fondo nero: griglia a 12 colonne, parola che cambia, bagliore dell'orizzonte in basso. Uguale nei due temi. */
export function Hero() {
  return (
    <Scene as="section" className="al-hero-c al-stage" aria-label="Introduzione">
      <Columns onHorizon />
      <div className="al-glow" data-m="glow" aria-hidden="true" />
      <div className="al-hero-c-body">
        <Scramble text={`${contact.coords}/ ${contact.address}`} delay={200} className="al-hero-c-kicker" />
        <h1 style={{ '--delay': '250ms', '--hl-delay': '850ms' } as CSSProperties}>
          <Words>Software su misura per<br />{<RotatingWord key="rot" words={sectorWords} />}</Words>
        </h1>
        <p className="al-hero-c-lead" data-m="fade-up" style={d(800)}>
          Siti vetrina, software su misura, AI e automazioni. Tre sviluppatori ai piedi delle Prealpi, un solo interlocutore.
        </p>
        <div className="al-hero-c-actions" data-m="fade-up" style={d(950)}>
          <Button size="lg" href="/contatti">Inizia un progetto</Button>
          {features.work
            ? <Button size="lg" variant="outline" href="#lavori" className="al-btn-on-dark">Guarda i lavori</Button>
            : <Button size="lg" variant="outline" href="#servizi" className="al-btn-on-dark">Scopri i servizi</Button>}
        </div>
        <p className="al-hero-c-services" data-m="fade" style={d(1200)}>
          {SERVICES.map((s, i) => (
            <Fragment key={s}>
              {i > 0 && <span aria-hidden="true">•</span>}
              <Scramble text={s} delay={1300 + i * 120} />
            </Fragment>
          ))}
        </p>
      </div>
    </Scene>
  );
}
