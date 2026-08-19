// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/StickyCallButton.tsx
// Commit: feat(ui): scroll-aware mobile action bar — hides while reading, returns on scroll-up/pause
// Push: main
// ──────────────────────────────────────

'use client';

/**
 * Mobile-only fixed bottom action bar: Call (with number) + Get a Free Quote.
 * Hidden >=900px (desktop has header phones). Reserves the bottom-right
 * corner so it never overlaps the chat launcher, respects the iOS bottom
 * safe area, and slides out of the way while a form field is focused so
 * it can never cover an input.
 *
 * SCROLL-AWARE (Jul 2026, Phillip request — reduce mobile clutter):
 * the bar no longer rides the screen constantly. It slides away while the
 * visitor scrolls DOWN (reading), and returns when they scroll UP, pause
 * for ~1.2s, or are near the top/bottom of the page. Field-focus hiding
 * still wins over everything.
 */

import { useEffect, useRef, useState } from 'react';

export default function StickyCallButton() {
  const [fieldHidden, setFieldHidden] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    const onIn = (e: FocusEvent) => { if (isField(e.target)) setFieldHidden(true); };
    const onOut = () => setFieldHidden(false);
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 120;
      if (delta > 8 && y > 320 && !nearBottom) {
        // scrolling down mid-page: get out of the way
        setScrolledAway(true);
      } else if (delta < -8 || y <= 320 || nearBottom) {
        // scrolling up, near top, or reached the end: offer the CTA
        setScrolledAway(false);
      }
      lastY.current = y;
      // reappear after the reader pauses
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setScrolledAway(false), 1200);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const hidden = fieldHidden || scrolledAway;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STICKY_CSS }} />
      <div className={`sc-wrap${hidden ? ' sc-hidden' : ''}`}>
        <a href="tel:2059406360" className="sc-call" aria-label="Call EnviroCare at (205) 940-6360">
          <svg className="sc-icon" viewBox="0 0 24 24" width="20" height="20" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="sc-text">
            <span className="sc-label">Call EnviroCare</span>
            <span className="sc-num">(205) 940-6360</span>
          </span>
        </a>
        <a href="/quote" className="sc-quote">Get a Free Quote</a>
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
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 20px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(14,26,15,0.18), 0 2px 8px rgba(14,26,15,0.10);
  font-family: var(--font-sans);
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.sc-hidden { transform: translateY(180%); opacity: 0; pointer-events: none; }
.sc-call {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: #0E8E40; color: #fff !important; text-decoration: none;
  padding: 10px 18px; border-radius: 14px; min-height: 52px;
  transition: transform 0.1s;
}
.sc-call:active { transform: translateY(1px); }
.sc-icon { flex-shrink: 0; }
.sc-text { display: flex; flex-direction: column; line-height: 1.15; }
.sc-label { font-size: 11px; opacity: 0.9; font-weight: 500; }
.sc-num { font-size: 18px; font-weight: 700; letter-spacing: 0.01em; }
.sc-quote {
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; border-radius: 14px; min-height: 50px;
  font-weight: 700; font-size: 15px;
  background: #F5A800; color: #0E1A0F !important;
  transition: transform 0.1s;
}
.sc-quote:active { transform: translateY(1px); }
@media (min-width: 900px) { .sc-wrap { display: none; } }
`;
