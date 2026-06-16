import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Termite Control Huntsville AL | New Construction & Sentricon® | EnviroCare",
  description:
    "Termite control in Huntsville — Madison County's construction boom puts new slabs on disturbed, termite-prone soil. Sentricon® with up to $1M coverage. Call (256) 937-7676.",
  alternates: { canonical: "./" },
};

const c: ComboContent = {
  eyebrow: "Termite Control · Huntsville, Alabama",
  h1: "Termite Control in Huntsville,",
  h1Accent: "Where New Construction Meets Old Pressure.",
  intro: [
    "Madison County is building faster than almost anywhere in the South — and every new slab poured along the Research Park corridor, in Providence, or out toward Hampton Cove sits on freshly disturbed soil. Disturbed soil is exactly what Eastern subterranean termites colonize first, and a slab home gives no visible warning until the damage is behind the drywall.",
    "On the other end of the spectrum, Twickenham, Five Points, and Monte Sano hold some of Alabama's most loved historic homes — clay-heavy soil, original foundations, decades of termite pressure. EnviroCare's Huntsville office protects both, with Sentricon® and up to $1,000,000 in damage repair coverage.",
  ],
  anglesHeading: "Huntsville termite pressure, both ends of the market",
  localAngles: [
    {
      title: "New builds on disturbed soil",
      body: "Construction grading destroys existing colonies' food sources and sends foragers hunting — straight toward the nearest new foundation. Starting Sentricon® at or shortly after closing is the cheapest termite insurance a new-construction buyer will ever get.",
    },
    {
      title: "Slab homes hide the evidence",
      body: "Most new Madison County homes are slab-on-grade: no crawlspace to inspect, no mud tubes to spot. Termites enter through expansion joints and plumbing penetrations invisibly. Monitoring stations are the early-warning system a slab can't provide.",
    },
    {
      title: "Historic district protection without drilling",
      body: "Twickenham and Five Points homes shouldn't have holes drilled through century-old masonry. Sentricon® stations install in the soil around the perimeter — nothing touches the structure.",
    },
    {
      title: "Clay soil + Tennessee Valley moisture",
      body: "North Alabama's clay holds the soil moisture termites travel through. The valley's humidity keeps colonies active essentially year-round — there's no off-season to count on.",
    },
  ],
  price: {
    label: "Sentricon® Protection — Huntsville",
    amount: "Free inspection",
    sub: "priced after a free WDO inspection",
    bullets: [
      "Sentricon® Always Active™ bait stations",
      "Up to $1,000,000 damage repair coverage",
      "Annual inspection + station service",
      "Free WDO letter yearly for active customers",
      "Free termite inspection to start — no obligation",
    ],
  },
  faqs: [
    {
      q: "My Huntsville home is brand new — do I really need termite protection?",
      a: "New construction is the highest-risk window, not the lowest. The build disturbed the soil and removed competing food sources, and a slab gives no warning before damage starts. Sentricon® from day one locks in protection — priced after a free WDO inspection.",
    },
    {
      q: "Didn't the builder already treat for termites?",
      a: "Builder pre-treats satisfy code at pour time, but liquid soil treatments degrade — typically losing effectiveness within 5–7 years, sometimes faster in disturbed soil. Monitoring stations pick up where the pre-treat leaves off.",
    },
    {
      q: "Can you treat historic homes in Twickenham or Five Points?",
      a: "That's a specialty — in-ground bait stations protect the home with zero drilling into original brick, stone, or masonry. The colony is eliminated in the soil before it reaches the structure.",
    },
    {
      q: "What's included in the free inspection?",
      a: "A licensed inspector checks the foundation perimeter, accessible crawlspace or slab penetrations, garage, and attic access, then walks you through findings on the spot. No obligation, about 20–30 minutes.",
    },
  ],
  office: { name: "Huntsville Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Huntsville Pest Control", href: "/huntsville" },
  servicePage: { name: "Termite Control Service", href: "/services/termite-control" },
  schemaName: "EnviroCare Termite Control — Huntsville, AL",
  canonicalPath: "/huntsville-termite-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
