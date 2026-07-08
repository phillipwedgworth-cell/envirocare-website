# LSA Setup Runbook — Google Local Services Ads (Google Guaranteed)

Handoff instructions for a Claude agent to prepare Local Services Ads for all
three EnviroCare offices. **Prep + research only — never enters payment, never
launches, never spends.** The human-only steps (verification, payment, go-live)
are marked 🔴 and must be done by Phillip.

## Hard rules for the agent

- Do **not** log into or operate the live Google Ads / Local Services account to
  create spend. No automated Google login.
- Do **not** submit the application, enter payment, or set a live budget.
- Produce paste-ready content + a verification checklist; save artifacts to the repo.
- Keep all copy compliant with `data/compliance.ts` (no safety/availability/discount
  claims; mosquito = reduce/knock-down; correct per-office phone; never the banned line).

## The three locations (from data/offices.ts + data/service-areas.ts)

**1. Birmingham / Alabaster** — `(205) 940-6360`
- Address: 2025 Butler Rd, Alabaster, AL 35007
- GBP: https://www.google.com/maps?cid=7378341068021381374
- Service area: Birmingham, Hoover, Vestavia Hills, Mountain Brook, Homewood,
  Alabaster, Pelham, Helena, Calera, Chelsea, Trussville, Greystone, Mt Laurel,
  Gardendale, Bessemer, Leeds, Moody, Fultondale, Indian Springs, Oak Mountain.
  **Exclude Tuscaloosa.**

**2. Huntsville / North Alabama** — `(256) 937-7676`  ← PRIORITY (weakest organic, SoLV 0%)
- Address: 7027 Old Madison Pike, Ste 108, Huntsville, AL 35806
- GBP: https://maps.app.goo.gl/p5fJg2GoAr3Vk3Ua8
- Service area: Huntsville, Madison, Hampton Cove, Athens, Decatur, Hartselle,
  Harvest, New Market, Meridianville, Toney.

**3. Alexander City / Lake Martin** — `(256) 234-6162`
- Address: 1785 Tallapoosa St, Alexander City, AL 35010
- GBP: https://www.google.com/maps?cid=12101127141767078247
- Service area: Alexander City, Dadeville, Eclectic, Wilsonville, Willow Point,
  The Ridge, StillWaters, The Heritage — plus Auburn & Opelika (route to this office;
  Auburn service line (334) 332-3321).

## LSA job categories (pick per office)

Primary job type: **Pest control service**. Add specific services offered:
General pest control, Termite control/inspection, Mosquito control, Rodent* —
*EnviroCare does NOT offer rodent/wildlife removal, so DO NOT select those.
Fire ant, flea, tick as available. Real-estate/WDO letters if LSA lists it.

## Step-by-step

### Phase A — Agent does (no spend)
1. For each office, draft the LSA **business profile**: business name (EnviroCare),
   category, services (compliant list above), service-area cities/ZIPs, hours,
   the correct office phone, and the matching Google Business Profile link.
2. Draft the **highlights/bio** copy (fourth-generation, family-owned Alabama since
   1958; 5.0★ quality) — validate against `data/compliance.ts`.
3. Save all three profiles to `agents/lsa-profiles.json` (status `draft`).
4. Assemble the **verification checklist** (Phase B) into this runbook's issue list.

### Phase B — Human-only (🔴 Phillip)
1. 🔴 Go to ads.google.com/local-services-ads (or business.google.com) and start the
   Local Services / **Google Guaranteed** signup for the pest-control category in AL.
2. 🔴 Provide **Alabama pest control license** (AL Dept of Agriculture & Industries)
   + business license for each operating office.
3. 🔴 Provide **general liability insurance** certificate.
4. 🔴 Complete **background checks** (business + owner; field employees as required) —
   Google runs these via its provider; takes several days.
5. 🔴 Connect each **Google Business Profile** (links above) to the LSA account.
6. 🔴 Set **service areas** per office (paste from this runbook) and select job types.
7. 🔴 Set a **weekly budget** (LSA is pay-per-lead; start conservative, e.g. Huntsville
   highest since organic is weakest). Enable lead dispute for invalid leads.
8. 🔴 Leave the account **paused / not live** until you're ready; going live = you
   flip it on. That is the only step that spends.

### Phase C — After live (agent can assist, read-only)
- Track lead volume/cost per office; reconcile against Local Falcon SoLV movement.
- Feed results back into the paused search-ads budget split (`agents/ad-launch-plan.md`).

## Notes

- One LSA account can hold all three office locations.
- LSA is widely the highest-ROI channel for pest control (pay-per-lead, top-of-page,
  "Google Guaranteed" badge) — this is why `SOCIAL-LOCAL-GAMEPLAN.md` flags it.
- Verification is the long pole (days), so start Phase B early even if launch waits.
