'use client';

/**
 *
 * Mobile-only fixed bottom action bar: a single clean row with Call + Get Quote.
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
        <a href="tel:2059406360" className="sc-call" aria-label="Call EnviroCare at (205) 940-6360">
          <svg className="sc-icon" viewBox="0 0 24 24" width="20" height="20" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="sc-num">Call</span>
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
  flex-direction: row;
  gap: 8px;
  padding: 8px;
  border-radius: 16px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(14,26,15,0.18), 0 2px 8px rgba(14,26,15,0.10);
  font-family: 'DM Sans', system-ui, sans-serif;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.sc-hidden { transform: translateY(180%); opacity: 0; pointer-events: none; }
.sc-call {
  flex: 0 0 auto;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: #0E8E40; color: #fff !important; text-decoration: none;
  padding: 0 18px; border-radius: 12px; min-height: 50px;
  font-weight: 700; font-size: 15px;
  transition: transform 0.1s;
}
.sc-call:active { transform: translateY(1px); }
.sc-icon { flex-shrink: 0; }
.sc-num { font-size: 15px; font-weight: 700; letter-spacing: 0.01em; }
.sc-quote {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; border-radius: 12px; min-height: 50px;
  font-weight: 700; font-size: 15px;
  background: #F5A800; color: #0E1A0F !important;
  transition: transform 0.1s;
}
.sc-quote:active { transform: translateY(1px); }
@media (min-width: 900px) { .sc-wrap { display: none; } }
`;
