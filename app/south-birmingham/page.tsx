// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/south-birmingham/page.tsx
// Commit: fix(content+compliance): fire ant $150/most yards + 1-yr warranty; Mosquito+Tick excludes fleas; remove 'safe' and 'same technician' claims
// Push: main
// ─────────────────────────────────────
import ClusterAreaPage, { type ClusterConfig } from '@/components/pages/ClusterAreaPage';

export const metadata = {
  alternates: { canonical: '/south-birmingham' },
  title: "South Birmingham Pest Control | EnviroCare",
  description: "Pest, termite & mosquito control across south Birmingham — Alabaster, Pelham, Helena, Calera, Chelsea. Home of our metro hub. Call (205) 940-6360.",
  openGraph: {
    title: "South Birmingham Pest Control | EnviroCare",
    description: "Pest, termite & mosquito control across south Birmingham — Alabaster, Pelham, Helena, Calera, Chelsea. Home of our metro hub. Call (205) 940-6360.",
    url: 'https://www.envirocarellc.com/south-birmingham',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "South Birmingham Pest Control | EnviroCare",
    description: "Pest, termite & mosquito control across south Birmingham — Alabaster, Pelham, Helena, Calera, Chelsea. Home of our metro hub. Call (205) 940-6360.",
    images: ['/og-image.png'],
  },
};

const cfg: ClusterConfig = {
  "slug": "south-birmingham",
  "name": "South Birmingham",
  "h1": "Pest Control in South Birmingham — Alabaster, Pelham, Helena & Calera",
  "intro": [
    "South of the metro is home turf: our Birmingham-metro hub sits at 2025 Butler Rd in Alabaster, and every route in this cluster starts minutes from your door. That means the tightest scheduling windows and fastest re-service in our entire footprint.",
    "Shelby County's mix — creek bottoms, older downtowns, and some of Alabama's fastest new construction — keeps termites, fire ants, and mosquitoes busy year-round. We've been the local answer since 1958."
  ],
  "pestAngle": "Creek-fed mosquito pressure (Buck Creek, Cahaba tributaries), new-construction termite risk on freshly graded lots, and fire ants in new sod define south-metro pest work.",
  "cities": [
    {
      "name": "Alabaster",
      "href": "/alabaster",
      "hook": "Home base — routes leave Butler Rd every morning."
    },
    {
      "name": "Pelham",
      "href": "/pelham",
      "hook": "Oak Mountain's wooded edge brings tick and rodent pressure to the back fence."
    },
    {
      "name": "Helena",
      "href": "/helena",
      "hook": "Buck Creek and Old Town charm — with the crawlspaces to match."
    },
    {
      "name": "Calera",
      "href": "/calera",
      "hook": "Fast-growing new construction protected from the slab up."
    },
    {
      "name": "Chelsea",
      "href": "/chelsea",
      "hook": "Rolling hills and new builds — pre-treat Sentricon® country."
    },
    {
      "name": "Indian Springs",
      "href": "/indian-springs",
      "hook": "Wooded estate lots with deep-shade mosquito harborage."
    }
  ],
  "faqs": [
    {
      "q": "Is EnviroCare actually based in south Birmingham?",
      "a": "Yes — our Birmingham-metro office is at 2025 Butler Rd in Alabaster, staffed daily. South-metro addresses get the fastest response in our footprint because every route starts here."
    },
    {
      "q": "How much does pest control cost in the south metro?",
      "a": "Our bi-monthly perimeter program is $35/month on ACH, or $70 per bi-monthly visit — 30+ pests covered, unlimited free re-services between visits. Monthly pricing uses a 12-month ACH billing agreement; per-visit terms are confirmed in writing before service starts."
    },
    {
      "q": "Do you pre-treat new construction in Calera and Chelsea?",
      "a": "Yes. We work with builders on Sentricon® and termite pre-treatment, with up to $1M in damage coverage on qualifying homes, subject to the terms of the agreement."
    },
    {
      "q": "What about fire ants?",
      "a": "Whole-colony fire ant treatment is available to anyone — $150 covers most yards, larger properties quoted by size, backed by a one-year warranty."
    }
  ],
  "nearbyClusters": [
    {
      "name": "Over the Mountain",
      "href": "/over-the-mountain"
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

export default function SouthBirminghamPage() {
  return <ClusterAreaPage cfg={cfg} />;
}
