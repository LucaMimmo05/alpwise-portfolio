# Accessibilità

Obiettivo: WCAG 2.2 AA in entrambi i temi, orizzonte compreso.

## Contrasto (calcolato dai token)

| Coppia | Scuro | Chiaro |
|---|---|---|
| `text` su `bg` / `surface` | 21.0 / 19.6 | 21.0 / 21.0 |
| `text-muted` su `bg` / `surface-sunken` | 8.3 / 8.0 | 7.9 / 7.2 |
| `text-subtle` su `bg` / `surface` / `surface-raised` | 5.7 / 5.3 / 5.0 | 4.7 / 4.7 / 4.7 |
| `on-primary` su `primary` / `primary-hover` | 5.8 / 7.9 | 5.8 / 7.9 |
| `on-inverse` su `inverse` | 21.0 | 21.0 |
| `link` su `bg` / `surface` | 10.4 / 9.7 | 5.8 / 5.8 |
| `on-primary-soft` su `primary-soft` | 8.2 | 5.1 |
| `line-strong` su `bg` / `surface` (controlli) | 4.5 / 4.2 | 6.4 / 6.4 |
| `focus` su `bg` / `surface` | 10.4 / 9.7 | 5.8 / 5.8 |
| `success` / `warning` / `danger` su `surface` | 11.4 / 11.1 / 7.8 | 5.4 / 6.3 / 5.9 |

- `primary` è `sky-700` con testo bianco (5.8:1). Il nero su `sky-700` è 3.6:1: non usarlo. Il bianco su `sky-500` o `sky-600` non passa (2.6 e 3.9:1).
- `primary` come elemento non testuale (bordi attivi, fili, caselle) è 3.6:1 sul nero e 5.8:1 sul bianco: sopra il 3:1 richiesto.
- In Chiaro `sky-500` non è un colore di testo (2.6:1 sul bianco): link e accenti usano `sky-700`.

## Testo sull'orizzonte

- Misurato sul pixel più chiaro sotto ogni riga della hero (960px): titolo ≥ 8.3:1, lead ≥ 6.0:1 (bianco all'86%: ≥ 5:1).
- Sotto il 75% dell'altezza il fondo diventa azzurro e poi bianco: lì solo testo nero (le etichette mono della fascia bassa, ≥ 15:1).
- I bottoni sull'orizzonte hanno sempre un fondo pieno (`primary`, `light`, `dark`), mai solo il bordo.

## Focus e tastiera

- Anello `focus` 2px pieno con offset 2px su ogni elemento interattivo; nel footer `sky-400`.
- Input: bordo e alone 1px `primary` al focus.
- Navbar: le voci con menu sono `<button aria-expanded>`. Modali: focus dentro, Esc chiude, focus restituito.
- FAQ con `<details>`: apribili da tastiera senza JavaScript.

## Stati e lettori di schermo

- Esiti ed errori scritti a parole oltre al colore. Toast in `aria-live="polite"`, errori con `role="alert"`.
- Label sempre visibili, hint ed errori via `aria-describedby`, "Obbligatorio" scritto per esteso.
- Tabelle con `caption` e `th scope="col"`. Wordmark con `aria-label="Alpwise Studio"`. Icone decorative `aria-hidden`.
- `prefers-reduced-motion` azzera transizioni e animazioni d'ingresso e ferma le parole che cambiano.
- Le parole che cambiano sono `aria-hidden`: i lettori di schermo leggono solo la prima, in un testo `sr-only`.
