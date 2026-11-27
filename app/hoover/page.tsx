import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Hoover AL | Exterminator & Termite | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service in Hoover AL — Riverchase, Bluff Park, Ross Bridge. From $35/mo. Call (205) 991-2882.",
  alternates: { canonical: "/hoover" },
  openGraph: {
    images: ["/og/og-hoover.png"],
    title: "Pest Control Hoover AL | Exterminator & Termite | EnviroCare",
    description:
      "Family-owned pest, termite, mosquito, tick & commercial service across Hoover, with Sentricon® termite protection quoted after a free inspection.",
    url: "https://www.envirocarellc.com/hoover",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Hoover",
  slug: "hoover",
  badge: "Hoover · Jefferson & Shelby County · Family-Owned Since 1958",
  zip: "35244",
  neighborhoods: ["Riverchase", "Bluff Park", "Trace Crossings", "Lake Cyrus", "Ross Bridge"],
  heroIntro:
    "Looking for reliable pest control in Hoover, AL? EnviroCare delivers pest, termite, mosquito, tick, and commercial pest control across Hoover — Riverchase, Bluff Park, Trace Crossings, Lake Cyrus, and Ross Bridge. As a family-owned Birmingham-area pest control company, our exterminators handle ants, roaches, spiders, rodents, wasps, and the seasonal pests local homes and businesses face — with no-drill Sentricon® termite protection and documented commercial service for the Galleria corridor.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, tick, and commercial pest service in Hoover, Alabama, including Riverchase, Bluff Park, Trace Crossings, Lake Cyrus, and Ross Bridge. Bi-monthly pest control is $35/month and covers 30+ common household pests — ants, cockroaches, roaches, spiders, silverfish, crickets, and rodents like rats and mice — with free re-service between visits. New termite customers are offered the Sentricon® baiting system, usually with no drilling; qualifying homes may receive up to $1,000,000 in termite damage repair coverage provided by EnviroCare, subject to the terms of the agreement. As one of the professional pest control companies serving the Birmingham area, EnviroCare offers comprehensive pest control solutions and year-round pest prevention for Hoover homes and businesses, backed by a free thorough inspection of entry points and harborage. EnviroCare is a family-owned Alabama company, and the Wedgworth family has been doing pest control in Alabama since 1958. Call (205) 991-2882.",
  body: [
    "The Wedgworth family has been doing pest control in Alabama since 1958, and in Hoover the pressure is shaped by the terrain: tree-lined streets, lake lots, and steady new construction. That mix means ants, cockroaches, spiders, and seasonal invaders press on homes here year-round, while rodents like rats and mice look for a way indoors as the weather turns. EnviroCare's bi-monthly pest control treats the exterior perimeter and the entry points where pests get in, so most pest problems are stopped before they reach your living space.",
    "As a local, family-owned pest control company — not a national chain exterminator — we build a straightforward pest management plan around your home or business. The bi-monthly pest plan covers 30+ common household pests for $35 a month, with free re-service if a pest problem shows up between visits. For a heavier infestation, our thorough inspection finds the harborage and entry points first, then we treat them. You can pay per visit, billed as serviced, or choose equal monthly ACH payments under a 12-month billing agreement, and you can add Sentricon® termite protection or seasonal mosquito and tick service whenever you need it.",
    "Every pest control plan starts with your specific pest activity and pest control needs. Routine visits treat the eaves and knock down webbing so wasps and hornets are discouraged from building; if an active wasp, hornet, or yellow jacket nest is already stinging near an entryway, treating it is an add-on for pest customers at an additional charge — do not disturb it before the visit. For common household pests — ants, spiders, roaches, and the occasional invaders — dependable bi-monthly pest control keeps pressure down, with re-service for covered pests between visits. EnviroCare has decades of pest control experience across the Birmingham area, and that experience is why local homeowners and businesses trust us with recurring, reliable pest control.",
    "Hoover businesses on the Galleria corridor get documented, inspection-ready commercial pest control on a schedule built around their hours. Whether you need residential or commercial pest control, EnviroCare's goal is the same: reliable, professional pest control with clear written scope and year-round attention to the pests you actually have. Call (205) 991-2882 to set up service anywhere in Hoover — Riverchase, Bluff Park, Trace Crossings, Lake Cyrus, or Ross Bridge.",
  ],
  whyHeadline: "Tree-lined neighborhoods, lake lots, and steady new construction keep Hoover's pest pressure high year-round.",
  whySub: "The patterns we treat most across Hoover's homes and businesses.",
  pressureCards: [
    { emoji: "🪵", title: "Termites across established Hoover", body: "From Riverchase to Bluff Park, moisture near the foundation, wood-to-soil contact, and additions deserve a close look at the inspection — a neighborhood name alone does not predict termites. Sentricon® protects without drilling; qualifying homes may receive up to $1M in EnviroCare damage repair coverage, subject to the terms of the agreement." },
    { emoji: "🐜", title: "Carpenter ants in the tree canopy", body: "Hoover's mature tree-lined streets harbor carpenter ants that move into fascia, soffit, and trim. Bi-monthly exterior pest control keeps the whole ant family outside." },
    { emoji: "🪳", title: "Roaches and rodents seeking shelter indoors", body: "As seasons change, cockroaches and rodents like rats and mice seek shelter indoors. Our pest control treats entry points and harborage so roaches and mice stay out." },
    { emoji: "🦟", title: "Mosquitoes off the lakes & creeks", body: "Lake Cyrus, Patton Creek, and the Riverchase ponds hold the standing water mosquitoes breed in. The 30-day yard barrier treats March through October." },
    { emoji: "🐾", title: "Ticks on wooded lots", body: "Bluff Park and Ross Bridge lots backing up to woods carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🔥", title: "Fire ants in new construction", body: "Fire ants mound quickly in open, sunny turf, including newer Trace Crossings yards. Whole-yard fire ant treatment is a separate service: $150 minimum, larger properties are quoted, and it carries a one-year warranty." },
    { emoji: "🏢", title: "Commercial pressure on the Galleria corridor", body: "Restaurants, retail, and offices around the Riverchase Galleria need documented, inspection-ready service. We build commercial schedules around your hours and foot traffic." },
  ],
  services: [
    { title: "Commercial Pest Control in Hoover", body: (<>The Galleria corridor and Hoover's office and restaurant base need documented, inspection-ready pest programs.{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>Commercial pest control</Link> runs on schedules built around your hours and foot traffic, adjusted seasonally. Call (205)&nbsp;991-2882 for a commercial walkthrough.</>) },
    { title: "Termite Treatment in Hoover", body: (<>Subterranean termites are a year-round concern for Hoover homes. New termite customers are protected with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link> — no drilling. Sentricon® is priced after a free on-site termite inspection, and qualifying homes may receive up to $1,000,000 in termite damage repair coverage provided by EnviroCare, subject to the terms of the agreement.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales are a separately quoted, paid service.</>) },
    { title: "Tick Control in Hoover", body: (<>Wooded lots in Bluff Park and Ross Bridge put ticks close to families and pets. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per month. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Mosquito Control in Hoover", body: (<>Lake Cyrus, Patton Creek, and Riverchase ponds keep mosquito pressure up spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through October — eight treatments at $45/month, spread evenly across the year by ACH. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Ant & Pest Control in Hoover", body: (<>Carpenter, odorous house, and Argentine ants are common here. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> are a separate whole-yard service: $150 minimum, with a one-year warranty.</>) },
  ],
  faqs: [
    { q: "How much is pest control in Hoover?", a: "EnviroCare's bi-monthly plan is $35 per month on ACH (or $70 per visit) and covers 30+ common pests including ants, spiders, roaches, and rodents, with free re-service between visits." },
    { q: "What pests does Hoover pest control cover?", a: "Our regular pest control covers common household pests in Hoover — ants, cockroaches and roaches, spiders, silverfish, crickets, and earwigs, plus rodents like rats and mice. Treating an active wasp or hornet nest is an add-on at an additional charge. Fire ants, fleas, and ticks are handled as separate targeted treatments." },
    { q: "Is EnviroCare a local Hoover exterminator?", a: "Yes. EnviroCare is a family-owned, professional pest control company and local exterminator serving Hoover and the Birmingham area from our 16th Ave S office — the Wedgworth family has done pest control in Alabama since 1958 — with comprehensive pest control solutions for homes and businesses." },
    { q: "Do you handle roaches and rodents in Hoover?", a: "Yes — the bi-monthly pest plan targets cockroaches and rodents like rats and mice at the entry points where they seek shelter indoors, with free re-service if pests return between visits." },
    { q: "Who does commercial pest control in Hoover?", a: "EnviroCare provides commercial pest control across Hoover — restaurants, retail, and offices on the Galleria corridor — with documented, inspection-ready service built around your hours. Call (205) 991-2882." },
    { q: "How much is termite treatment in Hoover?", a: "Termite protection is priced after a free on-site termite inspection. New termite customers are offered Sentricon baiting, usually with no drilling; liquid renewals and retreatments continue only for existing liquid customers. Qualifying homes may receive up to $1,000,000 in termite damage repair coverage provided by EnviroCare, subject to the terms of the agreement. Inspection, approval, exclusions and renewal requirements apply." },
    { q: "Do you treat ticks in Hoover?", a: "Yes — the mosquito-plus-tick program adds tick and chigger coverage for $65 per month, targeting the wooded lots in Bluff Park and Ross Bridge." },
    { q: "How can I tell flying ants from termite swarmers?", a: "Check the waist, antennae, and wings. A termite swarmer has a straight, thick body, straight antennae, and four wings all the same length. A flying ant has a pinched waist, elbowed antennae, and front wings longer than the back ones. Piles of identical shed wings on a windowsill usually point to termites. Call (205) 991-2882 for a free termite inspection." },
    { q: "What happens on the first pest control visit?", a: "Your technician starts outside: the foundation, eaves, door and window frames, utility penetrations, and landscaping edges where pests get in and hide. The perimeter, entry points, and harborage are treated first, and interior treatment is added when it is warranted. Your technician walks you through what was found and treated, and if pests show up between scheduled visits, re-service is free." },
    { q: "Do you serve Riverchase, Trace Crossings, and Lake Cyrus?", a: "Yes — Hoover and ZIP 35244, including Riverchase, Bluff Park, Trace Crossings, Lake Cyrus, and Ross Bridge, are served by our Birmingham office at (205) 991-2882. Greystone, Inverness, Highland Lakes and other Shelby County 35242 addresses are served by our Alabaster office at (205) 940-6360. Give us your street address to confirm the right team." },
    { q: "Is a free termite inspection the same as a WDO letter for closing?", a: "No. The free on-site inspection prepares an EnviroCare termite protection proposal. A Wood Infestation Report (often called a WDO letter) for a home sale or refinance is a separately quoted, paid service. Ask your lender or closing professional which report is required, and tell the office your closing date when you book." },
    { q: "What should I compare in a Hoover termite proposal?", a: "Compare the inspection findings and any areas that could not be inspected, the proposed method and where it will be installed, how often stations are serviced, the renewal date and terms, any damage-repair provisions with their conditions and exclusions, and what happens if you sell the home. Read the written agreement rather than relying on a headline price or coverage figure." },
  ],
  siblings: [
    ["Over the Mountain", "/over-the-mountain"],
    ["Greystone", "/greystone"],
    ["Vestavia Hills", "/vestavia-hills"],
    ["Mountain Brook", "/mountain-brook"],
    ["Birmingham", "/birmingham"],
    ["Commercial", "/services/commercial"],
    ["Termite Control", "/services/termite-control"],
  ],
  // Birmingham office — Jefferson County incl. Hoover / 35244. 35242 (Greystone, Inverness) routes to Alabaster.
  officePhone: "(205) 991-2882",
  officeTel: "2059912882",
  officeLabel: "Birmingham",
  officeStreet: "2120 16th Ave S, Ste 302",
  officeLocality: "Birmingham",
  officePostal: "35205",
};

export default function HooverPage() {
  return <DeepCityPage config={config} />;
}
