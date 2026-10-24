import { Columns, Scene, Scramble, Words } from '@/components/motion';
import { d } from '@/components/motion/delay';

/** Apertura della pagina Contatti: orizzonte che sorge con la griglia. Testo bianco solo nella metà alta. */
export function ContactHero() {
  return (
    <Scene as="header" className="al-page-hz al-stage">
      <div className="al-hz" data-m="sunrise" aria-hidden="true" />
      <Columns onHorizon delay={150} />
      <div className="al-container al-page-hz-body">
        <Scramble text="Contatti/" delay={200} />
        <h1 style={d(250)}><Words>Raccontaci il tuo progetto</Words></h1>
        <p data-m="fade-up" style={d(750)}>Due righe bastano. Ti rispondiamo entro un giorno lavorativo, per email o con una chiamata.</p>
      </div>
    </Scene>
  );
}
