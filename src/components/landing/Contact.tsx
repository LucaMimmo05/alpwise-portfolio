'use client';

import { useState, type FormEvent } from 'react';
import { Button, Field, Input, Mono, Toast } from '@alpwisestudio/ui';
import { Scene } from '@/components/motion';
import { contact, features } from '@/content/site';

type Errors = Partial<Record<'name' | 'email', string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'off';

/**
 * Pagina Contatti, sotto l'apertura: recapiti a sinistra, a destra il modulo (invia a /api/contact)
 * oppure, finché `features.contactForm` è spento, un riquadro con l'email.
 */
export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  // Solo i recapiti che abbiamo davvero: niente segnaposto sul sito pubblicato.
  const all: [string, string | null][] = [['Email', contact.email], ['Telefono', contact.phone], ['Sede', contact.address], ['Risposta', contact.reply]];
  const rows = all.filter((r): r is [string, string] => !!r[1]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(data.get('name') ?? '').trim()) next.name = 'Scrivi il tuo nome.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.get('email') ?? ''))) next.email = 'Manca la parte dopo la @, es. mario@azienda.it';
    setErrors(next);
    if (Object.keys(next).length) { e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(data)) });
      setStatus(res.ok ? 'sent' : res.status === 503 ? 'off' : 'error');
    } catch { setStatus('error'); }
  }

  return (
    <Scene as="section" id="contatti" className="al-section al-anchor">
      <div className="al-container al-contact">
        <div className="al-contact-info">
          <Mono style={{ color: 'var(--text-subtle)' }}>Recapiti/</Mono>
          <dl className="al-spec">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{k === 'Email' ? <a className="al-contact-mail" href={`mailto:${v}`}>{v}</a> : v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="al-contact-form">
          {!features.contactForm && contact.email ? (
            <div className="al-contact-direct">
              <Mono>Scrivici/</Mono>
              <a className="al-contact-direct-mail" href={`mailto:${contact.email}`}>{contact.email}</a>
              <p>Raccontaci in due righe cosa fai e cosa ti rallenta. Ti rispondiamo entro un giorno lavorativo.</p>
              <div><Button href={`mailto:${contact.email}`} arrow>Scrivi una email</Button></div>
            </div>
          ) : status === 'sent' ? (
            <Toast tone="success" title="Messaggio inviato">Ti rispondiamo entro un giorno lavorativo.</Toast>
          ) : (
            <form className="al-form" onSubmit={submit} noValidate>
              <div className="al-form-row">
                <Field label="Nome" required error={errors.name}><Input name="name" autoComplete="name" placeholder="Mario Rossi" /></Field>
                <Field label="Email" required error={errors.email}><Input name="email" type="email" autoComplete="email" placeholder="mario@azienda.it" /></Field>
              </div>
              <Field label="Di cosa hai bisogno?"><Input as="select" name="service" options={['Sito vetrina', 'Software o SaaS su misura', 'AI e automazioni', 'Non lo so ancora']} /></Field>
              <Field label="Il progetto in due righe" hint="Obiettivo e tempi bastano."><Input as="textarea" name="message" /></Field>
              {status === 'error' && <Toast tone="danger" title="Invio non riuscito">Controlla la connessione e riprova.</Toast>}
              {status === 'off' && <Toast tone="warning" title="Invio non ancora attivo">Il modulo non è ancora collegato. Riprova più tardi.</Toast>}
              <div><Button type="submit" arrow loading={status === 'sending'}>{status === 'sending' ? 'Invio in corso' : 'Invia richiesta'}</Button></div>
            </form>
          )}
        </div>
      </div>
    </Scene>
  );
}
