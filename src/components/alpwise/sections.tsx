'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Button, Chip, cx, Mono, Sq, type IconName } from './primitives';
import { Tree } from './data';
import { Checkbox, Field, Input } from './form';
import { Toast } from './feedback';

type Link = { href: string; label: string };

/** Section heading: mono label in columns 1–3, title from column 4. */
export function Head({ label, icon, title, lead }: { label?: string; icon?: IconName; title?: ReactNode; lead?: ReactNode }) {
  return (
    <div className="al-head">
      <Mono>{label}</Mono>
      <h2>{icon && <Chip icon={icon} />}{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

/** Home opener: the horizon gradient with the 12-column grid. White text stays in the upper half. */
export function Hero({ nav, title, lead, primary, secondary, meta, className }: {
  nav?: ReactNode; title: ReactNode; lead?: ReactNode; primary?: Link; secondary?: Link; meta?: string[]; className?: string;
}) {
  return (
    <section className={cx('al-hero al-horizon al-grid al-grid-on-horizon', className)}>
      {nav}
      <div className="al-hero-body">
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
        <div className="al-hero-actions">
          {primary && <Button size="lg" href={primary.href}>{primary.label}</Button>}
          {secondary && <Button size="lg" variant="light" href={secondary.href}>{secondary.label}</Button>}
        </div>
      </div>
      {meta && <div className="al-hero-foot">{meta.map((m) => <Mono key={m}>{m}</Mono>)}</div>}
    </section>
  );
}

export type Service = { label: string; title: string; text: string; points?: string[] };
export function Services({ items, ...head }: { label?: string; icon?: IconName; title?: ReactNode; lead?: ReactNode; items: Service[] }) {
  return (
    <div>
      {head.title && <Head {...head} />}
      <div className="al-services">
        {items.map((s) => (
          <article key={s.title} className="al-service">
            <Mono>{s.label}</Mono>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            {s.points ? <Tree items={s.points} className="al-svc-tree" /> : <span />}
          </article>
        ))}
      </div>
    </div>
  );
}

export function CaseStudy({ kind = 'Case study/', year, client, title, summary, spec, href, linkLabel = 'Leggi il case study', visual }: {
  kind?: string; year?: string; client: string; title: string; summary: string; spec?: { label: string; value: ReactNode }[]; href?: string; linkLabel?: string;
  /** Optional real screenshot; replaces the horizon. */
  visual?: ReactNode;
}) {
  return (
    <article className="al-case">
      <div className={cx('al-case-vis', !visual && 'al-horizon al-grid al-grid-on-horizon')}>
        {visual ?? <div style={{ display: 'flex', justifyContent: 'space-between' }}><Mono>{kind}</Mono><Mono>{year}</Mono></div>}
      </div>
      <div className="al-case-body">
        <Mono>{client}</Mono>
        <h3>{title}</h3>
        <p>{summary}</p>
        {spec && <dl className="al-spec">{spec.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>}
        {href && <a className="al-link" href={href}>└─ {linkLabel}</a>}
      </div>
    </article>
  );
}

export function Testimonial({ label = 'Clienti/', quote, name, role, company }: { label?: string; quote: string; name: string; role: string; company?: string }) {
  return (
    <figure className="al-quote">
      <Mono>{label}</Mono>
      <blockquote>{quote}</blockquote>
      <figcaption><Sq>·</Sq><b>{name}</b><span className="al-mono-sm">{role}{company ? `, ${company}` : ''}</span></figcaption>
    </figure>
  );
}

export function CTA({ title, text, action, secondary }: { title: ReactNode; text?: ReactNode; action?: Link; secondary?: Link }) {
  return (
    <section className="al-cta al-horizon al-grid al-grid-on-horizon">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      <div className="al-hero-actions">
        {action && <Button size="lg" href={action.href}>{action.label}</Button>}
        {secondary && <Button size="lg" variant="light" href={secondary.href}>{secondary.label}</Button>}
      </div>
    </section>
  );
}

export function Contact({ label = 'Contatti/', title, lead, email, phone, address, hours, submitLabel = 'Invia richiesta', onSubmit }: {
  label?: string; title: ReactNode; lead?: ReactNode; email?: string; phone?: string; address?: string; hours?: string; submitLabel?: string;
  onSubmit?: (data: FormData) => void | Promise<void>;
}) {
  const [sent, setSent] = useState(false);
  const rows = [['Email', email], ['Telefono', phone], ['Sede', address], ['Risposta', hours]].filter((r): r is [string, string] => !!r[1]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit?.(new FormData(e.currentTarget));
    setSent(true);
  }
  return (
    <div className="al-contact">
      <div className="al-contact-info">
        <Mono style={{ color: 'var(--text-subtle)' }}>{label}</Mono>
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
        <dl className="al-spec">{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div>
      <div className="al-contact-form">
        {sent ? (
          <Toast tone="success" title="Messaggio inviato">Ti rispondiamo entro un giorno lavorativo.</Toast>
        ) : (
          <form className="al-form" onSubmit={submit}>
            <div className="al-form-row">
              <Field label="Nome" required><Input name="name" autoComplete="name" placeholder="Mario Rossi" /></Field>
              <Field label="Email" required><Input name="email" type="email" autoComplete="email" placeholder="mario@azienda.it" /></Field>
            </div>
            <Field label="Di cosa hai bisogno?"><Input as="select" name="service" options={['Sito vetrina', 'Software o SaaS su misura', 'AI e automazioni', 'Non lo so ancora']} /></Field>
            <Field label="Il progetto in due righe" hint="Obiettivo e tempi bastano."><Input as="textarea" name="message" /></Field>
            <Checkbox required name="privacy">Ho letto l’informativa privacy.</Checkbox>
            <div><Button type="submit" arrow>{submitLabel}</Button></div>
          </form>
        )}
      </div>
    </div>
  );
}
