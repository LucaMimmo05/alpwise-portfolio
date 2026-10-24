import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd, pageLd } from '@/components/seo/JsonLd';
import { pageMetadata } from '@/components/seo/meta';
import { LegalPage, Val, type LegalSection } from '@/components/landing/LegalPage';
import { contact, features, legal } from '@/content/site';

const seo = { path: '/privacy', title: 'Privacy', description: 'Come Alpwise Studio tratta i dati personali raccolti dal sito.' };
export const metadata: Metadata = pageMetadata(seo);

// Struttura secondo l'art. 13 del GDPR. I segnaposto vanno riempiti e il testo verificato da un consulente.
const sections: LegalSection[] = [
  {
    id: 'titolare', title: 'Chi tratta i tuoi dati',
    body: (
      <>
        <p>Il titolare del trattamento è <strong><Val v={legal.owner} ph="Ragione sociale" /></strong>, con sede in <Val v={legal.address} ph="Indirizzo completo, Gallarate (VA)" />, P.IVA <Val v={contact.vat} ph="P.IVA" />.</p>
        <p>Per qualsiasi domanda sui tuoi dati scrivi a <Val v={contact.email} ph="Email" /> oppure alla PEC <Val v={legal.pec} ph="PEC" />.</p>
      </>
    ),
  },
  {
    id: 'dati', title: 'Quali dati raccogliamo',
    body: (
      <>
        <p><strong>Dati che ci scrivi tu.</strong> Quando usi il modulo contatti raccogliamo nome, email, il servizio che ti interessa e il messaggio. Ti chiediamo di non inserire dati sensibili.</p>
        <p><strong>Dati tecnici di navigazione.</strong> Il server che ospita il sito registra automaticamente alcuni dati per farlo funzionare e proteggerlo: indirizzo IP, data e ora della richiesta, pagina richiesta, tipo di browser. Non li usiamo per identificarti.</p>
        <p>Il sito non usa cookie di analisi o di profilazione. I dettagli sono nella <a href="/cookie">pagina sui cookie</a>.</p>
      </>
    ),
  },
  {
    id: 'finalita', title: 'Perché li usiamo',
    body: (
      <ul>
        <li><strong>Rispondere alla tua richiesta</strong> e, se vuoi, prepararti un preventivo. Base giuridica: misure precontrattuali richieste da te (art. 6.1.b GDPR).</li>
        <li><strong>Far funzionare il sito e tenerlo sicuro</strong>, per esempio contro abusi del modulo. Base giuridica: nostro legittimo interesse (art. 6.1.f GDPR).</li>
        <li><strong>Rispettare obblighi di legge</strong>, se la richiesta diventa un contratto (fatturazione, contabilità). Base giuridica: obbligo legale (art. 6.1.c GDPR).</li>
      </ul>
    ),
  },
  {
    id: 'conservazione', title: 'Per quanto li conserviamo',
    body: (
      <ul>
        <li>Richieste dal modulo contatti: <Val v={legal.retention} ph="Periodo, es. 12 mesi dall'ultimo contatto" />.</li>
        <li>Dati tecnici di navigazione: <Val v={legal.logRetention} ph="Periodo indicato dal fornitore di hosting" />.</li>
        <li>Dati legati a un contratto: per il tempo previsto dalla legge per i documenti fiscali.</li>
      </ul>
    ),
  },
  {
    id: 'destinatari', title: 'Chi li riceve',
    body: (
      <>
        <p>Non vendiamo né cediamo i tuoi dati. Li trattano solo i fornitori che ci servono per far funzionare il sito, nominati responsabili del trattamento:</p>
        <ul>
          <li>Hosting del sito: <Val v={legal.hosting} ph="Fornitore e paese" />.</li>
          <li>Ricezione del modulo contatti: <Val v={legal.formProcessor} ph="Servizio e paese" />.</li>
        </ul>
        <p>Se uno di questi fornitori tratta dati fuori dall&apos;Unione europea, lo fa con le garanzie previste dal GDPR, come le clausole contrattuali standard. <Val v={null} ph="Da verificare per ogni fornitore" /></p>
      </>
    ),
  },
  {
    id: 'obbligo', title: 'Sei obbligato a darceli?',
    body: <p>No. Nome ed email però ci servono per risponderti: senza, non possiamo dare seguito alla richiesta.</p>,
  },
  {
    id: 'diritti', title: 'I tuoi diritti',
    body: (
      <>
        <p>In qualsiasi momento puoi chiederci di:</p>
        <ul>
          <li>sapere quali dati abbiamo su di te e averne una copia;</li>
          <li>correggerli o completarli;</li>
          <li>cancellarli, o limitarne l&apos;uso;</li>
          <li>riceverli in un formato leggibile da un computer;</li>
          <li>opporti al trattamento basato sul nostro legittimo interesse.</li>
        </ul>
        <p>Scrivi a <Val v={contact.email} ph="Email" />: ti rispondiamo entro un mese. Se pensi che il trattamento non sia corretto puoi presentare reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" rel="noopener">garanteprivacy.it</a>).</p>
      </>
    ),
  },
  {
    id: 'modifiche', title: 'Modifiche',
    body: <p>Se cambiamo il modo in cui trattiamo i dati aggiorniamo questa pagina e la data in alto.</p>,
  },
];

export default function PrivacyPage() {
  if (!features.legal) notFound(); // bozza: nascosta finché i dati legali non sono verificati
  return (
    <>
      <JsonLd data={pageLd({ ...seo, name: seo.title })} />
      <LegalPage label="Privacy/" title="Come trattiamo i tuoi dati" lead="Raccogliamo solo i dati che servono per risponderti e far funzionare il sito. Qui trovi quali sono, perché li usiamo e come puoi controllarli." sections={sections} />
    </>
  );
}
