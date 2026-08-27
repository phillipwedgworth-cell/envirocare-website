// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/highland-lakes/page.tsx
// Commit: fix(compliance): attribute $1M damage coverage to EnviroCare, not Sentricon
// Push: main
// ─────────────────────────────────────
import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Highland Lakes 35242 | EnviroCare",
  description: "Family-owned pest, termite, and mosquito service for Highland Lakes homes (35242). Sentricon® no-drilling termite, $1M EnviroCare coverage. Call (205) 940-6360.",
  alternates: { canonical: "/highland-lakes" },
  openGraph: {
    title: "Pest Control Highland Lakes 35242 | EnviroCare",
    description: "Family-owned pest, termite, and mosquito service for Highland Lakes homes (35242). Sentricon® no-drilling termite, $1M EnviroCare coverage, two ways to pay. Call (205) 940-6360.",
    url: "https://www.envirocarellc.com/highland-lakes",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  "name": "Highland Lakes",
  "parentCity": "Birmingham",
  "zipCodes": "35242",
  "heroTagline": "Highland Lakes' family-owned pest, termite, and mosquito service",
  "heroIntro": "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and Mosquito + Tick mosquito + tick yard treatment for every Highland Lakes home — gate access, wooded lots, and lakefront acreage included.",
  "pressureHeadline": "Highland Lakes' lakefront homes and wooded acreage make this one of the highest-pressure mosquito and tick areas in the Birmingham metro.",
  "pressureSubhead": "The six programs we run most often on Highland Lakes properties.",
  "pressureCards": [
    {
      "emoji": "💧",
      "title": "Lakefront mosquito pressure",
      "body": "Lake-adjacent properties have the worst mosquito pressure in 35242 — standing water harborage, vegetation along the shoreline, and shaded boathouse / dock structures. The 30-day yard barrier ($45/treatment) targets resting zones; lakefront homes typically see a noticeable drop within the first two cycles."
    },
    {
      "emoji": "🐾",
      "title": "Ticks across the back acreage",
      "body": "Highland Lakes' wooded common areas, walking trails, and large rear lots carry Lone Star and American dog ticks plus chiggers. The Mosquito + Tick plan ($65/treatment) is the right call here — bundles mosquito + tick + chigger for $43.33/month equivalent over the 8-month season."
    },
    {
      "emoji": "🪵",
      "title": "Sentricon® on substantial homes",
      "body": "Highland Lakes homes are substantial — finished basements, walkout foundations, extensive masonry. Sentricon® Always Active™ in-ground bait stations protect without drilling into any of it. priced after a free WDO inspection, with up to $1M in EnviroCare-backed damage coverage on qualifying homes, subject to the terms of the agreement."
    },
    {
      "emoji": "🐀",
      "title": "Field-edge rodent pressure",
      "body": "Lots backing up to wooded common areas or undeveloped acreage get seasonal rodent migration — typically fall as temperatures drop. Exterior bait station programs (added to a standard pest plan) keep the perimeter monitored without interior exposure."
    },
    {
      "emoji": "🐜",
      "title": "Carpenter ants tracing moisture",
      "body": "Older Highland Lakes homes with deep eaves, wood siding details, or moisture-prone areas (downspout terminations, irrigation overlap) attract carpenter ants. Bi-monthly perimeter service ($35/mo) handles the ant family along with 30+ other Alabama pests."
    },
    {
      "emoji": "🦂",
      "title": "Brown recluse in basements",
      "body": "Walkout basements, finished lower levels, storage rooms, and garages in Highland Lakes homes are exactly the dark undisturbed harborage brown recluse colonizes. Targeted interior service hits the actual hiding zones, not just open floor space."
    }
  ],
  "landmarksLabel": "Areas of Highland Lakes We Serve",
  "landmarks": [
    "Highland Lakes Boulevard",
    "Highland Lakes Trail",
    "Highland Lakes Cove",
    "Highland Lakes Drive",
    "Highland Lakes Way",
    "Eagle Point adjacent",
    "Brook Highland adjacent",
    "Meadow Brook adjacent",
    "Highway 280 corridor",
    "Cahaba Heights nearby",
    "Greystone nearby"
  ],
  "faqs": [
    {
      "q": "How is pest pressure different in Highland Lakes than in the rest of 35242?",
      "a": "Two things make Highland Lakes higher pressure: lake proximity (mosquitoes and the moisture chain that feeds them) and wooded perimeter / common areas (ticks, chiggers, and seasonal rodent migration). Most Highland Lakes homes do best on the Mosquito + Tick mosquito + tick plan rather than mosquito-only."
    },
    {
      "q": "Can you service homes with gate access?",
      "a": "Yes. Our Birmingham office is familiar with the Highland Lakes gate procedures. Your technician will work with the gate process the same way trash service, lawn service, and other regular vendors do."
    },
    {
      "q": "Do you treat the lakefront yard differently?",
      "a": "Yes. Lake-adjacent treatments focus on harborage zones away from the water itself — shrub bases, tree lines, mulched beds, gutters, and shaded back-of-house areas. We use only EPA-registered products and apply them according to label directions, including any aquatic-buffer language on the labels."
    },
    {
      "q": "How does the Sentricon® warranty work on a Highland Lakes home?",
      "a": "On qualifying homes, EnviroCare carries the damage-coverage commitment up to $1M. If active termite damage occurs to the protected structure during the active service period, EnviroCare covers repair. The coverage is EnviroCare's own, not a manufacturer's, and it requires annual re-inspection to remain active."
    },
    {
      "q": "Is there a long-term contract?",
      "a": "No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments."
    }
  ],
  "nearby": [
    [
      "Mountain Brook",
      "/mountain-brook"
    ],
    [
      "Vestavia Hills",
      "/vestavia-hills"
    ],
    [
      "Hoover",
      "/hoover"
    ],
    [
      "Homewood",
      "/homewood"
    ],
    [
      "Pelham",
      "/pelham"
    ],
    [
      "Alabaster",
      "/alabaster"
    ],
    [
      "Chelsea",
      "/chelsea"
    ],
    [
      "Birmingham",
      "/birmingham"
    ]
  ],
  "office": {
    "name": "Birmingham",
    "phone": "(205) 940-6360",
    "phoneE164": "+12059406360",
    "address": "2025 Butler Rd · Alabaster, AL 35007"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.envirocarellc.com/highland-lakes",
      "name": "EnviroCare — Highland Lakes",
      "url": "https://www.envirocarellc.com",
      "telephone": "+12059406360",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2025 Butler Rd, Alabaster",
        "addressLocality": "Birmingham",
        "addressRegion": "AL",
        "postalCode": "35205",
        "addressCountry": "US"
      },
      "areaServed": [
        {
          "@type": "Place",
          "name": "Highland Lakes, AL (Birmingham)"
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "priceRange": "$",
      "description": "Family-owned pest, termite, mosquito and tick service for Highland Lakes, Birmingham. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958."
    },
    {
      "@type": "Service",
      "serviceType": "Pest Control",
      "provider": {
        "@type": "LocalBusiness",
        "name": "EnviroCare",
        "address": { "@type": "PostalAddress", "streetAddress": "2025 Butler Rd, Alabaster", "addressLocality": "Birmingham", "addressRegion": "AL", "postalCode": "35205", "addressCountry": "US" }
      },
      "areaServed": {
        "@type": "Place",
        "name": "Highland Lakes, AL"
      },
      "name": "Pest Control Highland Lakes",
      "description": "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M EnviroCare coverage), and seasonal mosquito and tick yard service for Highland Lakes homes."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is pest pressure different in Highland Lakes than in the rest of 35242?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Two things make Highland Lakes higher pressure: lake proximity (mosquitoes and the moisture chain that feeds them) and wooded perimeter / common areas (ticks, chiggers, and seasonal rodent migration). Most Highland Lakes homes do best on the Mosquito + Tick mosquito + tick plan rather than mosquito-only."
          }
        },
        {
          "@type": "Question",
          "name": "Can you service homes with gate access?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our Birmingham office is familiar with the Highland Lakes gate procedures. Your technician will work with the gate process the same way trash service, lawn service, and other regular vendors do."
          }
        },
        {
          "@type": "Question",
          "name": "Do you treat the lakefront yard differently?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Lake-adjacent treatments focus on harborage zones away from the water itself — shrub bases, tree lines, mulched beds, gutters, and shaded back-of-house areas. We use only EPA-registered products and apply them according to label directions, including any aquatic-buffer language on the labels."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Sentricon® warranty work on a Highland Lakes home?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "On qualifying homes, EnviroCare carries the damage-coverage commitment up to $1M. If active termite damage occurs to the protected structure during the active service period, EnviroCare covers repair. The coverage is EnviroCare's own, not a manufacturer's, and it requires annual re-inspection to remain active."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a long-term contract?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NeighborhoodPage cfg={cfg} />
    </>
  );
}
