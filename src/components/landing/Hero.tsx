import type { CSSProperties } from 'react';
import { Button } from '@/components/alpwise';
import { Columns, RotatingWord, Scene, Scramble, Words } from '@/components/motion';
import { d } from '@/components/motion/delay';
import { contact, sectorWords } from '@/content/site';

/** Hero editoriale: titolo sul fondo del tema con la parola che cambia, orizzonte come fascia in basso. */
export function Hero() {
  return (
    <Scene as="section" className="al-hero-ed al-stage" aria-label="Introduzione">
      <Columns />
      <div className="al-hero-ed-body">
        <Scramble text={`${contact.coords}/ ${contact.address}`} delay={200} />
        <h1 style={{ '--delay': '250ms', '--hl-delay': '850ms' } as CSSProperties}>
          <Words>Software su misura per<br />{<RotatingWord key="rot" words={sectorWords} />}</Words>
        </h1>
        <p className="al-hero-ed-lead" data-m="fade-up" style={d(800)}>
          Siti vetrina, software su misura, AI e automazioni. Tre sviluppatori ai piedi delle Prealpi, un solo interlocutore.
        </p>
        <div className="al-hero-ed-actions" data-m="fade-up" style={d(950)}>
          <Button size="lg" href="#contatti">Inizia un progetto</Button>
          <Button size="lg" variant="outline" href="#lavori">Guarda i lavori</Button>
        </div>
      </div>
      <div className="al-hero-ed-band al-horizon al-grid al-grid-on-horizon" data-m="band" style={d(450)}>
        <div className="al-hero-foot">
          <Scramble text="Siti vetrina/" delay={1300} />
          <Scramble text="Software su misura/" delay={1420} />
          <Scramble text="AI e automazioni/" delay={1540} />
        </div>
      </div>
    </Scene>
  );
}
