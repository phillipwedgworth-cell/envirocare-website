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
    "Termite control in Birmingham, AL: a free inspection, then Sentricon® baiting with no drilling, backed by EnviroCare damage repair coverage. (205) 991-2882.",
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/birmingham-termite-control',
    title: "Termite Control Birmingham AL | Free Inspection | EnviroCare",
    description: "Termite control in Birmingham, AL: a free inspection, then Sentricon® baiting with no drilling, backed by EnviroCare damage repair coverage. (205) 991-2882.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Termite Control Birmingham AL | Free Inspection | EnviroCare",
    description: "Termite control in Birmingham, AL: a free inspection, then Sentricon® baiting with no drilling, backed by EnviroCare damage repair coverage. (205) 991-2882.",
    images: ['/og-image.png'],
  },
};

const c: ComboContent = {
  eyebrow: "Termite Control · Birmingham, Alabama",
  h1: "Termite Control in Birmingham —",
  h1Accent: "Protect the House, Not Just Treat It.",
  intro: [
    "Birmingham is hard on houses when it comes to termites: a city of pre-1980 homes standing on moist red clay, in a climate that never gets cold enough to slow a colony down. Eastern subterranean termites stay active here most of the year, and standard homeowner's insurance policies generally exclude termite damage.",
    "The Wedgworth family's Alabama pest-control history began in Alexander City in 1958. Today, EnviroCare serves Birmingham from its 16th Ave S office as a Sentricon® Certified Specialist, with up to $1,000,000 in EnviroCare damage repair coverage on qualifying homes, subject to the terms of the agreement.",
  ],
  anglesHeading: "Why Birmingham homes are termite targets",
  localAngles: [
    {
      title: "Pre-1980 housing stock",
      body: "Highland Park, Crestwood, Forest Park, Homewood, and most Over-the-Mountain neighborhoods are full of homes with original foundations, vented crawlspaces, and decades of soil contact. That's exactly the access subterranean termites hunt for.",
    },
    {
      title: "Red clay that holds moisture",
      body: "Jefferson County's clay soil stays damp against foundations year-round — termites travel through moisture, and Birmingham's soil gives them a highway. Sentricon® stations intercept them in that soil before they reach wood.",
    },
    {
      title: "No drilling in historic masonry",
      body: "Liquid treatments drill holes every 12 inches through slabs, patios, and driveways. Sentricon® bait stations go in the ground around the perimeter — nothing drilled, no tank trucks, no scarred brick on a 1920s foundation.",
    },
    {
      title: "Colony elimination, not a chemical moat",
      body: "Bait gets carried back to the colony and ends it — including the queen. A liquid barrier just redirects foragers until it degrades in 5–7 years.",
    },
  ],
  price: {
    label: "Sentricon® Protection — Birmingham",
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
      q: "How do I know if my Birmingham home has termites?",
      a: "Mud tubes on the foundation, swarmers (flying termites) in spring, hollow-sounding wood, and bubbling paint are the classic signs — but most active colonies show nothing at all. The free inspection covers the foundation, crawlspace, and attic access.",
    },
    {
      q: "What does the $1M coverage actually mean?",
      a: "If subterranean termites damage your home while you're on the Sentricon® Always Active™ program and we've maintained it, EnviroCare covers repairs up to $1,000,000. It's that coverage, subject to the terms of the agreement, not a vague warranty.",
    },
    {
      q: "Is Sentricon® better than a liquid treatment for older homes?",
      a: "For Birmingham's housing stock, almost always. Liquid requires drilling through original slabs and masonry and retreating every 5–7 years. Sentricon® stations install in the soil with zero drilling and eliminate the colony itself.",
    },
    {
      q: "I'm buying or selling a home — can you handle the termite letter?",
      a: "Yes — we issue the official Alabama Wood Infestation Report (the WDO letter) used in real-estate closings. One per year is free for active termite customers.",
    },
    {
      q: "How much does termite treatment cost in Birmingham?",
      a: "Termite work is never priced over the phone. The price depends on the house: the length of the foundation, slab or crawlspace construction, whether termites are active now, and moisture conditions. After the free inspection you get the price in writing before any work starts.",
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
        "EnviroCare's Sentricon® protection agreements include ongoing station service and up to $1,000,000 in EnviroCare damage repair coverage on qualifying homes, subject to the terms of the agreement. What a bond does and does not cover is explained in our termite bond guide.",
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
