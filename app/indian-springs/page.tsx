import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Indian Springs AL | EnviroCare Since 1958",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for Indian Springs Village homes. No drilling, $1M coverage. Call (205) 940-6360.",
  alternates: { canonical: "/indian-springs" },
  openGraph: {
    title: "Pest Control Indian Springs AL | EnviroCare Since 1958",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for Indian Springs Village homes. No drilling, $1M coverage, two ways to pay. Call (205) 940-6360.",
    url: "https://www.envirocarellc.com/indian-springs",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  "name": "Indian Springs Village",
  "parentCity": "Shelby County",
  "zipCodes": "35124",
  "heroTagline": "Indian Springs Village's family-owned pest, termite, and mosquito service",
  "heroIntro": "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal Mosquito + Tick mosquito + tick treatment for every home on the ridge.",
  "pressureHeadline": "Indian Springs Village's wooded ridge setting and large lot sizes drive serious mosquito, tick, and termite pressure year-round.",
  "pressureSubhead": "The six programs we run most on Indian Springs Village properties.",
  "pressureCards": [
    {
      "emoji": "🌲",
      "title": "Wooded ridge tick pressure",
      "body": "Indian Springs Village is essentially a residential community built into the Cahaba River watershed's wooded ridge. That's beautiful — and it's also why the Lone Star tick, American dog tick, and chigger pressure here is among the highest in the metro. Mosquito + Tick plan ($65/treatment) bundles all three plus mosquito coverage."
    },
    {
      "emoji": "🦟",
      "title": "Mosquitoes around creeks and seasonal water",
      "body": "Seasonal creeks, drainage swales, and the broader Cahaba watershed mean mosquitoes start early (March) and persist late (November). 30-day yard barrier targets harborage zones — tree lines, ornamental beds, gutters, and shaded back-of-house areas."
    },
    {
      "emoji": "🪵",
      "title": "Sentricon® on ridge-top homes",
      "body": "Homes built into the Indian Springs ridge often have walkout basements, complex foundation grading, and substantial masonry — exactly what Sentricon® Always Active™ is designed for. In-ground bait stations, no drilling, up to $1M in EnviroCare-backed damage coverage on qualifying homes."
    },
    {
      "emoji": "🐜",
      "title": "Carpenter ants in older Indian Springs homes",
      "body": "Many original Indian Springs Village homes have deep eaves, substantial wood detailing, and moisture-prone areas where carpenter ants thrive. Bi-monthly perimeter service ($35/mo) handles carpenter ants along with 30+ other common Alabama pests."
    },
    {
      "emoji": "🐀",
      "title": "Field-edge rodent migration",
      "body": "Lots adjoining undeveloped acreage or the Indian Springs School grounds see fall rodent pressure as temperatures drop. Exterior bait station monitoring keeps the perimeter under control without interior chemical exposure."
    },
    {
      "emoji": "🐾",
      "title": "Spider pressure in storage areas",
      "body": "Brown recluse in older garages, wolf spiders in landscape mulch, and the seasonal jumping spiders that show up on porches. Targeted interior service hits the harborage — not just baseboards."
    }
  ],
  "landmarksLabel": "Areas of Indian Springs Village We Serve",
  "landmarks": [
    "Highway 119 corridor",
    "Cahaba Valley Road",
    "Indian Springs Trail",
    "Indian Crest Drive",
    "Cahaba Mountain",
    "Sicard Hollow",
    "Caldwell Mill Road",
    "Shades Crest",
    "Old Highway 280",
    "Indian Springs Park",
    "Indian Springs Schools"
  ],
  "faqs": [
    {
      "q": "Why is the tick pressure so bad in Indian Springs Village?",
      "a": "Indian Springs Village sits in the wooded ridge of the Cahaba watershed, with mature hardwood canopy, mast-producing trees, and corridor wildlife (deer, small mammals) that carry ticks. Lone Star, American dog, and chigger pressure is among the highest in any Birmingham-area community. The Mosquito + Tick plan ($65/treatment) bundles tick + chigger + mosquito for that reason — it is the right plan for almost every Indian Springs Village yard."
    },
    {
      "q": "Will Sentricon® work on a walkout-basement home built into the ridge?",
      "a": "Yes — this is actually a textbook Sentricon® scenario. The in-ground bait stations install around the structure's actual perimeter at grade level, regardless of foundation complexity. No drilling, no trenching, and the system protects the structure on all sides including the lower walkout level."
    },
    {
      "q": "Do you treat for spiders specifically in older Indian Springs Village garages?",
      "a": "Yes. Brown recluse and wolf spider treatment focuses on harborage — cracks, voids, behind stored items, under workbenches, in undisturbed corners — not on open floor space. Most Indian Springs Village homes do best with a combined interior + exterior service rotation."
    },
    {
      "q": "What about the seasonal creek and standing water on my lot?",
      "a": "We treat the resting zones mosquitoes use during the day — tree lines, shrub bases, gutters, and shaded areas — not the water itself. Water-source treatment requires aquatic-labeled products applied to label specifications and is typically a separate conversation. The 30-day yard barrier alone usually dramatically reduces the bite rate on adjacent yards."
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
    "address": "2025 Butler Road · Alabaster, AL 35007"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.envirocarellc.com/indian-springs",
      "name": "EnviroCare — Indian Springs Village",
      "url": "https://www.envirocarellc.com",
      "telephone": "+12059406360",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2025 Butler Road",
        "addressLocality": "Alabaster",
        "addressRegion": "AL",
        "postalCode": "35007",
        "addressCountry": "US"
      },
      "areaServed": [
        {
          "@type": "Place",
          "name": "Indian Springs Village, AL (Shelby County)"
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
      "description": "Family-owned pest, termite, mosquito and tick service for Indian Springs Village, Shelby County. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958."
    },
    {
      "@type": "Service",
      "serviceType": "Pest Control",
      "provider": {
        "@type": "LocalBusiness",
        "name": "EnviroCare",
        "address": { "@type": "PostalAddress", "streetAddress": "2025 Butler Rd", "addressLocality": "Alabaster", "addressRegion": "AL", "postalCode": "35007", "addressCountry": "US" }
      },
      "areaServed": {
        "@type": "Place",
        "name": "Indian Springs Village, AL"
      },
      "name": "Pest Control Indian Springs Village",
      "description": "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M coverage), and seasonal mosquito and tick yard service for Indian Springs Village homes."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is the tick pressure so bad in Indian Springs Village?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Indian Springs Village sits in the wooded ridge of the Cahaba watershed, with mature hardwood canopy, mast-producing trees, and corridor wildlife (deer, small mammals) that carry ticks. Lone Star, American dog, and chigger pressure is among the highest in any Birmingham-area community. The Mosquito + Tick plan ($65/treatment) bundles tick + chigger + mosquito for that reason — it is the right plan for almost every Indian Springs Village yard."
          }
        },
        {
          "@type": "Question",
          "name": "Will Sentricon® work on a walkout-basement home built into the ridge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — this is actually a textbook Sentricon® scenario. The in-ground bait stations install around the structure's actual perimeter at grade level, regardless of foundation complexity. No drilling, no trenching, and the system protects the structure on all sides including the lower walkout level."
          }
        },
        {
          "@type": "Question",
          "name": "Do you treat for spiders specifically in older Indian Springs Village garages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Brown recluse and wolf spider treatment focuses on harborage — cracks, voids, behind stored items, under workbenches, in undisturbed corners — not on open floor space. Most Indian Springs Village homes do best with a combined interior + exterior service rotation."
          }
        },
        {
          "@type": "Question",
          "name": "What about the seasonal creek and standing water on my lot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We treat the resting zones mosquitoes use during the day — tree lines, shrub bases, gutters, and shaded areas — not the water itself. Water-source treatment requires aquatic-labeled products applied to label specifications and is typically a separate conversation. The 30-day yard barrier alone usually dramatically reduces the bite rate on adjacent yards."
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
