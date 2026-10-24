import type { Config } from 'tailwindcss';

// Alpwise Studio — Tailwind reads the CSS variables from src/styles/tokens.css; it never duplicates values.
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: { DEFAULT: 'var(--surface)', raised: 'var(--surface-raised)', sunken: 'var(--surface-sunken)' },
        line: { DEFAULT: 'var(--line)', grid: 'var(--line-grid)', strong: 'var(--line-strong)' },
        ink: { DEFAULT: 'var(--text)', muted: 'var(--text-muted)', subtle: 'var(--text-subtle)' },
        primary: { DEFAULT: 'var(--primary)', hover: 'var(--primary-hover)', soft: 'var(--primary-soft)', fg: 'var(--on-primary)' },
        inverse: { DEFAULT: 'var(--inverse)', fg: 'var(--on-inverse)' },
        sky: { 100: 'var(--sky-100)', 200: 'var(--sky-200)', 400: 'var(--sky-400)', 500: 'var(--sky-500)', 600: 'var(--sky-600)', 700: 'var(--sky-700)', 800: 'var(--sky-800)' },
        mist: 'var(--mist)',
        link: 'var(--link)',
        focus: 'var(--focus)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: ['"Host Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['104px', { lineHeight: '100px', letterSpacing: '-0.045em', fontWeight: '400' }],
        'display-lg': ['72px', { lineHeight: '72px', letterSpacing: '-0.04em', fontWeight: '400' }],
        h1: ['52px', { lineHeight: '56px', letterSpacing: '-0.035em', fontWeight: '400' }],
        h2: ['36px', { lineHeight: '40px', letterSpacing: '-0.025em', fontWeight: '400' }],
        h3: ['24px', { lineHeight: '30px', letterSpacing: '-0.015em', fontWeight: '400' }],
        h4: ['18px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '500' }],
        lead: ['20px', { lineHeight: '30px', fontWeight: '300' }],
        body: ['16px', { lineHeight: '26px' }],
        'body-sm': ['14px', { lineHeight: '22px' }],
        'mono-label': ['11px', { lineHeight: '16px', letterSpacing: '0.04em' }],
        'mono-sm': ['12px', { lineHeight: '18px' }],
      },
      borderRadius: { none: '0', xs: '2px', sm: '4px' },
      maxWidth: { container: '1360px' },
      boxShadow: { overlay: 'var(--shadow-overlay)' },
      backgroundImage: {
        horizon: 'var(--horizon)',
      },
      zIndex: { nav: '40', modal: '50', toast: '60' },
    },
  },
  plugins: [],
} satisfies Config;
