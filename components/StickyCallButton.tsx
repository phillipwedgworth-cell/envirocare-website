'use client';

/**
 *
 * Mobile-only fixed bottom action bar: Call + Get Quote.
 * Hidden >=900px (desktop has header phones). Reserves the bottom-right
 * corner so it never overlaps the chat launcher, respects the iOS bottom
 * safe area, and slides out of the way while a form field is focused so
 * it can never cover an input.
 */

import { useEffect, useState } from 'react';

export default function StickyCallButton() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    const onIn = (e: FocusEvent) => { if (isField(e.target)) setHidden(true); };
    const onOut = () => setHidden(false);
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STICKY_CSS }} />
      <div className={`sc-wrap${hidden ? ' sc-hidden' : ''}`}>
        <a href="tel:2059406360" className="sc-call">
          <span className="sc-icon">📞</span>
          <span className="sc-text">
            <span className="sc-label">Call EnviroCare</span>
            <span className="sc-num">(205) 940-6360</span>
          </span>
        </a>
        <a href="/quote" className="sc-quote">Get Quote</a>
      </div>
    </>
  );
}

const STICKY_CSS = `
.sc-wrap {
  position: fixed;
  left: 12px;
  right: 76px;
  bottom: calc(10px + env(safe-area-inset-bottom, 0px));
  z-index: 9998;
  display: flex;
  gap: 8px;
  font-family: var(--font-sans);
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.sc-hidden { transform: translateY(180%); opacity: 0; pointer-events: none; }
.sc-call {
  flex: 1;
  display: flex; align-items: center; gap: 10px;
  background: #0A7935; color: #fff !important; text-decoration: none;
  padding: 12px 18px; border-radius: 999px; min-height: 56px;
  box-shadow: 0 8px 24px rgba(14,26,15,0.25), 0 2px 6px rgba(14,26,15,0.12);
  transition: transform 0.1s;
}
.sc-call:active { transform: translateY(1px); }
.sc-icon { font-size: 22px; flex-shrink: 0; }
.sc-text { display: flex; flex-direction: column; line-height: 1.15; }
.sc-label { font-size: 11px; opacity: 0.9; font-weight: 500; }
.sc-num { font-size: 17px; font-weight: 700; letter-spacing: 0.01em; }
.sc-quote {
  display: flex; align-items: center; justify-content: center;
  background: #F5A800; color: #0E1A0F !important; text-decoration: none;
  padding: 0 20px; border-radius: 999px; min-height: 56px;
  font-weight: 700; font-size: 14px; flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(14,26,15,0.20);
  transition: transform 0.1s;
}
.sc-quote:active { transform: translateY(1px); }
@media (min-width: 900px) { .sc-wrap { display: none; } }
`;
