import type { Metadata } from "next";
import Link from "next/link";
import DeepCityPage, { type DeepCityConfig } from "@/components/pages/DeepCityPage";

export const metadata: Metadata = {
  title: "Pest Control Hoover AL | Termite & Mosquito | EnviroCare",
  description:
    "Pest control, Sentricon® termite, mosquito & tick service in Hoover AL — Riverchase, Bluff Park, Ross Bridge. From $35/mo. Call (205) 991-2882.",
  alternates: { canonical: "/hoover" },
  openGraph: {
    images: ["/og/og-hoover.png"],
    title: "Pest Control Hoover AL | EnviroCare — Since 1958",
    description:
      "Family-owned pest, termite, mosquito, tick & commercial service across Hoover. No-drill Sentricon® with up to $1M EnviroCare coverage.",
    url: "https://www.envirocarellc.com/hoover",
    type: "website",
  },
};

const G = "#0A7935";

const config: DeepCityConfig = {
  name: "Hoover",
  slug: "hoover",
  badge: "Hoover · Jefferson & Shelby County · Since 1958",
  zip: "35244",
  neighborhoods: ["Riverchase", "Bluff Park", "Trace Crossings", "Inverness", "Lake Cyrus", "Ross Bridge"],
  heroIntro:
    "Pest, termite, mosquito, tick, and commercial service across Hoover — Riverchase, Bluff Park, Trace Crossings, Inverness, Lake Cyrus, and Ross Bridge. No-drill Sentricon®, seasonal yard programs, and documented commercial service for the Galleria corridor.",
  summary:
    "EnviroCare provides pest control, termite protection, mosquito, tick, and commercial pest service in Hoover, Alabama, including Riverchase, Bluff Park, Trace Crossings, Inverness, Lake Cyrus, and Ross Bridge. Bi-monthly pest control is $35/month and covers 30+ common household pests with unlimited re-service between visits. Termite protection uses the Sentricon® baiting system with no drilling and up to $1,000,000 in property coverage, subject to the terms of the agreement. A family-owned Alabama company, EnviroCare has protected homes since 1958. Call (205) 991-2882.",
  whyHeadline: "Tree-lined neighborhoods, lake lots, and steady new construction keep Hoover's pest pressure high year-round.",
  whySub: "The patterns we treat most across Hoover's homes and businesses.",
  pressureCards: [
    { emoji: "🪵", title: "Termites across established Hoover", body: "From Riverchase to Bluff Park, Hoover's settled homes and damp Shelby-Jefferson clay give Eastern subterranean termites the moisture and access they look for. Sentricon® protects without drilling, with up to $1M EnviroCare coverage." },
    { emoji: "🐜", title: "Carpenter ants in the tree canopy", body: "Hoover's mature tree-lined streets harbor carpenter ants that move into fascia, soffit, and trim. Bi-monthly exterior service keeps the whole ant family outside." },
    { emoji: "🦟", title: "Mosquitoes off the lakes & creeks", body: "Lake Cyrus, Patton Creek, and the Riverchase ponds hold the standing water mosquitoes breed in. The 30-day yard barrier treats March through October." },
    { emoji: "🐾", title: "Ticks on wooded lots", body: "Bluff Park, Inverness, and Ross Bridge lots backing up to woods carry Lone Star and dog ticks. Tick and chigger coverage bundles with mosquito in the Mosquito + Tick plan." },
    { emoji: "🔥", title: "Fire ants in new construction", body: "Trace Crossings and newer Hoover sections sit on graded red clay that fire ants colonize aggressively. Whole-yard fire ant treatment is priced separately by yard size." },
    { emoji: "🏢", title: "Commercial pressure on the Galleria corridor", body: "Restaurants, retail, and offices around the Riverchase Galleria need documented, inspection-ready service. We build commercial schedules around your hours and foot traffic." },
  ],
  services: [
    { title: "Commercial Pest Control in Hoover", body: (<>The Galleria corridor and Hoover's office and restaurant base need documented, inspection-ready pest programs.{" "}<Link href="/services/commercial" style={{ color: G, fontWeight: 600 }}>Commercial pest control</Link> runs on schedules built around your hours and foot traffic, adjusted seasonally. Call (205)&nbsp;991-2882 for a commercial walkthrough.</>) },
    { title: "Termite Treatment in Hoover", body: (<>Hoover's settled homes and damp clay make subterranean termites a year-round concern. EnviroCare protects with the{" "}<Link href="/services/termite-control" style={{ color: G, fontWeight: 600 }}>Sentricon® baiting system</Link> — no drilling. Sentricon® is priced after a free on-site WDO inspection — with coverage up to $1,000,000.{" "}<Link href="/services/wdo-letters" style={{ color: G, fontWeight: 600 }}>WDO termite letters</Link> for home sales available.</>) },
    { title: "Tick Control in Hoover", body: (<>Wooded lots in Bluff Park, Inverness, and Ross Bridge put ticks close to families and pets. EnviroCare&apos;s{" "}<Link href="/services/tick-control" style={{ color: G, fontWeight: 600 }}>mosquito-plus-tick program</Link> adds tick and chigger coverage — $65 per month. Most products knock back tick activity in treated zones; results vary with habitat.</>) },
    { title: "Mosquito Control in Hoover", body: (<>Lake Cyrus, Patton Creek, and Riverchase ponds keep mosquito pressure up spring into fall.{" "}<Link href="/services/mosquito" style={{ color: G, fontWeight: 600 }}>Mosquito control</Link> treats every 30 days, March through October — eight treatments at $45/month, spread evenly across the year by ACH. We never guarantee elimination, but most homeowners see a clear seasonal difference.</>) },
    { title: "Ant & Pest Control in Hoover", body: (<>Carpenter, odorous house, and Argentine ants are common across Hoover. The bi-monthly pest plan covers 30+ pests including most household ants — and rodents — with unlimited re-service at no extra charge.{" "}<Link href="/services/fire-ant" style={{ color: G, fontWeight: 600 }}>Fire ants</Link> in new-construction yards are priced separately by treated area.</>) },
  ],
  faqs: [
    { q: "How much is pest control in Hoover?", a: "EnviroCare's bi-monthly plan is $35 per month on ACH (or $70 per visit) and covers 30+ common pests including ants, spiders, roaches, and rodents, with unlimited free re-service between visits." },
    { q: "Who does commercial pest control in Hoover?", a: "EnviroCare provides commercial pest control across Hoover — restaurants, retail, and offices on the Galleria corridor — with documented, inspection-ready service built around your hours. Call (205) 991-2882." },
    { q: "How much is termite treatment in Hoover?", a: "Termite protection is priced after a free on-site WDO inspection. It uses Sentricon baiting with no drilling, with coverage up to $1,000,000 subject to the terms of the agreement." },
    { q: "Do you treat ticks in Hoover?", a: "Yes — the mosquito-plus-tick program adds tick and chigger coverage for $65 per month, targeting the wooded lots in Bluff Park, Inverness, and Ross Bridge." },
    { q: "Do you serve Riverchase, Trace Crossings, and Lake Cyrus?", a: "Yes — all of Hoover, including Riverchase, Bluff Park, Trace Crossings, Inverness, Lake Cyrus, and Ross Bridge. Call (205) 991-2882 to confirm your address." },
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
  // Birmingham office — Jefferson County + the Hwy 280 / 35242 corridor.
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
