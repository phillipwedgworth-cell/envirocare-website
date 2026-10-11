# AI-Visibility Playbook — turn Local Falcon AI data into approved action

Loaded by the Proposer (`knowledgeBlock`) and read by the Vercel review agent. Source: Local Falcon AI campaign `8b7a79da2bc5e0c`, first competitive read 2026-10-11.

## Goal
Convert EnviroCare's AI-visibility gaps (ChatGPT / Gemini / AI Mode / AI Overviews) into a short, ranked, guardrail-safe set of **proposed** changes — never direct production edits. Agents **propose**; humans **approve** in the console; `approval-executor` applies.

## Data source (read, never re-scan)
- Supabase `lf_visibility` where `platform in ('chatgpt','gemini','aimode','gaio')` and `campaign_key = '8b7a79da2bc5e0c'`. Each row: `market`, `platform`, `keyword`, `saiv`, `top_competitors`, `run_date`, `grid_baseline`.
- These land when `local-falcon-ingest` runs post-#242. **Zero scan credits** — read existing runs only; never call a scan/campaign-run endpoint.
- **Null is not zero.** A missing `saiv` is unknown, not 0. Only a measured `0` means "not recommended."
- Keep **Maps SoLV and AI SAIV as separate metric families** — never merge or compare across them.

## Emit findings (the fleet's Supabase contract)
`writeFinding(agentName, category, severity, pageUrl, finding, details)` → `agent_findings`:
- `agentName`: `"ai-visibility"`.
- `category`: `"competitor"` for gap/threat findings; `"seo"` or `"content"` for on-page/citation suggestions (allowed set only).
- `severity`: `"critical"` if market SAIV = 0 (e.g. Huntsville); `"warning"` if < 40; `"info"` otherwise.
- `pageUrl`: canonical market page (`/huntsville`, `/birmingham`, `/alexander-city`, `/alabaster`) or null.
- `finding`: one concrete, non-vague sentence (the Proposer rejects vague advice).
- `details` (jsonb): `{ market, platform, keyword, enviroCareSaiv, leaders:[{name,saiv}], lever:"off-site-authority"|"reviews"|"citations"|"entity-schema", source:"local-falcon 8b7a79da2bc5e0c", run_date }`.
- Treat `(agentName, market, platform, keyword, run_date)` as the logical key so re-runs don't duplicate; let `isSuppressed` dedupe accepted/known items.

## Then the normal flow runs
`proposer.mjs` reads these findings (8-day lookback), consolidates/ranks impact vs effort, kills dupes + already-fixed, emits "Top changes this cycle" into `approval_queue`. `approval-executor` applies **only** what a human approves. Never shortcut this.

## Guardrails every suggestion MUST pass (compliance canon)
- **Human-approval-only, never auto-execute:** GBP name/address/category changes, Google-suggested-update accept/reject, redirect removal, sitemap submit/delete, any publish/deploy. Propose; never do.
- **Banned language:** no `safe`/`pet-safe`/`non-toxic`/`EPA-approved`; no `guarantee`/`warranty` on the $1M figure — it is **damage repair coverage**, **EnviroCare's**, not Sentricon's; no `unlimited`, `same-day`, `24/7`, `same technician` (use "familiar local team"); no **public review counts**; no **competitor names** in customer-facing copy; **fourth generation** only.
- **NAP** — phone must match address: Huntsville 7027 Old Madison Pike Ste 108 / (256) 937-7676; Alabaster/Shelby 2025 Butler Rd / (205) 940-6360; Birmingham/Jefferson 2120 16th Ave S / (205) 991-2882; Alex City 1785 Tallapoosa / (256) 234-6162. Never `(205) 649-5278` (dead).
- **Pricing** from `data/pricing.ts`; **termite is never a flat price**; mosquito **$45/mo, March–October, 8 treatments**.
- **Not offered:** standalone bed bug, standalone rodent, wildlife, Tuscaloosa, crawlspace service; carpenter bee is existing-customers-only. Never propose content implying these.
- **The lever is off-site authority** (citations, editorial, reviews), **not more content** — tested and disproven July 2026.

## Priority (Oct 2026 read)
1. **Huntsville — P0, SAIV 0** on "pest control company in huntsville" (Gemini) and "termite treatment in huntsville" (AI Mode). Leaders: Alder 100, Prime 100, Palisade 88.9, ClearDefense 66.7. Propose citation + review + entity-schema actions.
2. **Lake Martin / Dadeville — P1, 22** (Lewis/SafeSpray/Red Flag/Prewett lead).
3. **Birmingham — P1, 33** in a 29-deep field led by **Red Mountain** 88.9.
4. **Defend Mountain Brook 75; lift Alabaster 55 — P2.**

## Verify before concluding (Rule Zero)
State what was read and when. A green run is not proof of ingestion — confirm AI rows exist in `lf_visibility` first. A market at 0 with no scan rows is **unknown**, not a measured zero — say so.
