# EnviroCare — Social + Local Content Automation Game Plan

Goal: a Scorpion-style engine where branded content is scheduled, auto-posted to
**Facebook/Meta + Google Business Profile**, monitored in the **Command Center**,
and improved with **Gemini/OpenAI** suggestions — all on the infra you already run.

Priority (per Phillip): **Google local content + Google Ads first, live this week.**
Constraint: **limited budget** — reuse existing free infra, cheap models only.

---

## Fits your existing stack (no new platform, no new cost)
| Need | Reuse what you already have |
|---|---|
| Scheduling | GitHub Actions cron + Vercel cron (`/api/*/run`) — free |
| Run + synthesize + email digest | `agents/orchestrator.mjs` conductor pattern |
| Multi-model suggestions | `agents/lib/llm-panel.mjs` (Gemini/OpenAI/Claude) |
| Storage | Supabase (free tier) — new `social_posts` + `content_calendar` tables |
| Dashboard | Command Center — add a "Social & Local" panel |
| Compliance | `agents/lib/compliance.mjs` (blocks banned number, etc.) |

## Budget guardrails
- **Drafting model = cheap tier** (Gemini 1.5 Flash / `gpt-4o-mini`) via the panel; Claude only for the weekly synthesis.
- Batch-generate content **weekly**, not per-post.
- Graphics via **Canva/Adobe Express** (already connected) — no paid stock.
- Everything runs on **cron in infra you already pay $0 for**.

---

## Architecture
```
content_calendar (Supabase/JSON)
    │  weekly: content-generator agent drafts posts (cheap LLM) + Canva graphic
    ▼
social_posts (status: draft → approved → scheduled → posted/failed)
    │  cron (GitHub Actions / Vercel)
    ├── agents/meta-poster.mjs   → Facebook Page + IG (Meta Graph API)
    └── agents/gbp-poster.mjs    → Google Business Profile "posts" (GBP API)
    ▼
orchestrator digest + Command Center "Social & Local" panel
    │  monitoring: what posted, engagement, what failed
    └── llm-panel (Gemini/OpenAI) → weekly "what's working / do more of X" suggestions
```

---

## Phases

### Phase 0 — THIS WEEK (unblocked, no tokens needed)
- [x] Starter **content calendar** (`agents/social/content-calendar.json`) — 4 weeks of Google-local + Facebook posts for all 3 offices, seasonal, compliance-safe.
- [ ] **Google local content**: publish this week's GBP posts (manually at first — copy from the calendar) while the auto-poster is built.
- [ ] **Google Ads readiness** (see checklist below) — the account-side prep so paid can start this week.

### Phase 1 — Content engine (buildable now)
- `agents/content-generator.mjs` — reads calendar, drafts post copy with the **cheap LLM tier**, attaches a Canva graphic, writes rows to `social_posts` as `draft`.
- Command Center: "Social & Local" panel shows upcoming/queued posts.

### Phase 2 — Facebook/Meta auto-post (needs your token)
- `agents/meta-poster.mjs` → posts due `approved` items to the FB Page + IG.
- **You provide:** Meta Page ID + long-lived Page token (app w/ `pages_manage_posts`, `instagram_content_publish`).

### Phase 3 — Google Business Profile posts (needs API access)
- `agents/gbp-poster.mjs` → GBP What's-New / Offer posts. Auth reuses your existing Google OAuth (`GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN`).
- **⚠️ Gate:** the Google Business Profile API is access-restricted — must request quota on your GCP project; approval isn't guaranteed/instant. Fallback if denied: scheduled draft + one-tap manual publish.

### Phase 4 — Monitoring + suggestions
- Poster results → `agent_runs`/`agent_findings` (already wired to the digest + Command Center).
- Weekly **llm-panel** pass (Gemini + OpenAI) reviews engagement + Local Falcon SoLV and returns "double down on X / drop Y / post more in Huntsville" recommendations.

---

## What's blocked on you (action items)
1. **Meta:** create/confirm a Meta app, get **Page ID + long-lived Page access token** → add as GitHub/Vercel secrets `META_PAGE_ID`, `META_PAGE_TOKEN` (and `IG_BUSINESS_ID` if posting IG).
2. **Google Business Profile API:** request access/quota for your GCP project (needed for auto GBP posts).
3. **`CRON_SECRET`** in Vercel (still unset — also unblocks seo-monitor; see PR #28).
4. **Google Ads:** confirm account access + conversion tracking (checklist below).

---

## Google Ads — "begin this week" checklist
You already ingest campaign data (`agents/ingest-gads-campaigns.mjs` → `gads_campaigns` → Command Center), so reporting is ready. To *launch/scale* paid this week:
- [ ] Confirm Google Ads account access + billing active.
- [ ] **Conversion tracking**: calls (call-from-ad + calls from website), form submits (`/api/quote`), and "Get Quote" clicks — verify tags fire.
- [ ] **Local Services Ads (LSA)** — highest-ROI for pest control; apply for Google Guaranteed (background check + license verification takes days, so **start now**).
- [ ] Search campaigns per metro: Huntsville (priority — weakest SoLV), Birmingham, Lake Martin, tightly themed (termite / mosquito / general pest).
- [ ] Negative keywords + call extensions + the correct office phone per geo (no banned number).
- [ ] Budget caps per campaign (respect the limited-budget constraint; start small, scale winners).
