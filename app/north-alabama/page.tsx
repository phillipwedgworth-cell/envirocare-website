import ClusterAreaPage, { type ClusterConfig } from '@/components/pages/ClusterAreaPage';

export const metadata = {
  alternates: { canonical: '/north-alabama' },
  title: "North Alabama Pest Control — Huntsville, Madison, Athens | EnviroCare",
  description: "Pest, termite & mosquito control across North Alabama — Huntsville, Madison, Athens, Decatur, Hartselle and the Tennessee Valley. Family-owned since 1958. Call (256) 937-7676.",
};

const cfg: ClusterConfig = {
  "slug": "north-alabama",
  "name": "North Alabama",
  "h1": "Pest Control Across North Alabama — Huntsville, Madison & Athens",
  "intro": [
    "The Tennessee Valley is growing faster than almost anywhere in Alabama — new subdivisions from Madison to Meridianville, established neighborhoods in Huntsville and Athens, and river-valley humidity that keeps pests working most of the year.",
    "EnviroCare's Huntsville office covers the whole region with the same four-pillar program we run statewide: pest, termite, mosquito, and tick protection — one local technician, one invoice, family-owned since 1958."
  ],
  "pestAngle": "Tennessee Valley moisture drives the pressure here: subterranean termites in both new slabs and established crawlspaces, mosquitoes off the river drainages, and fire ants riding in on every pallet of new sod.",
  "cities": [
    {
      "name": "Huntsville",
      "href": "/huntsville",
      "hook": "The North Alabama anchor — from Five Points to Research Park."
    },
    {
      "name": "Madison",
      "href": "/service-areas/madison",
      "hook": "Fast-growing subdivisions protected from the slab up."
    },
    {
      "name": "Athens",
      "href": "/athens",
      "hook": "Limestone County's historic homes and new growth alike."
    },
    {
      "name": "Decatur",
      "href": "/decatur",
      "hook": "River-city moisture means river-city termite pressure."
    },
    {
      "name": "Hartselle",
      "href": "/hartselle",
      "hook": "Morgan County routes with the same Huntsville crew."
    },
    {
      "name": "Harvest",
      "href": "/harvest",
      "hook": "New construction on former farmland — fire ant country."
    },
    {
      "name": "Meridianville",
      "href": "/meridianville",
      "hook": "North Madison County's fastest-growing corridor."
    },
    {
      "name": "Hampton Cove",
      "href": "/hampton-cove",
      "hook": "Premium wooded properties east of the mountain."
    },
    {
      "name": "Redstone Arsenal",
      "href": "/service-areas/redstone-arsenal",
      "hook": "Serving the Arsenal workforce's neighborhoods."
    }
  ],
  "faqs": [
    {
      "q": "Which North Alabama cities do you serve?",
      "a": "Huntsville, Madison, Athens, Decatur, Hartselle, Harvest, Meridianville, Hampton Cove and the surrounding Tennessee Valley communities — all from our Huntsville office at 7027 Old Madison Pike. Call (256) 937-7676 to confirm your address."
    },
    {
      "q": "How much does pest control cost in the Huntsville area?",
      "a": "Our bi-monthly perimeter program is $35/month on ACH, or $70 per bi-monthly visit — 30+ pests covered, unlimited free re-services between visits. No contract — cancel anytime."
    },
    {
      "q": "My home is new construction — do I need termite protection?",
      "a": "Especially then. New slabs sit on disturbed soil that subterranean termites find first, and North Alabama's growth means a lot of disturbed soil. Starting Sentricon® early locks in protection — up to $1M coverage on qualifying homes."
    },
    {
      "q": "When does mosquito season run in the Tennessee Valley?",
      "a": "The 30-day yard barrier runs March through November. Tick control bundles in via the $65/visit Mosquito + Tick plan."
    }
  ],
  "nearbyClusters": [
    {
      "name": "Birmingham Metro",
      "href": "/service-areas"
    },
    {
      "name": "Lake Martin & East Alabama",
      "href": "/lake-martin-area"
    }
  ],
  "office": {
    "name": "Huntsville",
    "phone": "(256) 937-7676",
    "tel": "2569377676",
    "street": "7027 Old Madison Pike, Ste 108",
    "cityStateZip": "Huntsville, AL 35806"
  }
};

export default function NorthAlabamaPage() {
  return <ClusterAreaPage cfg={cfg} />;
}
