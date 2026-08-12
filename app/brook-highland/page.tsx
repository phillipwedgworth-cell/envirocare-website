import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Brook Highland AL | EnviroCare Since 1958",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for Brook Highland homes. No drilling, $1M coverage, two ways to pay. Call (205) 991-2882.",
  alternates: { canonical: "/brook-highland" },
  openGraph: {
    title: "Pest Control Brook Highland AL | EnviroCare Since 1958",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for Brook Highland homes. No drilling, $1M coverage, two ways to pay. Call (205) 991-2882.",
    url: "https://www.envirocarellc.com/brook-highland",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  "name": "Brook Highland",
  "parentCity": "Hoover",
  "zipCodes": "35242",
  "heroTagline": "Brook Highland's family-owned pest, termite, and mosquito service",
  "heroIntro": "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal Mosquito + Tick mosquito + tick treatment for every Brook Highland home — from the original sections to the newer custom areas.",
  "pressureHeadline": "Brook Highland's mix of mature wooded sections and newer custom lots creates a year-round pest pressure spectrum.",
  "pressureSubhead": "The six programs we run most on Brook Highland properties.",
  "pressureCards": [
    {
      "emoji": "🦟",
      "title": "Mosquito pressure in mature wooded sections",
      "body": "Original Brook Highland sections sit under mature tree canopy — beautiful, and excellent mosquito harborage. 30-day yard barrier targets shaded resting zones (tree lines, shrub bases, gutters, north-facing walls). $45/treatment, March through November."
    },
    {
      "emoji": "🐾",
      "title": "Ticks on the wooded common areas",
      "body": "Brook Highland's wooded common areas and walking trails carry Lone Star and American dog ticks plus chiggers. Mosquito + Tick plan ($65/treatment) bundles mosquito + tick + chigger and is the right plan for most Brook Highland yards."
    },
    {
      "emoji": "🪵",
      "title": "Sentricon® on substantial Brook Highland homes",
      "body": "Significant homes, finished basements, complex foundation work, and substantial landscape integration mean drilling is off the table. Sentricon® Always Active™ in-ground bait stations protect the structure without disrupting any of it."
    },
    {
      "emoji": "🐜",
      "title": "Carpenter ants in older sections",
      "body": "Original Brook Highland homes with deep eaves and substantial wood detailing track moisture pathways carpenter ants use. Bi-monthly perimeter service ($35/mo) catches them at entry points."
    },
    {
      "emoji": "🕷️",
      "title": "Brown recluse in basements and garages",
      "body": "Walkout basements, climate-controlled storage, and garages in Brook Highland homes are exactly the undisturbed dark spaces brown recluse colonizes. Targeted interior service hits harborage zones, not just open floor space."
    },
    {
      "emoji": "🐀",
      "title": "Fall rodent migration on perimeter lots",
      "body": "Lots adjoining undeveloped acreage or wooded common areas see seasonal rodent migration in fall. Exterior bait station programs added to a standard pest plan keep the perimeter monitored without interior exposure."
    }
  ],
  "landmarksLabel": "Areas of Brook Highland We Serve",
  "landmarks": [
    "Brook Highland Drive",
    "Brook Highland Lane",
    "Brook Highland Trail",
    "Brook Highland Way",
    "Highway 280 corridor",
    "Eagle Point adjacent",
    "Meadow Brook adjacent",
    "Greystone nearby",
    "Highland Lakes nearby",
    "Inverness nearby",
    "Liberty Park nearby"
  ],
  "faqs": [
    {
      "q": "Do you service the older sections of Brook Highland differently than the newer ones?",
      "a": "The treatment products and schedule are the same, but the pest pressure pattern is different. Older sections have heavier carpenter-ant, brown-recluse, and tree-canopy mosquito pressure. Newer sections have more fire-ant pressure (graded clay) and the rodent migration that comes with construction proximity. Your technician adjusts the service plan to match."
    },
    {
      "q": "Will Sentricon® damage my landscape installation?",
      "a": "No. Bait stations are roughly two-inch diameter, sit flush with the soil, and tuck into bed lines or perimeter turf. They are nearly invisible. Zero drilling into foundations, hardscape, or finished surfaces."
    },
    {
      "q": "How does the Mosquito + Tick plan differ from mosquito-only?",
      "a": "Mosquito + Tick is $65 per treatment and covers mosquitoes + ticks + chiggers, all on the same 30-day cycle. For Brook Highland yards backing up to wooded common areas, the chigger and tick coverage is worth the difference — both are real summer issues here."
    },
    {
      "q": "What's the response time for a same-week call?",
      "a": "Most new-customer assessments are scheduled within the same week. Existing customers with an active service plan typically get urgent re-services within 24-48 hours. Call (205) 991-2882 for the current scheduling window."
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
    "phone": "(205) 991-2882",
    "phoneE164": "+12059912882",
    "address": "2120 16th Ave S, Ste 302 · Birmingham, AL 35205"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.envirocarellc.com/brook-highland",
      "name": "EnviroCare — Brook Highland",
      "url": "https://www.envirocarellc.com",
      "telephone": "+12059912882",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2120 16th Ave S, Ste 302",
        "addressLocality": "Birmingham",
        "addressRegion": "AL",
        "postalCode": "35205",
        "addressCountry": "US"
      },
      "areaServed": [
        {
          "@type": "Place",
          "name": "Brook Highland, AL (Hoover)"
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
      "description": "Family-owned pest, termite, mosquito and tick service for Brook Highland, Hoover. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958."
    },
    {
      "@type": "Service",
      "serviceType": "Pest Control",
      "provider": {
        "@type": "LocalBusiness",
        "name": "EnviroCare",
        "address": { "@type": "PostalAddress", "streetAddress": "2120 16th Ave S, Ste 302", "addressLocality": "Birmingham", "addressRegion": "AL", "postalCode": "35205", "addressCountry": "US" }
      },
      "areaServed": {
        "@type": "Place",
        "name": "Brook Highland, AL"
      },
      "name": "Pest Control Brook Highland",
      "description": "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M coverage, subject to the terms of the agreement), and seasonal mosquito and tick yard service for Brook Highland homes."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you service the older sections of Brook Highland differently than the newer ones?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The treatment products and schedule are the same, but the pest pressure pattern is different. Older sections have heavier carpenter-ant, brown-recluse, and tree-canopy mosquito pressure. Newer sections have more fire-ant pressure (graded clay) and the rodent migration that comes with construction proximity. Your technician adjusts the service plan to match."
          }
        },
        {
          "@type": "Question",
          "name": "Will Sentricon® damage my landscape installation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Bait stations are roughly two-inch diameter, sit flush with the soil, and tuck into bed lines or perimeter turf. They are nearly invisible. Zero drilling into foundations, hardscape, or finished surfaces."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Mosquito + Tick plan differ from mosquito-only?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mosquito + Tick is $65 per treatment and covers mosquitoes + ticks + chiggers, all on the same 30-day cycle. For Brook Highland yards backing up to wooded common areas, the chigger and tick coverage is worth the difference — both are real summer issues here."
          }
        },
        {
          "@type": "Question",
          "name": "What's the response time for a same-week call?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most new-customer assessments are scheduled within the same week. Existing customers with an active service plan typically get urgent re-services within 24-48 hours. Call (205) 991-2882 for the current scheduling window."
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
