// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/huntsville-termite-control/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Termite Control Huntsville AL | Sentricon® | EnviroCare",
  description:
    "Termite control in Huntsville AL — Sentricon® in-ground baiting, no drilling. New construction on disturbed soil is termite-prone. Call (256) 937-7676.",
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/huntsville-termite-control',
    title: "Termite Control Huntsville AL | Sentricon® | EnviroCare",
    description: "Termite control in Huntsville AL — Sentricon® in-ground baiting, no drilling. New construction on disturbed soil is termite-prone. Call (256) 937-7676.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Termite Control Huntsville AL | Sentricon® | EnviroCare",
    description: "Termite control in Huntsville AL — Sentricon® in-ground baiting, no drilling. New construction on disturbed soil is termite-prone. Call (256) 937-7676.",
    images: ['/og-image.png'],
  },
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
      body: "New construction can still face termite activity. Ask the builder for any pretreatment records, and have the accessible foundation and surrounding areas inspected before choosing a continuing protection plan.",
    },
    {
      title: "Slab homes hide the evidence",
      body: "Some slab foundations conceal entry points near joints or plumbing penetrations. A professional inspection reviews accessible areas and explains any limits. Bait stations are part of a maintained termite program, not a substitute for investigating evidence of activity.",
    },
    {
      title: "Historic district protection without drilling",
      body: "Sentricon® bait stations can often be installed in soil around historic foundations without drilling original masonry. Inspecting the specific structure first helps determine appropriate placement and whether additional work is needed.",
    },
    {
      title: "Clay soil + Tennessee Valley moisture",
      body: "North Alabama's clay holds the soil moisture termites travel through. The valley's humidity keeps colonies active essentially year-round — there's no off-season to count on.",
    },
  ],
  price: {
    label: "Sentricon® Protection — Huntsville",
    amount: "Free inspection",
    sub: "Quoted after a termite inspection; WDO closing reports are separate",
    bullets: [
      "Sentricon® Always Active™ bait stations",
      "Up to $1,000,000 EnviroCare repair coverage, subject to inspection and approval",
      "Annual inspection + station service",
      "Ask which inspection documents your agreement includes",
      "Free termite inspection to start — no obligation",
    ],
  },
  faqs: [
    {
      q: "My Huntsville home is brand new — do I really need termite protection?",
      a: "New homes can still have termite activity. Review the builder's pretreatment records and request a property inspection. We can then explain whether a monitored Sentricon® program is appropriate for the foundation and any existing service agreement.",
    },
    {
      q: "Didn't the builder already treat for termites?",
      a: "The builder may have arranged a pretreatment, but the product, service terms and renewal obligations vary. Request the records and ask what ongoing inspection or protection is included before adding a separate program.",
    },
    {
      q: "Can you treat historic homes in Twickenham or Five Points?",
      a: "In-ground stations can often be installed without drilling historic brick or stone. A termite inspection helps determine what the structure needs; no bait system can promise that termites will always encounter a station before reaching the home.",
    },
    {
      q: "What's included in the free inspection?",
      a: "We discuss accessible inspection areas, visible evidence and any limitations at the property. The time and scope vary. If a lender or realtor needs an Official Alabama Wood Infestation Inspection Report for closing, request that document specifically.",
    },
    {
      q: "Is a free termite inspection the same as a WDO letter for a Huntsville closing?",
      a: "No. An initial termite evaluation and the Official Alabama Wood Infestation Inspection Report used in a real estate transaction are different. Tell our Huntsville office what your closing agent or lender requires so the document and any applicable fee are confirmed before scheduling.",
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
