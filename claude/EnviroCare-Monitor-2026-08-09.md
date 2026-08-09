# EnviroCare monitor — 2026-08-09

## Verdict: **3 things need attention.** One of them is live on Google right now.

This is the **first run**, and the playbook's baseline was captured the same day, so
there is no prior week to diff against. Two of the three findings below are therefore
things the baseline **recorded incorrectly** rather than things that changed this week.

---

## 1 · 🔴 The Huntsville Google description was rewritten Aug 8 — and it got worse

`active_sync_change_alerts` on location **4068730** is **not empty**, contrary to the
baseline. Five alerts. The one that matters, `source: gmb`, **2026-08-08 13:19**:

| | |
|---|---|
| **was** | "…serving homes and businesses across **Huntsville, Madison, and North Alabama** … Sentricon termite protection backed by EnviroCare's guarantee of **up to $1 million** (subject to inspection)…" |
| **now** | "…serving homes and businesses **across Alabama** … Sentricon termite protection backed by EnviroCare's guarantee (subject to inspection)…" |

Two regressions in one edit:

- **Lost the local terms.** "Huntsville, Madison, and North Alabama" → "across Alabama".
  On the Huntsville listing, that is the exact phrase set that earns local relevance.
  Huntsville SoLV is already **0.20**. This makes it harder, not easier.
- **Lost "up to $1 million"** — the most concrete differentiator in the description.

And it **still** carries all three banned items the playbook says to flag:
**"Founded in 1958"**, the retired **"EnviroCare Pest & Termite Services"**, and
**"EnviroCare's guarantee"**.

> **Needs Phillip.** Who made this edit on Aug 8 — you, or a Google-suggested update
> that got accepted? Editing a GBP description requires a login and is on the
> never-without-approval list, so I have not touched it. If it was Google's suggestion,
> that is the "pending unreviewed Google update on the Huntsville GBP" from AGENTS.md
> and it appears to have been applied.

**Also on that location — address disagreement across three sources:**

| Source | Address |
|---|---|
| BrightLocal stored / AGENTS.md | 7027 Old Madison Pike **NW**, Ste 108 |
| Bing (Jul 28) | 7027 Old Madison Pike **Ste 108** — no "NW" |
| Yelp (Aug 2) | 7027 Old Madison Pike — **no NW, no suite** |

Yelp also **nulled out `lat` and `formationDate`** on Aug 2. Bing is arguably *more*
correct than what BrightLocal stores, since it carries the suite. Worth deciding which
form is canonical and pushing it, rather than leaving three variants live.

Locations **4068335** and **4068729**: change alerts empty. Clean.

---

## 2 · 🟠 Two campaigns are silently skipping runs

All four active campaigns have a **future** `next_run`, so the playbook's stall test
(*"next_run_date is in the past"*) passes them. It is the wrong test. Checked
`last_run` against stated frequency instead:

| Campaign | Frequency | Last ran | Should have run |
|---|---|---|---|
| **Birmingham Core (9x9)** | **every week** | **Jul 24 — 16 days ago** | ~Jul 31 **and** ~Aug 7 — **missed 2** |
| Offices gap tracker (7x7) | every two weeks | Jul 20 — 20 days ago | ~Aug 3 — **missed 1** |
| Lake Martin v3 | every two weeks | Jul 24 — 16 days ago | on time |
| Huntsville v3 | every two weeks | Jul 24 — 16 days ago | on time |

Birmingham Core is the one paid for weekly and delivering fortnightly at best.

> **Recommend changing the playbook's stall test** to `last_run` age vs frequency.
> The current test cannot detect this failure mode — a campaign that skips runs but
> keeps rescheduling looks perfectly healthy.

Not touched: diagnosing this means opening the campaign, and the monitor is read-only.

---

## 3 · 🟡 The playbook's own §5 instruction is wrong

> *"check whether it is still a **302**. It should be changed to a **301**"*

It is not a 302 and never was. Verified this morning:

```
https://envirocare-web.vercel.app/   308 -> https://www.envirocarellc.com/
https://envirocarellc.com/           308 -> https://www.envirocarellc.com/
https://www.envirocarellc.com/       200
```

**308 is a permanent redirect** — Google treats it exactly like a 301. It consolidates
signals and drops the alias. There is nothing to fix, and AGENTS.md already recorded
this on Jul 26. The instruction propagated from `EnviroCare-Live-Verification-Aug9.md`,
which is wrong on this point. **Removing it from the playbook** (§5, below) so it stops
generating work.

---

## Nothing changed

- **Local Falcon credits: 13,449 usable** (package 15,150). Above the 4,000 flag line.
  ~9,186/mo committed, cycle ends Sep 9 — comfortable.
- **9 campaigns, 4 scheduled / 5 paused.** The 5 paused are exactly the credit traps
  the playbook says never to resume. None self-flipped.
- **SoLV moves all within ±5:** Lake Martin +0.41 (44.90), Birmingham Core −0.12 (2.59),
  Huntsville v3 0.00 (0.20). Gap tracker SAIV 31.44, move 0.00.
- **Falcon Guard: 3 of 10 seats, all Protected**, last checked today 6:26 AM.
- **Supabase:** 42 × `rls_enabled_no_policy` INFO, 2 × `function_search_path_mutable`
  WARN, 1 × leaked-password-protection WARN. Exactly the known set. **No new advisories.**
- **BrightLocal:** CB credits 0. 3 locations — **no 4th yet**, so the Birmingham GBP
  has not landed.
- **Site:** homepage 200, canonical present.

---

## New options spotted

**None this week.** But note a flaw in the playbook's method: it says compare the KB
"article count" against last week, and cites **81**. `searchLocalFalconKnowledgeBase`
returns matches **for the query given**, not the whole KB — the query
`"new feature announcement"` returns **38**. Counts only diff if the query is identical.

> **Recording the query used so next week can compare like with like:**
> `q="new feature announcement"` → **total 38**, newest `date_created` **KB87,
> 2025-11-17** ("Comprehensive Local SEO Knowledge"). Nothing new since Nov 2025.

---

## Needs Phillip

1. **The Huntsville GBP description edit of Aug 8** — who made it? It dropped the local
   terms and the $1M figure. Needs a login to revert; I will draft a replacement that
   also clears "Founded in 1958" / the retired name / "guarantee" if you want it.
2. **Birmingham Core skipping weekly runs** — needs someone in the Local Falcon UI.
3. **Which Huntsville address form is canonical** — with "NW", with "Ste 108", or both?
   Three sources currently disagree.
4. Still open from the baseline: Birmingham GBP creation (no 4th location yet), and the
   leaked-password toggle in Supabase → Auth → Password security (one click).

---

## Baseline block — for next week to diff

```
date                       2026-08-09
LF credits usable          13449   (package 15150)
LF campaigns               9  (4 scheduled, 5 paused)
LF campaign last_run       gap-tracker Jul 20 · LM-v3 Jul 24 · BHM-Core Jul 24 · HSV-v3 Jul 24
LF SoLV                    LM-v3 44.90 · BHM-Core 2.59 · HSV-v3 0.20 · gap-tracker SAIV 31.44
LF Falcon Guard            3 of 10, all Protected, last 8/9 6:26 AM
LF Guard names             2 x "Envirocare" (lowercase), 1 x "EnviroCare"  <- see note
LF KB q="new feature announcement"   total 38, newest KB87 2025-11-17
BL locations               3   (no Birmingham)
BL change alerts           4068335: 0 · 4068730: 5 · 4068729: 0
BL CB credits              0
Supabase advisors          42 INFO rls_enabled_no_policy · 2 WARN search_path · 1 WARN leaked-pw
site                       www 200 · apex 308 -> www · vercel.app 308 -> www
homepage title             "EnviroCare Pest & Termite Services - Family-Owned Alabama Since 1958"
```

**Note on Guard names:** two of three read lowercase **"Envirocare"**. The playbook
says to flag a revert to lowercase — but the Aug 9 baseline never recorded the names,
so I cannot say these *reverted*. Recording them now so next week can tell.

**Note on the homepage title:** it still carries the retired name. That is expected —
the sitewide `BRAND_NAME` change is pending your go-ahead, see the site audit.
