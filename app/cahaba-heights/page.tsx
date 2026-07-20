import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Cahaba Heights AL | Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service for Cahaba Heights homes near Vestavia Hills AL (35243). From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/cahaba-heights" },
  openGraph: {
    title: "Pest Control Cahaba Heights AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service for Cahaba Heights — Dolly Ridge to Overton. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/cahaba-heights",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Cahaba Heights",
  slug: "cahaba-heights",
  badge: "Cahaba Heights · Vestavia Hills, Jefferson County · Since 1958",
  zip: "35243",
  neighborhoods: ["Dolly Ridge", "Overton", "Cahaba Heights Village", "Green Valley"],
  heroIntro:
    "Full pest, termite, and mosquito protection for Cahaba Heights — Dolly Ridge, Overton, and the village core. From original ranches to the new custom rebuilds, EnviroCare protects every home with no-drill Sentricon® and a 30-day mosquito and tick barrier built for these wooded, creek-fed lots.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in Cahaba Heights near Vestavia Hills, Alabama (35243), including Dolly Ridge, Overton, and the Cahaba Heights village. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Cahaba Heights's mix of original homes and new rebuilds, plus creek-fed lots, keeps pest pressure working year-round.",
  whySub: "The patterns we treat most across Dolly Ridge, Overton, and the village.",
  pressureCards: [
    { emoji: "🪵", title: "Termites in original & rebuilt homes", body: "Cahaba Heights's older ranches and freshly rebuilt lots both sit on moist soil that Eastern subterranean termites hunt. EnviroCare protects with Sentricon® — no drilling — up to $1,000,000 in coverage under its own guarantee." },
    { emoji: "🦟", title: "Mosquitoes off the Cahaba & Little Shades Creek", body: "The Cahaba River corridor and Little Shades Creek keep mosquito pressure high. The 30-day yard barrier treats March through November." },
    { emoji: "🐾", title: "Ticks on the wooded edges", body: "The wooded pockets and greenways through Cahaba Heights carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🐜", title: "Carpenter ants in mature trees", body: "The old canopy over the village sends carpenter and odorous house ants into fascia and trim. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🔥", title: "Fire ants on graded new lots", body: "New rebuilds arrive with fresh sod — and fire-ant colonies aboard it. Whole-yard fire ant treatment is available, priced separately by yard size." },
    { emoji: "🕷️", title: "Spiders & the everyday 30+", body: "Basements, crawlspaces, and detached garages harbor spiders and seasonal invaders — all covered under the bi-monthly perimeter program with unlimited re-service." }
  ],
  services: [
    { title: "Termite Treatment in Cahaba Heights", body: (<>These are the homes Sentricon® was built for — established foundations and landscaping nobody wants drilled into. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link>: in-ground stations, no drilling, no trenching. Sentricon® is priced after a free on-site WDO inspection — with up to $1,000,000 in coverage under EnviroCare&apos;s own guarantee.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Mosquito Control in Cahaba Heights", body: (<>The Cahaba River, Little Shades Creek, and low-lying lots hold mosquito pressure spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Tick Control in Cahaba Heights", body: (<>The wooded edges and greenways carry Lone Star and dog ticks. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Ant Control in Cahaba Heights", body: (<>Carpenter and odorous house ants come off the landscaped tree line. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> on sunny turf are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Cahaba Heights", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> around Cahaba Heights — the shops and offices along Cahaba Heights Road — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Cahaba Heights?", a: "EnviroCare termite protection in Cahaba Heights is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." },
    { q: "Can you protect a Cahaba Heights home from termites without drilling?", a: "Yes. Sentricon® Always Active™ uses in-ground bait stations around the home — no drilling, no trenching — with up to $1M coverage under EnviroCare's own guarantee. The inspection is free." },
    { q: "Is there mosquito control in Cahaba Heights?", a: "Yes. EnviroCare treats Cahaba Heights yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Cahaba Heights?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Do you serve Dolly Ridge, Overton, and the Cahaba Heights village?", a: "Yes — all of Cahaba Heights. Call (205) 940-6360 and we'll confirm your address is on our route." }
  ],
  siblings: [
    ["Vestavia Hills", "/vestavia-hills"],
    ["Mountain Brook", "/mountain-brook"],
    ["Liberty Park", "/liberty-park"],
    ["Homewood", "/homewood"],
    ["Birmingham", "/birmingham"],
    ["Termite Control", "/services/termite-control"],
  ],
};

export default function CahabaHeightsPage() {
  return <DeepCityPage config={config} />;
}
