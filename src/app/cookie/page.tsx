import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd, pageLd } from '@/components/seo/JsonLd';
import { pageMetadata } from '@/components/seo/meta';
import { Table } from '@/components/alpwise';
import { LegalPage, Val, type LegalSection } from '@/components/landing/LegalPage';
import { contact, features, legal } from '@/content/site';

const seo = { path: '/cookie', title: 'Cookie', description: 'Quali cookie usa il sito di Alpwise Studio.' };
export const metadata: Metadata = pageMetadata(seo);

// Oggi il codice del sito non imposta cookie né usa localStorage. Se si aggiungono analytics, mappe o video
// incorporati, va aggiornata la tabella e serve un banner di consenso prima di caricarli.
type Row = { name: string; provider: string; purpose: string; duration: string };
const rows: Row[] = [];

const sections: LegalSection[] = [
  {
    id: 'cosa', title: 'Cosa sono i cookie',
    body: <p>Sono piccoli file che un sito salva nel browser. Alcuni servono a farlo funzionare (cookie tecnici), altri a misurare le visite o a mostrare pubblicità (cookie di analisi e di profilazione).</p>,
  },
  {
    id: 'usiamo', title: 'Quali usiamo',
    body: (
      <>
        <p><strong>Il sito non usa cookie di analisi, di profilazione o di terze parti.</strong> Per questo non ti chiediamo il consenso con un banner.</p>
        {rows.length ? (
          <Table<Row>
            caption="Cookie tecnici usati dal sito"
            columns={[{ key: 'name', label: 'Nome' }, { key: 'provider', label: 'Fornitore' }, { key: 'purpose', label: 'Scopo' }, { key: 'duration', label: 'Durata' }]}
            rows={rows}
          />
        ) : (
          <p>Il codice del sito oggi non imposta nessun cookie. Il fornitore di hosting (<Val v={legal.hosting} ph="Fornitore" />) potrebbe usare cookie tecnici per la sicurezza: <Val v={null} ph="Da verificare con il fornitore ed elencare qui" />.</p>
        )}
      </>
    ),
  },
  {
    id: 'gestire', title: 'Come gestirli',
    body: (
      <>
        <p>Puoi vedere e cancellare i cookie dalle impostazioni del browser:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647?hl=it" rel="noopener">Chrome</a></li>
          <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" rel="noopener">Firefox</a></li>
          <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" rel="noopener">Safari</a></li>
          <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" rel="noopener">Edge</a></li>
        </ul>
        <p>Bloccare i cookie tecnici può impedire ad alcune parti del sito di funzionare.</p>
      </>
    ),
  },
  {
    id: 'contatti', title: 'Domande',
    body: <p>Per dubbi su cookie e dati personali scrivi a <Val v={contact.email} ph="Email" />. Le informazioni complete sul trattamento sono nella <a href="/privacy">pagina sulla privacy</a>.</p>,
  },
];

export default function CookiePage() {
  if (!features.legal) notFound(); // bozza: nascosta finché i dati legali non sono verificati
  return (
    <>
      <JsonLd data={pageLd({ ...seo, name: seo.title })} />
      <LegalPage label="Cookie/" title="Cookie" lead="Usiamo solo quello che serve a far funzionare il sito. Niente tracciamento e niente pubblicità." sections={sections} />
    </>
  );
}
