import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import tokens from '../../design-system/tokens.json';
import { contact } from '@/content/site';

// Anteprima social 1200×630: orizzonte con griglia, wordmark bianco e testi solo nella metà alta (sopra i 315px).
export const alt = 'Alpwise Studio · Software su misura per le PMI, a Gallarate';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const token = (group: 'color' | 'gradient', name: string) => tokens[group].tokens.find((t) => t.name === name)!.value as string;

export default async function OpengraphImage() {
  const root = process.cwd();
  const [grotesk, mono, wordmark] = await Promise.all([
    readFile(join(root, 'src/assets/fonts/host-grotesk-latin-400-normal.ttf')),
    readFile(join(root, 'src/assets/fonts/dm-mono-latin-400-normal.ttf')),
    readFile(join(root, 'public/brand/wordmark-white.svg'), 'utf8'),
  ]);
  const white = token('color', 'white');

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', backgroundImage: token('gradient', 'horizon'), color: white, fontFamily: 'Host Grotesk' }}>
        {/* Griglia a 12 colonne, come al-grid-on-horizon */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={{ flex: 1, borderLeft: i ? '1px solid rgba(255,255,255,.12)' : 'none' }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 72px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={`data:image/svg+xml;base64,${Buffer.from(wordmark).toString('base64')}`} width={250} height={60} alt="" />
            <div style={{ fontFamily: 'DM Mono', fontSize: 22, letterSpacing: 1 }}>{`${contact.coords}/ ${contact.address}`}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 48 }}>
            <div style={{ fontSize: 68, lineHeight: 1.04, letterSpacing: -2 }}>Software su misura per le PMI</div>
            <div style={{ fontFamily: 'DM Mono', fontSize: 24, marginTop: 20, letterSpacing: 1 }}>Siti vetrina/  Software su misura/  AI e automazioni/</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Host Grotesk', data: grotesk, weight: 400, style: 'normal' },
        { name: 'DM Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}
