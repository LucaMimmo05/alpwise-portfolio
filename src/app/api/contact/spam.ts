// Controlli antispam del modulo contatti, senza servizi esterni. Ogni controllo da solo è aggirabile:
// insieme fermano quasi tutti i bot automatici senza chiedere nulla alle persone (niente captcha).

const MIN_FILL_MS = 3_000;            // nessuna persona compila nome, email e messaggio in meno di 3 secondi
const MAX_FILL_MS = 24 * 60 * 60_000; // pagina aperta da più di un giorno: modulo scaduto, va ricaricato
const MAX_LINKS = 3;
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;                   // richieste per IP ogni 10 minuti

export type Verdict = 'ok' | 'bot' | 'limit' | 'origin';

// Limite per IP in memoria: vale per singola istanza del server (su Vercel ogni istanza ha il suo),
// quindi è una protezione di base contro le raffiche, non un limite globale.
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) for (const [k, v] of hits) if (now - v[v.length - 1] > RATE_WINDOW_MS) hits.delete(k);
  return recent.length > RATE_MAX;
}

function clientIp(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

// Le richieste dal browser portano l'intestazione Origin: deve essere il nostro dominio.
function sameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === (req.headers.get('x-forwarded-host') ?? req.headers.get('host'));
  } catch {
    return false;
  }
}

const linkRe = /(https?:\/\/|www\.)\S+/gi;
const links = (s: string) => s.match(linkRe)?.length ?? 0;
const spamRe = /\b(viagra|cialis|casino|crypto ?invest|bitcoin|forex|loan|seo services?|backlinks?|porn)\b/i;

export function checkSpam(req: Request, f: { company: string; startedAt: number; name: string; message: string }): Verdict {
  if (!sameOrigin(req)) return 'origin';
  if (rateLimited(clientIp(req), Date.now())) return 'limit';
  if (f.company) return 'bot';                                   // campo trappola compilato
  const elapsed = Date.now() - f.startedAt;
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return 'bot';
  if (links(f.name) || /[<>]/.test(f.name)) return 'bot';  // un nome non contiene link o tag
  if (links(f.message) > MAX_LINKS) return 'bot';
  if (spamRe.test(f.name) || spamRe.test(f.message)) return 'bot';
  return 'ok';
}
