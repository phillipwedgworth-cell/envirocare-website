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
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in the Ballantrae golf community of Pelham, Alabama (35124). Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling and up to $1,000,000 in property coverage, subject to the terms of the agreement. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Ballantrae's golf-course water, Oak Mountain tree line, and graded lots keep pest pressure working most of the year.",
  whySub: "The patterns we treat most across the Ballantrae community.",
  pressureCards: [
    { emoji: "🐾", title: "Ticks off Oak Mountain", body: "Lone Star and American dog ticks ride deer and small mammals out of Oak Mountain straight into Ballantrae yards. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🦟", title: "Mosquitoes off the course ponds", body: "Fairway ponds, irrigated turf, and shaded lots hold the standing water mosquitoes breed in. The 30-day yard barrier treats March through October." },
    { emoji: "🪵", title: "Termites on wooded Shelby soil", body: "Ballantrae's moist, wooded Shelby County soil is prime Eastern subterranean termite ground. Sentricon® protects with no drilling — up to $1,000,000 in coverage subject to the terms of the agreement." },
    { emoji: "🔥", title: "Fire ants on fairway-edge turf", body: "Manicured, sunny lawns along the fairways are prime fire-ant ground. Whole-yard fire ant treatment is available, priced separately by yard size." },
    { emoji: "🐜", title: "Carpenter ants in the canopy", body: "The wooded lots send carpenter and odorous house ants into eaves and trim. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🕷️", title: "Spiders & the everyday 30+", body: "Garages, basements, and outbuildings on wooded lots harbor spiders and seasonal invaders — all covered under the bi-monthly perimeter program with unlimited re-service." }
  ],
  services: [
    { title: "Termite Treatment in Ballantrae", body: (<>Ballantrae&apos;s newer custom homes sit on graded Shelby County soil — disturbed ground is exactly what subterranean termites find first, and a slab gives no warning. EnviroCare protects with the <Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link> — no drilling — priced after a free WDO inspection, up to $1,000,000 in coverage. <Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO letters</Link> available for resale.</>) },
    { title: "Mosquito Control in Ballantrae", body: (<>The golf-course ponds, irrigated fairways, and Oak Mountain drainages feed mosquitoes all season. <Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through October — $45 a month — to keep patios and the course-edge yards usable.</>) },
    { title: "Tick Control in Ballantrae", body: (<>This is tick country: deer move straight off Oak Mountain State Park into fairway-edge yards, carrying Lone Star and dog ticks. The <Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>Mosquito + Tick program</Link> ($65 a month, chiggers covered) is the plan most Ballantrae homes should be on.</>) },
    { title: "Fire Ant &amp; Perimeter Pest in Ballantrae", body: (<>Manicured, fairway-edge lawns are prime fire-ant ground — <Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>whole-colony fire ant treatment</Link> starts at $150, priced by yard size. Carpenter ants off the tree line and the everyday 30+ are covered under the bi-monthly perimeter plan with unlimited re-service.</>) },
    { title: "Commercial Pest Control in Ballantrae", body: (<>EnviroCare services the <Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>clubhouse, HOA common areas, and Highway 119 businesses</Link> around Ballantrae with documented, inspection-ready service. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Ballantrae?", a: "EnviroCare termite protection in Ballantrae is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 subject to the terms of the agreement." },
    { q: "Do you treat ticks and mosquitoes in Ballantrae?", a: "Yes. The Mosquito + Tick program (chiggers covered) treats every 30 days, March through October, for $65 per month — built for the Oak Mountain tree line and fairway ponds." },
    { q: "Can you protect a Ballantrae home from termites without drilling?", a: "Yes. Sentricon® Always Active™ uses in-ground bait stations around the home — no drilling, no trenching — with up to $1M coverage subject to the terms of the agreement. The inspection is free." },
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
