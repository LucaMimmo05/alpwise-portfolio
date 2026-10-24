import { Footer } from '@/components/alpwise';
import { Scene } from '@/components/motion';
import { contact } from '@/content/site';

/** Footer del design system; con il wordmark che sale dalla maschera. */
export function SiteFooter() {
  return (
    <Scene>
      <Footer
        tagline="Siti, software e automazioni per le PMI. Da Gallarate, ai piedi delle Prealpi."
        columns={[
          { title: 'Servizi/', links: [{ label: 'Siti vetrina', href: '/#servizi' }, { label: 'Software su misura', href: '/#servizi' }, { label: 'AI e automazioni', href: '/#servizi' }] },
          { title: 'Studio/', links: [{ label: 'Per chi lavoriamo', href: '/#per-chi' }, { label: 'Metodo', href: '/#metodo' }, { label: 'Lavori', href: '/#lavori' }, { label: 'Contatti', href: '/#contatti' }] },
          { title: 'Legale/', links: [{ label: 'Privacy', href: '/privacy' }, { label: 'Cookie', href: '/cookie' }] },
        ]}
        legal={`© ${new Date().getFullYear()} Alpwise Studio · P.IVA ${contact.vat ?? 'da inserire'}`}
        note={contact.address}
      />
    </Scene>
  );
}
