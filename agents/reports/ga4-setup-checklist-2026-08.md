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

## P0 — RESOLVED 2026-08-27. Root cause was our code, not GA4.

**Confirmed fixed in production.** Live browser evidence after deploying #121:

| | Before | After |
|---|---|---|
| `Object.prototype.toString.call(dataLayer[0])` | `[object Array]` | `[object Arguments]` |
| `/g/collect` requests | 0 (verified 3 ways) | 1 — fires |
| gtag.js processing | none | `gtm.uniqueEventId`, `gtm.dom`, `gtm.load` present |

The `gtm.uniqueEventId` annotations are the proof: gtag.js stamps those onto
dataLayer entries it has actually *processed*. Before the fix it read the
entries and discarded them silently.

**Root cause:** the 2026-08-17 perf refactor (`2dbd173`) rewrote Google's
canonical `function gtag(){dataLayer.push(arguments)}` as
`function gtag(...args){dataLayer.push(args)}`. gtag.js identifies a command
by the pushed value being an `arguments` object; a real Array is treated as an
ordinary data push and ignored — with no error. The Measurement ID
(G-CELEB90NKX, stream 3496129282) was correct the whole time; an earlier
deleted-stream theory was disproven by Phillip reading it off Admin.

**Lesson for future refactors:** never "modernize" the gtag snippet. Arrow
functions and rest params both break it, silently. `components/
DeferredTracking.tsx` carries a warning comment at that line — but a comment is
not a guard, and the comment did not exist when the refactor shipped.

**Enforced 2026-08-27:** `npm run test:tracking`
(`scripts/test-tracking-integrity.mjs`) now fails the build if the gtag
bootstrap stops pushing `arguments`, if gtag is bound to anything other than a
`function`, or if any lead form stops firing `generate_lead`. It asserts against
the **built bundle** as well as source, because `arguments` is a reserved
binding that no minifier renames — so its absence from `.next` proves GA4 is
dead in production. Verified by reintroducing the exact 2026-08-17 change and
confirming the guard fails. The whole suite runs on every PR via the
**Guards** workflow.

**Open watch item:** the confirming hit returned HTTP 503 from
`analytics.google.com/g/collect`. Likely automation throttling (the check ran
in an automated browser) rather than a real fault — the request being *sent
at all* is the fix working. If real-visitor traffic also 503s and Realtime
stays empty, investigate further.

## (historical) P0 — Tracking is dead. Nothing else matters until this is fixed.

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

1. ✅ **DONE 2026-08-27 (Phillip) — Data retention 2 → 14 months.** Not
   retroactive, so it protects data from that date forward; the pre-existing
   2-month horizon is gone for good. Nothing further to do here.
2. ✅ **DONE 2026-08-27 (Phillip) — `phone_click` and `generate_lead` are
   marked as Key Events.** For a pest control company the phone click *is* the
   conversion. `DeferredTracking.tsx` fires `phone_click` / `email_click` /
   `data-track` CTA events, and all four lead forms fire `generate_lead`
   (ScheduleRequest, RequestQuoteForm, ChatWidget, ContactUs).
   Deliberately NOT marked: `purchase` (a GA4 placeholder — "no stream data
   detected"; EnviroCare sells nothing online, so it would be a permanent zero)
   and `ads_conversion_Contact_Us_1` (an existing Google Ads import — leave it).

   ⚠️ **The navigation trap — this cost a wrong turn on the day.** Admin has
   two adjacent pages and only one is right:
   - **Events → "Create event"** *invents a brand-new synthetic event* from a
     trigger (it asks for a data stream, a source event such as `page_view`,
     and a URL condition). Naming one `phone_click` here would create a fake
     duplicate that fires on page views, alongside the real event. **Wrong
     page.** If you are asked for a stream, a trigger, a URL, or
     "create with / without code", back out without saving.
   - **Data display → Key events** is the right page. Existing events are
     listed; **click the star** next to the event name. `New key event` there
     asks for a name and nothing else.

   Correction to an earlier note in this file: it claimed an event must be
   *received* before it can be marked, so you had to wait ~24h. Not so —
   both events were already listed (they appear under "Streams active in the
   last 28 days", a window reaching back before the Aug 17 outage), and the
   Key events page accepts a name that has never been seen anyway.
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
