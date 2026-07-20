import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Ross Bridge AL | Hoover Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service for the Ross Bridge resort community in Hoover AL (35226). From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/ross-bridge" },
  openGraph: {
    title: "Pest Control Ross Bridge — Hoover AL | EnviroCare Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service for the Ross Bridge resort community. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/ross-bridge",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Ross Bridge",
  slug: "ross-bridge",
  badge: "Ross Bridge · Hoover, Jefferson County · Since 1958",
  zip: "35226",
  neighborhoods: ["Village at Ross Bridge", "Ross Bridge Parkway", "Ross Bridge Golf Resort"],
  heroIntro:
    "Full pest, termite, and mosquito protection for the Ross Bridge resort community in Hoover — the Village, the parkway, and the golf-resort homes. Resort lakes and water features bring steady mosquito pressure, and graded lots still need termite and fire-ant protection. EnviroCare handles all of it, one technician, one invoice.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in the Ross Bridge resort community of Hoover, Alabama (35226), including the Village at Ross Bridge and the golf-resort neighborhoods. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Ross Bridge's resort lakes, water features, and graded lots keep pest pressure working spring into fall.",
  whySub: "The patterns we treat most across the Village and the resort neighborhoods.",
  pressureCards: [
    { emoji: "🦟", title: "Mosquitoes off the resort lakes", body: "Ross Bridge's lakes, fountains, and irrigated turf hold the standing water mosquitoes breed in all season. The 30-day yard barrier treats March through November." },
    { emoji: "🔥", title: "Fire ants on graded, sodded lots", body: "Ross Bridge's newer, graded lots came with fresh sod — and fire-ant colonies aboard it. Whole-yard fire ant treatment is available, priced separately by yard size." },
    { emoji: "🪵", title: "Termites under newer slabs", body: "Newer homes are not termite-proof — graded, disturbed soil is exactly what Eastern subterranean termites find first. Sentricon® protects with no drilling — up to $1,000,000 in coverage under EnviroCare's guarantee." },
    { emoji: "🐾", title: "Ticks on the wooded greenways", body: "The wooded greenways and trail edges around the resort carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🐜", title: "Carpenter ants off the tree line", body: "Landscaped, wooded lots send carpenter and odorous house ants into eaves and trim. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🕷️", title: "Spiders & the everyday 30+", body: "Garages, basements, and storage areas harbor spiders and seasonal invaders — all covered under the bi-monthly perimeter program with unlimited re-service." }
  ],
  services: [
    { title: "Termite Treatment in Ross Bridge", body: (<>These are the homes Sentricon® was built for — established foundations and landscaping nobody wants drilled into. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link>: in-ground stations, no drilling, no trenching. Sentricon® is priced after a free on-site WDO inspection — with up to $1,000,000 in coverage under EnviroCare&apos;s own guarantee.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Mosquito Control in Ross Bridge", body: (<>The resort lakes, water features, and irrigated turf hold mosquito pressure spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Tick Control in Ross Bridge", body: (<>The wooded edges and greenways carry Lone Star and dog ticks. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Ant Control in Ross Bridge", body: (<>Carpenter and odorous house ants come off the landscaped tree line. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> on sunny turf are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Ross Bridge", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> around Ross Bridge — the resort, the village shops, and HOA common areas — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Ross Bridge?", a: "EnviroCare termite protection in Ross Bridge is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." },
    { q: "My Ross Bridge home is newer — do I still need termite protection?", a: "Yes. Newer homes sit on graded, disturbed soil that subterranean termites find first, and a slab gives no warning before damage starts. Sentricon® is the right way to lock in protection, with up to $1,000,000 in EnviroCare coverage." },
    { q: "Is there mosquito control in Ross Bridge?", a: "Yes. EnviroCare treats Ross Bridge yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Ross Bridge?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Which office serves Ross Bridge?", a: "Our Birmingham-area office at 2025 Butler Rd in Alabaster. Call (205) 940-6360 and we'll confirm your address is on our route." }
  ],
  siblings: [
    ["Hoover", "/hoover"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Homewood", "/homewood"],
    ["Greystone", "/greystone"],
    ["Birmingham", "/birmingham"],
    ["Termite Control", "/services/termite-control"],
  ],
};

export default function RossBridgePage() {
  return <DeepCityPage config={config} />;
}
