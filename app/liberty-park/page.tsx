import type { Metadata } from "next";
import NeighborhoodPage, { type NeighborhoodConfig } from "@/components/pages/NeighborhoodPage";

export const metadata: Metadata = {
  title: "Pest Control Liberty Park AL | EnviroCare Since 1958",
  description: "Family-owned pest, Sentricon® termite, and mosquito service for Liberty Park homes. No drilling, $1M coverage, two ways to pay. (205) 991-2882.",
  alternates: { canonical: "/liberty-park" },
  openGraph: {
    title: "Pest Control Liberty Park AL | EnviroCare Since 1958",
    description: "Family-owned pest, Sentricon® termite, and mosquito service for Liberty Park homes. No drilling, $1M termite coverage, two ways to pay. Call (205) 991-2882.",
    url: "https://www.envirocarellc.com/liberty-park",
    type: "website",
  },
};

const cfg: NeighborhoodConfig = {
  "name": "Liberty Park",
  "parentCity": "Vestavia Hills",
  "zipCodes": "35242",
  "heroTagline": "Liberty Park's family-owned choice for Sentricon® termite and pest control",
  "heroIntro": "Bi-monthly perimeter service, no-drilling Sentricon® termite protection, and seasonal mosquito and tick treatment for every home behind the gates. Same Wedgworth-family standard since 1958.",
  "pressureHeadline": "Liberty Park's wooded perimeter and Cahaba-adjacent setting drive year-round mosquito, tick, and termite pressure.",
  "pressureSubhead": "The six service patterns we run most behind the Liberty Park gates.",
  "pressureCards": [
    {
      "emoji": "🪵",
      "title": "Sentricon® for Liberty Park homes",
      "body": "These are the homes Sentricon® was built for — brick, stone, and custom foundation work that nobody wants drilled into. In-ground bait stations around the perimeter, no holes, no disruption to landscape. Up to $1M EnviroCare-backed damage coverage on qualifying homes, subject to the terms of the agreement."
    },
    {
      "emoji": "🦟",
      "title": "Mosquito pressure from the Cahaba corridor",
      "body": "Liberty Park's eastern edge runs toward the Cahaba River drainage. 30-day yard barrier targets harborage zones — tree lines, ornamental shrubs, mulched beds, and shaded back-of-house areas. $45/treatment, March through November."
    },
    {
      "emoji": "🐾",
      "title": "Ticks on the wooded common areas",
      "body": "The trails, ponds, and wooded amenity spaces inside the community carry Lone Star and American dog ticks. Mosquito + Tick plan at $65/treatment bundles mosquito + tick + chigger — the actual biting trio you deal with on a Liberty Park yard."
    },
    {
      "emoji": "🐜",
      "title": "Carpenter ants & sugar ants in custom construction",
      "body": "Newer custom homes with extensive wood detailing, deep eaves, and substantial landscape integration give carpenter ants exactly what they want. Bi-monthly perimeter pest control ($35/mo) intercepts ant trails at entry points and treats the harborage."
    },
    {
      "emoji": "🕷️",
      "title": "Brown recluse in storage spaces",
      "body": "Larger Liberty Park homes mean larger basements, attics, climate-controlled storage rooms, and garages — the exact undisturbed dark spaces brown recluse colonizes. Interior service on a quarterly schedule targets cracks, voids, and harborage."
    },
    {
      "emoji": "🔥",
      "title": "Fire ants on graded lots",
      "body": "Lots that have been graded for new construction or recent landscape work are fire ant magnets. Whole-yard fire ant treatment ($150 minimum, priced by yard size) is a separate service — available to any Liberty Park homeowner, not just existing pest customers."
    }
  ],
  "landmarksLabel": "Areas of Liberty Park We Serve",
  "landmarks": [
    "Liberty Crest",
    "Liberty Park Joy",
    "The Cottages",
    "Liberty Park Estates",
    "Liberty Park Cove",
    "Park Crest",
    "Park Lake",
    "Indian Crest",
    "Hilltop",
    "Brook Highland adjacent",
    "Overton Road corridor",
    "Liberty Parkway"
  ],
  "faqs": [
    {
      "q": "Do you service homes inside the Liberty Park gates?",
      "a": "Yes. We've served Liberty Park homeowners for years and our Birmingham technicians are familiar with the community's gate access procedures, the architecture mix (custom builds, larger Estates homes, the Cottages), and the wooded perimeter that drives most of the mosquito and tick pressure inside."
    },
    {
      "q": "Will Sentricon® damage my landscape or hardscape?",
      "a": "No. The bait stations are roughly two inches in diameter, sit flush with the soil, and tuck into bed lines or perimeter turf — invisible from the curb. There is zero drilling into foundations, brick, stone, or finished surfaces. Many Liberty Park homes have valuable landscape installations and this is exactly why we use Sentricon® rather than older liquid termiticide approaches."
    },
    {
      "q": "How does the $1 million termite coverage actually work?",
      "a": "On qualifying homes, EnviroCare carries the damage-coverage commitment directly. If active termite damage occurs to the protected structure during the active service period, EnviroCare covers repair up to $1M. This is EnviroCare's own coverage, not a manufacturer's — and it's the reason we are picky about installation standards and annual re-inspection."
    },
    {
      "q": "What does mosquito service for a typical Liberty Park yard cost?",
      "a": "Mosquito-only treatment is $45 per service, applied monthly March through November (9 treatments per year, averaging ~$33.75/month). For most Liberty Park homes the Mosquito + Tick plan at $65/treatment is a better fit because it bundles tick and chigger coverage — both are real concerns on the wooded perimeter."
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
      "@id": "https://www.envirocarellc.com/liberty-park",
      "name": "EnviroCare — Liberty Park",
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
          "name": "Liberty Park, AL (Vestavia Hills)"
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
      "description": "Family-owned pest, termite, mosquito and tick service for Liberty Park, Vestavia Hills. Sentricon® Certified Specialist. EPA-registered products applied to label directions. Wedgworth family, fourth generation since 1958."
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
        "name": "Liberty Park, AL"
      },
      "name": "Pest Control Liberty Park",
      "description": "Bi-monthly perimeter pest control, Sentricon® termite protection (no drilling, up to $1M coverage), and seasonal mosquito and tick yard service for Liberty Park homes."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you service homes inside the Liberty Park gates?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We've served Liberty Park homeowners for years and our Birmingham technicians are familiar with the community's gate access procedures, the architecture mix (custom builds, larger Estates homes, the Cottages), and the wooded perimeter that drives most of the mosquito and tick pressure inside."
          }
        },
        {
          "@type": "Question",
          "name": "Will Sentricon® damage my landscape or hardscape?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The bait stations are roughly two inches in diameter, sit flush with the soil, and tuck into bed lines or perimeter turf — invisible from the curb. There is zero drilling into foundations, brick, stone, or finished surfaces. Many Liberty Park homes have valuable landscape installations and this is exactly why we use Sentricon® rather than older liquid termiticide approaches."
          }
        },
        {
          "@type": "Question",
          "name": "How does the $1 million termite coverage actually work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "On qualifying homes, EnviroCare carries the damage-coverage commitment directly. If active termite damage occurs to the protected structure during the active service period, EnviroCare covers repair up to $1M. This is EnviroCare's own coverage, not a manufacturer's — and it's the reason we are picky about installation standards and annual re-inspection."
          }
        },
        {
          "@type": "Question",
          "name": "What does mosquito service for a typical Liberty Park yard cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mosquito-only treatment is $45 per service, applied monthly March through November (9 treatments per year, averaging ~$33.75/month). For most Liberty Park homes the Mosquito + Tick plan at $65/treatment is a better fit because it bundles tick and chigger coverage — both are real concerns on the wooded perimeter."
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
