// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: data/builder-faqs.ts
// Commit: feat(builders): shared builder FAQ data (page render + FAQPage schema)
// Push: main
// ─────────────────────────────────────
// Single source of truth for /builders FAQs — rendered by
// components/pages/BuildersPage.tsx and emitted as FAQPage JSON-LD by
// app/builders/page.tsx. Edit here, both stay in sync.

export const BUILDER_FAQS: { q: string; a: string }[] = [

  {
    q: "When during construction does the termite pre-treatment happen?",
    a: "The soil treatment happens after footing and plumbing trenches are dug and before the concrete pour — that's the only window when the soil under the slab is fully exposed. We coordinate directly with your superintendent so the treatment lands at the right point in the pour schedule. Sentricon® stations go in later, at the landscape phase, once final grade is set.",
  },
  {
    q: "Is termite protection required by code for new construction in Alabama?",
    a: "Yes. Alabama's residential building code requires protection against subterranean termites for new construction, and your building inspector will look for documentation that it was done. Every EnviroCare pre-treatment comes with a treatment certificate for your inspector's file, so there's no back-and-forth at inspection.",
  },
  {
    q: "What does a builder pre-treatment cost?",
    a: "It's quoted to the project — slab footprint, lot conditions, number of homes, and where you are in the build all factor in. We confirm scope and pricing after a free inspection of the site rather than quoting a flat number sight unseen. There's no charge for the site visit or the quote, and multi-lot projects are quoted as one coordinated scope.",
  },
  {
    q: "Soil treatment or Sentricon® — which one do new builds get?",
    a: "Most new builds get both, at different stages: a soil treatment before the pour to satisfy the code requirement, then Sentricon® Always Active stations at the landscape phase for ongoing colony protection. The exact scope is confirmed at the site inspection — every lot and build is a little different.",
  },
  {
    q: "What paperwork does the builder receive?",
    a: "Three documents across the build: a treatment certificate after the pre-pour soil treatment (for your building inspector), Sentricon® installation records at the landscape phase, and an NPMA-33 WDO inspection letter at closing for the buyer's lender and closing attorney. Everything stays on file with us, so replacements are a phone call away.",
  },
  {
    q: "Does the protection carry a warranty?",
    a: "Yes. New-construction termite protection is subject to the terms of the agreement, with damage coverage up to $1,000,000 — backed by EnviroCare directly, standing behind our own work. Specific terms are confirmed at the site inspection.",
  },
  {
    q: "Can the homeowner keep the Sentricon® protection after closing?",
    a: "That's the whole point of installing it during construction. At closing, the buyer can pick up ongoing Sentricon® monitoring and renewal with us — the stations are already in the ground, so there's nothing to retrofit. Many builders present it as a feature of the home, because it is one.",
  },
  {
    q: "Do you work with production builders on multiple lots?",
    a: "Yes. We schedule around phased pours across a subdivision, keep one point of contact for the whole project, and quote multi-lot work as a single coordinated scope. Whether it's one custom home on Lake Martin or a full phase in a Huntsville subdivision, the process is the same: we work to your schedule, not the other way around.",
  },
  {
    q: "Will the treatment hold up my pour?",
    a: "No — the soil treatment is applied in the window between trenching and pour, and we schedule it with your superintendent so it fits inside your existing timeline. Our job is to be there at the right moment, treat, document, and get out of the way.",
  },
  {
    q: "What areas do you cover for builder work?",
    a: "Our crews run out of four Alabama offices — Birmingham, Alabaster, Huntsville, and Alexander City/Lake Martin — and cover new construction across Central and North Alabama, including Birmingham metro, Huntsville and Madison, Auburn and Opelika, and the Lake Martin communities.",
  },
];
