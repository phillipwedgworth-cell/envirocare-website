# Instructions for Desktop — 2026-08-09

Everything below is on branch **`fix/orphans-and-header`** (PR #74), **committed and
NOT pushed** pending Phillip's go-ahead. Nothing here is public.

---

## 1. Read this first: the agent-failure doc is 50% stale

The runtime-error findings were valuable — **the surface was genuinely unwatched and
should now be in the weekly monitor.** But of the four bugs it diagnoses, **two were
already fixed in code before the doc was written.** The errors are real historical
events; they are not all open bugs.

| Doc's fix | Claimed | Actual |
|---|---|---|
| **1.** `report-id` → `report_id` (26 failures) | "one character" | ✅ **ALREADY FIXED 2026-08-04.** `agents/brightlocal.mjs:170` already passes `report_id: Number(...)`, with a comment recording the schema change. The hyphen survives only in that comment. Error window Jul 25→Aug 4 matches the fix date exactly. |
| **2.** `find_rm_reviews` string → integer | real | 🔴 **REAL AND FIXED HERE.** See §2. |
| **3.** `agent_state.value` null guard | "a month of failed writes" | ✅ **ALREADY FIXED.** `agents/lib/kv.mjs:55` — `if (value === null \|\| value === undefined) return stateClear(key)`, with a comment naming site-reviewer's 6-per-run. |
| **4.** `writeDiscussion` → numeric | real | 🔴 **REAL.** Confirmed against the live DB: `impact_score` and `effort_score` are `integer`. Migration written, **not applied** — see §3. |

**Why this matters beyond bookkeeping:** an error group appearing in a 7-day window
does **not** mean the bug is live. It means it fired at some point in those 7 days.
Three of these were fixed *during* the window. **Check the code and compare the group's
`last` timestamp against when the fix shipped, before reporting anything as open.**
That caution is now written into the playbook alongside the new check.

The doc's conclusion that malformed calls — not the API key — explain the
"BrightLocal key is rejecting" mystery still stands, and is worth keeping.

---

## 2. FIXED HERE — the review responder (the one that mattered)

`agents/review-responder.mjs` held report IDs as **quoted strings**:

```js
{ name: "Alabaster",  report_id: "630345" },   // <- string
```

BrightLocal validates `report_id` as an integer, so every `find_rm_reviews` call
failed schema validation from **2026-07-27**. Now integers, **and** `Number()` at the
call site so re-adding quotes cannot silently break it again.

This is why the sibling fix on Aug 4 missed it — the corrected calls live in
`agents/brightlocal.mjs`, this one lives in a different file.

**Consequence while it was broken:** no review auto-reply for two weeks, including
the 6 May complaint about missed visits and billing. Review replies are the named
lever for Huntsville (0.20% SoLV, 34 reviews at 5.0★).

### 2b. Your `num_per_page` catch was right — and it needed paging, not a cap

Good catch, and I had missed it. Verified against the endpoint schema rather than
taken on trust: `find_rm_reviews` accepts **1–20** and rejects anything else, and
`report_id` is typed `integer`. The call carried `num_per_page: 50`, so **it would
have failed even after the type fix** — two bugs stacked on one call, the second
masked by the first.

**I did not just pin it to 20.** The lookback is 14 days across three locations, and
a busy fortnight at one location can exceed 20 reviews — a hard cap would silently
drop the 21st. It now **pages** (`RM_PAGE_SIZE = 20`, ceiling `RM_MAX_PAGES = 10`) and
logs loudly if the ceiling is ever reached. Silent truncation reads as "we handled
everything" when we did not.

### 2c. 🔴 Conflict in the draft prompt — needs a person, not a commit

`agents/review-responder.mjs:143` opens the drafting prompt with:

> `Owner: Phillip Wedgworth.`

`data/compliance.ts:104` flags exactly that shape as **`wrong owner`**, stating the
owner is **Kevin Wedgworth** (gen 3) and that **Phillip M. Wedgworth is the founder**
(gen 1). The `notIf` carve-out only exempts "Phillip M." or founder wording, neither
of which is present.

**I have not changed it.** Who owns the company is a fact I cannot settle from the
repo, and the two sources disagree. It matters because this line feeds an AI that
drafts **public** review replies — if it is wrong, it can surface on Google. Either
correct the prompt or correct the rule, but they cannot both stand.

> ⚠️ **Do not assume replies will now flow.** The code path is fixed; nobody has run
> it end-to-end against live BrightLocal. **Run the review responder once and check
> its output before telling Phillip replies are working.**

---

## 3. NEEDS A HUMAN — one migration, deliberately not applied

`agents/lib/migrations/widen_discussion_scores_to_numeric.sql`

`seo-monitor` writes half-point scores (9.5, 8.5, 7.5) into `integer` columns.
Verified against the live DB, not assumed. The half-points are intended, so the
**column** is wrong — rounding at the call site would discard precision the scale
was designed around.

```sql
alter table public.agent_discussions
  alter column impact_score type numeric using impact_score::numeric;
alter table public.agent_discussions
  alter column effort_score type numeric using effort_score::numeric;
```

Widening, non-destructive, no backfill. **Left unapplied on purpose** — production
DDL should be run deliberately by a human, not as an agent side effect.

**Not investigated:** `site-reviewer` Birmingham 75s timeout (one occurrence, Aug 6).
The doc notes it may still point at a bad URL list, which ties to THE LIST item A1.
Left alone — it is your area and I did not want to collide.

---

## 4. What is on the branch, and the one thing that undoes it all

11 commits. Highlights:

- **`#birmingham` schema collision** — `app/layout.tsx` had a node with `@id .../#birmingham`
  carrying the **Alabaster** NAP while `lib/schema.tsx` used the same `@id` with the real
  Birmingham NAP. Google merges by `@id`, so the graph described one business with two
  addresses and two phones. Split into `#alabaster` / `#birmingham`, territory taken from
  `data/cities.ts`. Birmingham has **no `geo` and no Maps `sameAs`** deliberately — it has
  no GBP, and reusing another office's listing is what caused the collision.
- **Wrong WDO form, 11 places** — the site told realtors Alabama uses the **NPMA-33**.
  It does not. Ala. Admin. Code r. 80-10-9-.18 makes it the *Official Alabama Wood
  Infestation Inspection Report*, Exhibit "A". `/realtor` asserted "NPMA-33 is the
  federal standard" in its **search metadata**.
- **Name retired sitewide** — 106 occurrences, 51 files. Generic → `EnviroCare`,
  Birmingham → `EnviroCare Pest Services`, legal entity → `EnviroCare, LLC`.
  Organization schema now carries `name` + `legalName` separately, which resolves the
  AGENTS.md ↔ compliance.mjs contradiction instead of picking a winner.
- **Guarantee guard**, three gaps closed (HTML-entity possessive, bare duration,
  intervening word). Test promoted to `scripts/test-compliance-guarantee.mjs`, 31/31.
- **Nav submenus**, turnaround promises, contract-free claims, orphan links.

> 🔴 **None of this is public.** `main` last deployed 2026-08-08 22:27. The live site
> still publishes the retired name, still carries guarantee claims, and still serves
> the `#birmingham` schema collision. **Merging PR #74 is the single action that
> changes that.** Phillip has explicitly held it — do not merge without him.

---

## 5. Three process notes worth acting on

**a. Documents keep asserting authority they cannot hold.** Four files were cited as
authoritative this week that **do not exist in the repo**: `THE-LIST-Jul25.md`,
`EnviroCare-Name-Decision-FINAL-Aug9.md`, the monitor playbook (now added), and the
AI-report verification (now added). A standing document that lives only in a chat
window cannot be read by a scheduled task and cannot be diffed.

**b. Four Aug-9 documents contained claims that live checks overturned.** The
redirect 302/301 claim (both are 308), the playbook's baseline and two of its checks,
the "two repos" alarm, and now three of four agent bugs. The common factor is stated
plainly in AGENTS.md rule zero: **written from indirect evidence the same day, not
from a live check.** Re-verify anything in the Aug-9 set before actioning it.

**c. The pattern that keeps costing the most.** Violations kept returning because the
**rule file** authorized them — `compliance.mjs` taught the retired `$32` price,
`data/compliance.ts` approved "no contract", `brand.md` credited Corteva with the $1M.
Fixing pages without fixing rules just resets the clock. Every fix this week added the
corresponding guard. Please keep doing that.

---

## 6. Open, needs Phillip — not code

1. **Who edited the Huntsville GBP description on Aug 8?** It dropped "Huntsville,
   Madison, and North Alabama" for "across Alabama" and dropped "up to $1 million",
   while keeping "Founded in 1958", the retired name and "guarantee". If that was the
   pending Google-suggested update being accepted, that is worth knowing.
2. **Do not run a NAP standardization push yet.** Active Sync is on for gmb/facebook/
   bing/appleMaps on all three locations and is currently propagating the banned
   guarantee claim and the retired name. Fix descriptions first.
3. **Birmingham GBP** still does not exist. No 4th BrightLocal location.
4. **Birmingham Core campaign** is set to weekly and last ran 16 days ago.
5. **Huntsville address** differs across BrightLocal / Bing / Yelp — pick a canonical form.
6. **Does EnviroCare actually issue an NPMA-33 in practice?** I set copy to the form
   the Alabama rule names. If both are issued, tell me and I will reflect it.
