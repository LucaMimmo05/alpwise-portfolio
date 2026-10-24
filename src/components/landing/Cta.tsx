'use client';

import { useRef, useState, type CSSProperties } from 'react';
import { Button } from '@/components/alpwise';
import { Columns, RotatingWord, Scene, Scramble, Words } from '@/components/motion';
import { d } from '@/components/motion/delay';
import { contact, ctaWords } from '@/content/site';

/** CTA finale: orizzonte che sorge, staccata dai bordi, con la parola che cambia e l'email da copiare. */
export function Cta() {
  const addr = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState<'Copia' | 'Copiata' | 'Selezionata'>('Copia');
  const copy = async () => {
    if (!contact.email) return;
    try { await navigator.clipboard.writeText(contact.email); setCopied('Copiata'); }
    catch {
      const r = document.createRange(); r.selectNodeContents(addr.current!);
      getSelection()?.removeAllRanges(); getSelection()?.addRange(r); setCopied('Selezionata');
    }
    setTimeout(() => setCopied('Copia'), 2000);
  };
  return (
    <div className="al-cta-wrap">
      <Scene as="section" className="al-cta-night al-stage" aria-labelledby="cta-t">
        <div className="al-hz" data-m="sunrise" style={d(200)} aria-hidden="true" />
        <Columns onHorizon />
        <div className="al-container al-cta-grid">
          <Scramble text="Contatti/" />
          <h2 id="cta-t" style={{ '--delay': '200ms', '--hl-delay': '800ms' } as CSSProperties}>
            <Words>Iniziamo dal<br />tuo {<RotatingWord key="rot" words={ctaWords} every={2400} />}</Words>
          </h2>
          <div className="al-cta-side" data-m="fade-up" style={d(700)}>
            <p>Raccontaci cosa ti rallenta. Ti rispondiamo entro un giorno lavorativo.</p>
            <span className="al-cta-mail">
              <span ref={addr} className={contact.email ? undefined : 'al-ph'}>{contact.email ?? 'Email da inserire'}</span>
              {contact.email && <button type="button" onClick={copy}>{copied}</button>}
            </span>
            <div><Button href="/contatti" arrow>Inizia un progetto</Button></div>
          </div>
        </div>
      </Scene>
    </div>
  );
}
