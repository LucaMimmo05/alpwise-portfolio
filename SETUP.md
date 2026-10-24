# Avvio

Progetto Next.js 16 (App Router) con Tailwind CSS 3. Regole del design system in `CLAUDE.md`.

```bash
npm install
npm run dev
```

La home è in `src/app/page.tsx`, le sezioni in `src/components/landing/`, testi e contatti in `src/content/site.ts`.

Il modulo contatti invia a `/api/contact`, che inoltra a `CONTACT_WEBHOOK_URL` (in `.env.local`). Finché la variabile manca, il modulo dice "Invio non ancora attivo" invece di fingere un invio.

## SEO e GEO

Il dominio pubblico viene da `NEXT_PUBLIC_SITE_URL` (es. `https://alpwise.it`, senza barra finale). Su Vercel, se manca, si usa il dominio di produzione del progetto. Serve a canonical, `sitemap.xml`, `robots.txt`, Open Graph e dati strutturati.

- `src/app/sitemap.ts`: elenco delle pagine pubbliche (aggiungi qui le nuove).
- `src/app/robots.ts`: motori di ricerca e assistenti AI ammessi, `/api/` escluso.
- `src/app/llms.txt/route.ts`: riassunto del sito per gli assistenti AI, generato da `src/content/site.ts`.
- `src/components/seo/JsonLd.tsx`: dati strutturati schema.org (studio, servizi, pagine). Email, telefono e P.IVA compaiono solo quando sono compilati in `site.ts`.
- `src/app/opengraph-image.tsx`: anteprima social 1200×630, generata in build con i font in `src/assets/fonts/`.
