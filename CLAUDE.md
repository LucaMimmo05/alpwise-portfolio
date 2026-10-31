# Alpwise Studio — portfolio

Sito dello studio Alpwise Studio (Gallarate, VA): siti vetrina, software su misura, AI e automazioni per PMI.
Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 3.

## Design system: regole obbligatorie

Le regole del design system sono in `design-system/`; token, classi `al-*`, componenti e preset Tailwind arrivano dal pacchetto `@alpwisestudio/ui` (repo `alpwisestudio/ui`, GitHub Packages). Leggi `design-system/README.md` prima di creare o modificare UI.

- **Valori**: ogni colore, font, spaziatura e gradiente viene dalle variabili CSS di `@alpwisestudio/ui/tokens.css`. Mai valori esadecimali o px inventati nei componenti: usa le variabili CSS o le classi Tailwind del preset (`bg-bg`, `text-ink-muted`, `border-line`, `bg-primary text-primary-fg`, `font-mono text-mono-label`…).
- **Componenti**: usa quelli di `@alpwisestudio/ui` (`import { Button, Hero, Navbar } from '@alpwisestudio/ui'`) prima di scriverne di nuovi. I componenti riusabili vanno aggiunti nel pacchetto; quelli solo del sito restano in `src/components/landing` con classi in `src/styles/landing.css` oppure Tailwind sui token.
- **Import CSS** (in `src/app/layout.tsx`, in quest'ordine): `@alpwisestudio/ui/styles.css` (font, token, componenti, movimento), `landing.css`, poi `globals.css` con le direttive Tailwind.
- **Movimento**: usa `Scene`, `Words`, `Scramble`, `RotatingWord`, `ScrollRead` da `@/components/motion` e i token `motion-*`. Tutto visibile a riposo, `prefers-reduced-motion` rispettato. I componenti con hook hanno `'use client'`.
- **Tema**: `data-theme="dark"` (Scuro, default) o `data-theme="light"` (Chiaro) su `<html>`. Ogni schermata va verificata in entrambi.
- **Colore**: nero/bianco + grigi freddi. Azzurro `primary` (`sky-700`) solo per azioni e stati attivi, e sopra l'azzurro il testo è **sempre bianco** (`on-primary`). In Chiaro i link usano `--link` (sky-700), mai `sky-500` come testo.
- **Tipografia**: Host Grotesk, titoli a peso 400 (mai bold), tracking stretto. DM Mono solo per etichette (`Servizi/` con barra finale), elenchi ad albero (`└─`), date e dati.
- **Forme**: angoli vivi (`rounded-none`); 2px solo su bottoni e campi. Niente ombre tranne modali, toast e menu.
- **Gradiente "orizzonte"** (`al-horizon` / `bg-horizon`): solo hero, CTA finale e visual dei case study, sempre con la griglia `al-grid al-grid-on-horizon`. Testo bianco solo nella metà alta. Nessun altro motivo grafico (niente barre, blob, 3D, foto stock).
- **Logo**: il wordmark (`<Logo />` o `public/brand/wordmark-*.svg`); in navbar "Alpwise" senza "STUDIO" che, quando la barra si compatta, si riduce alla sola A (`<Logo lockup="nav" />`); nei formati piccoli solo la A (`<Logo lockup="mark" />`, come la favicon). Nero su chiaro, bianco su scuro e sull'orizzonte. Mai azzurro.
- **Accessibilità**: WCAG 2.2 AA in entrambi i temi; focus visibile (`--focus`, 2px, offset 2px); stati sempre scritti a parole. Dettagli in `design-system/accessibility.md`.
- **Testi**: italiano, del tu, frasi brevi, maiuscola solo a inizio frase, niente punti esclamativi né emoji. Vedi `design-system/voice.md`. Clienti, numeri e citazioni devono essere reali: non inventarli.

## Struttura

```
design-system/   README, tokens.json, voice, accessibility (fonte di verità)
public/brand/    wordmark nero e bianco (SVG)
src/styles/      landing.css (classi delle sezioni del sito)
src/components/motion/   motore di animazione (Scene, Words, Scramble…)
src/components/landing/  sezioni della home
src/content/site.ts      testi e contatti (null = da fornire)
src/app/                 layout, home, contatti, privacy, cookie, api/contact
design-explorations/     varianti HTML esplorate per ogni sezione
tailwind.config.ts       preset di @alpwisestudio/ui
.npmrc                   registry GitHub Packages per @alpwisestudio (token in GITHUB_TOKEN)
```

Token, classi `al-*`, componenti e font si cambiano nella repo `alpwisestudio/ui` (aggiorna anche `design-system/tokens.json`), si pubblica una nuova versione con Changesets e qui si aggiorna la dipendenza. Per l'installazione serve `GITHUB_TOKEN` con `read:packages`, anche su Vercel/CI.
