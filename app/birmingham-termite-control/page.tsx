// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/birmingham-termite-control/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Termite Control Birmingham AL | Free Inspection | EnviroCare",
  description:
    "Termite control in Birmingham, AL: a free inspection, then Sentricon® baiting with usually no drilling, backed by EnviroCare damage repair coverage. (205) 991-2882.",
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/birmingham-termite-control',
    title: "Termite Control Birmingham AL | Free Inspection | EnviroCare",
    description: "Termite control in Birmingham, AL: a free inspection, then Sentricon® baiting with usually no drilling, backed by EnviroCare damage repair coverage. (205) 991-2882.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Termite Control Birmingham AL | Free Inspection | EnviroCare",
    description: "Termite control in Birmingham, AL: a free inspection, then Sentricon® baiting with usually no drilling, backed by EnviroCare damage repair coverage. (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

const c: ComboContent = {
  eyebrow: "Termite Control · Birmingham, Alabama",
  h1: "Termite Control in Birmingham —",
  h1Accent: "Protect the House, Not Just Treat It.",
  intro: [
    "Birmingham has a lot of older homes, and central Alabama's warm, humid climate lets Eastern subterranean termites stay active most of the year. Standard homeowner's insurance policies generally exclude termite damage.",
    "The Wedgworth family's Alabama pest-control history began in Alexander City in 1958. Today, EnviroCare serves Birmingham from its 16th Ave S office as a Sentricon® Certified Specialist, with up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval and subject to the terms of the agreement.",
  ],
  anglesHeading: "Why Birmingham homes are termite targets",
  localAngles: [
    {
      title: "Older housing stock",
      body: "Many older Birmingham-area homes have original foundations, vented crawlspaces, and decades of soil contact, the kind of access subterranean termites look for. The free inspection confirms what your house actually has.",
    },
    {
      title: "Clay soil and moisture",
      body: "Clay soil can hold moisture against a foundation, and subterranean termites travel through moist soil. Sentricon® stations sit in that soil around the house, where foraging termites can find the bait.",
    },
    {
      title: "Usually no drilling in historic masonry",
      body: "Liquid treatments can require drilling through slabs, patios, and driveways where soil access is limited. Sentricon® bait stations go in the ground around the perimeter, usually with no drilling and no tank trucks, which matters on original brick and older foundations.",
    },
    {
      title: "Colony elimination, not a chemical moat",
      body: "Foraging termites carry the bait back and share it, which is designed to affect the colony itself, including the queen. A liquid treatment works differently, treating the soil around or beneath the structure.",
    },
  ],
  price: {
    label: "Sentricon® Protection — Birmingham",
    amount: "Free inspection",
    sub: "priced after a free termite inspection",
    bullets: [
      "Sentricon® Always Active™ bait stations",
      "Up to $1,000,000 EnviroCare damage repair coverage",
      "Annual inspection + station service",
      "WDO letters as low as $125",
      "Free termite inspection to start — no obligation",
    ],
  },
  faqs: [
    {
      q: "How do I know if my Birmingham home has termites?",
      a: "Mud tubes on the foundation, swarmers (flying termites) in spring, hollow-sounding wood, and bubbling paint are the classic signs — but most active colonies show nothing at all. The free inspection covers the foundation, crawlspace, and attic access.",
    },
    {
      q: "What does the $1M coverage actually mean?",
      a: "If subterranean termites damage your home while you're on the Sentricon® Always Active™ program and we've maintained it, EnviroCare covers repairs: up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval and subject to the terms of the agreement.",
    },
    {
      q: "Is Sentricon® better than a liquid treatment for older homes?",
      a: "For many older homes, yes. Liquid treatment can require drilling through slabs and masonry where soil access is limited. Sentricon® stations install in the soil, usually with no drilling, and are designed to affect the colony itself. The inspection shows what your house needs.",
    },
    {
      q: "I'm buying or selling a home — can you handle the termite letter?",
      a: "Yes — we issue the official Alabama Wood Infestation Report (the WDO letter) used in real-estate closings. WDO letters are a separately quoted, paid service, as low as $125. The office confirms the exact fee when you schedule.",
    },
    {
      q: "How much does termite treatment cost in Birmingham?",
      a: "Alabama requires an inspection before termite work can be priced, so termite work is never priced over the phone. The price depends on the house: the length of the foundation, slab or crawlspace construction, whether termites are active now, and moisture conditions. After the free inspection you get the price in writing before any work starts.",
    },
    {
      q: "Do you do termite control in Hoover, Homewood, Mountain Brook and Vestavia Hills?",
      a: "Yes. Jefferson County and St. Clair County homes, including Hoover, Homewood, Mountain Brook, Vestavia Hills and Trussville, are served from the Birmingham office at 2120 16th Ave S. Shelby County homes are served from the Alabaster office.",
    },
  ],
  office: { name: "Birmingham Office", phone: "(205) 991-2882", tel: "2059912882", address: "2120 16th Ave S, Ste 302, Birmingham, AL 35205" },
  cityHub: { name: "Birmingham Pest Control", href: "/birmingham" },
  servicePage: { name: "Termite Control Service", href: "/services/termite-control" },
  sections: [
    {
      heading: "What the free termite inspection covers",
      paras: [
        "A termite inspection in Birmingham is a look at every place a subterranean colony can reach wood from the soil. The technician works around the outside first, then the crawlspace or slab edges, then the inside.",
      ],
      list: [
        "Foundation walls, piers and slab edges, checked for mud tubes",
        "Crawlspace sill plates, joists and any wood touching soil",
        "Porches, steps, decks and expansion joints at garage and patio slabs",
        "Plumbing penetrations, bath traps and areas with moisture",
        "Interior baseboards and door frames on outside walls, plus attic access where reachable",
        "Anything that could feed or hide activity: mulch against siding, gutters draining at the foundation, wood debris",
      ],
    },
    {
      heading: "How termite treatment is priced in Birmingham",
      paras: [
        "Termite treatment is always priced after the inspection, never over the phone. Two Birmingham houses on the same street can differ a lot: a 1920s crawlspace house in Forest Park and a newer slab home in Hoover need different station layouts and different amounts of work.",
        "What sets the price: the linear footage around the foundation, slab or crawlspace construction, whether termites are active now or this is protection for a clean house, and moisture conditions. The quote is in writing before anything is installed. Our guide to pest control cost in Alabama explains what is and is not included in typical plans.",
      ],
    },
    {
      heading: "Termite bonds in Birmingham",
      paras: [
        "In Alabama, \"termite bond\" is the everyday name for a termite protection agreement: the company inspects on a schedule, treats as needed, and the agreement renews each year. Buyers and lenders often ask whether a house has a bond, which is why a bond is commonly transferred when a house is sold.",
        "EnviroCare's Sentricon® protection agreements include ongoing station service and up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection and approval and subject to the terms of the agreement. What a bond does and does not cover is explained in our termite bond guide.",
      ],
    },
  ],
  areaServed: [
    { name: "Birmingham", href: "/birmingham" },
    { name: "Hoover", href: "/hoover" },
    { name: "Homewood", href: "/homewood" },
    { name: "Mountain Brook", href: "/mountain-brook" },
    { name: "Vestavia Hills", href: "/vestavia-hills" },
    { name: "Trussville", href: "/trussville" },
    { name: "Irondale", href: "/irondale" },
    { name: "Leeds", href: "/leeds" },
    { name: "Moody", href: "/moody" },
    { name: "Fultondale", href: "/fultondale" },
    { name: "Crestline", href: "/crestline" },
    { name: "Cahaba Heights", href: "/cahaba-heights" },
    { name: "Liberty Park", href: "/liberty-park" },
  ],
  related: [
    { name: "Termite bonds in Alabama", href: "/blog/termite-bond-alabama-explained" },
    { name: "Is Sentricon worth it?", href: "/blog/is-sentricon-worth-it" },
    { name: "Pest control cost in Alabama", href: "/blog/pest-control-cost-alabama" },
    { name: "WDO letters", href: "/wdo-inspection-letters-alabama" },
  ],
  schemaName: "EnviroCare Termite Control — Birmingham, AL",
  canonicalPath: "/birmingham-termite-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
