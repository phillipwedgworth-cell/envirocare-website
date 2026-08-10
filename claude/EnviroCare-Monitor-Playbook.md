# EnviroCare — weekly monitor playbook

**Standing document.** The weekly scheduled task reads this file and follows it.
Update this file to change what gets monitored; do not rewrite the task prompt.

**Created Aug 9, 2026** after a full manual dry-run of every check below.
**Corrected Aug 9, 2026** after the first real run — three checks were wrong. See
"Corrections" at the bottom; each is marked ✅ CORRECTED inline.

---

## The design rule that matters

THE LIST diagnosed the real failure in July: *"it's not that nothing runs — it's that
too much runs and none of it is trusted."* A daily digest sent 25+ emails and almost
all went unread.

So this monitor has one rule:

> **Report exceptions and changes only. If nothing changed, say "nothing changed" in
> one line and stop.**

A weekly note that is usually three lines gets read. A complete status dump does not.

---

## What runs where

| System | API access | What it can tell us |
|---|---|---|
| **Local Falcon** | ✅ full read + write | Campaign results, credits, Falcon Guard, new platforms, KB articles |
| **BrightLocal** | ⚠️ partial | Locations, NAP change alerts, CB/LSG credits. **`get_brain_recommendations` returns INVALID_API_KEY** — that endpoint is gated by plan, the key itself is fine |
| **Supabase** | ✅ full read | Security + performance advisors, logs, migrations, table state |
| **OneUp** | ⚠️ **session-dependent** | A working MCP connector EXISTS and served a full audit on 2026-08-10 (`list-categories-tool`, `get-scheduled-posts-tool`, `edit-post-tool`, and more). It is **not present in every session** — the Claude Code session searched the registry on Aug 9 and Aug 10 and found nothing, which is what produced the original "no connector" note. **Check your own tool list before concluding it is unavailable.** It exposes accounts, categories and posts only; timeslots, Canva link, Media Gallery and Best Time to Post remain UI-only |
| **Ahrefs** | ❌ dead | Every endpoint returns `Insufficient plan`, including free ones. Do not retry |

---

## THE WEEKLY CHECKS

### 1 · Local Falcon — results and budget

```
viewLocalFalconAccountInformation      → credits, plan, permissions
listLocalFalconCampaignReports         → all 9 campaigns, status, SoLV/SAIV + moves
listLocalFalconGuardReports            → all locations still "Protected"
```

**Flag if:**
- `total_usable_credits` < **4,000** → roughly 2 weeks left, decide on a top-up
- Any campaign flips from `scheduled` to `paused` on its own
- `solv_move` or `saiv_move` swings more than ±5 points
- Any Falcon Guard location stops reading **Protected**
- ✅ **CORRECTED — the stall test.** This said *"flag if `next_run_date` is in the
  past"*. **That test cannot detect the actual failure mode.** On Aug 9, Birmingham
  Core (frequency `every week`) had last run **16 days** earlier — two missed runs —
  yet its `next_run` was tomorrow, so it looked healthy. A campaign that skips a run
  but keeps rescheduling always passes the old test.
  **Use instead: compare `last_run` age against the stated `frequency`.**
  Flag when `now - last_run` exceeds roughly 1.5× the frequency interval.
  Timestamps are Unix seconds; convert before comparing.

**Committed spend is ~9,186 credits/month.** Balance was 13,449 on Aug 9, cycle ends
**Sep 9**. Full breakdown in `EnviroCare-LocalFalcon-Campaign-Spec-Aug9.md`.

🔴 **Never resume these** — two are credit traps: *AI Visibility - Bi-Weekly 5x5*
(named biweekly, set to **weekly**, ~3,900/mo), *Birmingham - Weekly v2* (29 keywords,
~3,140/mo), *AI Visibility - Monthly*, *Huntsville v2*, *Lake Martin v2*.

**Platform coverage:** Local Falcon supports `google, gaio, gemini, aimode, chatgpt,
grok`. The gap tracker uses four — **`gemini` and `grok` are available and unused**
(THE LIST item A14). Adding both costs ~2,340/mo. Only worth it if credits allow.

### 2 · Local Falcon — new features in the product

```
searchLocalFalconKnowledgeBase(q="new feature announcement")
```

✅ **CORRECTED.** This said *"81 articles as of Aug 9"* and to compare the count. But
this endpoint returns matches **for the query you pass**, not the whole KB — so a count
only means something if the query is **identical** week to week. The same call on Aug 9
returned **38**, not 81.

**Fixed comparison point — always use this exact query:**

| Query | Total | Newest article |
|---|---|---|
| `new feature announcement` | **38** | KB87, `2025-11-17` — "Comprehensive Local SEO Knowledge" |

Flag a rise in the total, or a `date_created` newer than the one recorded. New KB
articles are how Local Falcon ships features — the cheapest new-options signal there is.

### 3 · BrightLocal — NAP drift

```
find_locations                                    → 3 locations
active_sync_change_alerts_tool(location_id) × 3   → 4068335, 4068730, 4068729
get_cb_credits / get_lsg_credits
```

**Flag if:**
- Any change alert appears — this means Google/Bing/Apple/Facebook now disagrees with
  the stored record. **This is the highest-value check in the whole monitor** — proven
  on the first run, see below.
- A location's `business_name` reverts to lowercase `Envirocare`
- A description regains the word **guarantee** or the retired name
  *"EnviroCare Pest & Termite Services"*
- **A 4th location appears** — that means the Birmingham GBP landed. When it does:
  add it to Falcon Guard (7 of 10 seats unused) and to the gap tracker campaign
- CB credits move off 0

✅ **CORRECTED baseline.** The Aug 9 baseline recorded *"change alerts empty on all
locations"*. **That was wrong.** Location **4068730 (Huntsville) had 5 alerts**, dated
Jul 28 / Aug 2 / Aug 8 — all predating the baseline. Real baseline:

**Baseline Aug 9:** change alerts **4068335: 0 · 4068730: 5 · 4068729: 0** ·
CB credits **0** · LSG credits **5** (adhoc) · Falcon Guard 3 of 10 seats, all Protected.

### 4 · Supabase — advisors

```
get_advisors(project_id="dyoujmyleihcpqgeifre", type="security")
get_advisors(project_id="dyoujmyleihcpqgeifre", type="performance")
```

Project **"Phillips Agents"** (`dyoujmyleihcpqgeifre`) is ACTIVE_HEALTHY, Postgres 17.
The second project, `phillip-personal`, is **INACTIVE** — ignore it unless it wakes up.

**Flag only NEW advisories, and only WARN or ERROR level.** The 42 existing
`rls_enabled_no_policy` INFO notices are known — see §5. Do not re-report them weekly.

### 5 · Vercel runtime errors — ADDED 2026-08-09

```
get_runtime_errors(projectId="prj_bD63HstQIuOMn5cEGDK4RAW7yM2F",
                   teamId="team_e56vlWMynAPn6B3dI83AzgAD",
                   since="7d")
```

**This surface was watched by nothing, and it is where the agent fleet reports that
it is broken.** A month of daily failures produced no signal anywhere a human looked —
including the review responder failing on all three locations from Jul 27, which is the
single named lever for Huntsville.

**Flag any group whose `last` timestamp falls inside the window.**
**Baseline 2026-08-09: 9 groups.** Note that 3 of the 4 underlying bugs were already
fixed in code by the time the errors were read — an error group's presence in a 7-day
window does **not** mean the bug is still live. **Check the code before reporting a
bug as open**, and compare the group's `last` timestamp against when the fix shipped.

### 6 · Site health

Fetch `https://www.envirocarellc.com/` and confirm:
- 200, and the title matches the current brand name
- `rel=canonical` present

✅ **CORRECTED — REDIRECT CHECK REMOVED.** This section used to say the vercel.app
alias *"is still a 302 … should be changed to a 301"*. **Both claims are false and
always were.** Verified with `AllowAutoRedirect=$false` on Aug 9:

```
https://envirocare-web.vercel.app/   308 -> https://www.envirocarellc.com/
https://envirocarellc.com/           308 -> https://www.envirocarellc.com/
```

**308 IS a permanent redirect** — Google treats it exactly as it treats a 301. It
consolidates signals and drops the alias. There is nothing to fix. AGENTS.md recorded
this correctly on Jul 26; the bad instruction came from
`EnviroCare-Live-Verification-Aug9.md`, which is wrong on this point.
**Do not reinstate this check.**

---

## Known state — do not re-report these as new

| Finding | Status |
|---|---|
| 42 tables `rls_enabled_no_policy` (INFO) | **Known.** RLS on, no policies = deny-all through the anon key. Fine if the agents use `service_role`; a silent zero-rows bug if they don't. Worth confirming once, then leaving. |
| 2 functions `function_search_path_mutable` (WARN) | Known — `update_updated_at`, `touch_approval_queue` |
| Auth leaked-password protection **disabled** (WARN) | **Known, one-click toggle** — Supabase dashboard → Auth → Password security |
| BrightLocal `longitude: 0` on Alex City + Huntsville | Known. BrightLocal's copy only — Local Falcon has correct coordinates, so Google is fine |
| BrightLocal `get_brain_recommendations` = INVALID_API_KEY | Known — plan-gated endpoint, not a broken key |
| Ahrefs entirely dead | Known — do not retry |
| No OneUp connector | Known |
| **vercel.app + apex are 308, not 302** | **Known and CORRECT.** Do not "fix". See §5 |
| **Huntsville GBP description carries "Founded in 1958", the retired name, and "guarantee"** | **Known, open.** Needs a login to change — Phillip only. Do not re-flag weekly; flag only if it changes *again* |
| **Huntsville address differs across sources** | Known, open. Stored `7027 Old Madison Pike NW, Ste 108` · Bing `…Pike Ste 108` (no NW) · Yelp `…Pike` (neither). Decide a canonical form |
| Guard location names: 2 × lowercase `Envirocare`, 1 × `EnviroCare` | Recorded Aug 9. Not known to be a *revert* — the original baseline never captured names |

---

## Output

Write the week's note to **`claude/EnviroCare-Monitor-YYYY-MM-DD.md`** with:

1. **One-line verdict** — *"Nothing changed"* or *"3 things changed"*
2. **Changes** — what moved, with the number and the previous number
3. **New options spotted** — new KB articles, new settings, new platforms, anything
   the product now offers that is not switched on
4. **Needs Phillip** — anything requiring a login or a decision
5. **Baseline block** — credits, campaign statuses, alert counts, so next week can diff

Then update this playbook's "Known state" table if something becomes known.

**Do not** create new campaigns, spend credits, resume paused campaigns, or change
settings. This is a read-only monitor. Propose; do not execute.

---

## Corrections log

**2026-08-09, first real run.** Three checks were wrong as written:

1. **§1 stall test** — `next_run in the past` cannot detect a skipping campaign.
   Replaced with `last_run` age vs frequency. This is not academic: it was already
   failing to catch Birmingham Core missing two weekly runs.
2. **§2 KB count** — 81 was not reproducible; the endpoint is query-scoped. Pinned an
   exact query and recorded 38.
3. **§5 redirect** — instructed a fix for a problem that does not exist. Removed.

Plus one baseline error: change alerts were **not** empty on all locations.

**The lesson matches rule zero in AGENTS.md.** Every one of these came from a document
written the same day rather than from a live check. A playbook that has never been run
against live data is a hypothesis, not a baseline.
