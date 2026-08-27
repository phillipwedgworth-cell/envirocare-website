// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/english-village/page.tsx
// Commit: feat(neighborhood): add English Village (Mountain Brook) neighborhood page
// Push: main
// ───────────────────────────────────

import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control English Village AL | EnviroCare Since 1958",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for English Village homes. No drilling, $1M coverage, two ways to pay. (205) 940-6360.",
  alternates: { canonical: "/english-village" },
  openGraph: {
    title: "Pest Control English Village AL | EnviroCare Since 1958",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for English Village homes. No drilling, $1M termite coverage, two ways to pay. Call (205) 940-6360.",
    url: "https://www.envirocarellc.com/english-village",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  name: "English Village",
  parentCity: "Mountain Brook",
  zipCodes: "35223",
  heroTagline: "English Village's family-owned choice for Sentricon® termite and pest control",
  heroIntro: "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal mosquito and tick treatment for the ravine lots and established homes around English Village. Same Wedgworth-family standard since 1958.",
  pressureHeadline: "English Village's wooded ravines and stone-walled properties create a distinct pest-pressure profile.",
  pressureSubhead: "The service patterns we run most often around English Village and the Overton Road corridor.",
  pressureCards: [
    {
      emoji: "🪵",
      title: "Sentricon® for stone-and-brick estate homes",
      body: "English Village's established homes along Overton Road often feature extensive stonework and brick — construction nobody wants drilled into. Sentricon® Always Active™ places in-ground bait stations around the perimeter with no holes in the masonry. Up to $1M in EnviroCare-backed damage coverage on qualifying homes, subject to the terms of the agreement.",
    },
    {
      emoji: "🐾",
      title: "Ticks on the wooded ravine lots",
      body: "Many English Village properties sit on Mountain Brook's characteristic wooded, ravine-cut terrain, which carries Lone Star and American dog ticks close to the yard. The Mosquito + Tick plan at $65/visit bundles tick and chigger coverage for exactly this kind of lot.",
    },
    {
      emoji: "🦟",
      title: "Mosquitoes from Lane Park's shaded green space",
      body: "The green space and creek drainage near Lane Park keeps mosquito pressure elevated from March through October. The 30-day yard barrier targets resting zones in shrub lines and shaded beds.",
    },
    {
      emoji: "🐜",
      title: "Carpenter ants in the mature canopy",
      body: "The dense hardwood canopy that gives English Village its character also harbors carpenter ants working their way into fascia and trim. Bi-monthly exterior treatment intercepts trails before they reach the structure.",
    },
    {
      emoji: "🕷️",
      title: "Spiders in stone retaining walls",
      body: "The stone retaining walls and terraced landscaping common on English Village's sloped lots are classic spider and black-widow harborage. Our interior + perimeter program treats the voids and cracks they nest in.",
    },
    {
      emoji: "🔥",
      title: "Fire ants on landscaped lots",
      body: "Recent landscape work and lawn renovation on established properties disturbs soil and draws fire ants. Whole-yard fire ant treatment is a separate service available to any homeowner, starting at $150 and priced by yard size.",
    },
  ],
  landmarksLabel: "Areas of English Village We Serve",
  landmarks: [
    "English Village shops",
    "Overton Road corridor",
    "Lane Park area",
    "Balmoral Road",
    "Vestavia Hills line",
    "Mountain Brook High School area",
    "Dexter Avenue",
  ],
  faqs: [
    {
      q: "Do you service homes around English Village and the Overton Road corridor?",
      a: "Yes. We've served English Village homeowners for years, and our Birmingham technicians are familiar with the ravine lots, stone construction, and mature landscaping that shape pest pressure in this part of Mountain Brook.",
    },
    {
      q: "Will Sentricon® damage the stonework or hardscape on my property?",
      a: "No. The bait stations are about two inches across and sit flush with the soil along the perimeter — no drilling into stonework, brick, or finished surfaces. That's exactly why Sentricon® fits English Village's estate-style construction better than older liquid-termiticide approaches.",
    },
    {
      q: "How does the $1 million termite coverage actually work?",
      a: "On qualifying homes, EnviroCare carries the damage-coverage commitment directly — EnviroCare's own coverage, not a manufacturer's. If active termite damage occurs to the protected structure during the active service period, EnviroCare covers repair up to $1M. The inspection is free.",
    },
    {
      q: "Do you treat ticks on wooded, ravine-cut lots?",
      a: "Yes — tick control targets the wooded edges, leaf litter, and shaded transition zones typical of English Village's terrain. It bundles with mosquito service in the $65/visit Mosquito + Tick plan.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments.",
    },
  ],
  nearby: [
    ["Mountain Brook", "/mountain-brook"],
    ["Crestline", "/crestline"],
    ["Cherokee Bend", "/cherokee-bend"],
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
      "@id": "https://www.envirocarellc.com/english-village",
      name: "EnviroCare — English Village",
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
      areaServed: [{ "@type": "Place", name: "English Village, AL (Mountain Brook)" }],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      priceRange: "$",
      description: "Family-owned pest, termite, mosquito and tick service for English Village, Mountain Brook. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958.",
    },
    {
      "@type": "Service",
      serviceType: "Pest Control",
      provider: {
        "@type": "LocalBusiness",
        name: "EnviroCare",
        address: { "@type": "PostalAddress", streetAddress: "2025 Butler Rd, Alabaster", addressLocality: "Birmingham", addressRegion: "AL", postalCode: "35205", addressCountry: "US" },
      },
      areaServed: { "@type": "Place", name: "English Village, AL" },
      name: "Pest Control English Village",
      description: "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M EnviroCare coverage), and seasonal mosquito and tick yard service for English Village homes.",
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
