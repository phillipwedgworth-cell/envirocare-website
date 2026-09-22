'use client';

/**
 * Sitewide mobile bottom action bar: Call / Pay Bill / Quote.
 *
 * Replaces StickyCallButton, which was mounted only in Homepage.tsx and so
 * never appeared on a city, service or blog page — the pages most mobile
 * traffic actually lands on.
 *
 * THREE THINGS THIS FIXES, all confirmed against the repo 2026-09-22:
 *
 *  1. Pay Bill is unreachable on phones. Header.tsx:282 sets
 *     `.sh-pay { display: none }` at max-width 980px, and the only mobile
 *     substitute is a hamburger item labelled "Customer Login" (Header.tsx:227)
 *     that never says "Pay Bill". Footer.tsx has no pay link at all.
 *
 *  2. StickyCallButton hardcoded `tel:2059406360`. On /birmingham the header
 *     dialled (205) 991-2882 while the sticky button dialled the Alabaster
 *     line from the same screen. This component takes its number from
 *     phoneForPath(), the same source the header uses, so the two can never
 *     disagree again.
 *
 *  3. Pay Bill points at PAY_BILL_URL (the Key7 portal), matching both places
 *     the header links it. NOT /pay — that route is a list of office phone
 *     numbers to call, not a payment page, and sending a "Pay Bill" tap there
 *     would be a dead end.
 *
 * BEHAVIOUR PORTED FROM StickyCallButton — do not drop these in a rewrite.
 * Both were explicit Phillip requests (Jul 2026, "reduce mobile clutter"):
 *   - slides away while scrolling DOWN mid-page, returns on scroll up, near
 *     the top/bottom, or after a ~1.2s pause
 *   - hides entirely while a form field is focused, so it can never cover an
 *     input on a phone
 * An always-on bar would undo both.
 *
 * Breakpoint is 980px to match the header's own desktop/mobile split
 * (Header.tsx:281), so the bar appears exactly when `.sh-pay` disappears.
 */

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { phoneForPath } from '../data/city-offices';

// Same destination the header uses in both places (Header.tsx:31).
const PAY_BILL_URL = 'https://payenvirocare.key7app.com/User/Login';

function trackClick(action: string) {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof window !== 'undefined' && typeof w.gtag === 'function') {
      w.gtag('event', action, { placement: 'mobile_bar' });
    }
  } catch {
    // analytics must never break the tap
  }
}

export default function MobileActionBar() {
  const pathname = usePathname();
  const office = phoneForPath(pathname ?? '/');

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
        setScrolledAway(true);
      } else if (delta < -8 || y <= 320 || nearBottom) {
        setScrolledAway(false);
      }
      lastY.current = y;
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
    <nav
      className={`mab-bar${hidden ? ' mab-hidden' : ''}`}
      aria-label="Quick actions"
    >
      <a
        href={office.phoneHref}
        className="mab-item mab-call"
        onClick={() => trackClick('call_click')}
        aria-label={`Call EnviroCare ${office.label} at ${office.phone}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>Call</span>
      </a>

      <a
        href={PAY_BILL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mab-item mab-pay"
        onClick={() => trackClick('pay_bill_click')}
        aria-label="Pay my bill (opens the customer portal in a new tab)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
        <span>Pay Bill</span>
      </a>

      <a
        href="/quote"
        className="mab-item mab-quote"
        onClick={() => trackClick('get_quote_click')}
        aria-label="Get a free quote"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <span>Quote</span>
      </a>

      <style jsx>{`
        .mab-bar {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 200;
          display: none;
          grid-template-columns: repeat(3, 1fr);
          background: #fff;
          border-top: 1px solid #E0DACE;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.08);
          padding-bottom: env(safe-area-inset-bottom, 0);
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        @media (max-width: 980px) {
          .mab-bar { display: grid; }
        }
        .mab-hidden {
          transform: translateY(110%);
          opacity: 0;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .mab-bar { transition: none; }
        }
        .mab-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 10px 4px 8px;
          min-height: 56px;
          font-family: var(--font-sans, system-ui, sans-serif);
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          color: #0A7935;
          -webkit-tap-highlight-color: transparent;
        }
        .mab-item:active { background: #F2F6EF; }
        .mab-call { color: #0A7935; }
        .mab-pay { background: #07642B; color: #fff; }
        .mab-pay:active { background: #0A7935; }
        .mab-quote { color: #B8860B; }
        .mab-quote svg { color: #F5A800; }
      `}</style>
    </nav>
  );
}
