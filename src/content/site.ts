import type { IconName } from '@/components/alpwise';

// Contenuti della landing. I valori `null` sono ancora da fornire: la pagina li mostra come segnaposto tratteggiati.
// Clienti, numeri e citazioni devono essere reali (CLAUDE.md): non riempirli con esempi.

// Dominio pubblico: `NEXT_PUBLIC_SITE_URL` se impostato, altrimenti il dominio di produzione che Vercel espone in build.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (productionHost ? `https://${productionHost}` : 'http://localhost:3000')
).replace(/\/$/, '');

// Dati usati da metadata, sitemap, dati strutturati (JSON-LD) e llms.txt.
export const site = {
  name: 'Alpwise Studio',
  title: 'Alpwise Studio · Siti, software su misura e AI a Gallarate',
  description: 'Siti vetrina, software su misura, AI e automazioni per le PMI. Tre sviluppatori a Gallarate (VA), in provincia di Varese: dalla prima chiamata alla messa online parli con chi scrive il codice.',
  locale: 'it_IT',
  locality: 'Gallarate',
  province: 'VA',
  region: 'Lombardia',
  postalCode: '21013',
  country: 'IT',
  geo: { lat: 45.66, lng: 8.79 },
  areaServed: ['Gallarate', 'Provincia di Varese', 'Lombardia', 'Italia'], // aggiungi le città servite davvero (es. Busto Arsizio, Varese, Milano)
  languages: ['it'],
  sameAs: [] as string[], // profili ufficiali (LinkedIn, GitHub…): aggiungili quando sono pubblici
};

export const contact = {
  email: 'alpwisestudio@gmail.com' as string | null,
  phone: null as string | null,
  vat: null as string | null,
  address: 'Gallarate, VA',
  reply: 'Entro un giorno lavorativo',
  coords: '45.66°N 8.79°E',
};

// Dati per Privacy e Cookie. Vanno forniti dallo studio e verificati da un consulente prima della pubblicazione.
export const legal = {
  owner: null as string | null,          // ragione sociale o nome del titolare
  address: null as string | null,        // indirizzo completo della sede
  pec: null as string | null,
  hosting: null as string | null,        // fornitore di hosting, es. nome e paese
  formProcessor: null as string | null,  // servizio che riceve il modulo contatti
  retention: null as string | null,      // per quanto conservate le richieste di contatto
  logRetention: null as string | null,   // per quanto il fornitore conserva i log tecnici
  updated: null as string | null,        // data ultimo aggiornamento, gg.mm.aaaa
};

// Parti del sito non ancora pronte per il pubblico. Rimetti `true` quando i contenuti sono reali.
export const features = {
  work: false,        // sezione Lavori: servono progetti veri
  legal: false,       // pagine Privacy e Cookie: servono dati legali verificati
  contactForm: true,  // modulo contatti (invia a /api/contact, che inoltra a CONTACT_WEBHOOK_URL)
};

const allNav = [
  { label: 'Servizi', href: '/#servizi' },
  { label: 'Per chi', href: '/#per-chi' },
  { label: 'Metodo', href: '/#metodo' },
  { label: 'Lavori', href: '/#lavori' },
  { label: 'Studio', href: '/#studio' },
];
export const nav = allNav.filter((n) => features.work || n.href !== '/#lavori');

export const sectorWords = ['la tua azienda', 'il tuo studio', 'la tua officina', 'il tuo negozio'];
export const ctaWords = ['problema', 'sito', 'gestionale', 'processo'];

export const services = [
  {
    id: 'web', label: 'Web/', title: 'Siti vetrina',
    lead: 'Un sito chiaro che dice chi sei, cosa fai e come contattarti.',
    text: 'Veloce da caricare, facile da trovare su Google, semplice da aggiornare. Pensato per attività locali e studi professionali.',
    points: ['Design su misura', 'Testi e SEO locale', 'Hosting e manutenzione'],
  },
  {
    id: 'software', label: 'Software/', title: 'Software su misura',
    lead: 'Quando fogli Excel ed email non bastano più.',
    text: 'Partiamo dal tuo processo e costruiamo lo strumento che serve: un gestionale, un portale per i clienti, un SaaS B2B.',
    points: ['Gestionali e portali', 'Aree clienti', 'React, Spring Boot'],
  },
  {
    id: 'ai', label: 'AI/', title: 'AI e automazioni',
    lead: 'Meno lavoro ripetitivo, più tempo per il resto.',
    text: "Colleghiamo i tuoi strumenti e automatizziamo i passaggi manuali. Usiamo l'AI dove fa risparmiare tempo davvero.",
    points: ['Estrazione dati da documenti', 'Assistenti sui dati aziendali', 'Integrazioni tra strumenti'],
  },
];

// Proposta da confermare con lo studio.
// `problem`: problemi tipici detti come li direbbe il cliente, non citazioni reali.
export const sectors: { icon: IconName; label: string; title: string; problem: string; text: string; fit: string[] }[] = [
  { icon: 'pin', label: 'Attività locali/', title: 'Negozi, ristoranti, artigiani', problem: 'Chi mi cerca su Google non trova orari e contatti.', text: 'Chi ti cerca su Google deve trovare subito orari, servizi e come contattarti.', fit: ['Sito vetrina', 'Scheda Google e SEO locale'] },
  { icon: 'layers', label: 'Studi professionali/', title: 'Commercialisti, tecnici, consulenti', problem: 'I clienti chiedono sempre le stesse cose.', text: 'Documenti che arrivano da ogni parte e clienti che chiedono sempre le stesse cose.', fit: ['Area clienti', 'Estrazione dati da documenti'] },
  { icon: 'chart', label: 'PMI e B2B/', title: 'Aziende con processi propri', problem: 'Il lavoro vero vive su Excel ed email.', text: 'Il gestionale standard non si adatta e il lavoro vero vive su Excel ed email.', fit: ['Gestionale su misura', 'Integrazioni e automazioni'] },
];

export const steps = [
  { label: 'Ascolto/', title: 'Capiamo il problema', text: 'Una chiamata per capire come lavori oggi e cosa ti rallenta. Senza impegno.' },
  { label: 'Proposta/', title: 'Preventivo scritto', text: 'Cosa facciamo, con quali tecnologie, in che tempi. E cosa resta fuori.' },
  { label: 'Sviluppo/', title: 'Rilasci frequenti', text: 'Vedi il lavoro crescere mentre lo costruiamo e correggi la rotta presto.' },
  { label: 'Online/', title: 'Messa online e cura', text: 'Pubblichiamo, ti mostriamo come usarlo e restiamo il tuo riferimento.' },
];

// Vuoto finché non c'è un progetto reale: la sezione mostra righe segnaposto.
export const projects: { client: string; service: string; year: string; href: string }[] = [];
export const projectPlaceholders = ['Sito vetrina', 'Gestionale su misura', 'Automazione documenti'];
