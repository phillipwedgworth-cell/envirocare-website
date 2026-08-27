// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/cherokee-bend/page.tsx
// Commit: feat(neighborhood): add Cherokee Bend (Mountain Brook) neighborhood page
// Push: main
// ───────────────────────────────────

import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Cherokee Bend AL | EnviroCare Since 1958",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for Cherokee Bend homes. No drilling, $1M coverage, two ways to pay. (205) 940-6360.",
  alternates: { canonical: "/cherokee-bend" },
  openGraph: {
    title: "Pest Control Cherokee Bend AL | EnviroCare Since 1958",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for Cherokee Bend homes. No drilling, $1M termite coverage, two ways to pay. Call (205) 940-6360.",
    url: "https://www.envirocarellc.com/cherokee-bend",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  name: "Cherokee Bend",
  parentCity: "Mountain Brook",
  zipCodes: "35223",
  heroTagline: "Cherokee Bend's family-owned choice for Sentricon® termite and pest control",
  heroIntro: "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal mosquito and tick treatment for Cherokee Bend's wooded, creek-adjacent lots. Same Wedgworth-family standard since 1958.",
  pressureHeadline: "Cherokee Bend's wooded, creek-cut lots bring year-round tick, mosquito, and termite pressure right to the yard.",
  pressureSubhead: "The service patterns we run most often around Cherokee Bend.",
  pressureCards: [
    {
      emoji: "🐾",
      title: "Ticks off the wooded, creek-side lots",
      body: "Many Cherokee Bend properties back up to wooded, creek-cut terrain that carries Lone Star and American dog ticks close to the yard. The Mosquito + Tick plan at $65/month bundles tick and chigger coverage for exactly this kind of lot.",
    },
    {
      emoji: "🦟",
      title: "Mosquitoes from the Shades Creek corridor",
      body: "The Shades Creek drainage running near Cherokee Bend keeps mosquito pressure elevated from March through October. The 30-day yard barrier targets the shaded resting zones along tree lines and shrub beds.",
    },
    {
      emoji: "🪵",
      title: "Termites in established mid-century homes",
      body: "Cherokee Bend's mid-century ranch and split-level homes often sit on crawlspaces over moisture-holding soil — classic Eastern subterranean termite conditions. Sentricon® Always Active™ protects with in-ground bait stations, no drilling, and up to $1M in EnviroCare-backed coverage on qualifying homes, subject to the terms of the agreement.",
    },
    {
      emoji: "🕷️",
      title: "Spiders in garages and outbuildings",
      body: "Cherokee Bend's detached garages and storage buildings on wooded lots are classic spider harborage. Our interior + perimeter program targets where they nest, not just the webs you see.",
    },
    {
      emoji: "🌳",
      title: "Carpenter ants in mature trees",
      body: "The mature tree canopy throughout Cherokee Bend gives carpenter ants a route into fascia and trim. Bi-monthly exterior treatment intercepts trails before they reach the structure.",
    },
    {
      emoji: "🔥",
      title: "Fire ants on newly landscaped lots",
      body: "Fresh sod and landscape renovation on Cherokee Bend properties draws fire ants to the disturbed soil. Whole-colony fire ant treatment is a separate service available to any homeowner, starting at $150 and priced by yard size.",
    },
  ],
  landmarksLabel: "Areas of Cherokee Bend We Serve",
  landmarks: [
    "Cherokee Bend Elementary area",
    "Overbrook Farm Road",
    "Cherokee Road",
    "Shades Creek corridor",
    "Sherwood Drive",
  ],
  faqs: [
    {
      q: "Do you service homes throughout Cherokee Bend?",
      a: "Yes. We've served Cherokee Bend homeowners for years, and our Birmingham technicians know the wooded, creek-adjacent lots and mid-century construction that shape pest pressure in this part of Mountain Brook.",
    },
    {
      q: "Do you treat ticks on wooded, creek-side lots?",
      a: "Yes — tick control targets the wooded edges, leaf litter, and shaded transition zones typical of Cherokee Bend's terrain. It bundles with mosquito service in the $65/month Mosquito + Tick plan.",
    },
    {
      q: "Can you protect a Cherokee Bend home from termites without drilling?",
      a: "Yes. Sentricon® Always Active™ uses in-ground bait stations around the perimeter — no drilling through slabs, patios, or crawlspace walls. Qualifying homes carry up to $1,000,000 in EnviroCare damage coverage, and the inspection is free.",
    },
    {
      q: "What about kids and pets?",
      a: "We apply only EPA-registered products, strictly according to their label directions. Your technician will advise the appropriate re-entry timing once treated areas are dry.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments.",
    },
  ],
  nearby: [
    ["Over the Mountain", "/over-the-mountain"],
    ["Mountain Brook", "/mountain-brook"],
    ["Crestline", "/crestline"],
    ["English Village", "/english-village"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Homewood", "/homewood"],
    ["Birmingham", "/birmingham"],
  ],
  office: {
    name: "Birmingham",
    phone: "(205) 940-6360",
    phoneE164: "+12059406360",
    address: "2025 Butler Rd · Alabaster, AL 35007",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.envirocarellc.com/cherokee-bend",
      name: "EnviroCare — Cherokee Bend",
      url: "https://www.envirocarellc.com",
      telephone: "+12059406360",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2025 Butler Rd, Alabaster",
        addressLocality: "Birmingham",
        addressRegion: "AL",
        postalCode: "35205",
        addressCountry: "US",
      },
      areaServed: [{ "@type": "Place", name: "Cherokee Bend, AL (Mountain Brook)" }],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      priceRange: "$",
      description: "Family-owned pest, termite, mosquito and tick service for Cherokee Bend, Mountain Brook. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958.",
    },
    {
      "@type": "Service",
      serviceType: "Pest Control",
      provider: {
        "@type": "LocalBusiness",
        name: "EnviroCare",
        address: { "@type": "PostalAddress", streetAddress: "2025 Butler Rd, Alabaster", addressLocality: "Birmingham", addressRegion: "AL", postalCode: "35205", addressCountry: "US" },
      },
      areaServed: { "@type": "Place", name: "Cherokee Bend, AL" },
      name: "Pest Control Cherokee Bend",
      description: "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M EnviroCare coverage), and seasonal mosquito and tick yard service for Cherokee Bend homes.",
    },
    {
      "@type": "FAQPage",
      mainEntity: cfg.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NeighborhoodPage cfg={cfg} />
    </>
  );
}
