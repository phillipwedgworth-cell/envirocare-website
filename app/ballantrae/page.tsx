import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Ballantrae AL | Pelham Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service for the Ballantrae golf community in Pelham AL (35124). From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/ballantrae" },
  openGraph: {
    title: "Pest Control Ballantrae — Pelham AL | EnviroCare Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service for the Ballantrae golf community. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/ballantrae",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Ballantrae",
  slug: "ballantrae",
  badge: "Ballantrae · Pelham, Shelby County · Since 1958",
  zip: "35124",
  neighborhoods: ["Ballantrae Golf community", "Ballantrae Parkway", "Ballantrae Estates"],
  heroIntro:
    "Complete pest, termite, and mosquito protection for the Ballantrae golf community in Pelham. Sitting against Oak Mountain with fairway ponds and wooded lots, Ballantrae gets real tick and mosquito pressure — EnviroCare's 30-day barrier and no-drill Sentricon® are built for exactly this.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in the Ballantrae golf community of Pelham, Alabama (35124). Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Ballantrae's golf-course water, Oak Mountain tree line, and graded lots keep pest pressure working most of the year.",
  whySub: "The patterns we treat most across the Ballantrae community.",
  pressureCards: [
    { emoji: "🐾", title: "Ticks off Oak Mountain", body: "Lone Star and American dog ticks ride deer and small mammals out of Oak Mountain straight into Ballantrae yards. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🦟", title: "Mosquitoes off the course ponds", body: "Fairway ponds, irrigated turf, and shaded lots hold the standing water mosquitoes breed in. The 30-day yard barrier treats March through November." },
    { emoji: "🪵", title: "Termites on wooded Shelby soil", body: "Ballantrae's moist, wooded Shelby County soil is prime Eastern subterranean termite ground. Sentricon® protects with no drilling — up to $1,000,000 in coverage under EnviroCare's guarantee." },
    { emoji: "🔥", title: "Fire ants on fairway-edge turf", body: "Manicured, sunny lawns along the fairways are prime fire-ant ground. Whole-yard fire ant treatment is available, priced separately by yard size." },
    { emoji: "🐜", title: "Carpenter ants in the canopy", body: "The wooded lots send carpenter and odorous house ants into eaves and trim. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🕷️", title: "Spiders & the everyday 30+", body: "Garages, basements, and outbuildings on wooded lots harbor spiders and seasonal invaders — all covered under the bi-monthly perimeter program with unlimited re-service." }
  ],
  services: [
    { title: "Termite Treatment in Ballantrae", body: (<>These are the homes Sentricon® was built for — established foundations and landscaping nobody wants drilled into. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link>: in-ground stations, no drilling, no trenching. Sentricon® is priced after a free on-site WDO inspection — with up to $1,000,000 in coverage under EnviroCare&apos;s own guarantee.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Mosquito Control in Ballantrae", body: (<>The golf-course ponds, irrigated fairways, and Oak Mountain drainages hold mosquito pressure spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Tick Control in Ballantrae", body: (<>The wooded edges and greenways carry Lone Star and dog ticks. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Ant Control in Ballantrae", body: (<>Carpenter and odorous house ants come off the landscaped tree line. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> on sunny turf are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Ballantrae", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> around Ballantrae — the clubhouse, HOA common areas, and nearby Pelham businesses — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Ballantrae?", a: "EnviroCare termite protection in Ballantrae is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." },
    { q: "Do you treat ticks and mosquitoes in Ballantrae?", a: "Yes. The Mosquito + Tick program (chiggers covered) treats every 30 days, March through November, for $65 per visit — built for the Oak Mountain tree line and fairway ponds." },
    { q: "Can you protect a Ballantrae home from termites without drilling?", a: "Yes. Sentricon® Always Active™ uses in-ground bait stations around the home — no drilling, no trenching — with up to $1M coverage under EnviroCare's own guarantee. The inspection is free." },
    { q: "What does bi-monthly pest control cover in Ballantrae?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Which office serves Ballantrae?", a: "Our Birmingham-area office at 2025 Butler Rd in Alabaster, just up Highway 31. Call (205) 940-6360 to confirm your address is on our route." }
  ],
  siblings: [
    ["Pelham", "/pelham"],
    ["Helena", "/helena"],
    ["Alabaster", "/alabaster"],
    ["Indian Springs", "/indian-springs"],
    ["Hoover", "/hoover"],
    ["Termite Control", "/services/termite-control"],
  ],
};

export default function BallantraePage() {
  return <DeepCityPage config={config} />;
}
