# Avvio

Progetto Next.js 16 (App Router) con Tailwind CSS 3. Regole del design system in `CLAUDE.md`.

```bash
npm install
npm run dev
```

La home è in `src/app/page.tsx`, le sezioni in `src/components/landing/`, testi e contatti in `src/content/site.ts`.

Il modulo contatti invia a `/api/contact`, che inoltra a `CONTACT_WEBHOOK_URL` (in `.env.local`). Finché la variabile manca, il modulo dice "Invio non ancora attivo" invece di fingere un invio.
