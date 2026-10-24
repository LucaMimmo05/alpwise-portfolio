import type { ReactNode } from 'react';
import { cx, Icon, Mono, Sq, type IconName } from './primitives';

export function Card({ label, title, footer, href, aside, className, children }: {
  label?: string; title?: ReactNode; footer?: ReactNode; href?: string; aside?: ReactNode; className?: string; children?: ReactNode;
}) {
  const body = (
    <>
      {(label || href) && <div className="al-card-top"><Mono>{label}</Mono>{href ? <Sq>→</Sq> : aside}</div>}
      {title && <h3>{title}</h3>}
      {children && <p>{children}</p>}
      {footer && <div className="al-card-foot">{footer}</div>}
    </>
  );
  return href ? <a href={href} className={cx('al-card', className)}>{body}</a> : <div className={cx('al-card', className)}>{body}</div>;
}

export type Stat = { label: string; value: string; note?: string; icon?: IconName; highlight?: boolean };
/** Only real, verifiable figures. At most one highlighted tile. */
export function Stats({ items }: { items: Stat[] }) {
  return (
    <div className="al-stats">
      {items.map((s) => (
        <div key={s.label} className={cx('al-stat', s.highlight && 'al-stat-primary')}>
          <div className="al-stat-top"><Sq>{s.icon ? <Icon name={s.icon} size={11} /> : '·'}</Sq>{s.label}</div>
          <div><b>{s.value}</b>{s.note && <small>{s.note}</small>}</div>
        </div>
      ))}
    </div>
  );
}

export type TreeItem = string | { label: string; href?: string };
export function Tree({ title, items, className }: { title?: string; items: TreeItem[]; className?: string }) {
  return (
    <div className={className}>
      {title && <div className="al-mono al-tree-title">{title}</div>}
      <ul className="al-tree">
        {items.map((it) => { const l = typeof it === 'string' ? it : it.label; const h = typeof it === 'string' ? undefined : it.href; return <li key={l}>{h ? <a href={h}>{l}</a> : l}</li>; })}
      </ul>
    </div>
  );
}

export type Column<R> = { key: string; label: string; numeric?: boolean; render?: (row: R) => ReactNode };
export function Table<R extends Record<string, unknown>>({ columns, rows, caption }: { columns: Column<R>[]; rows: R[]; caption?: string }) {
  return (
    <div className="al-table-wrap" role="region" aria-label={caption} tabIndex={0}>
      <table className="al-table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead><tr>{columns.map((c) => <th key={c.key} scope="col" className={c.numeric ? 'al-num' : undefined}>{c.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={(r.id as string) ?? i}>
              {columns.map((c) => <td key={c.key} className={c.numeric ? 'al-num' : undefined}>{c.render ? c.render(r) : (r[c.key] as ReactNode)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Accordion({ items, openFirst }: { items: { q: string; a: ReactNode }[]; openFirst?: boolean }) {
  return (
    <div className="al-acc">
      {items.map((it, i) => (
        <details key={it.q} open={openFirst && i === 0}>
          <summary>{it.q}<Sq>+</Sq></summary>
          <div>{it.a}</div>
        </details>
      ))}
    </div>
  );
}
