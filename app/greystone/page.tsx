import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

// NOTE: no per-city OG image yet (public/og/og-greystone.png missing) — inherits
// the sitewide default OG from app/layout.tsx. Add og-greystone.png later.
export const metadata: Metadata = {
  title: "Pest Control Greystone AL | Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service for Greystone homes in Hoover AL — Founders, Legacy. From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/greystone" },
  openGraph: {
    title: "Pest Control Greystone AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service for the Greystone golf community. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/greystone",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Greystone",
  slug: "greystone",
  badge: "Greystone · Hoover, Shelby County · Since 1958",
  zip: "35242",
  neighborhoods: ["Greystone Founders", "Greystone Legacy", "Greystone Farms"],
  heroIntro:
    "The gold standard in pest protection for the Greystone golf community — Founders, Legacy, and Farms. No-drill Sentricon® that won't disturb your landscaping, plus a 30-day mosquito and tick barrier built for wooded, water-feature lots.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in the Greystone community of Hoover, Alabama, including Greystone Founders, Legacy, and Farms. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling and up to $1,000,000 in property coverage, subject to the terms of the agreement. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Greystone's wooded lots, golf-course water features, and established homes keep pest pressure working year-round.",
  whySub: "The patterns we treat most across Founders, Legacy, and Farms.",
  pressureCards: [
    { emoji: "🪵", title: "Termites in established homes", body: "Greystone's mature neighborhoods and settled foundations are exactly what subterranean termites work toward. EnviroCare protects with Sentricon® — no drilling — up to $1,000,000 in coverage subject to the terms of the agreement." },
    { emoji: "🦟", title: "Mosquitoes off the course & ponds", body: "Golf-course corridors, ponds, and wooded lots hold the standing water and shade mosquitoes breed in. The 30-day yard barrier treats March through November." },
    { emoji: "🐾", title: "Ticks on the wooded edges", body: "The mature tree line and wooded stretches between fairways and homes carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🐜", title: "Carpenter ants in the canopy", body: "Greystone's landscaped, wooded lots send carpenter and odorous house ants into fascia and trim. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🔥", title: "Fire ants on manicured turf", body: "Fairway-edge lawns and graded lots are prime fire-ant ground. Whole-yard fire ant treatment is available, priced separately by yard size." },
    { emoji: "🕷️", title: "Spiders & the everyday 30+", body: "Established homes, stone foundations, and detached structures harbor spiders and seasonal invaders — all covered under the bi-monthly perimeter program with unlimited re-service." },
  ],
  services: [
    { title: "Termite Treatment in Greystone", body: (<>These are the homes Sentricon® was built for — custom foundations and landscaping nobody wants drilled into. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link>: in-ground stations, no drilling, no trenching. Sentricon® is priced after a free on-site WDO inspection — with up to $1,000,000 in coverage subject to the terms of the agreement.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Mosquito Control in Greystone", body: (<>Golf-course ponds, irrigated turf, and wooded lots hold mosquito pressure spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Tick Control in Greystone", body: (<>The wooded edges between fairways and homes carry Lone Star and dog ticks. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Ant Control in Greystone", body: (<>Carpenter and odorous house ants come off the landscaped tree line. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> on fairway-edge turf are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Greystone", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> around Greystone — the country club, clubhouses, and HOA common areas — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Greystone?", a: "EnviroCare termite protection in Greystone is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 subject to the terms of the agreement." },
    { q: "Can you protect a Greystone home from termites without drilling?", a: "Yes. Sentricon® Always Active™ uses in-ground bait stations around the home — no drilling, no trenching, no disruption to your landscaping — with up to $1M coverage subject to the terms of the agreement. The inspection is free." },
    { q: "Is there mosquito control in Greystone?", a: "Yes. EnviroCare treats Greystone yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Greystone?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Do you serve Greystone Founders, Legacy, and Farms?", a: "Yes — all of Greystone. Call (205) 940-6360 and we'll confirm your address is on our route." },
  ],
  siblings: [
    ["Over the Mountain", "/over-the-mountain"],
    ["Hoover", "/hoover"],
    ["Mountain Brook", "/mountain-brook"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Mt Laurel", "/mt-laurel"],
    ["Birmingham", "/birmingham"],
    ["Termite Control", "/services/termite-control"],
  ],
  // Birmingham office — Jefferson County + the Hwy 280 / 35242 corridor.
  officePhone: "(205) 940-6360",
  officeTel: "2059406360",
  officeLabel: "Birmingham",
  officeStreet: "2025 Butler Rd, Alabaster",
  officeLocality: "Birmingham",
  officePostal: "35205",
};

export default function GreystonePage() {
  return <DeepCityPage config={config} />;
}
