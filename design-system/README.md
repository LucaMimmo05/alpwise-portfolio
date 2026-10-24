Alpwise Studio è uno studio digitale di tre sviluppatori a Gallarate, ai piedi delle Prealpi varesine: siti vetrina per attività locali, software B2B su misura, AI e automazioni per PMI. Il sistema è essenziale e tecnico: nero, bianco, un azzurro di marca, grottesco a peso regolare e dettagli in monospaziato. L'unico momento di colore pieno è **l'orizzonte**, la luce dell'alba in quota: un gradiente lineare, senza arco né bagliore. Tema principale **Scuro**; **Chiaro** è curato allo stesso livello.

## Principi

- **Nero, bianco, azzurro.** Tutta l'interfaccia vive in nero e bianco con grigi freddi. L'azzurro `sky-700` segna soltanto ciò che si può cliccare o ciò che è attivo.
- **Peso regolare.** I titoli sono grandi ma mai in grassetto: la gerarchia la fanno dimensione e spazio.
- **Mono per i dettagli.** Etichette di sezione con barra finale (`Servizi/`), elenchi ad albero (`└─`), date, stack, metadati: tutto in DM Mono.
- **Griglia a vista.** Hairline, linee tratteggiate e la griglia a 12 colonne della hero mostrano la struttura invece di nasconderla.
- **Angoli vivi.** Card, celle, immagini a spigolo; solo bottoni e campi hanno 2px.

## Colore

| Ruolo | Token | Scuro | Chiaro |
|---|---|---|---|
| Fondo | `bg` | `black` | `white` |
| Superfici | `surface` / `surface-raised` / `surface-sunken` | `ink-900` / `ink-800` / #050608 | bianco / bianco / `grey-50` |
| Linee | `line` / `line-grid` / `line-strong` | `ink-700` / `ink-600` / `grey-400` | `grey-100` / `grey-200` / `grey-500` |
| Testo | `text` / `text-muted` / `text-subtle` | bianco / `grey-300` / #7D8693 | nero / #4A525E / `grey-400` |
| Azione | `primary` + `on-primary` | `sky-700` + bianco (hover `sky-800`) | uguale |
| Contrasto | `inverse` + `on-inverse` | bianco + nero | nero + bianco |
| Link e focus | `link`, `focus` | `sky-400` | `sky-700` |

- Sull'azzurro il testo è **sempre bianco** (`on-primary`: 5.8:1 su `sky-700`, 7.9:1 su `sky-800`). Il nero su `sky-700` non passa (3.6:1).
- In Chiaro l'azzurro non si usa come testo: per link e accenti c'è `sky-700`.
- `mist` (#B7C2CF) è il grigio-azzurro di presentazione: fondi dietro mockup e screenshot.
- Stati (`success`, `warning`, `danger`) sempre con la parola scritta.

## L'orizzonte

```css
.al-horizon       { background: var(--horizon); }   /* hero, CTA, case study */
.al-grid::before  { /* 12 colonne hairline, sfumano verso il basso */ }
```

- `horizon` sale dal nero al blu notte, all'azzurro, al bianco. Solo il gradiente lineare: niente arco, cerchi o bagliori radiali sopra.
- È identico in Scuro e in Chiaro: è la firma del marchio, non un colore d'interfaccia.
- Il testo bianco sta solo nella metà alta (≥ 6:1 misurato sotto il lead della hero). Nella fascia chiara in basso solo etichette mono nere.
- Si usa in tre posti: hero, CTA finale, visual dei case study. Mai su card, bottoni o fondi di sezione interi.

## Tipografia

- **Host Grotesk** (`sans`) per tutto il testo. Titoli 400 con tracking stretto (−0.045em a 104px). Lead 300. Corpo 400 a 16/26.
- **DM Mono** (`mono`) per etichette e dati: `mono-label` 11px maiuscolo, `mono-sm` 12px per alberi e metadati, `mono-data` 14px per valori.
- Scala: `display-xl` 104 · `display-lg` 72 · `h1` 52 · `h2` 36 · `h3` 24 · `h4` 18 · `lead` 20 · `body` 16 · `body-sm` 14 · `label` 14.
- Su mobile: `display-xl` → 52px, `h1` → 36px.
- **Chip nel titolo**: un quadratino azzurro con icona prima della parola chiave (`Chip`), oppure la parola evidenziata in azzurro (`al-hl`). Una per titolo.
- Date `gg.mm.aaaa`, migliaia col punto, etichette mono con barra finale.

## Layout

- Griglia a 12 colonne, `container-max` 1360px, gutter 16px mobile e 32px desktop.
- Intestazioni di sezione: etichetta mono nelle colonne 1–3, titolo dalla 4.
- Sezioni `space-32` desktop, `space-20` mobile.
- Elementi affiancati condividono il bordo (griglia di celle), non hanno spazio tra loro.
- Ombre solo su modali, toast e menu (`shadow-overlay`).

## Motivo grafico

L'orizzonte è l'unico motivo grafico: niente pattern, forme o illustrazioni aggiuntive. Compare al massimo tre volte per pagina (hero, case study, CTA), sempre a tutta larghezza della sua area, sempre con la griglia a 12 colonne sopra.

## Interazione

- Hover: il primario schiarisce (`primary-hover`); bordi neutri passano a `line-strong`; il quadratino `+` diventa azzurro.
- Focus: anello `focus` 2px con offset 2px su tutto.
- Transizioni `motion-fast` (120ms) su colore e bordo.
- Animazioni d'ingresso: una volta sola, quando la sezione entra in vista (`<Scene>` in `src/components/motion`). Repertorio: titolo parola per parola da una maschera, etichetta mono che si decodifica, dissolvenza con 16px di salita, linee che si tracciano, alba dell'orizzonte (`motion-epic`), parola evidenziata che si stende e cambia. Token `motion-*` ed `ease-*`; classi in `src/styles/motion.css`.
- A riposo tutto è leggibile: se JavaScript non parte o l'utente chiede meno movimento, la pagina è completa e ferma.
- Movimento continuo (parola che cambia) solo in titoli di hero e CTA, e si ferma con `prefers-reduced-motion`.

## Iconografia

- Icone a tratto 1.5 in celle quadrate con bordo `line`; l'icona attiva ha fondo `primary`.
- Per icone mancanti: `lucide-react` con `strokeWidth={1.5}`.
- Niente emoji, niente illustrazioni 3D, niente foto stock.

## React + Tailwind

```js
// tailwind.config.ts
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: { DEFAULT: 'var(--surface)', raised: 'var(--surface-raised)', sunken: 'var(--surface-sunken)' },
        line: { DEFAULT: 'var(--line)', grid: 'var(--line-grid)', strong: 'var(--line-strong)' },
        ink: { DEFAULT: 'var(--text)', muted: 'var(--text-muted)', subtle: 'var(--text-subtle)' },
        primary: { DEFAULT: 'var(--primary)', hover: 'var(--primary-hover)', soft: 'var(--primary-soft)', fg: 'var(--on-primary)' },
        inverse: { DEFAULT: 'var(--inverse)', fg: 'var(--on-inverse)' },
        link: 'var(--link)', focus: 'var(--focus)', success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)',
      },
      fontFamily: {
        sans: ['"Host Grotesk"', 'ui-sans-serif', 'system-ui'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { none: '0', xs: '2px', sm: '4px' },
      maxWidth: { container: '1360px' },
      backgroundImage: {
        horizon: 'var(--horizon)',
      },
    },
  },
};
```

- Tema con `data-theme="dark"` (default) o `data-theme="light"` su `<html>`.
- Etichetta mono: `font-mono text-[11px] leading-4 uppercase tracking-[.04em]`.
- Prodotti SaaS dei clienti: stessi token e componenti; si cambia la scala `sky-*` col colore del cliente verificando `on-primary` ≥ 4.5:1. Orizzonte e wordmark restano di Alpwise Studio.
