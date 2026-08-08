import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

const TITLE = "Termite Control Decatur AL | Sentricon® | EnviroCare";
const DESC =
  "Termite control in Decatur AL — river humidity keeps colonies active nearly year-round. Sentricon® with up to $1M EnviroCare-backed coverage. Free inspection. (256) 937-7676.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { title: TITLE, description: DESC, images: ["/og/og-decatur.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-decatur.png"] },
};

const c: ComboContent = {
  eyebrow: "Termite Control · Decatur, Alabama",
  h1: "Termite Control in Decatur,",
  h1Accent: "Where the River Never Lets the Soil Dry Out.",
  intro: [
    "Subterranean termites need one thing above all: moist soil to travel through. The Tennessee River gives Decatur exactly that, all year — riverside humidity, clay that holds every rain, and winters mild enough that colonies barely pause. Morgan County termite pressure isn't a season here; it's a constant with a spring swarm on top.",
    "EnviroCare protects Decatur homes with the Sentricon® Always Active™ bait system: in-ground stations around the perimeter that intercept foragers and eliminate the colony in the soil, before it reaches sill plates and studs. No drilling through slabs or historic brick, no tank truck — and up to $1,000,000 in damage repair coverage subject to the terms of the agreement.",
  ],
  anglesHeading: "Decatur's termite math",
  localAngles: [
    {
      title: "Historic Albany and Old Decatur",
      body: "Pre-war framing, decades of soil contact, and additions built onto additions — Decatur's historic districts are high-value and high-exposure. Bait stations protect these homes without a single hole drilled in century-old masonry, and the colony dies in the yard, not the walls.",
    },
    {
      title: "Crawlspace country",
      body: "Much of established Decatur is crawlspace construction over river-damp soil. That's inspectable — a real advantage over slab — but only if someone inspects it. Annual service includes eyes on the crawl perimeter that most homeowners haven't seen since closing.",
    },
    {
      title: "Springtime swarms off the water",
      body: "Warm April evenings after rain bring the swarms — winged reproductives leaving mature colonies, often first noticed as shed wings on windowsills. Wings on YOUR sill mean a mature colony within striking distance. That's a free-inspection call, same week.",
    },
    {
      title: "The letter every closing needs",
      body: "Alabama lenders require a WDO letter at closing. Active Sentricon® customers get one free every year — and in Decatur's steady real-estate market, walking into a sale with current termite documentation is leverage.",
    },
  ],
  price: {
    label: "Sentricon® Protection — Decatur",
    amount: "Free inspection",
    sub: "priced after a free WDO inspection",
    bullets: [
      "Sentricon® Always Active™ bait stations",
      "Up to $1,000,000 damage repair coverage — subject to the terms of the agreement",
      "No drilling — historic-home friendly",
      "Annual inspection + station service",
      "Free WDO letter yearly for active customers",
    ],
  },
  faqs: [
    {
      q: "I found discarded wings on a windowsill — how urgent is this?",
      a: "Urgent enough to inspect this week, calm enough not to panic. Wings indoors usually mean a mature colony swarmed nearby — sometimes from your own soil line. The inspection is free, takes 20–30 minutes, and tells you whether you're looking at prevention or an active intercept.",
    },
    {
      q: "Does river humidity really change termite risk?",
      a: "Materially. Colonies forage through moisture, and Decatur's soil rarely dries to the depths termites work in. Homes here face longer active seasons and steadier pressure than drier markets — which is exactly the scenario continuous bait monitoring was designed for.",
    },
    {
      q: "Why don't you publish a termite price for Decatur?",
      a: "Because an honest number doesn't exist before the inspection. Crawlspace versus slab, additions, soil contact, prior treatment history — each changes the station plan. The inspection is free and the quote that follows it is exact, not a teaser.",
    },
    {
      q: "Who stands behind the $1,000,000 coverage?",
      a: "EnviroCare does — it's our own damage repair coverage, subject to the terms of the agreement, not the equipment manufacturer's. It stays with the house when it sells, which Decatur buyers' agents notice.",
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Decatur Service Area", href: "/decatur" },
  servicePage: { name: "Termite Control Service", href: "/services/termite-control" },
  schemaName: "EnviroCare Termite Control — Decatur, AL",
  canonicalPath: "/decatur-termite-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
