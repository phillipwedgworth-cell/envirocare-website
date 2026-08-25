// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/crestline/page.tsx
// Commit: feat(neighborhood): add Crestline (Mountain Brook) neighborhood page
// Push: main
// ───────────────────────────────────

import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Crestline AL | EnviroCare Since 1958",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for Crestline homes. No drilling, $1M termite coverage, two ways to pay. Call (205) 991-2882.",
  alternates: { canonical: "/crestline" },
  openGraph: {
    title: "Pest Control Crestline AL | EnviroCare Since 1958",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for Crestline homes. No drilling, $1M termite coverage, two ways to pay. Call (205) 991-2882.",
    url: "https://www.envirocarellc.com/crestline",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  name: "Crestline",
  parentCity: "Mountain Brook",
  zipCodes: "35213",
  heroTagline: "Crestline Village's family-owned choice for Sentricon® termite and pest control",
  heroIntro: "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal mosquito and tick treatment for Crestline's historic homes and mature shade lots. Same Wedgworth-family standard since 1958.",
  pressureHeadline: "Crestline's century-old canopy and historic homes bring a specific mix of termite, ant, and mosquito pressure.",
  pressureSubhead: "The service patterns we run most often around Crestline Village.",
  pressureCards: [
    {
      emoji: "🪵",
      title: "Sentricon® for Crestline's historic homes",
      body: "Crestline's 1920s-to-1950s Tudor, Colonial, and English-cottage homes carry original brick and stone that nobody wants drilled into. Sentricon® Always Active™ uses in-ground bait stations around the perimeter — no holes in the masonry, no tank trucks in the driveway. Up to $1M in EnviroCare-backed damage coverage on qualifying homes, subject to the terms of the agreement.",
    },
    {
      emoji: "🌳",
      title: "Carpenter ants in the old-growth canopy",
      body: "Crestline's mature oak and hardwood canopy is one of the neighborhood's defining features — and it also gives carpenter ants a highway straight into fascia, soffits, and trim. Bi-monthly exterior treatment intercepts trails before they reach the house.",
    },
    {
      emoji: "🦟",
      title: "Mosquitoes off Jemison Park & Shades Creek",
      body: "The Jemison Park trail and Shades Creek greenway run close to Crestline, and the shaded, damp corridor breeds mosquitoes March through November. The 30-day yard barrier keeps porches and backyards usable through the season.",
    },
    {
      emoji: "🕷️",
      title: "Spiders & black widows in older outbuildings",
      body: "Detached garages, stone retaining walls, and the storage buildings common on older Crestline lots are prime spider and black-widow harborage. Our interior + perimeter program targets where they nest, not just the webs you see.",
    },
    {
      emoji: "🐜",
      title: "Fire ants on freshly graded lots",
      body: "Renovation and landscape work on established Crestline properties disturbs soil and draws fire ants to the fresh dirt. Whole-colony fire ant treatment is available to any homeowner, starting at $150 and priced by yard size.",
    },
    {
      emoji: "🪲",
      title: "Fall invaders on brick facades",
      body: "Asian lady beetles and stink bugs swarm south- and west-facing brick walls every October across Crestline's older housing stock. Bi-monthly exterior treatment seals the entry points before they make it inside.",
    },
  ],
  landmarksLabel: "Areas of Crestline We Serve",
  landmarks: [
    "Crestline Village",
    "Crestline Elementary area",
    "Jemison Park Trail",
    "Shades Creek Greenway",
    "Overbrook Road",
    "Euclid Avenue",
    "Country Club area",
    "Vine Street",
  ],
  faqs: [
    {
      q: "Do you service homes in Crestline Village and the surrounding streets?",
      a: "Yes. We've served Crestline homeowners for years, and our Birmingham technicians know the mix of historic architecture, mature landscaping, and older outbuildings that shape pest pressure here.",
    },
    {
      q: "Will Sentricon® damage the brick or stonework on an older Crestline home?",
      a: "No. The bait stations are about two inches across, sit flush with the soil, and tuck into bed lines or perimeter turf. There's zero drilling into original brick, stone, or masonry — which is exactly why Sentricon® is the right fit for Crestline's older housing stock rather than older liquid-termiticide methods.",
    },
    {
      q: "How does the $1 million termite coverage work?",
      a: "On qualifying homes, EnviroCare carries the damage-coverage commitment directly — this is EnviroCare's own coverage, not a manufacturer's. If active termite damage occurs to the protected structure during the active service period, EnviroCare covers repair up to $1M. A free inspection is the first step.",
    },
    {
      q: "What does mosquito service cost for a typical Crestline yard?",
      a: "Mosquito-only treatment is $45 per visit, applied every 30 days March through November. Many Crestline homes near the Jemison Park tree line choose the Mosquito + Tick plan at $65/visit, since it bundles tick and chigger coverage for shaded, wooded-adjacent yards.",
    },
    {
      q: "Is there a long-term contract?",
      a: "No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments.",
    },
  ],
  nearby: [
    ["Mountain Brook", "/mountain-brook"],
    ["English Village", "/english-village"],
    ["Cherokee Bend", "/cherokee-bend"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Homewood", "/homewood"],
    ["Birmingham", "/birmingham"],
  ],
  office: {
    name: "Birmingham",
    phone: "(205) 991-2882",
    phoneE164: "+12059912882",
    address: "2120 16th Ave S, Ste 302 · Birmingham, AL 35205",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.envirocarellc.com/crestline",
      name: "EnviroCare — Crestline",
      url: "https://www.envirocarellc.com",
      telephone: "+12059912882",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2120 16th Ave S, Ste 302",
        addressLocality: "Birmingham",
        addressRegion: "AL",
        postalCode: "35205",
        addressCountry: "US",
      },
      areaServed: [{ "@type": "Place", name: "Crestline, AL (Mountain Brook)" }],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      priceRange: "$",
      description: "Family-owned pest, termite, mosquito and tick service for Crestline, Mountain Brook. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958.",
    },
    {
      "@type": "Service",
      serviceType: "Pest Control",
      provider: {
        "@type": "LocalBusiness",
        name: "EnviroCare",
        address: { "@type": "PostalAddress", streetAddress: "2120 16th Ave S, Ste 302", addressLocality: "Birmingham", addressRegion: "AL", postalCode: "35205", addressCountry: "US" },
      },
      areaServed: { "@type": "Place", name: "Crestline, AL" },
      name: "Pest Control Crestline",
      description: "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M EnviroCare coverage), and seasonal mosquito and tick yard service for Crestline homes.",
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
