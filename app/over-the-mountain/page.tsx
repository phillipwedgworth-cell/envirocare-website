import ClusterAreaPage, { type ClusterConfig } from '@/components/pages/ClusterAreaPage';

export const metadata = {
  alternates: { canonical: '/over-the-mountain' },
  title: "Over the Mountain Pest Control | EnviroCare",
  description: "Pest, termite & mosquito control for Over the Mountain homes — Vestavia Hills, Mountain Brook, Homewood, Hoover. Family-owned since 1958. Call (205) 940-6360.",
};

const cfg: ClusterConfig = {
  "slug": "over-the-mountain",
  "name": "Over the Mountain",
  "h1": "Pest Control Over the Mountain — Vestavia Hills, Mountain Brook, Homewood & Hoover",
  "intro": [
    "The Over the Mountain communities carry some of the Birmingham metro's most established homes — mature trees, older masonry, wooded ridgeline lots, and landscaping worth protecting. That combination is exactly what termites, mosquitoes, and carpenter ants work hardest on.",
    "EnviroCare has served these neighborhoods since our Birmingham expansion in 2002. Our technicians run Over the Mountain routes daily — the same tech, the same four-pillar program (pest, termite, mosquito, tick) on every visit."
  ],
  "pestAngle": "Established homes, deep shade, and ridgeline woods make Over the Mountain the metro's highest-pressure zone for termites in old masonry and mosquitoes in shaded yards.",
  "cities": [
    {
      "name": "Vestavia Hills",
      "href": "/vestavia-hills",
      "hook": "Ridgeline lots and mature canopy — classic termite and mosquito country."
    },
    {
      "name": "Mountain Brook",
      "href": "/mountain-brook",
      "hook": "Historic homes and wooded estates protected without drilling into original masonry."
    },
    {
      "name": "Homewood",
      "href": "/homewood",
      "hook": "Bungalow crawlspaces and Shades Creek mosquito pressure, handled bi-monthly."
    },
    {
      "name": "Hoover",
      "href": "/hoover",
      "hook": "From Bluff Park to Ross Bridge — established streets and new construction alike."
    },
    {
      "name": "Liberty Park",
      "href": "/liberty-park",
      "hook": "Gated community service with wooded-edge tick and mosquito programs."
    },
    {
      "name": "Cherokee Bend",
      "href": "/cherokee-bend",
      "hook": "Mountain Brook's wooded east side — deep-shade mosquito harborage."
    },
    {
      "name": "Inverness",
      "href": "/inverness",
      "hook": "Lake Heather and the US-280 corridor — established homes, ponds, and year-round pressure."
    },
    {
      "name": "Cahaba Heights",
      "href": "/cahaba-heights",
      "hook": "The walkable village between Mountain Brook and 280 — original ranches and new rebuilds alike."
    },
    {
      "name": "Ross Bridge",
      "href": "/ross-bridge",
      "hook": "Hoover's resort community — lakes, golf, and newer homes on graded ground."
    },
    {
      "name": "Ballantrae",
      "href": "/ballantrae",
      "hook": "The Ballantrae golf community in Pelham — Oak Mountain tick pressure at the fairway edge."
    },
    {
      "name": "Chelsea Park",
      "href": "/chelsea-park",
      "hook": "The 280-corridor's master-planned community — new construction and community lakes."
    }
  ],
  "faqs": [
    {
      "q": "Do you serve all the Over the Mountain suburbs?",
      "a": "Yes — Vestavia Hills, Mountain Brook, Homewood, Hoover and their neighborhoods are on our daily Birmingham-metro routes from the Alabaster office. Call (205) 940-6360 and we'll confirm your address."
    },
    {
      "q": "Can you treat termites in an older home without drilling?",
      "a": "Yes. Sentricon® Always Active™ uses in-ground bait stations — no drilling into historic masonry, no tank trucks — with up to $1M in damage coverage on qualifying homes. The inspection is free."
    },
    {
      "q": "How much does pest control cost Over the Mountain?",
      "a": "Our bi-monthly perimeter program is $35/month on ACH, or $70 per bi-monthly visit — 30+ pests covered, unlimited free re-services between visits. No long-term contract when paying per visit; monthly pricing uses a 12-month ACH billing agreement."
    },
    {
      "q": "When does mosquito season run here?",
      "a": "The 30-day yard barrier runs March through November — shaded Over the Mountain yards are exactly where it earns its keep. Tick control bundles in via the $65/visit Mosquito + Tick plan."
    }
  ],
  "nearbyClusters": [
    {
      "name": "South Birmingham",
      "href": "/south-birmingham"
    },
    {
      "name": "East Birmingham",
      "href": "/east-birmingham"
    },
    {
      "name": "North Birmingham",
      "href": "/north-birmingham"
    }
  ]
};

export default function OverTheMountainPage() {
  return <ClusterAreaPage cfg={cfg} />;
}
