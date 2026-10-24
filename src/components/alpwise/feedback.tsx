'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cx, Icon, Mono, Sq } from './primitives';

export function Modal({ open, kicker = 'Conferma/', title, onClose, actions, children }: {
  open: boolean; kicker?: string; title: ReactNode; onClose?: () => void; actions?: ReactNode; children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('.al-modal-actions button')?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); prev?.focus?.(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="al-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div ref={ref} className="al-modal" role="dialog" aria-modal="true" aria-labelledby="al-modal-t">
        <div className="al-modal-head">
          <Mono>{kicker}</Mono>
          {onClose && <button className="al-icon-btn" aria-label="Chiudi" onClick={onClose}><Icon name="x" /></button>}
        </div>
        <div className="al-modal-body"><h2 id="al-modal-t">{title}</h2>{children}</div>
        {actions && <div className="al-modal-actions">{actions}</div>}
      </div>
    </div>
  );
}

const TONE = { info: ['i', 'Info'], success: ['✓', 'Fatto'], warning: ['!', 'Attenzione'], danger: ['×', 'Errore'] } as const;
export type ToastTone = keyof typeof TONE;

export function Toast({ tone = 'info', time, title, onClose, children }: { tone?: ToastTone; time?: string; title: ReactNode; onClose?: () => void; children?: ReactNode }) {
  return (
    <div className={cx('al-toast', `al-toast-${tone}`)} role={tone === 'danger' ? 'alert' : 'status'}>
      <Sq>{TONE[tone][0]}</Sq>
      <div>
        <strong>{title}</strong>
        {children && <div>{children}</div>}
        <div className="al-mono-sm">{TONE[tone][1]}{time ? ` · ${time}` : ''}</div>
      </div>
      {onClose ? <button className="al-icon-btn" style={{ width: 24, height: 24, border: 0 }} aria-label="Chiudi notifica" onClick={onClose}><Icon name="x" size={14} /></button> : <span />}
    </div>
  );
}
export function ToastRegion({ children }: { children: ReactNode }) {
  return <div className="al-toasts" aria-live="polite">{children}</div>;
}
