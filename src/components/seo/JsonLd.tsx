import { contact, services, site, siteUrl } from '@/content/site';

type Json = Record<string, unknown>;

/** Dati strutturati schema.org in un tag <script type="application/ld+json">. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  // `<` escapato per non chiudere lo script se un testo contiene "</script>".
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

export const orgId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

/** Lo studio come attività locale: chi è, dove, cosa offre. I contatti compaiono solo quando sono reali. */
export function organizationLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Organization'],
    '@id': orgId,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/brand/wordmark-black.svg`,
    image: `${siteUrl}/opengraph-image`,
    description: site.description,
    slogan: 'Software su misura per le PMI',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 3 },
    knowsLanguage: site.languages,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.locality,
      addressRegion: site.province,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
    ...(contact.email && { email: contact.email }),
    ...(contact.phone && { telephone: contact.phone }),
    ...(contact.vat && { vatID: contact.vat }),
    ...(site.sameAs.length && { sameAs: site.sameAs }),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${siteUrl}/contatti`,
      availableLanguage: site.languages,
      ...(contact.email && { email: contact.email }),
      ...(contact.phone && { telephone: contact.phone }),
    },
    knowsAbout: services.flatMap((s) => [s.title, ...s.points]),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: `${s.lead} ${s.text}`,
          serviceType: s.title,
          provider: { '@id': orgId },
          areaServed: site.areaServed.map((name) => ({ '@type': 'Place', name })),
        },
      })),
    },
  };
}

export function websiteLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteUrl,
    name: site.name,
    description: site.description,
    inLanguage: 'it-IT',
    publisher: { '@id': orgId },
  };
}

/** Pagina interna: tipo schema.org, titolo, descrizione e briciole di pane. */
export function pageLd({ type = 'WebPage', path, name, description }: { type?: string; path: string; name: string; description: string }): Json[] {
  const url = `${siteUrl}${path}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': type,
      '@id': `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: 'it-IT',
      isPartOf: { '@id': websiteId },
      about: { '@id': orgId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    },
  ];
}
