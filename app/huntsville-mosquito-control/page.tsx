import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Mosquito Control Huntsville AL | Yard Barrier | EnviroCare",
  description:
    "Mosquito control in Huntsville AL — Tennessee Valley humidity demands a 30-day yard barrier. March–October, $45/visit. Call (256) 937-7676.",
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/huntsville-mosquito-control',
    title: "Mosquito Control Huntsville AL | Yard Barrier | EnviroCare",
    description: "Mosquito control in Huntsville AL — Tennessee Valley humidity demands a 30-day yard barrier. March–October, $45/visit. Call (256) 937-7676.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mosquito Control Huntsville AL | Yard Barrier | EnviroCare",
    description: "Mosquito control in Huntsville AL — Tennessee Valley humidity demands a 30-day yard barrier. March–October, $45/visit. Call (256) 937-7676.",
    images: ['/og-image.png'],
  },
};

const c: ComboContent = {
  eyebrow: "Mosquito Control · Huntsville, Alabama",
  h1: "Mosquito Control in Huntsville,",
  h1Accent: "Built for the Tennessee Valley.",
  intro: [
    "Huntsville's growth has a side effect nobody puts in the relocation brochure: every new subdivision adds retention ponds, and every retention pond feeds the Tennessee Valley's already-relentless mosquito population. Add Beaverdam Creek, the Hampton Cove water features, and Aldridge Creek through south Huntsville, and the season runs hard from March to October.",
    "EnviroCare's Huntsville office on Old Madison Pike has run mosquito routes across Madison County since the program existed — Providence to Big Cove, Jones Valley to Research Park. One technician, every 30 days, until your yard is yours again.",
  ],
  anglesHeading: "Huntsville's mosquito map, street by street",
  localAngles: [
    {
      title: "Retention ponds in new subdivisions",
      body: "Providence, MidCity-area developments, and the subdivisions feeding Research Park all drain into engineered ponds — permanent breeding habitat 200 feet from your patio. The 30-day barrier intercepts what the pond produces.",
    },
    {
      title: "Beaverdam & Aldridge Creek corridors",
      body: "Creek-line homes in Jones Valley and south Huntsville face corridor pressure that never stops mid-season. We treat the resting zones — shaded foliage, fence lines, under-deck areas — where adults wait out the heat.",
    },
    {
      title: "Hampton Cove water features",
      body: "The Cove's lakes, golf-course water, and Flint River frontage make it Huntsville's heaviest mosquito zone. It's also where we bundle the most tick control — the wooded lots carry both.",
    },
    {
      title: "Monte Sano shade lines",
      body: "Mountain-shadow neighborhoods hold morning damp longer, extending daily mosquito activity hours. Barrier timing accounts for it.",
    },
  ],
  price: {
    label: "Huntsville Mosquito Program",
    amount: "$45/visit",
    sub: "March through October · every 30 days",
    bullets: [
      "Barrier treatment of resting + harborage zones",
      "Standing-water inspection every visit",
      "Free re-treatment if heavy rain cuts a cycle short",
      "Tick + chigger coverage available in Mosquito + Tick ($65/visit)",
      "50% off your first application",
    ],
  },
  faqs: [
    {
      q: "How bad is mosquito season in Huntsville really?",
      a: "The Tennessee Valley's humidity, creek network, and retention-pond growth give Madison County one of the longest mosquito seasons in the state — late March into October. The 30-day cycle matches adult mosquito lifespan so populations never rebuild between visits.",
    },
    {
      q: "Do you treat Hampton Cove and Big Cove?",
      a: "Yes — they're among our heaviest routes, dispatched from the Old Madison Pike office. Wooded Cove lots usually pair the mosquito barrier with bundled tick control, since both pests share the same habitat.",
    },
    {
      q: "When can kids and pets go back outside?",
      a: "Once the application dries, typically 30–45 minutes. EPA-registered products applied per label directions; we skip vegetable gardens and blooming pollinator plants.",
    },
    {
      q: "What if it rains right after my treatment?",
      a: "Heavy rain within 24 hours? Call us and we re-treat free. We also track the radar and proactively reschedule when a washout is forecast for your service window.",
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
