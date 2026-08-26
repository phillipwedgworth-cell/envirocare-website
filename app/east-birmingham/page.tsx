// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/east-birmingham/page.tsx
// Commit: fix(content+compliance): fire ant $150/most yards + 1-yr warranty; Mosquito+Tick excludes fleas; remove 'safe' and 'same technician' claims
// Push: main
// ─────────────────────────────────────
import ClusterAreaPage, { type ClusterConfig } from '@/components/pages/ClusterAreaPage';

export const metadata = {
  alternates: { canonical: '/east-birmingham' },
  title: "East Birmingham Pest Control | EnviroCare",
  description: "Pest, termite & mosquito control across east Birmingham — Trussville, Leeds, Moody, Irondale. Family-owned since 1958. Call (205) 940-6360.",
  openGraph: {
    title: "East Birmingham Pest Control | EnviroCare",
    description: "Pest, termite & mosquito control across east Birmingham — Trussville, Leeds, Moody, Irondale. Family-owned since 1958. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/east-birmingham',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "East Birmingham Pest Control | EnviroCare",
    description: "Pest, termite & mosquito control across east Birmingham — Trussville, Leeds, Moody, Irondale. Family-owned since 1958. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

const cfg: ClusterConfig = {
  "slug": "east-birmingham",
  "name": "East Birmingham",
  "h1": "Pest Control in East Birmingham — Trussville, Leeds, Moody & Irondale",
  "intro": [
    "The east side of the metro runs from the historic Cahaba Project in Trussville to brand-new subdivisions in Moody — river corridors, railroad towns, and some of the metro's fastest growth. Every one of those conditions feeds a different pest problem.",
    "EnviroCare's east Birmingham routes cover this whole cluster with a familiar local team and the same four-pillar program: pest, termite, mosquito, and tick protection, family-owned since 1958."
  ],
  "pestAngle": "The Cahaba River and Little Cahaba corridors drive mosquito pressure, historic downtown foundations carry termites, and fresh east-metro construction imports fire ants with every pallet of sod.",
  "cities": [
    {
      "name": "Trussville",
      "href": "/trussville",
      "hook": "Cahaba Project history plus Carrington's new slabs — both need termite cover."
    },
    {
      "name": "Leeds",
      "href": "/leeds",
      "hook": "Little Cahaba river bottom and a historic downtown core."
    },
    {
      "name": "Moody",
      "href": "/moody",
      "hook": "Fast-growing I-20 corridor — protection from the slab up."
    },
    {
      "name": "Irondale",
      "href": "/irondale",
      "hook": "Ruffner Mountain's wooded edge sends pests toward the back fence."
    }
  ],
  "faqs": [
    {
      "q": "Do you have routes on the east side of Birmingham?",
      "a": "Yes — Trussville, Leeds, Moody, and Irondale are on our regular east Birmingham routes from our Birmingham office. Call (205) 940-6360 to confirm your address."
    },
    {
      "q": "How much does pest control cost in east Birmingham?",
      "a": "Our bi-monthly perimeter program is $35/month on ACH, or $70 per bi-monthly visit — 30+ pests covered, unlimited free re-services between visits. Monthly pricing uses a 12-month ACH billing agreement; per-visit terms are confirmed in writing before service starts."
    },
    {
      "q": "My east-metro home is new construction — do I need termite protection?",
      "a": "Especially then. New slabs sit on disturbed soil that subterranean termites find first. Starting Sentricon® early locks in protection — up to $1M coverage on qualifying homes, subject to the terms of the agreement."
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
      "name": "North Birmingham",
      "href": "/north-birmingham"
    }
  ]
};

export default function EastBirminghamPage() {
  return <ClusterAreaPage cfg={cfg} />;
}
