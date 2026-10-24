'use client';

import {
  Children, cloneElement, createContext, isValidElement, useContext, useEffect, useLayoutEffect, useRef, useState,
  type CSSProperties, type ElementType, type ReactNode,
} from 'react';
import { cx } from '@/components/alpwise';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const ScenePlaying = createContext(true);

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Una sezione che anima i figli quando entra in vista. A riposo (server, senza JS) è già tutto visibile. */
export function Scene({ as: Tag = 'div', className, style, id, children, ...rest }: {
  as?: ElementType; className?: string; style?: CSSProperties; id?: string; children?: ReactNode; 'aria-label'?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'idle' | 'armed' | 'play'>('idle');
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight * 0.9 && r.bottom > 0) { setState('play'); return; }
    setState('armed');
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setState('play'); io.disconnect(); } }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} id={id} style={style} className={cx(className, state === 'armed' && 'is-armed', state === 'play' && 'is-play')} {...rest}>
      <ScenePlaying.Provider value={state === 'play'}>{children}</ScenePlaying.Provider>
    </Tag>
  );
}

/** Divide il testo in parole mascherate; gli elementi figli restano interi e contano come una parola. */
export function Words({ children, start = 0 }: { children: ReactNode; start?: number }) {
  let i = start;
  const out: ReactNode[] = [];
  Children.toArray(children).forEach((c, k) => {
    if (typeof c === 'string' || typeof c === 'number') {
      String(c).split(/(\s+)/).forEach((t, j) => {
        if (!t) return;
        if (/^\s+$/.test(t)) out.push(' ');
        else out.push(<span key={`${k}-${j}`} className="al-w"><span className="al-wi" style={{ '--i': i++ } as CSSProperties}>{t}</span></span>);
      });
    } else if (isValidElement(c) && c.type === 'br') {
      out.push(<br key={k} />);
    } else if (isValidElement(c)) {
      out.push(<span key={k} className="al-w"><span className="al-wi" style={{ '--i': i++ } as CSSProperties}>{c}</span></span>);
    }
  });
  return <>{out}</>;
}

/** Testo mono che si decodifica carattere per carattere. */
export function Scramble({ text, delay = 0, duration = 650, className, style }: { text: string; delay?: number; duration?: number; className?: string; style?: CSSProperties }) {
  const playing = useContext(ScenePlaying);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !playing || reduced) return;
    const G = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·─';
    let raf = 0, t0: number | null = null;
    const tick = (t: number) => {
      t0 ??= t;
      const p = (t - t0 - delay) / duration;
      if (p < 0) el.textContent = text.replace(/\S/g, ' ');
      else { const n = Math.floor(Math.min(p, 1) * text.length); el.textContent = text.slice(0, n) + text.slice(n).replace(/\S/g, () => G[(Math.random() * G.length) | 0]); }
      if (p < 1) raf = requestAnimationFrame(tick); else el.textContent = text;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.textContent = text; };
  }, [playing, reduced, text, delay, duration]);
  return <span className={cx('al-mono', className)} style={style} aria-label={text}><span ref={ref} aria-hidden="true">{text}</span></span>;
}

/** Parola evidenziata che cambia a intervalli. I lettori di schermo leggono solo la prima. */
export function RotatingWord({ words, every = 2600 }: { words: string[]; every?: number }) {
  const playing = useContext(ScenePlaying);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !playing || reduced) return;
    let k = 0;
    const iv = setInterval(() => {
      k = (k + 1) % words.length;
      const out = el.animate([{ transform: 'none' }, { transform: 'translateY(-110%)' }], { duration: 380, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
      out.onfinish = () => { el.textContent = words[k]; el.animate([{ transform: 'translateY(110%)' }, { transform: 'none' }], { duration: 520, easing: 'cubic-bezier(.2,.7,0,1)', fill: 'forwards' }); };
    }, every);
    return () => { clearInterval(iv); el.getAnimations().forEach((a) => a.cancel()); el.textContent = words[0]; };
  }, [playing, reduced, words, every]);
  return (
    <>
      <span className="al-hl-x" aria-hidden="true"><span className="al-w"><span ref={ref} className="al-rot">{words[0]}</span></span></span>
      <span className="sr-only">{words[0]}</span>
    </>
  );
}

/** Lettura legata allo scroll: le parole passano da text-muted a text mentre il paragrafo attraversa lo schermo. */
export function ScrollRead({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const [lit, setLit] = useState(words.length);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) { setLit(words.length); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = innerHeight;
      const startY = vh * 0.85, endY = vh * 0.5; // inizia quando la cima è all'85%, finisce quando il fondo è a metà schermo
      const p = (startY - r.top) / (startY - endY + r.height);
      setLit(Math.round(Math.max(0, Math.min(1, p)) * words.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [reduced, words.length]);
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} style={{ color: i < lit ? 'var(--text)' : 'var(--text-muted)', transition: 'color 200ms linear' }}>{w}{i < words.length - 1 ? ' ' : ''}</span>
      ))}
    </p>
  );
}

/** 12 colonne hairline che si disegnano. */
export function Columns({ onHorizon, delay = 0 }: { onHorizon?: boolean; delay?: number }) {
  return (
    <div className={cx('al-cols', onHorizon && 'al-cols-hz')} aria-hidden="true" style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--i': i } as CSSProperties} />)}
    </div>
  );
}

/** Imposta l'indice --i sui figli di un contenitore data-m="stagger". */
export function Stagger({ as: Tag = 'div', delay = 0, className, children }: { as?: ElementType; delay?: number; className?: string; children: ReactNode }) {
  return (
    <Tag data-m="stagger" className={className} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {Children.toArray(children).map((c, i) => (isValidElement<{ style?: CSSProperties }>(c) ? cloneElement(c, { style: { ...(c.props.style ?? {}), '--i': i } as CSSProperties }) : c))}
    </Tag>
  );
}

