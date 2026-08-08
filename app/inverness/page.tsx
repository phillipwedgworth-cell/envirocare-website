import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Inverness AL | Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service for Inverness homes along US-280 in Hoover AL (35242). From $35/mo. Call (205) 991-2882.",
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
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in the Inverness community of Hoover, Alabama (35242), including Inverness Cove, Inverness Point, and Lake Heather. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 991-2882.",
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
    { title: "Termite Treatment in Inverness", body: (<>These are the established 1980s and 90s homes off US-280 — settled slabs and mature landscaping nobody wants drilled into. EnviroCare protects with the <Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link>: in-ground stations, no drilling, priced after a free WDO inspection, with up to $1,000,000 in coverage under EnviroCare&apos;s own guarantee. <Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO letters</Link> for the active 280-corridor resale market.</>) },
    { title: "Mosquito Control in Inverness", body: (<>Lake Heather, the Inverness Country Club ponds, and shaded cul-de-sacs hold mosquito pressure spring into fall. <Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — $45 a visit, about $33.75/month across the season. We never promise elimination, but most yards see a clear seasonal drop.</>) },
    { title: "Tick Control in Inverness", body: (<>The greenways and wooded lot lines between Inverness Cove and Inverness Point carry Lone Star and dog ticks. The <Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>Mosquito + Tick program</Link> adds tick and chigger coverage at $65 a visit — the right call for homes backing up to the tree line.</>) },
    { title: "Ant &amp; Perimeter Pest in Inverness", body: (<>Carpenter ants work out of Inverness&apos;s mature hardwood canopy into fascia and trim, while the everyday 30+ pests come with wooded, landscaped lots — all covered under the bi-monthly perimeter plan with unlimited re-service. <Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> on the open lawns are priced separately by yard size.</>) },
    { title: "Commercial Pest Control in Inverness", body: (<>EnviroCare services the <Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>office parks, medical suites, and retail</Link> along US-280 at Inverness with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;991-2882 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "How much is termite treatment in Inverness?", a: "EnviroCare termite protection in Inverness is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." },
    { q: "Can you protect an Inverness home from termites without drilling?", a: "Yes. Sentricon® Always Active™ uses in-ground bait stations around the home — no drilling, no trenching, no disruption to your landscaping — with up to $1M coverage under EnviroCare's own guarantee. The inspection is free." },
    { q: "Is there mosquito control in Inverness?", a: "Yes. EnviroCare treats Inverness yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Inverness?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Do you serve Inverness Cove, Inverness Point, and Lake Heather?", a: "Yes — all of Inverness. Call (205) 991-2882 and we'll confirm your address is on our route." },
  ],
  siblings: [
    ["Over the Mountain", "/over-the-mountain"],
    ["Greystone", "/greystone"],
    ["Hoover", "/hoover"],
    ["Meadow Brook", "/meadow-brook"],
    ["Highland Lakes", "/highland-lakes"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Termite Control", "/services/termite-control"],
  ],
  // Birmingham office — Jefferson County + the Hwy 280 / 35242 corridor.
  officePhone: "(205) 991-2882",
  officeTel: "2059912882",
  officeLabel: "Birmingham",
  officeStreet: "2120 16th Ave S, Ste 302",
  officeLocality: "Birmingham",
  officePostal: "35205",
};

export default function InvernessPage() {
  return <DeepCityPage config={config} />;
}
