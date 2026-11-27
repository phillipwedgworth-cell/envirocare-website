// lib/leads/attribution.ts — which page a web lead came from.
//
// WHY THIS EXISTS (2026-11-27)
// Every web lead since August has an empty leads.source_url and no page data in
// leads.raw, so nobody can say which pages produce inquiries. The Nov 27 audit
// could rank pages by Search Console impressions but could not connect a single
// one of the 51 web leads (Aug 28 - Nov 25) to the page it came from.
//
// What is recorded (browser sessionStorage only, cleared when the tab closes):
//   landing_page    first path seen this session, no query string
//   page            path where the form was submitted
//   referrer_host   host name of the external referrer, never the full URL
//   utm_source / utm_medium / utm_campaign   from the landing URL, if present
//   gbp_booking     true when the landing URL carried Google's rwg_token
//                   (the "Book" / appointment link on a Google Business Profile)
//   gclid           true when the landing URL carried a Google Ads click id
//
// Nothing personal is read or stored here. Query strings are never copied
// whole: only the three utm_* values are kept, trimmed, and the rest is reduced
// to true/false flags. The form sends this object as `attribution`, and
// app/api/quote/route.ts already stores the whole request body in leads.raw.
//
// Read it back in Supabase with, for example:
//   select raw->'attribution'->>'landing_page', count(*) from leads group by 1;

const KEY = 'ec_lead_attribution_v1';
const MAX = 120;

export type LeadAttribution = {
  landing_page: string;
  page: string;
  referrer_host: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gbp_booking?: boolean;
  gclid?: boolean;
  first_seen?: string;
};

const clip = (s: string | null | undefined) => (s ? String(s).slice(0, MAX) : '');

function readStore(): LeadAttribution | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LeadAttribution) : null;
  } catch {
    return null;
  }
}

function externalReferrerHost(): string {
  try {
    if (!document.referrer) return '';
    const host = new URL(document.referrer).hostname.toLowerCase();
    if (host === location.hostname.toLowerCase()) return '';
    return clip(host);
  } catch {
    return '';
  }
}

/** Record the first page of the session. Safe to call on every navigation. */
export function captureFirstTouch(): void {
  if (typeof window === 'undefined') return;
  if (readStore()) return;
  try {
    const params = new URLSearchParams(location.search);
    const first: LeadAttribution = {
      landing_page: clip(location.pathname || '/'),
      page: clip(location.pathname || '/'),
      referrer_host: externalReferrerHost(),
      first_seen: new Date().toISOString(),
    };
    const src = params.get('utm_source');
    const med = params.get('utm_medium');
    const cmp = params.get('utm_campaign');
    if (src) first.utm_source = clip(src);
    if (med) first.utm_medium = clip(med);
    if (cmp) first.utm_campaign = clip(cmp);
    if (params.has('rwg_token')) first.gbp_booking = true;
    if (params.has('gclid')) first.gclid = true;
    window.sessionStorage.setItem(KEY, JSON.stringify(first));
  } catch {
    // Private browsing or storage disabled: the form still works, it just
    // reports the submit page with no landing page.
  }
}

/** The object a form sends as `attribution`. Never throws. */
export function leadAttribution(): LeadAttribution {
  if (typeof window === 'undefined') return { landing_page: '', page: '', referrer_host: '' };
  const page = clip(location.pathname || '/');
  const stored = readStore();
  if (stored) return { ...stored, page };
  return { landing_page: page, page, referrer_host: externalReferrerHost() };
}
