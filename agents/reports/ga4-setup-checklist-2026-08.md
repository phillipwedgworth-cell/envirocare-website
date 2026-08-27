# GA4 Setup & Repair Checklist — Aug 27, 2026

Property: **313205131** (numeric — confirmed by Phillip 2026-08-27)
Site currently sends to Measurement ID: **G-CELEB90NKX** (`components/DeferredTracking.tsx`)

## Two different IDs — the reason this got confusing

| | Looks like | Used by | Where to find it |
|---|---|---|---|
| **Property ID** | `313205131` | the reporting/Data API (our `ingest-ga4` agent) | Admin → Property Settings |
| **Measurement ID** | `G-XXXXXXXXXX` | the tag in the visitor's browser | Admin → Data Streams → Web |

They are not interchangeable. `agents/ingest-ga4.mjs` even guards on it:
`"Missing GA4_PROPERTY_ID (numeric, NOT the G- measurement id)"`. The property ID
is fine and always was — the **Measurement ID** is the one under suspicion.

---

## P0 — Tracking is dead. Nothing else matters until this is fixed.

**Evidence (headless Chrome vs. production, 2026-08-27):** the tag loads
perfectly — gtag defined, dataLayer populated, container fetched (572 KB,
`state:2`), zero console/hydration errors — but **zero `/g/collect` requests**
are ever sent, confirmed via raw CDP and `performance.getEntriesByType`, and
still zero after forcing `gtag('consent','update', …all granted)`.

A dead/retired ID returns a stub container; ours returns a live one. The
remaining explanation is a **web data stream that was deleted and recreated**,
which mints a new `G-…` ID and orphans the old one. Timeline fits: 260
sessions Aug 13–19 → 1.

### The fix, either route

**Route A (fastest, 30 seconds — Phillip):**
GA4 → Admin → Data streams → Web → read the Measurement ID.
- Still `G-CELEB90NKX`? The theory is wrong; investigate tag settings /
  internal-traffic filters / data redaction instead.
- A different `G-…`? That is the whole bug.

**Route B (unlocks future automation — Phillip, 1 click):**
Enable the **Google Analytics Admin API** on Cloud project `124102656284`:
https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com/overview?project=124102656284
Then re-run the **GA4 Stream Check** workflow and it prints every stream, its
Measurement ID, and its `createTime` automatically.
(Auth is already working — the run failed *only* because this API is off.)

### Applying the answer
`NEXT_PUBLIC_GA_ID` in Vercel → Settings → Environment Variables → redeploy.
No code change needed (shipped in #117). Verify by loading the site, clicking
once, and watching for a `/g/collect` request in DevTools → Network.

---

## P1 — Settings worth fixing once data flows (all GA4 UI; ~15 min total)

1. **Data retention: 2 months → 14 months.** Admin → Data Settings → Data
   Retention. GA4 defaults to 2 and silently discards older user-level data —
   this is the single most commonly missed setting and it is not retroactive.
2. **Mark Key Events (conversions).** Admin → Events → mark as key event.
   `DeferredTracking.tsx` already fires `phone_click`, `email_click`, and
   `data-track` CTA events — GA4 just isn't counting them as conversions.
   For a pest control company the phone click *is* the conversion.
3. **Exclude the payment domain from referrals.** Admin → Data Streams → Web →
   Configure tag settings → List unwanted referrals → add
   `payenvirocare.key7app.com`. Otherwise customers returning from paying show
   up as brand-new referral sessions and attribution breaks.
4. **Filter internal traffic.** Admin → Data Streams → Configure tag settings →
   Define internal traffic (office IPs), then Admin → Data Filters → set the
   Internal Traffic filter to **Active** (it ships as "Testing" and does
   nothing until switched).
5. **Link Search Console.** Admin → Product links → Search Console links. Puts
   organic query data next to behavior data in one place.
6. **Confirm Enhanced Measurement is on** (scroll, outbound clicks, site
   search) — Admin → Data Streams → Web.

## What an agent can and cannot do here

- **Can (read-only, once the Admin API is enabled):** list streams, read
  Measurement IDs, verify retention/filters/links are configured — via the
  `GA4 Stream Check` workflow.
- **Cannot:** change any of the P1 settings. The stored OAuth refresh token is
  `analytics.readonly`. Writing would require re-authorizing with
  `analytics.edit` scope — worth doing only if these settings start changing
  often; for a one-time setup the UI is faster and safer.
