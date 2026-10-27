# Avvio

Progetto Next.js 16 (App Router) con Tailwind CSS 3. Regole del design system in `CLAUDE.md`.

```bash
npm install
npm run dev
```

La home è in `src/app/page.tsx`, le sezioni in `src/components/landing/`, testi e contatti in `src/content/site.ts`.

Il modulo contatti invia a `/api/contact`, che inoltra la richiesta per email con [Resend](https://resend.com). Variabili (in `.env.local` e su Vercel):

- `RESEND_API_KEY`: chiave API di Resend (obbligatoria per l'invio email).
- `CONTACT_TO`: indirizzo che riceve le richieste. Se manca, si usa l'email in `src/content/site.ts`.
- `CONTACT_FROM`: mittente, es. `Alpwise Studio <sito@alpwise.it>`, su un dominio verificato in Resend. Se manca, si usa `onboarding@resend.dev`, che consegna solo all'email dell'account Resend.

In alternativa a Resend si può impostare `CONTACT_WEBHOOK_URL` (riceve un POST JSON con `name`, `email`, `service`, `message`). Se non c'è né l'una né l'altra, il modulo dice "Invio non ancora attivo" invece di fingere un invio. La risposta all'email ricevuta va direttamente a chi ha scritto (`reply_to`).

## SEO e GEO

Il dominio pubblico viene da `NEXT_PUBLIC_SITE_URL` (es. `https://alpwise.it`, senza barra finale). Su Vercel, se manca, si usa il dominio di produzione del progetto. Serve a canonical, `sitemap.xml`, `robots.txt`, Open Graph e dati strutturati.

- `src/app/sitemap.ts`: elenco delle pagine pubbliche (aggiungi qui le nuove).
- `src/app/robots.ts`: motori di ricerca e assistenti AI ammessi, `/api/` escluso.
- `src/app/llms.txt/route.ts`: riassunto del sito per gli assistenti AI, generato da `src/content/site.ts`.
- `src/components/seo/JsonLd.tsx`: dati strutturati schema.org (studio, servizi, pagine). Email, telefono e P.IVA compaiono solo quando sono compilati in `site.ts`.
- `src/app/opengraph-image.tsx`: anteprima social 1200×630, generata in build con i font in `src/assets/fonts/`.

### Antispam del modulo

Nessun captcha: i controlli sono in `src/app/api/contact/spam.ts` e scattano tutti lato server.

- Campo trappola nascosto (`company`): se è compilato, è un bot.
- Tempo di compilazione: invii arrivati meno di 3 secondi dopo l'apertura del modulo, o più di un giorno dopo, vengono scartati.
- Origine: si accettano solo richieste partite dal sito stesso (intestazione `Origin`).
- Limite per IP: 5 richieste ogni 10 minuti, poi risposta 429 e il modulo lo dice. Il conteggio è in memoria, per singola istanza del server.
- Contenuto: niente link o tag nel nome, al massimo 3 link nel messaggio, parole tipiche dello spam scartate. Corpo della richiesta oltre 20 KB rifiutato.

Le richieste riconosciute come bot ricevono comunque una risposta di successo, così chi le invia non capisce quale controllo le ha fermate.
