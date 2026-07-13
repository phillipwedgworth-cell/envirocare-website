import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Eagle Point AL | EnviroCare Since 1958",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for Eagle Point homes. No drilling, $1M coverage, no long-term contracts. Call (205) 940-6360.",
  alternates: { canonical: "/eagle-point" },
  openGraph: {
    title: "Pest Control Eagle Point AL | EnviroCare Since 1958",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for Eagle Point homes. No drilling, $1M coverage, no long-term contracts. Call (205) 940-6360.",
    url: "https://www.envirocarellc.com/eagle-point",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  "name": "Eagle Point",
  "parentCity": "Hoover",
  "zipCodes": "35242",
  "heroTagline": "Eagle Point's family-owned pest, termite, and mosquito service",
  "heroIntro": "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal Mosquito + Tick mosquito + tick treatment for every Eagle Point home — including the wooded perimeter lots and the lakeside section.",
  "pressureHeadline": "Eagle Point's lake, wooded common areas, and golf-adjacent lots make for serious year-round pest pressure.",
  "pressureSubhead": "The six programs we run most on Eagle Point properties.",
  "pressureCards": [
    {
      "emoji": "⛳",
      "title": "Golf-adjacent mosquito pressure",
      "body": "Lots adjacent to the Eagle Point golf course see consistent mosquito pressure — the irrigation, water features, and adjacent wooded areas keep populations active. 30-day yard barrier targets harborage zones; most golf-adjacent yards see noticeable improvement within two cycles."
    },
    {
      "emoji": "🐾",
      "title": "Ticks on wooded perimeter lots",
      "body": "Eagle Point properties backing up to wooded common areas carry Lone Star and American dog ticks. The Mosquito + Tick plan ($65/treatment) bundles mosquito + tick + chigger — the actual biting trio you deal with from May through October."
    },
    {
      "emoji": "🪵",
      "title": "Sentricon® on Eagle Point homes",
      "body": "Substantial homes, finished basements, and significant brick/stone work mean drilling for termite treatment is a non-starter. Sentricon® Always Active™ in-ground bait stations protect the structure without disrupting any of it. Up to $1M in EnviroCare-backed damage coverage on qualifying homes."
    },
    {
      "emoji": "🐜",
      "title": "Carpenter ants in custom construction",
      "body": "Custom Eagle Point homes with deep eaves, substantial wood detail, and integrated landscape give carpenter ants ideal conditions. Bi-monthly perimeter pest control ($35/mo) handles carpenter ants, sugar ants, pavement ants, and 30+ other Alabama pests."
    },
    {
      "emoji": "💧",
      "title": "Lakeside spider and mosquito pressure",
      "body": "Eagle Point's lake section has the same lakefront dynamic as Highland Lakes — increased mosquito and harborage pressure plus increased spider activity around dock and boathouse structures. Combined service rotations work best here."
    },
    {
      "emoji": "🔥",
      "title": "Fire ants on graded lots",
      "body": "Newer Eagle Point construction sits on graded clay that fire ants colonize aggressively. Whole-yard fire ant treatment ($150 minimum, priced by yard size) is a separate service available to any Eagle Point homeowner."
    }
  ],
  "landmarksLabel": "Areas of Eagle Point We Serve",
  "landmarks": [
    "Eagle Point Drive",
    "Eagle Point Trail",
    "Eagle Point Lake",
    "Eagle Point Country Club",
    "Eagle Point Way",
    "Highway 280 corridor",
    "Inverness adjacent",
    "Brook Highland adjacent",
    "Meadow Brook adjacent",
    "Greystone nearby",
    "Highland Lakes nearby"
  ],
  "faqs": [
    {
      "q": "Do you service homes adjacent to the Eagle Point golf course?",
      "a": "Yes — golf-adjacent yards are some of our most common Eagle Point service routes. The combination of course irrigation, water features, and adjacent wooded areas creates consistent mosquito pressure that the 30-day yard barrier addresses well."
    },
    {
      "q": "Will Sentricon® work on an Eagle Point home with a finished basement?",
      "a": "Yes. The in-ground bait stations install at perimeter grade level around the structure regardless of foundation type. No drilling into the slab, walls, or finished surfaces. The system protects the entire structure including the lower level."
    },
    {
      "q": "How fast will I see mosquito improvement?",
      "a": "Most Eagle Point yards see a noticeable drop in adult mosquito activity within the first 30-day cycle. Heavier pressure (lake-adjacent or wooded-perimeter properties) typically takes two cycles for the full effect. Service runs March through November."
    },
    {
      "q": "Can you handle commercial pest control for the Eagle Point clubhouse or pro shop?",
      "a": "We service commercial properties throughout the Birmingham metro. For specific clubhouse, pro shop, or HOA facility contracts, call (205) 940-6360 to schedule a commercial walkthrough — pricing is by facility size and service frequency."
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
      "@id": "https://www.envirocarellc.com/eagle-point",
      "name": "EnviroCare Pest & Termite Services — Eagle Point",
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
          "name": "Eagle Point, AL (Hoover)"
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
      "description": "Family-owned pest, termite, mosquito and tick service for Eagle Point, Hoover. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958."
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
        "name": "Eagle Point, AL"
      },
      "name": "Pest Control Eagle Point",
      "description": "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M coverage), and seasonal mosquito and tick yard service for Eagle Point homes."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you service homes adjacent to the Eagle Point golf course?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — golf-adjacent yards are some of our most common Eagle Point service routes. The combination of course irrigation, water features, and adjacent wooded areas creates consistent mosquito pressure that the 30-day yard barrier addresses well."
          }
        },
        {
          "@type": "Question",
          "name": "Will Sentricon® work on an Eagle Point home with a finished basement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The in-ground bait stations install at perimeter grade level around the structure regardless of foundation type. No drilling into the slab, walls, or finished surfaces. The system protects the entire structure including the lower level."
          }
        },
        {
          "@type": "Question",
          "name": "How fast will I see mosquito improvement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most Eagle Point yards see a noticeable drop in adult mosquito activity within the first 30-day cycle. Heavier pressure (lake-adjacent or wooded-perimeter properties) typically takes two cycles for the full effect. Service runs March through November."
          }
        },
        {
          "@type": "Question",
          "name": "Can you handle commercial pest control for the Eagle Point clubhouse or pro shop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We service commercial properties throughout the Birmingham metro. For specific clubhouse, pro shop, or HOA facility contracts, call (205) 940-6360 to schedule a commercial walkthrough — pricing is by facility size and service frequency."
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
