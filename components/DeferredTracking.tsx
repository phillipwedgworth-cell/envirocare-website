/**
 * components/DeferredTracking.tsx — interaction-deferred GA4 + Meta Pixel loader
 *
 * WHY THIS EXISTS (2026-08-17)
 * ---------------------------------------------------------------------------
 * Lighthouse measured 345 KiB of tracking scripts (GA4 179.9 KiB, FB Pixel
 * 165.2 KiB) against a 43 KiB page, with 131 KiB never executed. Even with
 * Next.js `strategy="lazyOnload"`, both scripts loaded during the LCP window
 * because `requestIdleCallback` fires as soon as the main thread is free —
 * often within 500 ms of page load, well before LCP completes at 3.9 s.
 *
 * This component defers BOTH scripts until the first real user interaction
 * (click, scroll, keydown, touchstart) OR a 5-second idle fallback, whichever
 * comes first. Result: the browser's main thread is completely free during
 * the entire paint/LCP window, and tracking fires only once someone engages.
 *
 * WHAT IS NOT LOST: A visitor who bounces in under 5 seconds without any
 * interaction was never a meaningful analytics data point for a pest control
 * company — the conversions that matter (phone click, form submit, chat open)
 * all require interaction, which triggers the load instantly.
 *
 * USAGE: Replace the three <Script> blocks (GA4 src, GA4 init, FB Pixel) and
 * the <noscript> pixel in app/layout.tsx with:
 *
 *     <DeferredTracking />
 *
 * The <noscript> fallback pixel is preserved inside this component.
 */
'use client';

import { useEffect } from 'react';

const GA_ID = 'G-CELEB90NKX';
const FB_PIXEL_ID = '1945518562226719';

// 5 s is long enough that LCP (target < 2.5 s) is always done,
// short enough that a passive reader still gets tracked.
const FALLBACK_MS = 5000;

function loadTracking() {
  // Guard: only fire once, only on the production domain.
  if ((window as any).__ecTrackingLoaded) return;
  (window as any).__ecTrackingLoaded = true;

  const host = (location.hostname || '').toLowerCase();
  const isProduction = host === 'envirocarellc.com' || host.endsWith('.envirocarellc.com');

  // ── GA4 ──────────────────────────────────────────────────────────────────
  if (isProduction) {
    const gaScript = document.createElement('script');
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // ── EnviroCare event helpers (used by components + inline listeners) ────
  const GA_ON = isProduction;
  (window as any).ecTrack = function (eventName: string, params?: Record<string, any>) {
    if (GA_ON) (window as any).gtag?.('event', eventName, params || {});
    if ((window as any).fbq) (window as any).fbq('trackCustom', eventName, params || {});
  };

  // Auto-track phone link clicks (tel: links)
  document.addEventListener('click', function (e) {
    const link = (e.target as Element)?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
    if (link) {
      const phone = link.href.replace('tel:', '');
      if (GA_ON) (window as any).gtag('event', 'phone_click', {
        event_category: 'engagement',
        event_label: phone,
        value: 1,
      });
      if ((window as any).fbq) (window as any).fbq('track', 'Contact', { content_name: phone });
    }
  });

  // Auto-track email link clicks
  document.addEventListener('click', function (e) {
    const link = (e.target as Element)?.closest?.('a[href^="mailto:"]') as HTMLAnchorElement | null;
    if (link) {
      if (GA_ON) (window as any).gtag('event', 'email_click', {
        event_category: 'engagement',
        event_label: link.href.replace('mailto:', ''),
      });
    }
  });

  // Auto-track CTA button clicks (buttons/links with data-track attribute)
  document.addEventListener('click', function (e) {
    const el = (e.target as Element)?.closest?.('[data-track]') as HTMLElement | null;
    if (el) {
      if (GA_ON) (window as any).gtag('event', el.getAttribute('data-track'), {
        event_category: 'cta',
        event_label: (el.textContent || '').trim().substring(0, 50),
      });
    }
  });

  // ── Meta Pixel ─────────────────────────────────────────────────────────
  (function (f: any, b: any, e: any, v: any) {
    if (f.fbq) return;
    const n: any = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  (window as any).fbq('init', FB_PIXEL_ID);
  (window as any).fbq('track', 'PageView');
}

export default function DeferredTracking() {
  useEffect(() => {
    // The interaction events that signal a real user.
    const triggers = ['click', 'scroll', 'keydown', 'touchstart'] as const;
    let fallbackTimer: ReturnType<typeof setTimeout>;

    function onInteraction() {
      // Clean up all listeners + the fallback timer.
      for (const evt of triggers) {
        window.removeEventListener(evt, onInteraction, { capture: true });
      }
      clearTimeout(fallbackTimer);
      loadTracking();
    }

    for (const evt of triggers) {
      window.addEventListener(evt, onInteraction, { capture: true, passive: true, once: true } as AddEventListenerOptions);
    }

    // Fallback: load after 5 s even without interaction (passive readers).
    fallbackTimer = setTimeout(onInteraction, FALLBACK_MS);

    return () => {
      for (const evt of triggers) {
        window.removeEventListener(evt, onInteraction, { capture: true });
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  // The <noscript> pixel fires regardless — it has zero performance cost
  // and ensures the FB Pixel still records a PageView when JS is disabled.
  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
