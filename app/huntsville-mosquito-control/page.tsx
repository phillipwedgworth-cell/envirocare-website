// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/huntsville-mosquito-control/page.tsx
// Commit: fix(content+compliance): fire ant $150/most yards + 1-yr warranty; Mosquito+Tick excludes fleas; remove 'safe' and 'same technician' claims
// Push: main
// ─────────────────────────────────────
import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Mosquito Control Huntsville AL | Yard Barrier | EnviroCare",
  description:
    "Mosquito control in Huntsville AL — Tennessee Valley humidity demands a seasonal yard treatments, March–October, $45/month for an average-size yard. Call (256) 937-7676.",
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/huntsville-mosquito-control',
    title: "Mosquito Control Huntsville AL | Yard Barrier | EnviroCare",
    description: "Mosquito control in Huntsville AL — Tennessee Valley humidity demands a seasonal yard treatments, March–October, $45/month for an average-size yard. Call (256) 937-7676.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mosquito Control Huntsville AL | Yard Barrier | EnviroCare",
    description: "Mosquito control in Huntsville AL — Tennessee Valley humidity demands a seasonal yard treatments, March–October, $45/month for an average-size yard. Call (256) 937-7676.",
    images: ['/og-image.png'],
  },
};

const c: ComboContent = {
  eyebrow: "Mosquito Control · Huntsville, Alabama",
  h1: "Mosquito Control in Huntsville,",
  h1Accent: "Built for the Tennessee Valley.",
  intro: [
    "Huntsville's growth has a side effect nobody puts in the relocation brochure: stormwater ponds and neighborhood drainage areas may create mosquito habitat under suitable conditions. Add Beaverdam Creek, the Hampton Cove water features, and Aldridge Creek through south Huntsville, and the season runs hard from March to October.",
    "EnviroCare's Huntsville office on Old Madison Pike has run mosquito routes across Madison County since the program existed — Providence to Big Cove, Jones Valley to Research Park. Our local team performs generally eight scheduled seasonal treatments from March through October.",
  ],
  anglesHeading: "Huntsville's mosquito map, street by street",
  localAngles: [
    {
      title: "Retention ponds in new subdivisions",
      body: "Providence, MidCity-area developments, and the subdivisions feeding Research Park all drain into engineered ponds — potential mosquito habitat near residential yards. Our program targets resting areas on your property; it cannot stop mosquitoes arriving from elsewhere.",
    },
    {
      title: "Beaverdam & Aldridge Creek corridors",
      body: "Creek-line homes in Jones Valley and south Huntsville face mosquito activity during warm months. We focus on resting zones — shaded foliage, fence lines, under-deck areas — where adults wait out the heat.",
    },
    {
      title: "Hampton Cove water features",
      body: "The Cove's lakes, golf-course water, and Flint River frontage can affect mosquito activity in nearby yards. Tick coverage is also available for wooded lots — the wooded lots carry both.",
    },
    {
      title: "Monte Sano shade lines",
      body: "Mountain-shadow neighborhoods hold morning damp longer, where shaded resting sites may warrant attention in a yard assessment.",
    },
  ],
  price: {
    label: "Huntsville Mosquito Program",
    amount: "$45/month",
    sub: "8 seasonal treatments · monthly ACH payments across the year",
    bullets: [
      "Barrier treatment of resting + harborage zones",
      "Standing-water inspection every visit",
      "Ask our team about concerns after rain or a treatment",
      "Mosquito + Tick option includes tick and chigger yard coverage ($65/month)",
      "Firm yard-specific price confirmed after inspection",
    ],
  },
  faqs: [
    {
      q: "How bad is mosquito season in Huntsville really?",
      a: "Mosquito activity in the Tennessee Valley is affected by temperature, rainfall and standing water. Our recurring program generally provides eight treatments March through October. It aims to reduce mosquito activity, not eliminate every mosquito.",
    },
    {
      q: "Do you treat Hampton Cove and Big Cove?",
      a: "Yes — they're among our heaviest routes, dispatched from the Old Madison Pike office. Wooded Cove lots usually pair the mosquito barrier with bundled tick control, since both pests share the same habitat.",
    },
    {
      q: "When can kids and pets go back outside?",
      a: "Our technicians apply EPA-registered products according to their labels. Follow the specific re-entry and application instructions given by your technician rather than relying on a universal number of minutes.",
    },
    {
      q: "What if it rains right after my treatment?",
      a: "Call our Huntsville office if you notice concerns after rain or a scheduled application. We can review the service record and treatment conditions, then explain whether additional attention is appropriate.",
    },
  ],
  office: { name: "Huntsville Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Huntsville Pest Control", href: "/huntsville" },
  servicePage: { name: "Mosquito Control Service", href: "/services/mosquito" },
  schemaName: "EnviroCare Mosquito Control — Huntsville, AL",
  canonicalPath: "/huntsville-mosquito-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
