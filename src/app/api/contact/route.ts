import { NextResponse } from 'next/server';

// Riceve il modulo contatti. Finché CONTACT_WEBHOOK_URL non è impostata risponde 503 e la pagina
// dice che l'invio non è ancora attivo, invece di fingere un invio riuscito.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !body?.privacy) {
    return NextResponse.json({ error: 'Dati mancanti o non validi.' }, { status: 400 });
  }
  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ error: 'Invio non configurato.' }, { status: 503 });
  const res = await fetch(hook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, service: String(body.service ?? ''), message: String(body.message ?? '').slice(0, 5000) }),
  });
  return res.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Invio non riuscito.' }, { status: 502 });
}
