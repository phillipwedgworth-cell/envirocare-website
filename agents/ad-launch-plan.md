# Ad Launch Plan — PAUSED until you hit play

Status: **PAUSED. Nothing is live. Nothing is spending.**

This implements the ad drafts and leaves everything stopped, exactly as requested.
The actual campaign content lives in [`ad-campaign-drafts.json`](./ad-campaign-drafts.json)
(3 ad groups: Termite–Birmingham, Mosquito–Birmingham, General Pest). All copy is
validated against `data/compliance.ts` and within Google Ads character limits.

## Important: what "hit play" does and does NOT do

This repo has **no live Google Ads integration**. Approving a draft in the review UI
only sets its status to `approved` in the database — it does **not** create, enable, or
fund any Google Ads campaign, and it cannot spend money. That is by design and matches
the rule: *never change a billing/spending account without an explicit human step.*

So there are two separate "play buttons":

1. **In-app approval (safe, no spend).** Load the drafts, review them at `/ads/<id>`,
   and click **Approve**. This just marks the copy signed-off. Money is never touched.
2. **Actually going live on Google Ads (real spend — 100% manual, by you).** Paste the
   approved copy into Google Ads. See below.

## Step 1 — Load the drafts into your review queue (no spend)

Dry-run first (prints what would be seeded, writes nothing):

```
node scripts/seed-ad-drafts.mjs
```

Then commit them to the `agent_drafts` table (needs Supabase env; still PAUSED / pending-review):

```
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-ad-drafts.mjs --commit
```

Review each at `https://www.envirocarellc.com/ads/<id>` and Approve the ones you like.

## Step 2 — Go live on Google Ads (only when YOU decide)

1. In Google Ads, create a **Search** campaign, and **set the campaign status to PAUSED**.
2. Geo targeting: include the metros in `ad-campaign-drafts.json` → `campaign.geo_targeting_included`.
   **Exclude Tuscaloosa** (EnviroCare does not service it).
3. Add the campaign **negative keywords** from the JSON (bed bug, rodent, wildlife, free, cheap, diy, tuscaloosa, …).
4. For each ad group, paste the `rsa_headlines`, `rsa_descriptions`, `keywords`, and `landing_url`.
5. Set your **daily budget** (suggested starting point: $25/day — you decide).
6. Leave it **PAUSED**. Nothing spends yet.
7. When you're ready to spend, flip the campaign from **PAUSED → ENABLED**. That is the
   real "play." Until you do that, cost is $0.

## Guardrails honored

- No automated login to your Google account; no credentials handled here.
- No live ad-platform API calls anywhere in this repo (verified).
- Mosquito copy never says eliminate/guarantee/mosquito-free (uses reduce/knock-down).
- No safety, availability, or discount claims; correct phone `(205) 940-6360` only.
- Everything ships PAUSED; going ENABLED is a deliberate manual action by you.
