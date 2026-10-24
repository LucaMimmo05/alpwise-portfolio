'use client';

import { cloneElement, useId, type InputHTMLAttributes, type ReactElement, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx, Icon } from './primitives';

type Option = string | { value: string; label: string };
type Common = { invalid?: boolean; className?: string };
export type InputProps =
  | (Common & { as?: 'input' } & InputHTMLAttributes<HTMLInputElement>)
  | (Common & { as: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  | (Common & { as: 'select'; options: Option[] } & SelectHTMLAttributes<HTMLSelectElement>);

export function Input(props: InputProps) {
  const { invalid, className, ...rest } = props;
  const cls = cx('al-input', className);
  const aria = invalid ? { 'aria-invalid': true as const } : {};
  if (rest.as === 'textarea') { const { as: _a, ...t } = rest; return <textarea {...t} {...aria} className={cls} />; }
  if (rest.as === 'select') {
    const { as: _a, options, ...s } = rest;
    return (
      <select {...s} {...aria} className={cls}>
        {options.map((o) => { const v = typeof o === 'string' ? o : o.value; const l = typeof o === 'string' ? o : o.label; return <option key={v} value={v}>{l}</option>; })}
      </select>
    );
  }
  const { as: _a, ...i } = rest;
  return <input {...i} {...aria} className={cls} />;
}

export function Field({ label, hint, error, required, id, className, children }: {
  label: ReactNode; hint?: ReactNode; error?: ReactNode; required?: boolean; id?: string; className?: string;
  children: ReactElement<{ id?: string; invalid?: boolean; required?: boolean; 'aria-describedby'?: string }>;
}) {
  const auto = useId();
  const fid = id ?? auto;
  const describedBy = error ? `${fid}-e` : hint ? `${fid}-h` : undefined;
  return (
    <div className={cx('al-fld', className)}>
      <label className="al-label" htmlFor={fid}><span>{label}</span>{required && <span className="al-req">Obbligatorio</span>}</label>
      {cloneElement(children, { id: fid, invalid: !!error, required, 'aria-describedby': describedBy })}
      {error ? <div className="al-error" id={`${fid}-e`}>{error}</div> : hint ? <div className="al-hint" id={`${fid}-h`}>{hint}</div> : null}
    </div>
  );
}

export function Checkbox({ children, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { children: ReactNode }) {
  return (
    <label className={cx('al-check', className)}>
      <input type="checkbox" {...rest} />
      <span className="al-box" aria-hidden="true"><Icon name="check" size={11} /></span>
      <span>{children}</span>
    </label>
  );
}
