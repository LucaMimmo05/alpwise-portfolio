'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/alpwise';
import { Columns, Scene, Scramble, Words } from '@/components/motion';
import { d } from '@/components/motion/delay';
import { contact } from '@/content/site';

type CopyState = 'idle' | 'copied' | 'manual';

/**
 * CTA finale: l'email in grande. Al passaggio si colora da sinistra a destra; al clic si copia negli appunti
 * e l'etichetta sopra diventa "Copiata/". Sotto, il tempo di risposta e un bottone verso Contatti.
 */
export function Cta() {
  const [state, setState] = useState<CopyState>('idle');
  const mailRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  if (!contact.email) return null;
  const email = contact.email;

  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      // Appunti non disponibili: selezioniamo il testo così si copia a mano.
      const r = document.createRange(); r.selectNodeContents(mailRef.current!);
      getSelection()?.removeAllRanges(); getSelection()?.addRange(r);
      setState('manual');
    }
    timer.current = setTimeout(() => setState('idle'), 2000);
  };

  const label = state === 'copied' ? 'Copiata/' : state === 'manual' ? 'Selezionata, copiala/' : 'Scrivici/';
  return (
    <div className="al-cta-wrap">
      <Scene as="section" className="al-cta-mail-box al-stage" aria-labelledby="cta-t">
        <Columns onHorizon />
        <div className="al-glow" data-m="glow" aria-hidden="true" />
        <Scramble text={label} duration={400} />
        <h2 id="cta-t" style={d(200)}>
          <Words>
            {<button key="mail" ref={mailRef} type="button" onClick={copy}
              className={state === 'idle' ? 'al-cta-mail-link' : 'al-cta-mail-link is-copied'}
              aria-describedby="cta-hint">{email}</button>}
          </Words>
        </h2>
        <span className="sr-only" aria-live="polite">{state === 'copied' ? 'Email copiata negli appunti.' : ''}</span>
        <div className="al-cta-mail-foot" data-m="fade-up" style={d(700)}>
          <p id="cta-hint">Clicca sull’email per copiarla. Ti rispondiamo entro un giorno lavorativo.</p>
          <Button size="sm" href="/contatti" arrow>Contatti</Button>
        </div>
      </Scene>
    </div>
  );
}
