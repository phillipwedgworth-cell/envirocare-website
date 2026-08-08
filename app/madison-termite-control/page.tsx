import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

const TITLE = "Termite Control Madison AL | Sentricon® | EnviroCare";
const DESC =
  "Termite control in Madison AL — new slabs on disturbed farmland are prime termite targets. Sentricon® with up to $1M EnviroCare-backed coverage. Free inspection. (256) 937-7676.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { title: TITLE, description: DESC, images: ["/og/og-madison.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-madison.png"] },
};

const c: ComboContent = {
  eyebrow: "Termite Control · Madison, Alabama",
  h1: "Termite Protection in Madison,",
  h1Accent: "Before the Slab Tells You It's Too Late.",
  intro: [
    "Almost everything in Madison is slab-on-grade and almost everything is under thirty years old — a combination that feels safe and isn't. Eastern subterranean termites colonize disturbed soil first, and Madison is one long stretch of recently disturbed soil, from Clift Farm's phases to the infill west of Wall Triana. A slab home gives no crawlspace to inspect and no mud tubes to spot; entry happens invisibly through expansion joints and plumbing penetrations.",
    "EnviroCare protects Madison homes with the Sentricon® Always Active™ bait system — in-ground stations that eliminate the colony in the soil before it reaches the framing. No drilling, no tank truck in the driveway, and up to $1,000,000 in damage repair coverage subject to the terms of the agreement.",
  ],
  anglesHeading: "Why Madison's housing stock is termite-friendly",
  localAngles: [
    {
      title: "The builder pre-treat has a shelf life",
      body: "Code-required liquid pre-treats at pour time degrade — typically within 5–7 years, faster in re-graded soil. If your Madison home is past its first few years, the chemical barrier under it is already fading. Bait stations don't fade; they're serviced and re-baited on schedule.",
    },
    {
      title: "Farmland conversion feeds foragers",
      body: "Termites were eating root systems and fence posts on that land long before it had a street name. When grading removes their food, foraging workers fan out — and a new foundation with fresh mulch beds is the first thing they find.",
    },
    {
      title: "Irrigation keeps the soil termite-wet",
      body: "Madison's manicured new-sod yards run irrigation all summer. Moist soil against a slab is a termite highway. Stations ring the perimeter precisely where that traffic runs.",
    },
    {
      title: "Real-estate ready, every year",
      body: "Active Sentricon® customers get a free annual WDO letter — the document every Alabama closing with a loan requires. In a market where Madison homes turn over fast, that letter is real money at the table.",
    },
  ],
  price: {
    label: "Sentricon® Protection — Madison",
    amount: "Free inspection",
    sub: "priced after a free WDO inspection",
    bullets: [
      "Sentricon® Always Active™ bait stations",
      "Up to $1,000,000 damage repair coverage — subject to the terms of the agreement",
      "No drilling, no trenching disruption",
      "Annual inspection + station service",
      "Free WDO letter yearly for active customers",
    ],
  },
  faqs: [
    {
      q: "My Madison home is only a few years old — when should I start termite protection?",
      a: "Now is the honest answer. The riskiest window is the first decade, while the builder's liquid pre-treat is degrading and nearby construction keeps pushing foragers around. Starting Sentricon® early means the colony is intercepted in the soil, not discovered in the drywall.",
    },
    {
      q: "How do I know if a slab home has termites?",
      a: "Usually you don't — that's the problem. Warning signs like swarmers at windows or blistered paint typically appear after damage exists. On slab construction, monitoring stations around the perimeter are the early-warning system the house itself can't give you.",
    },
    {
      q: "What does termite protection cost in Madison?",
      a: "Every quote follows a free WDO inspection, because slab layout, soil contact, and additions change the station plan. There's no flat price to publish honestly — the inspection is free, takes about 20–30 minutes, and you'll have the exact number before we touch anything.",
    },
    {
      q: "Is the $1,000,000 coverage from the Sentricon manufacturer?",
      a: "No — it's EnviroCare's own damage repair guarantee, up to $1,000,000, and it transfers with the home when you sell. We put our own name behind the protection we install.",
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Madison Service Area", href: "/service-areas/madison" },
  servicePage: { name: "Termite Control Service", href: "/services/termite-control" },
  schemaName: "EnviroCare Termite Control — Madison, AL",
  canonicalPath: "/madison-termite-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
