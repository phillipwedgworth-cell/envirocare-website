import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Trussville AL | Termite, Mosquito & Tick — Since 1958",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service in Trussville AL — Cahaba Project, Carrington, Stockton. From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/trussville" },
  openGraph: {
    images: ["/og/og-trussville.png"],
    title: "Pest Control Trussville AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service across Trussville. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/trussville",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Trussville",
  slug: "trussville",
  badge: "Trussville · Jefferson & St. Clair County · Since 1958",
  zip: "35173",
  neighborhoods: ["Cahaba Project", "Trussville Springs", "Carrington", "Stockton", "Glendale Farms"],
  heroIntro:
    "Year-round pest and termite defense for Trussville homes — the historic Cahaba Project, Trussville Springs, Carrington, and Stockton. No-drill Sentricon®, seasonal mosquito and tick service, family-owned and dispatched from our Birmingham office.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in Trussville, Alabama, including the Cahaba Project, Trussville Springs, Carrington, and Stockton. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling and up to $1,000,000 in property coverage, subject to the terms of the agreement. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "The Cahaba River and Trussville's mature tree canopy bring termites, ants, and mosquito pressure to yards year-round.",
  whySub: "The patterns we treat most across Trussville's historic and new neighborhoods.",
  pressureCards: [
    { emoji: "🪵", title: "Termites along the Cahaba", body: "The Cahaba River corridor keeps Trussville's soil damp — exactly the moisture Eastern subterranean termites move through to reach foundations. Sentricon® protects without drilling, up to $1M in coverage." },
    { emoji: "🏛️", title: "Termites in the historic Cahaba Project", body: "The 1930s Cahaba Project homes sit on older foundations that termites work toward. Sentricon® bait stations protect without drilling into original masonry — critical for historic structures." },
    { emoji: "🦟", title: "Mosquitoes off the river", body: "The Cahaba and its backwaters feed mosquito pressure March through October. The 30-day yard barrier keeps riverside and canopy yards usable through the season." },
    { emoji: "🐜", title: "Carpenter ants in the canopy", body: "Trussville's mature tree canopy harbors carpenter ants that move into fascia, soffit, and trim. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🐾", title: "Ticks on wooded lots", body: "Carrington, Stockton, and wooded riverside lots carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🔥", title: "Fire ants in newer subdivisions", body: "Trussville Springs and newer graded lots draw fire ants into fresh sod. Whole-yard fire ant treatment is available, priced separately by yard size." },
  ],
  services: [
    { title: "Termite Treatment in Trussville", body: (<>The Cahaba corridor keeps Trussville soil damp and subterranean termites active year-round. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link> — no drilling, ideal for the historic Cahaba Project homes. Sentricon® is priced after a free on-site WDO inspection — up to $1,000,000 in coverage.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Mosquito Control in Trussville", body: (<>The Cahaba River and its backwaters keep mosquito pressure up spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through October — eight treatments at $45 each, about $30/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Tick Control in Trussville", body: (<>Wooded lots in Carrington and Stockton and along the river put ticks close to families and pets. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $43.33/month across the season. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Ant Control in Trussville", body: (<>Carpenter and odorous house ants come off the tree canopy. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> in newer subdivisions are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Trussville", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> across Trussville — downtown shops, offices, and restaurants — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Trussville?", a: "EnviroCare termite protection in Trussville is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 subject to the terms of the agreement." },
    { q: "Do you treat the historic Cahaba Project homes?", a: "Yes — historic homes get Sentricon® termite protection with no drilling into original masonry, plus the bi-monthly perimeter program. The full-home termite inspection is free." },
    { q: "Is there mosquito control in Trussville?", a: "Yes. EnviroCare treats Trussville yards every 30 days from March through October — eight treatments at $45 each, about $30 per month. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Trussville?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Do you serve the Cahaba Project, Trussville Springs, and Carrington?", a: "Yes — all of Trussville. Call (205) 940-6360 and we'll confirm your address is on our route." },
  ],
  siblings: [
    ["Birmingham", "/birmingham"],
    ["Mountain Brook", "/mountain-brook"],
    ["Hoover", "/hoover"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Termite Control", "/services/termite-control"],
    ["Mosquito Control", "/services/mosquito"],
  ],
  // Birmingham office — Jefferson County + the Hwy 280 / 35242 corridor.
  officePhone: "(205) 940-6360",
  officeTel: "2059406360",
  officeLabel: "Birmingham",
  officeStreet: "2025 Butler Rd, Alabaster",
  officeLocality: "Birmingham",
  officePostal: "35205",
};

export default function TrussvillePage() {
  return <DeepCityPage config={config} />;
}
