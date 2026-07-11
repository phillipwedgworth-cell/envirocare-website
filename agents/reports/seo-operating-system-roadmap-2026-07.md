# EnviroCare Self-Sustaining SEO Operating System — Roadmap (Jul 11, 2026)

Source: GPT strategy brief (Jul 11) + current fleet audit. The stack is fixed:
Local Falcon (where do we rank) · BrightLocal (listings/reviews/GBP health) ·
NeuronWriter AI Visibility (AI mentions/citations — LIVE as of tonight, 30
prompts, 4 engines) · Search Console (what Google actually does) · the agent
fleet + Claude (fix the next 3–5 things every week). No new tools.

## What ALREADY EXISTS (don't rebuild)

| Brief item | Existing implementation |
|---|---|
| Weekly command-center report | morning-brief (daily 13:30 UTC, emails Phillip), daily-rollup, watchdog Monday digest, seo-watch/seo-monitor (Mon), aeo-watch (daily) |
| City/service visibility data | Local Falcon weekly grids → seo_metrics/seo_digests → Command Center "Ranking Snapshots" + "Local Search" panels |
| GBP rhythm | social-suggester drafts + social-poster publishes (google/facebook/instagram) from content-calendar.json; approve/skip buttons on Command Center (shipped tonight) |
| Review engine plumbing | Reviews run through Fieldster text/email flow (Phillip's standing decision — no Podium/Birdeye); review-responder drafts replies Mondays |
| Competitor replacement | AI Visibility Opportunities cadence (15th monthly) + ai-visibility-action-plan-2026-07.md |
| Sitemap/index QA | Sitemap auto-generates from code on every deploy; duplicate pages 301'd; canonicals set (Jul 11 cleanup). robots.txt → verify it references sitemap (checklist below) |
| Approval hub | Command Center (?key=) + Notion Approval Hub (needs NOTION_REVIEW_HUB_PAGE_ID secret — Phillip has the value) |

## BUILD NEXT (sequenced — one per session, verify before the next)

### P1 — "What Pest Problem Do You Have?" picker page  [build: small]
Cards: Ants · Roaches · Spiders · Mosquitoes · Termites · Rodents · Fire ants ·
Crawlspace moisture · Not sure. Each routes to the right service page + quote
CTA. Clean internal linking + tells AI engines exactly what we treat.
Route: /what-pest-problem. Link from header menu + homepage.

### P2 — Free Home Pest Risk Report lead funnel  [build: medium]
Form: name, address, city, phone, email, concern (termites/ants/roaches/
mosquitoes/rodents/general/crawlspace), own/rent, current provider (optional).
On submit: lead → Supabase + email notification routed by region (zip→office
via data/zip-to-office.ts), customer confirmation email (Resend). NOT a
generic "site audit" — pest-specific. Compliance: approved pricing lines only.

### P3 — 3-email nurture sequence  [build: medium, needs Phillip sign-off on copy]
1. Immediate: "we received your request, here's what to expect"
2. Next day: city-specific pest/termite education (reuse city-page whyHere copy)
3. Day 3–5: why-EnviroCare (since 1958, fourth generation, published pricing,
   canonical contract wording, Sentricon® up to $1M on qualifying homes,
   unlimited re-service)
Send via Resend (already a secret in the fleet). CAN-SPAM: service-inquiry
follow-up, include address + unsubscribe.

### P4 — Weekly Monday consolidated report  [build: small — extend morning-brief]
One Monday email merging: GSC gainers/losers (gsc_daily), Local Falcon grid
deltas (seo_metrics), BrightLocal issues, AI Visibility wins/losses (manual
until export lands), 3–5 recommended fixes. Mostly a new composer over data
the fleet already ingests.

### P5 — Page-decay monitor  [build: small — extend seo-history ingests]
Monthly: compare each city/service page's 28-day GSC impressions/clicks vs
prior period; drops > 25% file an agent_findings refresh task (answer block,
FAQ, review proof, nearby links, title/meta). Rising pages flagged "protect".

### P6 — City/service scorecard  [build: small — Command Center panel]
Per-market table (18 markets): pest/termite/mosquito rank (seo_metrics),
AI cited? (manual monthly until export), reviews (envirocare_seo), GSC clicks,
next action. Renders from data already in Supabase.

## PHILLIP-ONLY decisions/actions (agents MUST NOT do these)
- Call tracking by region: new spend + NAP risk — needs his call. If done:
  dynamic number insertion on-site ONLY; GBP/citations keep the real numbers.
- Fieldster review-ask copy change (see below) — he owns Fieldster.
- Any new subscriptions.

## Fieldster review-request copy (paste-ready, per service)
After PEST visits: "Thanks for choosing EnviroCare! If [TECH NAME] took good
care of your pest service in [CITY], a quick Google review helps your neighbors
find a local, family-owned company. It only takes a minute: [REVIEW LINK]"
After TERMITE/Sentricon: "Thanks for trusting EnviroCare with your termite
protection in [CITY]. If [TECH NAME] did right by you, would you share a quick
Google review? Mentioning your city and the Sentricon service helps other
[CITY] homeowners: [REVIEW LINK]"
After MOSQUITO/TICK: "Hope the yard's feeling livable again! If our mosquito
service in [CITY] made a difference, a quick Google review mentioning your
neighborhood helps other families find us: [REVIEW LINK]"
(Never incentivize reviews or script exact wording for the customer — prompts
above only invite natural mentions of city/tech/service.)

## Post-deploy QA checklist (run after every merged PR)
1. Build green; sitemap.xml regenerates (it's code-driven — automatic).
2. robots.txt references the sitemap.
3. New pages present in sitemap; retired pages 301.
4. Prerendered HTML spot-check: canonical, single footer, schema parses.
5. Banned content greps: old phone 205-649-5278, "cancel anytime", banned
   compliance phrases (compliance.ts list).

## Monthly executive summary (end of month, plain English)
What improved · what declined · which markets produced calls · which pages
need work · which competitor is gaining (AI Visibility competitors tab now
auto-discovers locals — Elevated Pest Solutions, safespraypestcontrol.com
already surfaced) · what to build next.
