import ClusterAreaPage, { type ClusterConfig } from '@/components/pages/ClusterAreaPage';

export const metadata = {
  alternates: { canonical: '/north-birmingham' },
  title: "North Birmingham Pest Control — Gardendale, Fultondale | EnviroCare",
  description: "Pest, termite & mosquito control across north Birmingham — Gardendale, Fultondale and north Jefferson County. Family-owned since 1958. Call (205) 940-6360.",
};

const cfg: ClusterConfig = {
  "slug": "north-birmingham",
  "name": "North Birmingham",
  "h1": "Pest Control in North Birmingham — Gardendale & Fultondale",
  "intro": [
    "North Jefferson County pairs established neighborhoods with wooded hills and creek bottoms — Black Creek through Fultondale, mature lots off Fieldstown Road in Gardendale. Steady moisture and steady woods mean steady pests.",
    "EnviroCare's north Birmingham routes cover the cluster with the same four-pillar protection we run across the metro: pest, termite, mosquito, and tick — family-owned since 1958."
  ],
  "pestAngle": "Creek-bottom moisture (Black Creek), mature-tree termite pressure, and wooded-edge rodent migration define north-metro pest work.",
  "cities": [
    {
      "name": "Gardendale",
      "href": "/gardendale",
      "hook": "Mature lots and growing subdivisions off Fieldstown Road."
    },
    {
      "name": "Fultondale",
      "href": "/fultondale",
      "hook": "Black Creek drainage and rebuilt newer homes — both covered."
    },
    {
      "name": "Birmingham",
      "href": "/birmingham",
      "hook": "The metro authority page — every downtown and city neighborhood."
    }
  ],
  "faqs": [
    {
      "q": "Do you serve north Jefferson County?",
      "a": "Yes — Gardendale, Fultondale, and the surrounding north Jefferson communities are on our regular north Birmingham routes. Call (205) 940-6360 to confirm your address."
    },
    {
      "q": "How much does pest control cost in north Birmingham?",
      "a": "Our bi-monthly perimeter program is $35/month on ACH, or $70 per bi-monthly visit — 30+ pests covered, unlimited free re-services between visits. No long-term contract when paying per visit; monthly pricing uses a 12-month ACH billing agreement."
    },
    {
      "q": "Do you handle rodents near the wooded hills?",
      "a": "Yes — exterior bait station programs keep the perimeter monitored without interior exposure, added to a standard pest plan."
    }
  ],
  "nearbyClusters": [
    {
      "name": "Over the Mountain",
      "href": "/over-the-mountain"
    },
    {
      "name": "South Birmingham",
      "href": "/south-birmingham"
    },
    {
      "name": "East Birmingham",
      "href": "/east-birmingham"
    }
  ]
};

export default function NorthBirminghamPage() {
  return <ClusterAreaPage cfg={cfg} />;
}
