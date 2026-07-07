# Ad Launch Plan — PAUSED until you hit play

Status: **PAUSED. Nothing is live. Nothing is spending.**

## Recommendation (from real data)

Based on Local Falcon grid scans (7/6/2026) + BrightLocal tracking:

| Office | Reviews | Organic local rank (SoLV) | Read |
|---|---|---|---|
| Birmingham / Alabaster | 240 (4.7★) | 78–100% top-3 | Already **wins** the map |
| Alex City / Lake Martin | 19 (4.9★) | 78–89% top-3 | Already **wins** the map |
| **Huntsville** | 28 (5.0★) | **0–11% top-3** | **Invisible organically** |

**So spend where paid actually moves the needle:**

1. **Put the ad budget on Huntsville (PRIMARY).** You're rank ~9–11 there organically, so
   paid search is the fastest way to show up while you build. Suggested ~$35/day.
2. **Run Birmingham + Lake Martin lean/defensive (SECONDARY).** You already rank #1–2
   organically there — paid mostly protects top-of-page. Suggested ~$15/day.
3. **Reviews are the long-game lever.** Birmingham's 240 reviews are *why* it dominates.
   Getting Huntsville (28) and Lake Martin (19) up toward 100+ will lift organic rank over
   time. BrightLocal Reputation Manager already tracks all three — turn on review requests.
4. **Optional: LSA (Local Services Ads) for Huntsville only.** Pest control is a strong
   pay-per-lead vertical and LSA would leapfrog the weak organic there. It needs license +
   background-check verification and its own budget — left OFF unless you say go.

Campaign content is in [`ad-campaign-drafts.json`](./ad-campaign-drafts.json): 2 campaigns,
6 ad groups, all validated against `data/compliance.ts` and Google Ads limits.

## What "hit play" does and does NOT do

This repo has **no live Google Ads integration**. Approving a draft only sets its status to
`approved` — it does not create, enable, or fund anything and cannot spend. Two separate steps:

1. **In-app approval (safe, no spend):** review at `/ads/<id>` and click Approve.
2. **Going live on Google Ads (real spend — 100% manual, by you):** paste into Google Ads.

## Step 1 — Load drafts into your review queue (no spend)

```
node scripts/seed-ad-drafts.mjs                # dry-run, writes nothing
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-ad-drafts.mjs --commit
```

## Step 2 — Build in Google Ads, PAUSED (only when YOU decide)

Create **two Search campaigns**, each **set to PAUSED**:

- **Campaign A — Huntsville Metro** (priority). Geo: Huntsville, Madison, Athens. Budget ~$35/day.
- **Campaign B — Birmingham + Lake Martin** (defensive). Geo: Birmingham, Alabaster, Hoover,
  Vestavia Hills, Mountain Brook, Alexander City, Lake Martin, Auburn. **Exclude Tuscaloosa.** Budget ~$15/day.

For each campaign: add the `shared_negative_keywords`, then for each ad group paste its
`keywords` (Phrase match), set the `landing_url` as Final URL, and build one Responsive
Search Ad from its `rsa_headlines` + `rsa_descriptions`. Use the right office phone
(Huntsville (256) 937-7676; Birmingham (205) 940-6360).

Leave both **PAUSED**. Cost stays $0 until you flip a campaign **PAUSED → ENABLED** — that
flip is the only thing that spends, and only you do it.

## Guardrails honored

- No automated Google login; no credentials handled. No live ad-platform API calls in this repo.
- Mosquito copy never says eliminate/guarantee/mosquito-free (reduce/knock-down only).
- No safety/availability/discount claims; correct per-office phone; banned dead line never appears.
- Everything ships PAUSED; going ENABLED is a deliberate manual action by you.
