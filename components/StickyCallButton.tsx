'use client';

/**
 *
 * Mobile-only fixed bottom action bar: a single full-width Call button.
 * Quote lives in the hero + pricing CTAs, so the persistent bar handles the
 * one thing those don't — tap to call. Hidden >=900px (desktop has header
 * phones). Respects the iOS bottom safe area and slides out of the way while
 * a form field is focused so it can never cover an input. The chat launcher
 * sits above this bar (see ChatWidget), so they never overlap.
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
          <span className="sc-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </span>
          <span className="sc-text">
            <span className="sc-label">Tap to call EnviroCare — free quote</span>
            <span className="sc-num">(205) 940-6360</span>
          </span>
        </a>
      </div>
    </>
  );
}

const STICKY_CSS = `
.sc-wrap {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(10px + env(safe-area-inset-bottom, 0px));
  z-index: 9998;
  display: flex;
  font-family: 'DM Sans', system-ui, sans-serif;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.sc-hidden { transform: translateY(180%); opacity: 0; pointer-events: none; }
.sc-call {
  flex: 1;
  min-width: 0;
  display: flex; align-items: center; justify-content: center; gap: 12px;
  background: #0E8E40; color: #fff !important; text-decoration: none;
  padding: 10px 20px; border-radius: 999px; min-height: 56px;
  box-shadow: 0 8px 24px rgba(14,26,15,0.25), 0 2px 6px rgba(14,26,15,0.12);
  transition: transform 0.1s;
}
.sc-call:active { transform: translateY(1px); }
.sc-icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sc-text { display: flex; flex-direction: column; line-height: 1.15; min-width: 0; }
.sc-label { font-size: 11px; opacity: 0.9; font-weight: 500; white-space: nowrap; }
.sc-num { font-size: 18px; font-weight: 700; letter-spacing: 0.01em; white-space: nowrap; }
@media (min-width: 900px) { .sc-wrap { display: none; } }
`;
