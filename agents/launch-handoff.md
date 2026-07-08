# Launch Handoff — what a follow-on agent should do next

Context for the next Claude/agent picking up the EnviroCare launch. **Prep only:
nothing spends, nothing goes live, no billing/account changes without Phillip.**

## Where things stand (from ENVIROCARE-MASTER-STATUS.md)

- Phases 1–4 done: homepage, Auburn+Termite, cities/services, **GSC + sitemap ✅**.
- Phase 5 — Google Ads: **account `6799827884`, 37 campaigns already PAUSED**, build sheet ready.
- Phase 6 — **DNS flip = LAST** (when Phillip approves the final site).
- All pages are `noindex/nofollow` until the flip.

## Guardrails (do not break)

- Never log into or change live Google Ads / LSA / billing. No automated Google login.
- Anything that spends stays PAUSED; going ENABLED is Phillip's manual action.
- All copy must pass `data/compliance.ts` BANNED_PATTERNS (validate before committing).
- Never use the banned phone `(205) 649-5278`. Use per-office lines.
- Do all work on a feature branch → open a DRAFT PR → let Phillip merge.

## Task queue (do in this order)

### 1. Reconcile ads (avoid double-running)
- Account `6799827884` already has **37 paused campaigns**. This session also drafted a
  clean set in `agents/ad-campaign-drafts.json` (2 campaigns / 6 ad groups, Huntsville-priority).
- Compare the two. Recommend which to keep/pause/delete so there is ONE clean paused set.
- Output a short reconciliation note to `agents/reports/ads-reconciliation.md`. Do NOT enable anything.

### 2. Prep the DNS-flip code change (paused/ready PR)
On flip day the site must switch from hidden to indexable. Prepare (but do not merge) a PR that:
- Flips `robots.ts` / removes `noindex,nofollow` → allow indexing.
- Points `metadataBase` and all canonicals at `https://www.envirocarellc.com`.
- Verify with a build + a grep that no `noindex` remains and canonicals are absolute.
- Leave it as a DRAFT PR titled "DNS-flip: enable indexing" so it's a one-click merge later.

### 3. Reviews lever (biggest organic win, esp. Huntsville 28 reviews)
- Draft a review-request flow (Resend email/SMS after each job) — content only, compliant.
- BrightLocal Reputation Manager already tracks: Alabaster RM 630345, Huntsville 630846,
  Alex City 631866 (location IDs 4068335 / 4068730 / 4068729).

### 4. LSA prep (see agents/lsa-setup-runbook.md)
- Draft the 3 office LSA profiles to `agents/lsa-profiles.json` (status draft). Do not apply/launch.

## Reference IDs

- Google Ads: `6799827884` (37 campaigns PAUSED)
- NeuronWriter project: `9d0bec3a70f4743c`
- Place IDs — Alabaster `ChIJr8cmt-EeiYgR_jgX9xsiZWY` · Huntsville `ChIJd4YXKCRmqmIR1DmDoEcGohU` · Alex City `ChIJ508mEjcLjIgRZ2HdWgXX76c`
- Local Falcon report keys — Huntsville `cd64365e1dab32f` · Alex City `7febc8908039d6d` · Alabaster `644c1bcec9e3b67`
- Offices/phones/service-areas: `data/offices.ts`, `data/service-areas.ts`
- Compliance source of truth: `data/compliance.ts`

## When to hand back to Phillip (human-only)

- Enabling any Google Ads campaign or LSA (spend).
- The DNS flip itself.
- Entering payment, licenses, insurance, background checks.
