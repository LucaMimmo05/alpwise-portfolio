import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, CSSProperties } from 'react';
import { WORDMARK_GLYPHS, WORDMARK_VIEWBOX } from './wordmark-paths';

export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

/* ---------- Mono label & square marker ---------- */
export function Mono({ children, className, style }: { children?: ReactNode; className?: string; style?: CSSProperties }) {
  return <span className={cx('al-mono', className)} style={style}>{children}</span>;
}
export function Sq({ children = '+', on }: { children?: ReactNode; on?: boolean }) {
  return <span className={cx('al-sq', on && 'al-sq-on')} aria-hidden="true">{children}</span>;
}

/* ---------- Icon: 24 grid, 1.5 stroke ---------- */
const PATHS = {
  'arrow-right': 'M4 12h16M14 6l6 6-6 6', 'arrow-up-right': 'M7 17L17 7M8 7h9v9', plus: 'M12 5v14M5 12h14', minus: 'M5 12h14',
  check: 'M5 12.5l4.5 4.5L19 7.5', x: 'M6 6l12 12M18 6L6 18', menu: 'M4 8h16M4 16h16',
  globe: 'M3 12h18M12 3a9 9 0 100 18 9 9 0 000-18zM12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16', spark: 'M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5', mail: 'M3 5h18v14H3zM3 6l9 7 9-7', clock: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z', shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  pin: 'M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c1-4 4.5-6 8-6s7 2 8 6',
} as const;
export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, label, className }: { name: IconName; size?: number; label?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label} className={className}>
      <path d={PATHS[name]} />
    </svg>
  );
}

/* ---------- Wordmark ---------- */
// La "A" (prima lettera del wordmark) da sola: marchio per i formati piccoli, come la favicon.
const MARK_VIEWBOX = [223, 642, 184, 175] as const;
// "Alpwise" senza "STUDIO" (7 lettere), alto quanto il wordmark: così la A ha la stessa scala nei due stati della navbar.
const WORD_VIEWBOX = [222, 631, 880, 236] as const;
const WORD_GLYPHS = 7;

/**
 * Wordmark completo, `lockup="mark"` per la sola A, `lockup="nav"` per "Alpwise" senza "STUDIO".
 * In "nav" le lettere dopo la A hanno la classe al-logo-rest: la navbar compatta le nasconde e restringe il logo alla A.
 */
export function Logo({ size = 24, color, className, lockup = 'full' }: { size?: number; color?: string; className?: string; lockup?: 'full' | 'mark' | 'nav' }) {
  const [x0, y0, w, h] = lockup === 'mark' ? MARK_VIEWBOX : lockup === 'nav' ? WORD_VIEWBOX : WORDMARK_VIEWBOX;
  const glyphs = lockup === 'mark' ? WORDMARK_GLYPHS.slice(0, 1) : lockup === 'nav' ? WORDMARK_GLYPHS.slice(0, WORD_GLYPHS) : WORDMARK_GLYPHS;
  return (
    <svg viewBox={`${x0} ${y0} ${w} ${h}`} height={size} width={(size * w) / h} role="img" aria-label="Alpwise Studio"
      preserveAspectRatio={lockup === 'nav' ? 'xMinYMid slice' : undefined}
      className={cx('al-logo', lockup === 'nav' && 'al-logo-nav', className)} style={color ? { color } : undefined}>
      <g fill="currentColor">
        {glyphs.map(([x, y, d], i) => (
          <path key={i} transform={`translate(${x} ${y})`} d={d} className={lockup === 'nav' && i > 0 ? 'al-logo-rest' : undefined} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- Button ---------- */
export type ButtonVariant = 'primary' | 'inverse' | 'outline' | 'ghost' | 'danger' | 'light' | 'dark';
type BtnBase = { variant?: ButtonVariant; size?: 'sm' | 'md' | 'lg'; arrow?: boolean; loading?: boolean; className?: string; children?: ReactNode };
export type ButtonProps = BtnBase & (
  | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>)
  | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)
);

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', arrow, loading, className, children, ...rest } = props;
  const cls = cx('al-btn', `al-btn-${variant}`, size !== 'md' && `al-btn-${size}`, className);
  const inner = <>{children}{arrow && <span className="al-arr" aria-hidden="true">→</span>}</>;
  if ('href' in rest && rest.href) return <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls}>{inner}</a>;
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type="button" {...b} disabled={b.disabled || loading} aria-busy={loading || undefined} className={cls}>{inner}</button>;
}

/* ---------- Tag & Chip ---------- */
export function Tag({ tone = 'neutral', dot, children, className }: { tone?: 'neutral' | 'primary' | 'soft' | 'success' | 'warning' | 'danger'; dot?: boolean; children: ReactNode; className?: string }) {
  return <span className={cx('al-tag', tone !== 'neutral' && `al-tag-${tone}`, dot && 'al-tag-dot', className)}>{children}</span>;
}
/** Square sky tile with an icon, placed inline in a heading before the key word. */
export function Chip({ icon = 'spark' }: { icon?: IconName }) {
  return <span className="al-chip" aria-hidden="true"><Icon name={icon} /></span>;
}
/** Highlighted word inside a heading or lead. */
export function Hl({ children }: { children: ReactNode }) {
  return <span className="al-hl">{children}</span>;
}
