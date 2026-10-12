// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/huntsville-exterminator/page.tsx
// Commit: fix(huntsville): recurring-program copy; drop one-time, same-day/priority and 'unlimited' claims; EnviroCare-attributed $1M coverage
// Push: main
// ─────────────────────────────────────
import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Exterminator Huntsville AL | EnviroCare — Family-Owned Since 1958",
  description:
    "Huntsville pest control with scheduled perimeter visits and interior re-service for covered pests. Monthly ACH option from $35/mo. (256) 937-7676.",
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/huntsville-exterminator',
    title: "Exterminator Huntsville AL | EnviroCare — Family-Owned Since 1958",
    description: "Huntsville pest control with scheduled perimeter visits and interior re-service for covered pests. Monthly ACH option from $35/mo. (256) 937-7676.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Exterminator Huntsville AL | EnviroCare — Family-Owned Since 1958",
    description: "Huntsville pest control with scheduled perimeter visits and interior re-service for covered pests. Monthly ACH option from $35/mo. (256) 937-7676.",
    images: ['/og-image.png'],
  },
};

const c: ComboContent = {
  eyebrow: "Exterminator · Huntsville, Alabama",
  h1: "Need an Exterminator in Huntsville?",
  h1Accent: "Treatment and Ongoing Protection.",
  intro: [
    "Pest problems in a Jones Valley kitchen, a Providence new-build, or a Huntsville garage need a plan that fits the pest and the property. Our initial general pest service includes interior and exterior treatment, followed by scheduled exterior perimeter visits.",
    "Our recurring program treats the exterior every other month, with free interior re-service for covered pest activity between scheduled visits. Family-owned since 1958, our local team is dispatched from the Old Madison Pike office.",
  ],
  anglesHeading: "What a Huntsville exterminator call looks like with us",
  localAngles: [
    {
      title: "Start with the initial service",
      body: "The initial visit addresses covered pest activity inside and around the home. Our team explains the recommended service and identifies pests, such as German roaches or fire ants, that need separate treatment.",
    },
    {
      title: "New-build pests are different",
      body: "Fresh sod arrives with fire-ant colonies; graded clay invites sugar ants; first-year homes haven't had a perimeter defense yet. Huntsville's growth corridors fill our routes with exactly this work.",
    },
    {
      title: "The exterior-first difference",
      body: "Scheduled perimeter treatments help manage covered pests around your home. After the initial service, pay $70 every other month or $35 per month on automatic ACH with a 12-month billing agreement. Interior re-service for covered pest activity between scheduled visits is included.",
    },
    {
      title: "A local office, not a call center",
      body: "7027 Old Madison Pike Ste 108 — real people, a familiar local team on your route, and a direct line at (256) 937-7676. We cover Huntsville, Madison, Athens, Harvest, Hampton Cove, and Decatur.",
    },
  ],
  price: {
    label: "Bi-Monthly Pest Program — Huntsville",
    amount: "$35/mo",
    sub: "on ACH autopay · or $70 every other month; initial service separate",
    bullets: [
      "30+ Alabama pests covered",
      "Fire ant treatment $150 for most yards, one-year warranty",
      "Interior re-service for covered pest activity",
      "Free re-service for covered pests between scheduled visits",
      "Equal monthly ACH payments (12-month agreement)",
    ],
  },
  faqs: [
    {
      q: "Do you do one-time exterminator visits in Huntsville?",
      a: "No. Our general pest service is a recurring program: an initial interior and exterior treatment, followed by exterior perimeter service every other month. Pay $70 per scheduled visit or $35 per month on automatic ACH with a 12-month billing agreement. The initial service is separate.",
    },
    {
      q: "How quickly can someone come out?",
      a: "Call the Huntsville office at (256) 937-7676 to discuss the pest problem and available appointments. Service is scheduled through our local team.",
    },
    {
      q: "What do Huntsville exterminator calls usually involve?",
      a: "Common concerns include ants, roaches, spiders, wasps, and seasonal invaders. Coverage depends on the pest and service plan. German roach treatment requires a separate quote, and whole-yard fire ant treatment is separate from the recurring general pest program.",
    },
    {
      q: "Is termite work separate?",
      a: "Yes. Termite protection is a separate service using the Sentricon® baiting system. Up to $1,000,000 in termite damage repair coverage is provided by EnviroCare, subject to the terms of the agreement and to inspection and approval. Pricing is determined after a free inspection.",
    },
  ],
  office: { name: "Huntsville Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Huntsville Pest Control", href: "/huntsville" },
  servicePage: { name: "Pest Control Service", href: "/services/pest-control" },
  schemaName: "EnviroCare Exterminator — Huntsville, AL",
  canonicalPath: "/huntsville-exterminator",
};

export default function Page() {
  return <ComboPage c={c} />;
}
