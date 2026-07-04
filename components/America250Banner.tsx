/**
 * America250Banner — temporary celebratory strip for the U.S. Semiquincentennial.
 *
 * BEHAVIOR:
 *  - Renders ONLY between Jul 3, 2026 and end-of-day Jul 10, 2026 (America/Chicago).
 *  - After Jul 10 it renders nothing — no cleanup deploy needed. Safe to leave in
 *    the repo forever; flip the dates next season if you want to reuse the slot.
 *  - Dismissible (X). Dismissal persists via localStorage so it doesn't nag.
 *  - Client component; sits as a slim strip above the sitewide <Header />.
 *
 * COMPLIANCE (re-scanned 2026-07-04): no discount / bundle / same-day / safety-claim
 * language; "since 1958" + "family" only.
 */
'use client';

import { useEffect, useState } from 'react';

const SHOW_FROM = new Date('2026-07-03T00:00:00-05:00').getTime();
const SHOW_UNTIL = new Date('2026-07-11T00:00:00-05:00').getTime(); // hides start of Jul 11
const DISMISS_KEY = 'ec-banner-america250-2026';

export default function America250Banner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const now = Date.now();
    if (now < SHOW_FROM || now >= SHOW_UNTIL) return;
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === '1') return;
    } catch {
      /* storage blocked — still show */
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* no-op */
    }
  };

  return (
    <div
      role="region"
      aria-label="Independence Day announcement"
      style={{
        background:
          'linear-gradient(90deg, #07642B 0%, #0A7935 45%, #0E8E40 100%)',
        color: '#FEFDF8',
        position: 'relative',
        zIndex: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '10px 44px 10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          flexWrap: 'wrap',
          textAlign: 'center',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
          lineHeight: 1.35,
        }}
      >
        <span aria-hidden="true" style={{ fontSize: '1.1em' }}>🇺🇸</span>
        <span>
          <strong style={{ color: '#F5A800' }}>Happy 250th, America!</strong>{' '}
          Celebrating our nation&rsquo;s Semiquincentennial — and 68 years of
          caring for Alabama families since 1958. Happy Independence Day from
          all of us at EnviroCare.
        </span>
        <span aria-hidden="true" style={{ fontSize: '1.1em' }}>🎆</span>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        style={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(254,253,248,0.15)',
          border: 'none',
          color: '#FEFDF8',
          width: 26,
          height: 26,
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: 14,
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}
