import { NextResponse } from 'next/server';
import { contact } from '@/content/site';

// Riceve il modulo contatti e lo inoltra:
// - via email con Resend se è impostata RESEND_API_KEY (destinatario CONTACT_TO, altrimenti l'email dello studio);
// - altrimenti a CONTACT_WEBHOOK_URL, se impostata.
// Senza nessuna delle due risponde 503 e la pagina dice che l'invio non è ancora attivo, invece di fingere un invio riuscito.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  // Campo trappola compilato: è un bot. Rispondiamo ok senza inoltrare nulla.
  if (String(body?.company ?? '').trim()) return NextResponse.json({ ok: true });
  const name = String(body?.name ?? '').trim().slice(0, 200);
  const email = String(body?.email ?? '').trim().slice(0, 320);
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'Dati mancanti o non validi.' }, { status: 400 });
  }
  const service = String(body?.service ?? '').trim().slice(0, 200);
  const message = String(body?.message ?? '').trim().slice(0, 5000);

  try {
    const ok = process.env.RESEND_API_KEY ? await sendEmail({ name, email, service, message })
      : process.env.CONTACT_WEBHOOK_URL ? await sendWebhook(process.env.CONTACT_WEBHOOK_URL, { name, email, service, message })
      : null;
    if (ok === null) return NextResponse.json({ error: 'Invio non configurato.' }, { status: 503 });
    return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Invio non riuscito.' }, { status: 502 });
  } catch {
    return NextResponse.json({ error: 'Invio non riuscito.' }, { status: 502 });
  }
}

type ContactRequest = { name: string; email: string; service: string; message: string };

async function sendEmail({ name, email, service, message }: ContactRequest) {
  const to = process.env.CONTACT_TO ?? contact.email;
  if (!to) return null;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? 'Alpwise Studio <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Nuova richiesta dal sito: ${name.replace(/[\r\n]+/g, ' ')}`,
      text: [`Nome: ${name}`, `Email: ${email}`, `Servizio: ${service || '-'}`, '', message || '(nessun messaggio)'].join('\n'),
    }),
  });
  return res.ok;
}

async function sendWebhook(hook: string, data: ContactRequest) {
  const res = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  return res.ok;
}
