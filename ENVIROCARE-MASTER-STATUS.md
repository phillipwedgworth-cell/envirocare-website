# EnviroCare — MASTER STATUS

**Updated:** June 9, 2026
**Rule:** Read this first every session. One source of truth. No other handoff files.

---

## REPO (definitive)

**Local path:** `C:\Users\pwedg\Desktop\Envirocare Stuf\envirocare-website-deploy\`
**GitHub:** `https://github.com/phillipwedgworth-cell/envirocare-website`
**Vercel project:** `envirocare-web` · `prj_bD63HstQIuOMn5cEGDK4RAW7yM2F` · team `envirocare-50d39ae8`
**Live URL:** `https://envirocare-web.vercel.app` (no custom domain — Phase 6)
**Current HEAD:** `8747778` (June 9, 2026)

**Second clone (OneDrive):** `C:\Users\pwedg\OneDrive\Email attachments\Documents\GitHub\envirocare-website\`
→ Also at HEAD. Has node_modules damage from a June 9 script — run `npm install` there before using.

---

## WHAT'S LIVE (as of June 9)

- Homepage v2 with heritage copy, service cities in hero, same-day phone CTA
- 27 city pages · 15 Lake Martin neighborhood pages
- Service pages: pest-control, termite-control, mosquito-control, flea, tick, fire-ant, wdo-letters, crawlspace, sentricon, commercial, builder-pre-treat
- /pricing, /quote, /about-us, /reviews, /blog, /contact-us, /privacy, /terms, /realtor, /faq (redirected to /contact-us)
- Blog + RSS + sitemap, Meta Pixel, zip lookup, pest calendar
- Agent system: brightlocal + seo-monitor + site-reviewer + orchestrator. Cron Mon 11 UTC.
- GA4 + GSC ingest pipeline (GitHub Action + Vercel cron)
- FAQ components for Huntsville, Alabaster, Alex City
- EnviroLogo.tsx component, white logo variant, lib/schema.tsx

## BROKEN LINKS (9 nav/footer 404s — fix is pending)

See `C:\Users\pwedg\Desktop\Envirocare Stuf\monitoring\broken-links-ROOT-CAUSE-2026-06-08.md` for full analysis.

**Fastest fix — add these redirects to next.config.ts:**
```
/services          → /services/pest-control
/pricing           → /quote
/why-envirocare    → /about-us
/realtor           → /services/wdo-letters
/services/commercial → /commercial
/services/fire-ant-control → /services/fire-ant
/services/rodent-control   → /rodents
/services/real-estate-wdo  → /services/wdo-letters
/faq               → /contact-us
```
Root cause: three different nav/footer template generations coexist. Permanent fix = unify to one shared Header.tsx.

---

## UNCOMMITTED FILES IN REPO (need your decision — not auto-committing)

| File | Status | Recommendation |
|---|---|---|
| `agents/supabase-seo-history-schema.sql` | Modified (89 lines deleted vs HEAD) | Review the deletion — commit if intentional, discard if accidental |
| `apply-lakemartin-pages.py` | Untracked script | Safe to delete — those pages are already committed |
| `lake-home-hero.jpg` | Untracked image | Move to `public/` if needed, or delete |
| `⛔DEAD-DO-NOT-EDIT⛔.txt` | Untracked warning file | Delete (it's a note, not code) |

---

## SEO STATUS (as of June 3–8 weekly reports)

| Location | SoLV | Reviews | Priority action |
|---|---|---|---|
| Alex City | 100% "mosquito lake martin", 64% "pest control alexander city" | ~64 | Maintain; add citations |
| Alabaster | 40–53% | ~229 | Near page 1 on /pelham (pos 6.7), /vestavia-hills (pos 12) |
| Huntsville | 2% | 9 | Review velocity = the only lever. ~40 reviews needed for foothold. |

**Broken link fix (above) is urgent** — `/services` and `/pricing` in the main nav are 404ing on ~19 pages.

---

## OPEN ITEMS (in priority order)

**Immediate (code):**
1. Fix the 9 broken nav/footer links (redirect block above, ~15 min)
2. Upgrade broken-link monitor to crawl actual hrefs (not fixed URL list)
3. NEURONWRITER_API_KEY — add key to Vercel env vars when Phillip provides value

**Pages/content:**
4. Unified Header.tsx — the root cause of recurring broken nav links
5. Madison deep page (`/madison` — 32,606 impressions, 0 clicks, pos 28)
6. Termite-control page beef-up (Sentricon $1M, no-drill, $32/mo)

**SEO/ops:**
7. Huntsville review push — Captivated + $5/tech incentive
8. Alex City citation campaign (BrightLocal CT) — currently 0 citations
9. Google Ads reactivate Huntsville/Madison (bridge while organic blocked)

---

## PHASE PLAN

1. Homepage v2 ✅
2. Auburn + Termite ✅ (Auburn live; termite page live)
3. Cities/services v2 — in progress
4. GSC + sitemap ✅ (sitemap live; GSC verify status unknown)
5. Google Ads — PAUSED (37 campaigns, full structure exists — needs admin access from Scorpion)
6. DNS flip — LAST

---

## KEY IDS / KEYS

- BrightLocal key: in local .env only — never commit
- Local Falcon report keys: Huntsville `cd64365e1dab32f` · Alex City `7febc8908039d6d` · Alabaster `644c1bcec9e3b67`
- Place IDs: Alabaster `ChIJr8cmt-EeiYgR_jgX9xsiZWY` · Huntsville `ChIJd4YXKCRmqmIR1DmDoEcGohU` · Alex City `ChIJ508mEjcLjIgRZ2HdWgXX76c`
- Google Ads account: `6799827884` (under phillipwedgworth@gmail.com) — all 37 campaigns PAUSED
- Formspree: `xwvypjal` (confirmed working — do not touch)

---

## DO NOT

- Delete the `envirocare-web` Vercel project
- Mention lawn care anywhere on the site
- Put "500+" review count on public pages — use real number or remove
- Touch `node_modules/`, `.next/`, `package-lock.json`
- Use data from site-reviewer runs before 2026-05-31 PM (was hitting wrong domain)
