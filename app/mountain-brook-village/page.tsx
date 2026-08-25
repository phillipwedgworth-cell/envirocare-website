// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/mountain-brook-village/page.tsx
// Commit: feat(neighborhood): add Mountain Brook Village neighborhood page
// Push: main
// ───────────────────────────────────

import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Mountain Brook Village AL | EnviroCare",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for homes around Mountain Brook Village. No drilling, $1M coverage. (205) 940-6360.",
  alternates: { canonical: "/mountain-brook-village" },
  openGraph: {
    title: "Pest Control Mountain Brook Village AL | EnviroCare",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for homes around Mountain Brook Village. No drilling, $1M termite coverage, two ways to pay. Call (205) 940-6360.",
    url: "https://www.envirocarellc.com/mountain-brook-village",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  name: "Mountain Brook Village",
  parentCity: "Mountain Brook",
  zipCodes: "35223",
  heroTagline: "The original village's family-owned choice for Sentricon® termite and pest control",
  heroIntro: "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal mosquito and tick treatment for the city's founding neighborhood. Same Wedgworth-family standard since 1958.",
  pressureHeadline: "Mountain Brook Village's original 1920s-and-30s housing stock brings the city's oldest — and most established — pest pressure.",
  pressureSubhead: "The service patterns we run most often in and around the village center.",
  pressureCards: [
    {
      emoji: "🪵",
      title: "Sentricon® for the city's oldest homes",
      body: "As Mountain Brook's founding village, this area carries some of the city's oldest brick, stone, and stucco construction — exactly the kind of home nobody wants drilled into. Sentricon® Always Active™ uses in-ground bait stations around the perimeter, with up to $1M in EnviroCare-backed damage coverage on qualifying homes, subject to the terms of the agreement.",
    },
    {
      emoji: "🦟",
      title: "Mosquitoes near the Jemison Creek trailhead",
      body: "The creek and trail system that gives Mountain Brook its name runs right past the village, and the shaded, damp corridor breeds mosquitoes March through November. The 30-day yard barrier keeps outdoor spaces usable through the season.",
    },
    {
      emoji: "🌳",
      title: "Carpenter ants in century-old shade trees",
      body: "The mature oak and hardwood canopy that has shaded the village for generations also gives carpenter ants a direct route into fascia, soffits, and trim. Bi-monthly exterior treatment intercepts trails before they reach the house.",
    },
    {
      emoji: "🕷️",
      title: "Spiders in historic garages and stone walls",
      body: "Detached garages, stone retaining walls, and outbuildings original to the village's oldest properties are classic spider and black-widow harborage. Our interior + perimeter program targets the voids and cracks they nest in.",
    },
    {
      emoji: "🐜",
      title: "Fire ants on renovated and graded lots",
      body: "Ongoing renovation of the village's historic homes disturbs soil and draws fire ants to the freshly graded dirt. Whole-colony fire ant treatment is a separate service available to any homeowner, starting at $150 and priced by yard size.",
    },
    {
      emoji: "🪲",
      title: "Fall invaders on brick and stucco facades",
      body: "Asian lady beetles and stink bugs swarm south- and west-facing walls across the village's older housing stock every October. Bi-monthly exterior treatment seals entry points before they get inside.",
    },
  ],
  landmarksLabel: "Areas of Mountain Brook Village We Serve",
  landmarks: [
    "Mountain Brook Village shops",
    "Jemison Trail Head",
    "Culver Road",
    "Watkins Street",
    "Crestline Road corridor",
    "Country Club area",
  ],
  faqs: [
    {
      q: "Do you service homes in and around Mountain Brook Village?",
      a: "Yes. We've served village homeowners for years, and our Birmingham technicians know the original brick, stone, and stucco construction and mature landscaping that shape pest pressure in the city's founding neighborhood.",
    },
    {
      q: "Will Sentricon® damage the original brick or stucco on my home?",
      a: "No. The bait stations are about two inches across and sit flush with the soil around the perimeter — no drilling into original masonry, brick, or stucco. That's exactly why Sentricon® is the right fit for the village's historic homes rather than older liquid-termiticide methods.",
    },
    {
      q: "How does the $1 million termite coverage work?",
      a: "On qualifying homes, EnviroCare carries the damage-coverage commitment directly — this is EnviroCare's own coverage, not a manufacturer's. If active termite damage occurs to the protected structure during the active service period, EnviroCare covers repair up to $1M. A free inspection is the first step.",
    },
    {
      q: "When does mosquito season start near the village?",
      a: "We run the 30-day yard barrier March through November, timed to the creek and trail corridor's mosquito pressure. Tick control adds on with the $65/visit Mosquito + Tick plan.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments.",
    },
  ],
  nearby: [
    ["Mountain Brook", "/mountain-brook"],
    ["Crestline", "/crestline"],
    ["English Village", "/english-village"],
    ["Cherokee Bend", "/cherokee-bend"],
    ["Vestavia Hills", "/vestavia-hills"],
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
      "@id": "https://www.envirocarellc.com/mountain-brook-village",
      name: "EnviroCare — Mountain Brook Village",
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
      areaServed: [{ "@type": "Place", name: "Mountain Brook Village, AL" }],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      priceRange: "$",
      description: "Family-owned pest, termite, mosquito and tick service for Mountain Brook Village. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958.",
    },
    {
      "@type": "Service",
      serviceType: "Pest Control",
      provider: {
        "@type": "LocalBusiness",
        name: "EnviroCare",
        address: { "@type": "PostalAddress", streetAddress: "2025 Butler Rd, Alabaster", addressLocality: "Birmingham", addressRegion: "AL", postalCode: "35205", addressCountry: "US" },
      },
      areaServed: { "@type": "Place", name: "Mountain Brook Village, AL" },
      name: "Pest Control Mountain Brook Village",
      description: "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M EnviroCare coverage), and seasonal mosquito and tick yard service for homes around Mountain Brook Village.",
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
