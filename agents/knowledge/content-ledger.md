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

## 3. ⬜ OPEN — briefed, never written. **Write these before inventing anything new.**

**Birmingham metro neighborhoods** (highest value — Birmingham office is launching):
`brook highland hoover` · `greystone` · `highland lakes 35242` · `indian springs village` ·
`liberty park vestavia` · `mt laurel` · `mountain brook` · `vestavia hills` · `trussville`

**Shelby County corridor:** `alabaster` · `calera` · `chelsea` · `helena` · `pelham`

**Service-specific:** `commercial pest control birmingham al` · `flea control birmingham al` ·
`tick control birmingham al` · `mosquito control huntsville`

**Competitive:** `best pest control company in birmingham al`

> ⚠️ `pest control alabaster al` is open even though Alabaster is the **largest office** (247 Google
> reviews). That's the single biggest gap in the list.

## 4. 📄 PUBLISHED BLOG POSTS — live on `/blog`

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

## 5. 📱 SOCIAL — 22 drafts in OneUp, all unpublished

Angles already drafted (**do not write these again**): lake house first visit · August pest peak ·
1958 family business · 15-minute fall walkaround · late-summer fleas · fire ant mound regrowth ·
termites in August · wasp vs hornet vs yellowjacket ID · empty-house advantage · termite letter timing
· kudzu bugs · fire ants on sunny paths · mailbox post turf · post-storm fire ants · lake wasp nests ·
grill lid warning · Huntsville yellowjackets · post-thunderstorm mounds · mosquitoes from cups ·
dock mosquitoes · Over-the-Mountain mosquitoes · Huntsville yard comparison.

**Status: 0 scheduled, 0 published, ever.** See `EnviroCare-Pipeline-Diagnosis-Aug6.md`.

---

## 6. The rule that stops the repeating

Any agent, session, or person creating content follows this in order:

1. **Read this file.** If the topic is in §2, §4, or §5 — stop. Update the existing asset instead.
2. If it's in §3 — write it. It's already researched; don't re-research.
3. Only if it's in none of the above, create something new — and **add it here in the same session.**
4. Never create a NeuronWriter query without checking §2 and §3 first. That check is what 70
   `DUPLICATE-DELETE` tags were missing.

**Why a file and not agent memory:** agents don't share memory across runs, and neither do chat
sessions. A file in this project is the only thing all of them can read. This file *is* the memory.

**How it reaches the agents:** this file lives in `agents/knowledge/`, which
`agents/lib/knowledge.mjs` loads wholesale into the prompt of every agent that calls
`knowledgeBlock()` — currently `neuronwriter-narrator`, `proposer`, `morning-brief`, and
`site-reviewer`. Adding a `.md` here is all that is required; there is no registration step.
(Those files were silently missing from the Vercel serverless bundle until 2026-08-05 —
`outputFileTracingIncludes` in `next.config.ts` is what keeps them shipping. Do not remove it.)

---

## 7. What's genuinely unexplored

Everything above is location × service — the same two variables recombined. That's why it feels
repetitive: **it is repetitive.** Directions with no coverage at all:

- **Seasonal calendar content** — "what's active in Alabama in September" as a recurring monthly asset
- **Buyer-stage content** — realtor/closing audience (WDO letters), builder audience (pre-treats),
  property-manager audience (multifamily). Three different buyers, zero content each.
- **The 321 Google reviews** — real customer language, mined for zero content so far. Lauryn was named
  unprompted twice in one day across two markets; that's a story, not a keyword.
- **Cost/pricing transparency** — one Huntsville cost guide exists and nothing else. Competitors hide
  price; you don't have to. *(A second one shipped Aug 4: termite treatment cost.)*
- **Comparison content** — Sentricon vs liquid termite treatment; annual bond vs per-visit.

Those are net-new. The location grid is not.

## Sources

- NeuronWriter `list-queries`, project `9d0bec3a70f4743c` — read live 2026-08-06 (114 queries)
- `envirocarellc.com/blog` — fetched 2026-08-06
- OneUp drafts queue — read live 2026-08-06
- Second NeuronWriter project `165a2e80745be990` (`envirocarepestservices.com`) — **not yet audited**
