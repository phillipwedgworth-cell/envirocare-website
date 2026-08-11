# EnviroCare — read this first

**Created Aug 9. Corrected Aug 10 (v2). Corrected again Aug 10 (v3) and committed to the
repo.** Struck-through claims are kept, not deleted, so nobody re-derives them a fourth time.

> **Why this file is now in the repo.** v1 and v2 lived only in the Claude project and a
> Downloads folder. A "read this first" document that is not in the repo cannot be read by
> a scheduled task, cannot be diffed, and cannot be corrected in place — so its stale
> headline kept circulating after the facts changed. Four documents were cited as
> authoritative this week while living outside the repo: THE LIST, the name decision, the
> monitor playbook and this file. Three are now committed.

---

## THE ONE THING

~~**Nothing built in the last two days is public.** It all lives on
`fix/orphans-and-header`, which deploys as preview only. Production is `main` at
`5f61a367`. **Merging PR #74 is the single action that makes any of it real.**~~

🔴 **OUT OF DATE — this was the headline of v1 and v2 and it is no longer true.**

**PRs #74 through #85 are all merged and deployed to production.** Verified against
`gh pr list --state merged` and `git log origin/main`, 2026-08-10.

What that shipped, all live:

- the `#birmingham` schema collision — one `@id` had been describing a business at two
  addresses with two phone numbers
- the **wrong WDO form** in 11 places, including `/realtor`'s search metadata: Alabama
  uses the *Official Alabama Wood Infestation Inspection Report* (Ala. Admin. Code
  r. 80-10-9-.18, Exhibit A), **not the NPMA-33**
- the retired name, in **four encodings** (`&`, `&amp;`, `and`, and truncated) plus the
  **OG social share card**, which no text sweep could reach
- `"founded 1958"` on five pages, including a meta description
- guarantee, contract-free and turnaround-time claims
- three AI-generated images that were unreferenced but still returning HTTP 200
- Services + Service Areas nav submenus; four orphan pages linked
- the review responder, dead since Jul 27 on a quoted `report_id`

**`envirocare-aug9-NEEDS-REBASE.patch` should be DISCARDED, not rebased.** Every item in
its table — 105 name occurrences, the 30-day guarantee, `/mountain-brook`, `/ads/[id]`,
the missing test script — is closed. It landed by another route.

---

## Infrastructure — settled Aug 9, still true

```
GitHub    phillipwedgworth-cell/envirocare-website     ← ONE repo
Vercel    envirocare-web-only-testing                  ← ONE project. THIS IS PRODUCTION.
          prj_bD63HstQIuOMn5cEGDK4RAW7yM2F
          team_e56vlWMynAPn6B3dI83AzgAD
```

- **`envirocare-web` is a domain alias, not a project.** Nothing to delete.
- **There is no second repo.**
- ✅ **Action: rename the Vercel project to `envirocare-web`.** Free and instant.
- `envirocare-web.vercel.app` **308**s to `www`. 308 is permanent and Google treats it as
  a 301. **Any doc saying 302, or "change it to a 301", is wrong.**

---

## Needs Phillip

1. ~~Merge PR #74~~ — **done, plus #75–#85**
2. **3rd vs 4th generation** — worth settling for the listings. ⚠️ The v2 claim that
   *"PRs #79, #80, #82 are actively rewriting each other"* is **false**: none of them
   altered the number, every instance reads "fourth", and #80's apparent hit is a deleted
   dead-code line. This is not churning code.
3. ~~Tuscaloosa~~ — **CLOSEABLE.** All five references are comments recording its removal
   (Jun 14). `/tuscaloosa` 404s and it appears on no nav surface. Verified Aug 10.
4. **Rename the Vercel project**
5. **Alabaster Google description** — Active Sync is ON while the box still holds the
   banned claim. Clean it or toggle sync off, in that order.
6. **Four OneUp posts** carrying a bare `$1,000,000` with no *"subject to the terms of the
   agreement"* qualifier. **No OneUp connector exists in every session** — the session
   holding one must make these edits.
7. **The logo.** `logo.png` still reads *"PEST & TERMITE SERVICES"* in the site header and
   in the Organization schema's `logo` field. Needs artwork, not code. The correct
   wordmark already exists physically — `truck.jpg` shows the door reading *"EnviroCare
   Pest Services"*.
8. **Who founded the company?** `data/business.ts:32` says **Phillip M. Wedgworth** (gen 1);
   the brand kit and a queued Facebook post say **Lex Wedgworth**. `AGENTS.md` records the
   company was formerly *"Lex Wedgworth Pest Control Inc."* A post crediting a founder is
   queued to publish. **Code should not guess at a fact about a family member.**

### ✅ Closed Aug 10

| Question | Answer |
|---|---|
| Saturday hours | **Closed Saturdays.** BrightLocal and the live site were already correct |
| Homewood | **Closed.** Office is 2120 16th Ave S, Ste 302, Birmingham |
| Huntsville GBP description | Fixed Aug 10; local terms restored |

### ~~B5 — cut the Huntsville LSA budget, ~$7,600/month~~

🔴 **RETRACTED. Do not action. Do not repeat the number.** Retracted Jul 25, retracted
again Aug 1 (*"Phillip states this spend does not exist"*), and cited five more times
since — twice as the #1 recommended action. **Verify against the live Google Ads account
before it is ever quoted again.** `npm run test:zombies` now fails the build if it
reappears in repo docs.

---

## Dead ends

- **Ahrefs** — `Insufficient plan` on every endpoint. Do not retry.
- **BrightLocal `get_brain_recommendations`** — plan-gated, not a broken key.
- **Local Falcon `listLocalFalconScanReports` / `listLocalFalconKeywordReports`** —
  `next_token` returns page 1 forever. Use `listLocalFalconCampaignReports`.

### ~~OneUp — no MCP connector exists~~

❌ **Neither absolute is correct — it is SESSION-DEPENDENT.** A working connector ran a
full audit and edited six posts on Aug 9. It is **absent** from the Claude Code session,
checked Aug 9 and Aug 10. **Check your own tool list.** The same caveat applies inverted to
GitHub writes: blocked in some sessions, working in the one that merged #74–#85.

---

## The two rules — and the third

**Aug 9 — how claims are created:**
> Every factual claim carries the tool call and date that produced it, or it does not ship.
> Never generalise from a partial or paginated result.

**Aug 10 — how claims are destroyed:**
> When a claim is corrected, the correction is not done until every doc carrying the old
> claim is edited or deleted IN THE SAME SESSION.

**Aug 10 (v3) — why neither worked:**
> **A rule that is not a test is a suggestion.**

The Aug-9 rule was written three times and stopped nothing. It is prose. So the Aug-10
rule is now executable:

| Command | Fails when |
|---|---|
| `npm run test:zombies` | a retracted claim reappears in repo docs |
| `npm run test:compliance` | banned language reappears (44 cases) |
| `npm run test:imagery` | an AI-generated depiction returns to `public/` |
| `npm run test:citynap` | a city's phone, tel and address disagree |
| `npm run audit:fleet` | re-measures the agent checklist instead of estimating it |

Writing a retracted price into a doc now fails a test. That is the difference —
and this file proves it: the first draft of this very line contained the bare
number, and `npm run test:zombies` rejected it.

**A file carrying a `SUPERSEDED` banner in its first 25 lines is quarantined, not
scanned** — its body legitimately holds old numbers. Quarantined files are *reported*,
never silently skipped.

---

## The failure shape that produced most of this week

**A guard matched a literal where it needed to match a shape.** Five times in one day:

| Guard | Missed | Because |
|---|---|---|
| retired name | `&amp;`, `and`, truncated | matched one ampersand form |
| AI imagery | `technician-envirocare-**mobile**.webp` | matched filenames, not stems |
| `founded 1958` | `founded 1958` (no "in") | required the word "in" |
| `founded 1958` | `started this company in 1958` | matched three verbs, not seven |
| `data/cities.ts` scans | `bessemer`, `mccalla`, `gardendale` | the file holds records in **two quoting styles**; greps matched one |

The last of those hid a live defect for a day: three city pages rendered a call button
**displaying** `(256) 937-7676` while its `href` was `tel:2059406360`. Read it and you
dial Huntsville; tap it and you reach Alabaster. **A human reading the page cannot see
this** — only a field comparison can, which is now `npm run test:citynap`.

**When a guard reports clean, suspect the guard before believing the result.**

---

## Housekeeping

1. **The project is near its knowledge limit.** Prune duplicates before adding docs:
   `ENVIROCARE-MASTER-STATUS.md` ×3, `Competitor-Benchmark.md` ×4, `CLAUDE.md` ×3,
   `AGENTS.md` ×2, `README-DEPLOY.md` ×5.
2. **`claude/WHICH-VERCEL-PROJECT-IS-LIVE.md` has existed since Jul 20.** The Vercel
   question was answered before and did not stick — because the answer lived in a doc
   nobody re-read. That is the same failure this file is trying to stop.

---

## Where to start

1. `docs/decisions/name.md` — the naming ruling and its three constraints
2. `claude/EnviroCare-Monitor-Playbook.md` — v3, with the checks that were wrong
3. `claude/SITE-AUDIT-2026-08-09.md`
4. `AGENTS.md` — ⚠️ still says "founded 1958" and "three locations"; both are wrong

**Re-verify anything dated Aug 9 before actioning it — including this file.**
