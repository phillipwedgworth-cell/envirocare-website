import ClusterAreaPage, { type ClusterConfig } from '@/components/pages/ClusterAreaPage';

export const metadata = {
  alternates: { canonical: '/lake-martin-area' },
  title: "Lake Martin Area Pest Control | EnviroCare",
  description: "Pest, termite & mosquito control around Lake Martin — Alexander City, Dadeville, Eclectic, Auburn & Opelika. The original 1958 office. (256) 234-6162.",
};

const cfg: ClusterConfig = {
  "slug": "lake-martin-area",
  "name": "Lake Martin & East Alabama",
  "h1": "Pest Control Around Lake Martin — Alexander City, Dadeville & East Alabama",
  "intro": [
    "This is where it all started: the Wedgworth family opened the Alexander City office in 1958, and four generations later the same family still runs the routes around Lake Martin — from downtown Alex City to the waterfront communities at Willow Point, The Ridge, StillWaters, and The Heritage.",
    "Waterfront homes get a program built for the lake: no-drill Sentricon® termite protection with the free inspection covering the home, crawlspace, dock, pier, and boathouse, plus the 30-day mosquito barrier suited to shoreline living.",
    "The same crew runs east to Auburn and Opelika — Lee County homes get the identical family-owned service, with a direct Auburn line at (334) 332-3321."
  ],
  "pestAngle": "Lake moisture drives everything here: shoreline mosquito pressure March through November, termites in damp waterfront soil, fire ants in sandy lake lots, and ticks along the wooded edges.",
  "cities": [
    {
      "name": "Alexander City",
      "href": "/alexander-city",
      "hook": "The original 1958 office — neighbors still know us as Wedgworth Pest Control."
    },
    {
      "name": "Lake Martin",
      "href": "/lake-martin",
      "hook": "Waterfront protection — dock, pier, and boathouse included in the free inspection."
    },
    {
      "name": "Dadeville",
      "href": "/dadeville",
      "hook": "East-shore routes covering downtown and StillWaters."
    },
    {
      "name": "Willow Point",
      "href": "/willow-point",
      "hook": "Golf-and-lake community service, fairway to shoreline."
    },
    {
      "name": "The Ridge",
      "href": "/the-ridge",
      "hook": "Deep-water frontage and wooded ridgeline lots."
    },
    {
      "name": "StillWaters",
      "href": "/stillwaters",
      "hook": "Gated golf-and-marina community on the east shore."
    },
    {
      "name": "The Heritage",
      "href": "/the-heritage",
      "hook": "New lakefront construction protected from the slab up."
    },
    {
      "name": "Eclectic",
      "href": "/eclectic",
      "hook": "South-shore routes on the Elmore County side."
    },
    {
      "name": "Sylacauga",
      "href": "/sylacauga",
      "hook": "Marble City homes on the Talladega County routes."
    },
    {
      "name": "Auburn",
      "href": "/auburn",
      "hook": "Direct local line (334) 332-3321 — Lee County's family-owned option."
    },
    {
      "name": "Opelika",
      "href": "/opelika",
      "hook": "Same Auburn crew, same direct line, all of Lee County."
    }
  ],
  "faqs": [
    {
      "q": "Do you really cover both Lake Martin and Auburn?",
      "a": "Yes — both run from our Alexander City office. Lake Martin communities are our home water since 1958, and the same crew serves Auburn and Opelika with a direct local line: (334) 332-3321."
    },
    {
      "q": "How much does pest control cost around Lake Martin?",
      "a": "Our bi-monthly perimeter program is $35/month on ACH, or $70 per bi-monthly visit — 30+ pests covered, unlimited free re-services between visits. No long-term contract when paying per visit; monthly pricing uses a 12-month ACH billing agreement."
    },
    {
      "q": "Can you protect a lakefront home from termites without drilling?",
      "a": "Yes. Sentricon® Always Active™ uses in-ground bait stations — no drilling, no trenching, no tank trucks — with up to $1M coverage on qualifying homes. The free inspection covers the home, crawlspace, dock, pier, and boathouse."
    },
    {
      "q": "Do you service the gated lake communities?",
      "a": "Yes — our local techs serve Willow Point, The Ridge, StillWaters, and The Heritage regularly and know the gate procedures. Call (256) 234-6162 to confirm scheduling for your home."
    },
    {
      "q": "Is EnviroCare the same as Wedgworth Pest Control?",
      "a": "Yes. EnviroCare is the Wedgworth family's pest control company — the same family serving Alexander City and Lake Martin since 1958. The name on the truck is EnviroCare, but it's the same family and the same number: (256) 234-6162."
    }
  ],
  "nearbyClusters": [
    {
      "name": "Birmingham Metro",
      "href": "/service-areas"
    },
    {
      "name": "North Alabama",
      "href": "/north-alabama"
    }
  ],
  "office": {
    "name": "Alexander City",
    "phone": "(256) 234-6162",
    "tel": "2562346162",
    "street": "1785 Tallapoosa St",
    "cityStateZip": "Alexander City, AL 35010"
  }
};

export default function LakeMartinAreaPage() {
  return <ClusterAreaPage cfg={cfg} />;
}
