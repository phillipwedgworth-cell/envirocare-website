import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Meadow Brook, Hoover AL | Sentricon® Termite | EnviroCare — Since 1958",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for Meadow Brook homes. No drilling, $1M coverage, no long-term contracts. Call (205) 940-6360.",
  alternates: { canonical: "/meadow-brook" },
  openGraph: {
    title: "Pest Control Meadow Brook, Hoover AL | Sentricon® Termite | EnviroCare — Since 1958",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for Meadow Brook homes. No drilling, $1M coverage, no long-term contracts. Call (205) 940-6360.",
    url: "https://www.envirocarellc.com/meadow-brook",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  "name": "Meadow Brook",
  "parentCity": "Hoover",
  "zipCodes": "35242",
  "heroTagline": "Meadow Brook's family-owned pest, termite, and mosquito service",
  "heroIntro": "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal Mosquito + Tick mosquito + tick treatment for every Meadow Brook home along Highway 280 and the surrounding sections.",
  "pressureHeadline": "Meadow Brook's established neighborhoods and significant tree canopy drive consistent year-round pest pressure.",
  "pressureSubhead": "The six programs we run most on Meadow Brook properties.",
  "pressureCards": [
    {
      "emoji": "🌳",
      "title": "Mosquito pressure under mature canopy",
      "body": "Meadow Brook's mature tree canopy is one of the neighborhood's defining features — and it is also one of the highest-pressure mosquito habitats in 35242. Shaded resting zones along tree lines, shrub bases, gutters, and north walls are where the 30-day yard barrier focuses."
    },
    {
      "emoji": "🐾",
      "title": "Ticks across the older Meadow Brook lots",
      "body": "Larger established Meadow Brook lots with substantial vegetation carry Lone Star and American dog ticks plus chiggers. Mosquito + Tick plan ($65/treatment) bundles all three plus mosquito — the right plan for most yards here."
    },
    {
      "emoji": "🪵",
      "title": "Sentricon® for established homes",
      "body": "Many Meadow Brook homes are now 20-30 years old — the prime termite vulnerability window. Sentricon® Always Active™ in-ground bait stations protect without drilling into existing brick, stone, or hardscape. Up to $1M in EnviroCare-backed damage coverage."
    },
    {
      "emoji": "🐜",
      "title": "Carpenter ants in mature wood detailing",
      "body": "Established Meadow Brook homes with deep eaves, wood siding, and moisture-prone areas attract carpenter ants. Bi-monthly perimeter service ($35/mo) handles the entire ant family along with 30+ other Alabama pests."
    },
    {
      "emoji": "🦗",
      "title": "Cricket and silverfish pressure in basements",
      "body": "Finished basements and storage areas in Meadow Brook homes are textbook silverfish, cricket, and centipede habitat — humid, undisturbed, dark. Interior service on a quarterly cycle targets the harborage."
    },
    {
      "emoji": "🐀",
      "title": "Fall rodent migration",
      "body": "Older Meadow Brook homes with even minor structural openings (utility penetrations, garage gaps, attic vents) see seasonal rodent migration in fall. Exterior bait station monitoring + a one-time exclusion review keeps the perimeter tight."
    }
  ],
  "landmarksLabel": "Areas of Meadow Brook We Serve",
  "landmarks": [
    "Meadow Brook Road",
    "Meadow Brook Drive",
    "Meadow Brook Lane",
    "Meadow Brook Court",
    "Highway 280 corridor",
    "Brook Highland adjacent",
    "Eagle Point adjacent",
    "Inverness nearby",
    "Greystone nearby",
    "Highland Lakes nearby"
  ],
  "faqs": [
    {
      "q": "My Meadow Brook home is 25 years old — is now the right time for termite protection?",
      "a": "Yes — that is the prime vulnerability window. Homes 20–30 years old that have not had active termite protection are at materially higher risk than homes under continuous Sentricon® or equivalent service. Free inspection at no obligation."
    },
    {
      "q": "Will Sentricon® damage the established landscape around my home?",
      "a": "No. The bait stations are roughly two inches in diameter, sit flush with the soil, and tuck into existing bed lines or perimeter turf. They are virtually invisible from the curb. Zero drilling into foundations or hardscape."
    },
    {
      "q": "How does the mosquito service work under heavy tree canopy?",
      "a": "Treatments focus on the shaded resting zones mosquitoes actually use during the day — tree lines, shrub bases, gutters, and north-facing walls. The 30-day yard barrier targets where they rest between blood meals, not where they fly. Most heavy-canopy yards see noticeable improvement within two cycles."
    },
    {
      "q": "Do you do crawlspace inspections in Meadow Brook homes?",
      "a": "Yes — crawlspace inspection is part of the initial assessment for any home receiving Sentricon® termite service, and many Meadow Brook homes have crawlspaces or partial crawlspaces under additions. Standalone crawlspace work is available; call (205) 940-6360 for current pricing."
    },
    {
      "q": "Is there a long-term contract?",
      "a": "No. Pest control is month-to-month on ACH and you can cancel anytime."
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
      "@id": "https://www.envirocarellc.com/meadow-brook",
      "name": "EnviroCare Pest & Termite Services — Meadow Brook",
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
          "name": "Meadow Brook, AL (Hoover)"
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
      "description": "Family-owned pest, termite, mosquito and tick service for Meadow Brook, Hoover. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958."
    },
    {
      "@type": "Service",
      "serviceType": "Pest Control",
      "provider": {
        "@type": "LocalBusiness",
        "name": "EnviroCare Pest & Termite Services",
        "address": { "@type": "PostalAddress", "streetAddress": "2025 Butler Rd", "addressLocality": "Alabaster", "addressRegion": "AL", "postalCode": "35007", "addressCountry": "US" }
      },
      "areaServed": {
        "@type": "Place",
        "name": "Meadow Brook, AL"
      },
      "name": "Pest Control Meadow Brook",
      "description": "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M coverage), and seasonal mosquito and tick yard service for Meadow Brook homes."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "My Meadow Brook home is 25 years old — is now the right time for termite protection?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — that is the prime vulnerability window. Homes 20–30 years old that have not had active termite protection are at materially higher risk than homes under continuous Sentricon® or equivalent service. Free inspection at no obligation."
          }
        },
        {
          "@type": "Question",
          "name": "Will Sentricon® damage the established landscape around my home?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The bait stations are roughly two inches in diameter, sit flush with the soil, and tuck into existing bed lines or perimeter turf. They are virtually invisible from the curb. Zero drilling into foundations or hardscape."
          }
        },
        {
          "@type": "Question",
          "name": "How does the mosquito service work under heavy tree canopy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Treatments focus on the shaded resting zones mosquitoes actually use during the day — tree lines, shrub bases, gutters, and north-facing walls. The 30-day yard barrier targets where they rest between blood meals, not where they fly. Most heavy-canopy yards see noticeable improvement within two cycles."
          }
        },
        {
          "@type": "Question",
          "name": "Do you do crawlspace inspections in Meadow Brook homes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — crawlspace inspection is part of the initial assessment for any home receiving Sentricon® termite service, and many Meadow Brook homes have crawlspaces or partial crawlspaces under additions. Standalone crawlspace work is available; call (205) 940-6360 for current pricing."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a long-term contract?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Pest control is month-to-month on ACH and you can cancel anytime."
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
