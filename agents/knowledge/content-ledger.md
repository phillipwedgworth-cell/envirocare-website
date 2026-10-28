# EnviroCare — CONTENT LEDGER

> **HARD CONSTRAINT FOR EVERY AGENT.** This file is injected into your prompt via
> `agents/lib/knowledge.mjs`. Before you propose, brief, or generate ANY keyword,
> blog post, or social post: check §2, §4 and §5 below. If the topic appears
> there, do NOT create it — say it already exists and propose updating it instead.
> Prefer §3 (already researched, never written) over anything net-new.

> **Read this file before creating any keyword, brief, blog post, or social post.**
> It exists because the same topics keep getting made twice. 45 NeuronWriter queries are tagged
> `DUPLICATE-DELETE` and 25 more `Deleted` — that is 70 wasted briefs, and it will keep happening
> until something checks first.
>
> **The rule: if a topic appears anywhere below, do not create it again. Update the existing asset.**

**Built:** August 6, 2026 · from NeuronWriter live data + the live `/blog` index.
**Owner of accuracy:** whoever adds content updates this file in the same session. No exceptions.

---

## 1. 🔴 The duplication that's already happened

These pairs are the same search intent filed twice. **Kill the second column.**

| Keep (has content) | Kill (empty duplicate) |
|---|---|
| `mosquito control birmingham al` ✅ Done | `mosquito control birmingham` |
| `termite control birmingham al` ✅ Done | `termite control birmingham` |
| `termite control huntsville al` ✅ Done | `termite control huntsville` |
| `pest control huntsville al` ✅ Done | `mosquito control huntsville` *(different service — keep, but write it, don't re-research)* |

**Also:** 4 Hoover-area neighborhood keywords are open while 2 are already Done
(`eagle point hoover`, `meadow brook hoover`). Before writing `brook highland` or `greystone`, read the
two finished ones — they are the same page pattern with a different neighborhood name. Do not
re-research Hoover.

---

## 2. ✅ WRITTEN — 22 topics. Do not recreate.

```
exterminator birmingham al          pest control hoover al
exterminator huntsville al          pest control huntsville al
fire ant control alabama            pest control lake martin al
mosquito control birmingham al      pest control madison al
pest control alexander city al      pest control meadow brook hoover al
pest control athens al              pest control opelika al
pest control auburn al              pre-construction pest treatment alabama
pest control birmingham al          sentricon termite system alabama
pest control eagle point hoover al  termite control birmingham al
pest control homewood al            termite control huntsville al
pest control madison al             termite protection
                                    wdo letter inspection alabama
```

## 3. ✅ ROUTES ALREADY IN THE REPO — prioritize improvements, not new pages (checked 2026-10-12)

**Correction to the August 6 ledger:** The former list below described these
queries as "OPEN — briefed, never written" and told agents to *write* them.
That referred to the then-current NeuronWriter editor, not the website.
On 2026-10-12, the following routes were individually confirmed to have
`app/.../page.tsx` files on GitHub `main`. **Repo presence does not by
itself establish a successful production deployment, indexation, or a fresh
NeuronWriter editor score.** Verify those separately before claiming them.

| Search-intent group | Existing pages on main |
|---|---|
| Birmingham / Hoover neighborhoods | `/brook-highland`, `/greystone`, `/highland-lakes`, `/indian-springs`, `/liberty-park`, `/mt-laurel`, `/mountain-brook`, `/vestavia-hills`, `/trussville` |
| Shelby County | `/alabaster`, `/calera`, `/chelsea`, `/helena`, `/pelham` |
| Service opportunities | `/services/commercial`, `/services/flea`, `/services/tick-control`, `/huntsville-mosquito-control` |
| Competitive intent | `/best-pest-control-birmingham` |

**RivalFlow / NeuronWriter rule:** use an existing route as the asset to improve.
Do not mint a second page or query because a historical brief is labelled open.
Before generating copy, check the current page, `data/blog-posts.ts`,
NeuronWriter's existing-query list, GSC page/query pairing, and this ledger.
RivalFlow's suggested questions are evidence for a possible *addition*, not
permission to replace a page wholesale. Use the smallest useful answer
expansion; protect approved pricing, service scope, NAP, legal coverage wording,
page intent, and existing internal links. Record the keyword, page, competitor
comparison URL, question gap, changed section, and measurement baseline in the
PR. **Never auto-publish the RivalFlow full draft.**

**Still unresolved:** Which of these existing pages has a current verified
RivalFlow project, an up-to-date NeuronWriter editor score, or a measurable GSC
opportunity? Those require fresh reads; do not guess from this ledger.

## 4. 📄 PUBLISHED BLOG POSTS — live on `/blog`

**October 28 review only:** PR #287 contains 30 existing-URL refreshes and six data-center guides. Check `agents/knowledge/editorial-batch-36.json` before proposing overlapping topics. The follow-up also corrects public pricing in ten articles and expands the existing preparation and sugar-ant articles. These are not production publications or scored NeuronWriter imports. Audit: `claude/BLOG-SEARCH-AUDIT-2026-10-28.md`.


Newest first. **35+ total.** Do not pitch these angles again.

- How Much Does Termite Treatment Cost in Alabama? — Aug 4 *(added 2026-08-05, commit 92530a0)*
- How Much Does Pest Control Cost in Huntsville, AL? (2026 Guide) — Jul 24
- Fleas in the House But No Pets? — Jul 21
- What Is a Termite Bond in Alabama — And Is Yours Still Good? — Jul 14
- Why You Need a Termite Inspection Before Buying a Home in Alabama — Jul 12
- Yard Mosquito Spray vs. Professional Treatment — Jul 7
- How to Keep Wolf Spiders Out of Your Birmingham Home — Jun 30
- A Birmingham Homeowner's Guide to Pest Control — Jun 30
- DIY Pest Control Mistakes That Make Problems Worse — Jun 29
- Common Winter Pest Problems in Alabama — Jun 28
- Sugar Ants in Your Alabama Home — Jun 1
- *(plus ~25 more: termite seasons, tick control, roach ID, Huntsville and Lake Martin regional guides)*

**Canonical source of truth for what is published: `data/blog-posts.ts`.** Every entry in
`BLOG_POSTS` renders at `/blog/<slug>` and is emitted in the sitemap — there is no draft flag,
so anything added there is live on push.

## 5. 📱 SOCIAL — historical August 6 draft inventory (recheck OneUp live)

Angles already drafted (**do not write these again**): lake house first visit · August pest peak ·
1958 family business · 15-minute fall walkaround · late-summer fleas · fire ant mound regrowth ·
termites in August · wasp vs hornet vs yellowjacket ID · empty-house advantage · termite letter timing
· kudzu bugs · fire ants on sunny paths · mailbox post turf · post-storm fire ants · lake wasp nests ·
grill lid warning · Huntsville yellowjackets · post-thunderstorm mounds · mosquitoes from cups ·
dock mosquitoes · Over-the-Mountain mosquitoes · Huntsville yard comparison.

**Historical status on August 6: 0 scheduled, 0 published.** Not a current OneUp status check. Review the live queue before acting; see `EnviroCare-Pipeline-Diagnosis-Aug6.md`.

---

## 6. The rule that stops the repeating

Any agent, session, or person creating content follows this in order:

1. **Read this file, then inspect the live asset and the repo.** An August
   NeuronWriter "open" label is not evidence that the website lacks that page.
2. If the intent already has a website route or blog post, **improve the
   existing asset** and preserve its canonical URL. Avoid overlapping pages.
3. Reuse the existing NeuronWriter query ID when possible; creating a new
   keyword analysis uses plan quota. Distinguish a missing editor draft from a
   missing public page.
4. Use RivalFlow on specific already-ranking pages, prioritizing competitor
   question gaps only when relevant to an actual offered EnviroCare service.
   Don't assume extra words improve AI citation visibility; off-site authority
   and location corroboration often matter more.
5. For a genuinely new topic, prove that no corresponding page exists, then
   add it to this ledger when preparing the approval-gated PR.
6. **Do not reuse historical ranking, review, or OneUp status as a current
   measured fact.** Verify each underlying system before publishing a claim.

**Why a file and not agent memory:** agents do not share session memory. This
file is loaded via `knowledgeBlock()` into narrator and other agent prompts.

---

## 7. Research leads — not confirmed content gaps

The August 6 list of unexplored ideas is historical. Several now have live
repository assets, including Sentricon comparisons, termite cost, and builder /
WDO content. Verify `data/blog-posts.ts` and the current sitemap before
proposing any of those again.

Priority for October 2026: use fresh GSC and RivalFlow comparisons to improve
already-ranking buyer-intent pages and pursue **off-site corroboration**
(editorial links, accurate local citations, legitimate customer reviews)
for Huntsville, Birmingham, and Lake Martin. RivalFlow compares *on-page
answers*; it does not measure or repair the full off-site authority gap.

A real opportunity record must include:
- Target search query and the canonical existing EnviroCare URL;
- Verified current GSC clicks, impressions and ranking date, or "unknown";
- RivalFlow project's competitor URL and specific missing/weakly answered
  questions, or "not yet read";
- A proposed exact content change or off-site action, compliance checks,
  and a 28-day measurement checkpoint.

Never label inferred or historical gaps as fresh RivalFlow results.

## Sources

- NeuronWriter `list-queries`, project `9d0bec3a70f4743c` — read live 2026-08-06 (114 queries)
- `envirocarellc.com/blog` — fetched 2026-08-06
- OneUp drafts queue — read live 2026-08-06
- Second NeuronWriter project `165a2e80745be990` (`envirocarepestservices.com`) — **not yet audited**
