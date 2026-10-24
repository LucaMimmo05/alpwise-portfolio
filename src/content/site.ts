// Contenuti della landing. I valori `null` sono ancora da fornire: la pagina li mostra come segnaposto tratteggiati.
// Clienti, numeri e citazioni devono essere reali (CLAUDE.md): non riempirli con esempi.

export const contact = {
  email: null as string | null,
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

export const nav = [
  { label: 'Servizi', href: '/#servizi' },
  { label: 'Per chi', href: '/#per-chi' },
  { label: 'Metodo', href: '/#metodo' },
  { label: 'Lavori', href: '/#lavori' },
  { label: 'Studio', href: '/#studio' },
];

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
export const sectors = [
  { label: 'Attività locali/', title: 'Negozi, ristoranti, artigiani', text: 'Chi ti cerca su Google deve trovare subito orari, servizi e come contattarti.', fit: ['Sito vetrina', 'Scheda Google e SEO locale'] },
  { label: 'Studi professionali/', title: 'Commercialisti, tecnici, consulenti', text: 'Documenti che arrivano da ogni parte e clienti che chiedono sempre le stesse cose.', fit: ['Area clienti', 'Estrazione dati da documenti'] },
  { label: 'PMI e B2B/', title: 'Aziende con processi propri', text: 'Il gestionale standard non si adatta e il lavoro vero vive su Excel ed email.', fit: ['Gestionale su misura', 'Integrazioni e automazioni'] },
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
