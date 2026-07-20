import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Inverness AL | Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service for Inverness homes along US-280 in Hoover AL (35242). From $35/mo. Call (205) 940-6360.",
  alternates: { canonical: "/inverness" },
  openGraph: {
    title: "Pest Control Inverness AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service for the Inverness community off US-280. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/inverness",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Inverness",
  slug: "inverness",
  badge: "Inverness · Hoover / US-280, Shelby County · Since 1958",
  zip: "35242",
  neighborhoods: ["Inverness Cove", "Inverness Point", "Lake Heather", "Inverness Center"],
  heroIntro:
    "Full pest, termite, and mosquito protection for the Inverness community along the US-280 corridor — Inverness Cove, Inverness Point, and the homes around Lake Heather. No-drill Sentricon® that leaves your landscaping untouched, plus a 30-day mosquito and tick barrier built for wooded, water-adjacent lots.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in the Inverness community of Hoover, Alabama (35242), including Inverness Cove, Inverness Point, and Lake Heather. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Inverness's established homes, lake, and wooded 280-corridor lots keep pest pressure working year-round.",
  whySub: "The patterns we treat most across Inverness Cove, Inverness Point, and Lake Heather.",
  pressureCards: [
    { emoji: "🪵", title: "Termites in established homes", body: "Inverness's mature, settled foundations are exactly what Eastern subterranean termites work toward. EnviroCare protects with Sentricon® — no drilling — up to $1,000,000 in coverage under its own guarantee." },
    { emoji: "🦟", title: "Mosquitoes off Lake Heather & the ponds", body: "Lake Heather, neighborhood ponds, and irrigated lots hold the standing water and shade mosquitoes breed in. The 30-day yard barrier treats March through November." },
    { emoji: "🐾", title: "Ticks on the wooded edges", body: "The wooded stretches and greenway edges through Inverness carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🐜", title: "Carpenter ants in the canopy", body: "The mature tree canopy over Inverness sends carpenter and odorous house ants into fascia and trim. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🔥", title: "Fire ants on manicured turf", body: "Landscaped, sunny lawns along the corridor are prime fire-ant ground. Whole-yard fire ant treatment is available, priced separately by yard size." },
    { emoji: "🕷️", title: "Spiders & the everyday 30+", body: "Established homes, stone foundations, and basements harbor spiders and seasonal invaders — all covered under the bi-monthly perimeter program with unlimited re-service." },
  ],
  services: [
    { title: "Termite Treatment in Inverness", body: (<>These are the homes Sentricon® was built for — established foundations and mature landscaping nobody wants drilled into. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link>: in-ground stations, no drilling, no trenching. Sentricon® is priced after a free on-site WDO inspection — with up to $1,000,000 in coverage under EnviroCare&apos;s own guarantee.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Mosquito Control in Inverness", body: (<>Lake Heather, neighborhood ponds, and irrigated turf hold mosquito pressure spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Tick Control in Inverness", body: (<>The wooded edges and greenways carry Lone Star and dog ticks. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Ant Control in Inverness", body: (<>Carpenter and odorous house ants come off the landscaped tree line. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> on sunny turf are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Inverness", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> around Inverness — the office parks, retail along US-280, and HOA common areas — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Inverness?", a: "EnviroCare termite protection in Inverness is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." },
    { q: "Can you protect an Inverness home from termites without drilling?", a: "Yes. Sentricon® Always Active™ uses in-ground bait stations around the home — no drilling, no trenching, no disruption to your landscaping — with up to $1M coverage under EnviroCare's own guarantee. The inspection is free." },
    { q: "Is there mosquito control in Inverness?", a: "Yes. EnviroCare treats Inverness yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Inverness?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Do you serve Inverness Cove, Inverness Point, and Lake Heather?", a: "Yes — all of Inverness. Call (205) 940-6360 and we'll confirm your address is on our route." },
  ],
  siblings: [
    ["Greystone", "/greystone"],
    ["Hoover", "/hoover"],
    ["Meadow Brook", "/meadow-brook"],
    ["Highland Lakes", "/highland-lakes"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Termite Control", "/services/termite-control"],
  ],
};

export default function InvernessPage() {
  return <DeepCityPage config={config} />;
}
