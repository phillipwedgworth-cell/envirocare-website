'use client';
// lib/use-office-phone.ts
//
// Which office number the header call button and the mobile action bar dial.
//
// WHY (2026-10-05): phoneForPath() maps a URL to an office. /quote, /pricing and
// /contact-us belong to no city, so they fell back to the Alabaster main line —
// a Huntsville visitor who tapped "Get Free Quote" on /huntsville saw the header
// switch from (256) 937-7676 to (205) 940-6360 halfway through the journey.
//
// Fix: remember the office of the last CITY page the visitor was on (per tab,
// sessionStorage) and use it on the neutral journey pages only. Everywhere else
// the URL still decides, so a city page can never show another city's number.
//
// SSR and the first client render use the URL-only answer (identical HTML, no
// hydration mismatch); the remembered office swaps in after mount. Storage is
// optional — private mode or blocked storage just means the old behavior.
import { useEffect, useState } from 'react';
import { phoneForPath, hasOwnOffice } from '../data/city-offices';

const KEY = 'ec:office-path';
// Pages that are part of every office's journey and have no office of their own.
const NEUTRAL = new Set(['quote', 'pricing', 'contact-us', 'request-appointment', 'thank-you']);

const firstSegment = (p: string) => p.split('/').filter(Boolean)[0] ?? '';

export function useOfficePhone(pathname: string) {
  const fromUrl = phoneForPath(pathname);
  const [office, setOffice] = useState(fromUrl);

  useEffect(() => {
    let remembered: string | null = null;
    try {
      if (hasOwnOffice(pathname)) {
        window.sessionStorage.setItem(KEY, pathname);
      } else if (NEUTRAL.has(firstSegment(pathname))) {
        remembered = window.sessionStorage.getItem(KEY);
      }
    } catch {
      /* storage unavailable: fall back to the URL */
    }
    setOffice(remembered ? phoneForPath(remembered) : phoneForPath(pathname));
  }, [pathname]);

  return office;
}
