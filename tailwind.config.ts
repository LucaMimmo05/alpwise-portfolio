import type { Config } from 'tailwindcss';
import alpwise from '@alpwisestudio/ui/tailwind-preset';

// Alpwise Studio — colori, font e scala tipografica vengono dal preset di @alpwisestudio/ui (variabili CSS di tokens.css).
export default {
  presets: [alpwise],
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
} satisfies Config;
