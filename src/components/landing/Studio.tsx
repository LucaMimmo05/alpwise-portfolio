import { Button } from '@alpwisestudio/ui';
import { Scene, Scramble, ScrollRead } from '@/components/motion';
import { d } from '@/components/motion/delay';

const TEXT = 'Siamo tre sviluppatori a Gallarate, ai piedi delle Prealpi varesine. Costruiamo siti, software e automazioni per le PMI. Niente intermediari: dalla prima chiamata alla messa online parli con chi scrive il codice.';

/** Studio: una frase grande che si accende mentre scorri. */
export function Studio() {
  return (
    <Scene as="section" id="studio" className="al-section al-anchor" aria-labelledby="studio-t">
      <div className="al-container">
        <div className="al-head al-head-flush">
          <Scramble text="Studio/" />
          <h2 id="studio-t" className="sr-only">Chi siamo</h2>
          <ScrollRead text={TEXT} className="al-read" />
        </div>
        <div className="al-read-foot">
          <div data-m="fade-up" style={d(300)}><Button variant="outline" href="#metodo" arrow>Come lavoriamo</Button></div>
        </div>
      </div>
    </Scene>
  );
}
