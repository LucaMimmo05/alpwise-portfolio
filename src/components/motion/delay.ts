import type { CSSProperties } from 'react';

/** Stile con --delay in ms, letto dalle regole di motion.css. Utilizzabile anche nei componenti server. */
export const d = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;
