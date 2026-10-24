import type { Metadata } from 'next';
import { JsonLd, pageLd } from '@/components/seo/JsonLd';
import { pageMetadata } from '@/components/seo/meta';
import { Contact } from '@/components/landing/Contact';
import { ContactHero } from '@/components/landing/ContactHero';
import { SiteFooter } from '@/components/landing/SiteFooter';
import { SiteNav } from '@/components/landing/SiteNav';

const seo = { path: '/contatti', title: 'Contatti', description: 'Raccontaci il tuo progetto: sito, software su misura o automazione. Studio a Gallarate (VA), ti rispondiamo entro un giorno lavorativo.' };
export const metadata: Metadata = pageMetadata(seo);

export default function ContattiPage() {
  return (
    <>
      <JsonLd data={pageLd({ ...seo, type: 'ContactPage', name: seo.title })} />
      <SiteNav />
      <main>
        <ContactHero />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
