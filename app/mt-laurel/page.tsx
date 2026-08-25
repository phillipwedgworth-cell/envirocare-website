import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Mt Laurel AL | Termite, Mosquito & Tick — Since 1958",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service in Mt Laurel AL — Mt Laurel Village, Dunnavant Valley. From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/mt-laurel" },
  openGraph: {
    images: ["/og/og-mt-laurel.png"],
    title: "Pest Control Mt Laurel AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service for Mt Laurel's wooded village. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/mt-laurel",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Mt Laurel",
  slug: "mt-laurel",
  badge: "Mt Laurel · Shelby County · Since 1958",
  zip: "35242",
  neighborhoods: ["Mt Laurel Village", "Dunnavant Valley"],
  heroIntro:
    "Considerate pest and termite care for Mt Laurel's wooded, nature-minded village and the Dunnavant Valley. No-drill Sentricon®, a 30-day mosquito and tick barrier built for woodland lots, and the bi-monthly perimeter program.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in Mt Laurel, Alabama, including Mt Laurel Village and Dunnavant Valley. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling and up to $1,000,000 in property coverage, subject to the terms of the agreement. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Mt Laurel's preserved woodland and foothill setting puts mosquitoes, ticks, and termites right against the property line.",
  whySub: "The patterns we treat most across Mt Laurel Village and Dunnavant Valley.",
  pressureCards: [
    { emoji: "🐾", title: "Ticks straight off the woods", body: "Mt Laurel's preserved woodland and foothill setting bring deer, ticks, and heavy tick pressure right to the property line. We treat the wooded edges and transition zones where ticks quest — bundled with mosquito in the Mosquito + Tick plan." },
    { emoji: "🦟", title: "Mosquitoes in Dunnavant Valley", body: "Shaded valley lots and creek drainage keep mosquito pressure high March through November. The 30-day yard barrier keeps trails, porches, and play areas usable through the season." },
    { emoji: "🪵", title: "Termites in moist, wooded soil", body: "The shaded, damp soil around Mt Laurel keeps Eastern subterranean termites active. Sentricon® protects without drilling, with up to $1,000,000 in coverage subject to the terms of the agreement." },
    { emoji: "🐜", title: "Carpenter ants from the tree line", body: "Wooded lots send carpenter and odorous house ants into fascia, soffit, and trim. Bi-monthly exterior service covers the whole nuisance-ant family year-round." },
    { emoji: "🕷️", title: "Spiders & the everyday 30+", body: "Garages, porches, and stone foundations in the Village harbor spiders and seasonal invaders. All are covered under the bi-monthly perimeter program with unlimited re-service." },
  ],
  services: [
    { title: "Termite Treatment in Mt Laurel", body: (<>The damp, wooded soil around Mt Laurel keeps subterranean termites active year-round. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link> — no drilling into your foundation or slab. Sentricon® is priced after a free on-site WDO inspection — with coverage up to $1,000,000 subject to the terms of the agreement.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Tick Control in Mt Laurel", body: (<>Homes carved into deep forest sit right against tick habitat. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with surrounding habitat.</>) },
    { title: "Mosquito Control in Mt Laurel", body: (<>Shaded valley lots and creek drainage hold mosquito pressure spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Ant Control in Mt Laurel", body: (<>Carpenter and odorous house ants come in from the surrounding woods. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Mt Laurel", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> in the Mt Laurel Village center — shops, offices, and common areas — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Mt Laurel?", a: "EnviroCare termite protection in Mt Laurel is priced after a free on-site WDO inspection. It uses the Sentricon baiting system with no drilling, with coverage up to $1,000,000 subject to the terms of the agreement." },
    { q: "Do you treat ticks and mosquitoes in Mt Laurel?", a: "Yes — the Mosquito + Tick mosquito + tick program runs every 30 days, March through November, for $65 per treatment (about $48.75/month), built for Mt Laurel's wooded, woodland-edge lots." },
    { q: "What does bi-monthly pest control cover in Mt Laurel?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Do you serve Mt Laurel Village and Dunnavant Valley?", a: "Yes — all of Mt Laurel. Call (205) 940-6360 and we'll confirm your address is on our route." },
    { q: "Is there a long-term contract?", a: "No long-term pest contract is required when you pay per visit. Monthly pricing uses a 12-month billing agreement, billed by ACH auto-draft in equal, averaged monthly payments." },
  ],
  siblings: [
    ["Chelsea", "/chelsea"],
    ["Greystone", "/greystone"],
    ["Mountain Brook", "/mountain-brook"],
    ["Birmingham", "/birmingham"],
    ["Termite Control", "/services/termite-control"],
    ["Tick Control", "/services/tick-control"],
  ],
  // Birmingham office — Jefferson County + the Hwy 280 / 35242 corridor.
  officePhone: "(205) 940-6360",
  officeTel: "2059406360",
  officeLabel: "Birmingham",
  officeStreet: "2025 Butler Rd, Alabaster",
  officeLocality: "Birmingham",
  officePostal: "35205",
};

export default function MtLaurelPage() {
  return <DeepCityPage config={config} />;
}
