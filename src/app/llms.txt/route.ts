import { contact, features, sectors, services, site, siteUrl, steps } from '@/content/site';

// /llms.txt: riassunto in Markdown per gli assistenti AI (https://llmstxt.org). Generato dagli stessi testi del sito.
export const dynamic = 'force-static';

export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Studio di sviluppo software con sede a ${site.locality} (${site.province}), ${site.region}. Lavora con PMI, attività locali e studi professionali. Lingua: italiano.`,
    '',
    '## Servizi',
    '',
    ...services.map((s) => `- **${s.title}**: ${s.lead} ${s.text} (${s.points.join(', ')})`),
    '',
    '## Per chi lavoriamo',
    '',
    ...sectors.map((s) => `- **${s.label.replace(/\/$/, '')}** (${s.title}): ${s.text} Soluzioni: ${s.fit.join(', ')}.`),
    '',
    '## Metodo',
    '',
    ...steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.text}`),
    '',
    '## Contatti',
    '',
    `- Sede: ${contact.address}`,
    `- Tempi di risposta: ${contact.reply.toLowerCase()}`,
    ...(contact.email ? [`- Email: ${contact.email}`] : []),
    ...(contact.phone ? [`- Telefono: ${contact.phone}`] : []),
    ...(features.contactForm ? [`- Modulo: ${siteUrl}/contatti`] : []),
    '',
    '## Pagine',
    '',
    `- [Home](${siteUrl}/): servizi, settori, metodo${features.work ? ' e lavori' : ''}`,
    `- [Contatti](${siteUrl}/contatti): raccontaci il tuo progetto`,
    ...(features.legal ? [`- [Privacy](${siteUrl}/privacy)`, `- [Cookie](${siteUrl}/cookie)`] : []),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
