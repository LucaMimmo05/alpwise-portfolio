import type { ReactNode } from 'react';
import { cx } from '@alpwisestudio/ui';
import { Scramble, Words } from '@/components/motion';
import { d } from '@/components/motion/delay';

/** Intestazione di sezione animata: etichetta mono decodificata (colonne 1–3), titolo parola per parola (dalla 4). */
export function SectionHead({ label, title, lead, className, children }: { label: string; title?: string; lead?: ReactNode; className?: string; children?: ReactNode }) {
  return (
    <div className={cx('al-head', className)}>
      <Scramble text={label} />
      {title && <h2 style={d(150)}><Words>{title}</Words></h2>}
      {lead && <p data-m="fade-up" style={d(550)}>{lead}</p>}
      {children}
    </div>
  );
}
