/**
 * America250Banner — patriotic Independence Day banner for the U.S. Semiquincentennial.
 *
 * BEHAVIOR:
 *  - Renders ONLY between Jul 3, 2026 and end-of-day Jul 10, 2026 (America/Chicago).
 *  - After Jul 10 it renders nothing — no cleanup deploy needed. Flip the dates to reuse.
 *  - Dismissible (X); dismissal persists via localStorage so it doesn't nag.
 *  - Sits as a slim strip above the sitewide <Header /> (app/layout.tsx).
 *
 * COMPLIANCE (re-scanned 2026-07-04): no discount/bundle/same-day/safety-claim language.
 *   ("safe" intentionally avoided — holiday message says "happy, festive, and joyful".)
 */
'use client';

import { useEffect, useState } from 'react';

const SHOW_FROM = new Date('2026-07-03T00:00:00-05:00').getTime();
const SHOW_UNTIL = new Date('2026-07-11T00:00:00-05:00').getTime(); // hides at start of Jul 11
const DISMISS_KEY = 'ec-america250-2026-patriotic';

const CSS = `
.ec250 { position:relative; background:linear-gradient(135deg,#0A2A66 0%,#123C8C 38%,#B31942 100%); color:#fff; border-bottom:4px solid #FFD700; overflow:hidden; z-index:60; }
.ec250::before { content:""; position:absolute; inset:0; pointer-events:none; opacity:.55;
  background-image:
    radial-gradient(1.6px 1.6px at 25px 18px, rgba(255,255,255,.7), transparent),
    radial-gradient(1.4px 1.4px at 80px 52px, rgba(255,255,255,.45), transparent),
    radial-gradient(1.2px 1.2px at 130px 28px, rgba(255,255,255,.55), transparent),
    radial-gradient(1px 1px at 175px 66px, rgba(255,255,255,.4), transparent),
    radial-gradient(1.6px 1.6px at 220px 40px, rgba(255,215,0,.5), transparent);
  background-size:250px 90px; }
.ec250::after { content:""; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(circle at 14% 12%, rgba(255,215,0,.22), transparent 42%),
    radial-gradient(circle at 90% 88%, rgba(255,255,255,.16), transparent 46%),
    radial-gradient(circle at 66% 8%, rgba(255,215,0,.13), transparent 40%); }
.ec250-inner { position:relative; z-index:2; max-width:1200px; margin:0 auto; padding:12px 54px 12px 22px; display:flex; align-items:center; gap:22px; }
.ec250-text { flex:1; min-width:0; }
.ec250-eyebrow { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; font-weight:700; color:#FFD700; margin-bottom:3px; }
.ec250-headline { font-family:var(--font-playfair), Georgia, serif; font-weight:800; font-size:clamp(1.1rem,3.2vw,1.7rem); line-height:1.08; letter-spacing:.01em; text-shadow:0 1px 6px rgba(0,0,0,.28); }
.ec250-sub { font-size:clamp(.78rem,1.7vw,.92rem); line-height:1.35; margin-top:4px; opacity:.97; }
.ec250-msg { font-size:clamp(.72rem,1.5vw,.83rem); line-height:1.3; margin-top:4px; color:#FFD700; font-weight:600; }
.ec250-cta { flex:none; background:#FFD700; color:#0A2A66; font-weight:800; font-size:.84rem; padding:10px 18px; border-radius:8px; text-decoration:none; white-space:nowrap; box-shadow:0 2px 10px rgba(0,0,0,.28); transition:background .15s ease; }
.ec250-cta:hover { background:#ffe14d; }
.ec250-flag { flex:none; width:104px; filter:drop-shadow(0 2px 6px rgba(0,0,0,.35)); transform-origin:left center; animation:ec250wave 5.5s ease-in-out infinite; }
@keyframes ec250wave { 0%,100%{transform:rotate(-1.1deg) skewX(0deg);} 50%{transform:rotate(1.1deg) skewX(-3deg);} }
.ec250-x { position:absolute; right:12px; top:12px; z-index:3; width:26px; height:26px; border:none; border-radius:50%; background:rgba(255,255,255,.18); color:#fff; font-size:13px; line-height:1; cursor:pointer; }
.ec250-x:hover { background:rgba(255,255,255,.3); }
@media (max-width:640px){
  .ec250-inner{ flex-wrap:wrap; justify-content:center; text-align:center; gap:9px; padding:12px 38px 13px 16px; }
  .ec250-text{ flex-basis:100%; }
  .ec250-flag{ position:absolute; top:9px; right:9px; width:50px; animation:none; }
  .ec250-cta{ order:3; }
}
@media (prefers-reduced-motion:reduce){ .ec250-flag{ animation:none; } }
`;

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
    <div className="ec250" role="region" aria-label="Independence Day announcement">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ec250-inner">
        <div className="ec250-text">
          <div className="ec250-eyebrow">🇺🇸 Happy Independence Day</div>
          <div className="ec250-headline">Happy 250th, America!</div>
          <div className="ec250-sub">
            Celebrating America&rsquo;s Semiquincentennial — and 68 years of protecting
            Alabama homes and families since 1958.
          </div>
          <div className="ec250-msg">
            From all of us at EnviroCare, we wish you a happy, festive, and joyful Fourth of July.
          </div>
        </div>
        <a className="ec250-cta" href="/quote">Schedule Service</a>
        <div className="ec250-flag" aria-hidden="true">
          <svg viewBox="0 0 104 68" width="104" height="68" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 3 }}>
            <rect width="104" height="68" fill="#F7F7F7" />
            <g fill="#B31942">
              <rect y="0" width="104" height="5.23" /><rect y="10.46" width="104" height="5.23" />
              <rect y="20.92" width="104" height="5.23" /><rect y="31.38" width="104" height="5.23" />
              <rect y="41.84" width="104" height="5.23" /><rect y="52.3" width="104" height="5.23" />
              <rect y="62.76" width="104" height="5.23" />
            </g>
            <rect width="43" height="36.6" fill="#0A2A66" />
            <g fill="#fff">
              <circle cx="7" cy="6" r="1.5" /><circle cx="16" cy="6" r="1.5" /><circle cx="25" cy="6" r="1.5" /><circle cx="34" cy="6" r="1.5" />
              <circle cx="11.5" cy="12" r="1.5" /><circle cx="20.5" cy="12" r="1.5" /><circle cx="29.5" cy="12" r="1.5" />
              <circle cx="7" cy="18" r="1.5" /><circle cx="16" cy="18" r="1.5" /><circle cx="25" cy="18" r="1.5" /><circle cx="34" cy="18" r="1.5" />
              <circle cx="11.5" cy="24" r="1.5" /><circle cx="20.5" cy="24" r="1.5" /><circle cx="29.5" cy="24" r="1.5" />
              <circle cx="7" cy="30" r="1.5" /><circle cx="16" cy="30" r="1.5" /><circle cx="25" cy="30" r="1.5" /><circle cx="34" cy="30" r="1.5" />
            </g>
          </svg>
        </div>
      </div>
      <button className="ec250-x" aria-label="Dismiss announcement" onClick={dismiss}>✕</button>
    </div>
  );
}
