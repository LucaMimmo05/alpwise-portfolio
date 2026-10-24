import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../styles/tokens.css';
import '../styles/alpwise.css';
import '../styles/motion.css';
import '../styles/landing.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alpwise Studio · Software su misura a Gallarate',
  description: 'Siti vetrina, software su misura, AI e automazioni per le PMI. Tre sviluppatori a Gallarate (VA).',
};

export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
