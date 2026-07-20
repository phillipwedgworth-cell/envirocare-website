import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Chelsea Park AL | Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service for the Chelsea Park community in Chelsea AL (35043). New-construction pre-treat. Call (205) 940-6360.",
  alternates: { canonical: "/chelsea-park" },
  openGraph: {
    title: "Pest Control Chelsea Park — Chelsea AL | EnviroCare Since 1958",
    description:
      "Family-owned pest, termite, mosquito & tick service for the Chelsea Park community. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/chelsea-park",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Chelsea Park",
  slug: "chelsea-park",
  badge: "Chelsea Park · Chelsea, Shelby County · Since 1958",
  zip: "35043",
  neighborhoods: ["Chelsea Park", "Chelsea Park lakes", "Chelsea Ridge", "Narrows"],
  heroIntro:
    "Full pest, termite, and mosquito protection for the Chelsea Park community — the lakes, the ridge, and the newer sections. Fresh construction on disturbed Shelby County soil needs termite pre-treat and fire-ant control from day one, and the community lakes bring mosquito pressure all season. EnviroCare does it all, one team.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, and tick service in the Chelsea Park community of Chelsea, Alabama (35043), including the Chelsea Park lakes and ridge neighborhoods. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling, backed by EnviroCare's guarantee of up to $1,000,000 in property coverage. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 940-6360.",
  whyHeadline: "Chelsea Park's new construction, community lakes, and rolling wooded lots keep pest pressure high year-round.",
  whySub: "The patterns we treat most across Chelsea Park.",
  pressureCards: [
    { emoji: "🏗️", title: "Termites in new construction", body: "Chelsea Park's fresh slabs sit on newly disturbed soil — exactly the conditions Eastern subterranean termites look for first. Sentricon® installed at or near build locks in protection, up to $1,000,000 in EnviroCare-backed coverage." },
    { emoji: "🔥", title: "Fire ants riding in on new sod", body: "New Chelsea Park lots arrive with fresh sod — and fire-ant colonies already aboard. Whole-yard fire ant treatment is available, priced separately by yard size." },
    { emoji: "🦟", title: "Mosquitoes off the community lakes", body: "Chelsea Park's lakes and rolling drainages hold the standing water mosquitoes breed in from March through November. The 30-day yard barrier keeps decks and playsets usable all season." },
    { emoji: "🐾", title: "Ticks on the wooded lots", body: "The rolling, wooded lots around Chelsea Park carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🐜", title: "Carpenter ants off the tree line", body: "Wooded lot edges send carpenter and odorous house ants into eaves and trim. Bi-monthly exterior service covers the whole nuisance-ant family." },
    { emoji: "🕷️", title: "Spiders & the everyday 30+", body: "Garages, basements, and storage rooms harbor spiders and seasonal invaders — all covered under the bi-monthly perimeter program with unlimited re-service." }
  ],
  services: [
    { title: "Termite Treatment in Chelsea Park", body: (<>These are the homes Sentricon® was built for — established foundations and landscaping nobody wants drilled into. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link>: in-ground stations, no drilling, no trenching. Sentricon® is priced after a free on-site WDO inspection — with up to $1,000,000 in coverage under EnviroCare&apos;s own guarantee.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Mosquito Control in Chelsea Park", body: (<>The community lakes and rolling, wet-weather drainages hold mosquito pressure spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through November — nine treatments at $45 each, about $33.75/month. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Tick Control in Chelsea Park", body: (<>The wooded edges and greenways carry Lone Star and dog ticks. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per treatment, about $48.75/month across the season. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Ant Control in Chelsea Park", body: (<>Carpenter and odorous house ants come off the landscaped tree line. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> on sunny turf are priced separately by treated area.</>) },
    { title: "Commercial Pest Control in Chelsea Park", body: (<>EnviroCare services{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>commercial properties</Link> around Chelsea Park — the town-center shops and HOA common areas — with documented, inspection-ready service on schedules built around your hours. Call (205)&nbsp;940-6360 for a walkthrough.</>) },
  ],
  faqs: [
    { q: "My Chelsea Park home is new construction — do I still need termite protection?", a: "Especially then. New slabs sit on disturbed soil that subterranean termites find first, and a slab gives no warning before damage starts. Sentricon® installed at or near build is the right time to lock in protection, with up to $1,000,000 in EnviroCare coverage." },
    { q: "How much is termite treatment in Chelsea Park?", a: "EnviroCare termite protection in Chelsea Park is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 backed by EnviroCare's guarantee." },
    { q: "Is there mosquito control in Chelsea Park?", a: "Yes. EnviroCare treats Chelsea Park yards every 30 days from March through November — nine treatments at $45 each, about $33.75 per month. Most homeowners see a clear seasonal reduction in mosquito activity." },
    { q: "What does bi-monthly pest control cover in Chelsea Park?", a: "EnviroCare's bi-monthly plan is $35 per month and covers 30+ common household pests including most ants, spiders, roaches, and rodents, with unlimited re-service between regular visits at no extra charge. Fire ant, flea, and tick are priced separately." },
    { q: "Which office serves Chelsea Park?", a: "Our Birmingham-area office at 2025 Butler Rd in Alabaster. Call (205) 940-6360 and we'll confirm your address is on our route." }
  ],
  siblings: [
    ["Chelsea", "/chelsea"],
    ["Mt Laurel", "/mt-laurel"],
    ["Greystone", "/greystone"],
    ["Highland Lakes", "/highland-lakes"],
    ["Birmingham", "/birmingham"],
    ["Termite Control", "/services/termite-control"],
  ],
};

export default function ChelseaParkPage() {
  return <DeepCityPage config={config} />;
}
