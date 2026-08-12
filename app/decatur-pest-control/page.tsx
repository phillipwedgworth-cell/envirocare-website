import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { PRICING } from "@/data/pricing";

const TITLE = "Pest Control Decatur AL | River City Service | EnviroCare";
const DESC =
  `Pest control in Decatur AL from $${PRICING.plans.pest.fromMonthly}/mo — bi-monthly perimeter service built for Tennessee River humidity. Family-owned since 1958. Call (256) 937-7676.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/decatur-pest-control', title: TITLE, description: DESC, images: ["/og/og-decatur.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-decatur.png"] },
};

const c: ComboContent = {
  eyebrow: "Pest Control · Decatur, Alabama",
  h1: "Pest Control in Decatur,",
  h1Accent: "Where the River Sets the Rules.",
  intro: [
    "Decatur lives with the Tennessee River the way other towns live with weather. The river moderates winter — so pest populations here don't die back the way they do even thirty miles south — and it pumps humidity into every summer week, which keeps roaches, camel crickets, and millipedes moving all season. Add Wheeler National Wildlife Refuge wrapping the city's eastern edge, and Decatur has one of North Alabama's most persistent, most renewable pest reservoirs next door.",
    "That's why our Decatur program is bi-monthly and perimeter-first: a barrier maintained every other month at the foundation, harborage lines treated where the moisture sits, and free re-service between visits when the river weather wins a round anyway. The Wedgworth family has been doing this for Alabama families since 1958 — four generations, and a real person at the office when you call.",
  ],
  anglesHeading: "Decatur's pest pressure, neighborhood by neighborhood",
  localAngles: [
    {
      title: "Historic districts: age plus shade",
      body: "Old Decatur and Albany's tree canopy and pre-war foundations are beautiful pest habitat — deep shade holds moisture, and settled masonry offers entry gaps a new slab doesn't have. Treatment here emphasizes foundation harborage and the crawlspace perimeter.",
    },
    {
      title: "Southwest Decatur & Burningtree",
      body: "Established lawns, mature landscaping, and irrigation make the Burningtree area prime territory for big smoky-brown roaches and the ant colonies that mine old root systems. The perimeter barrier plus mulch-line treatment keeps them in the yard's ecosystem, not the kitchen's.",
    },
    {
      title: "Refuge-edge insect load",
      body: "Homes toward Wheeler's boundary or the Flint Creek fingers get more of everything — it's a protected breeding ground fifty yards away. You can't (and shouldn't) change the refuge; a maintained barrier changes what crosses your foundation line.",
    },
    {
      title: "Mild river winters mean no off-season",
      body: "The river keeps Decatur's cold snaps shorter and shallower, so pest populations carry through winter better than the calendar suggests. Bi-monthly service through the cool months is why spring doesn't start with an infestation already indoors.",
    },
  ],
  price: {
    label: "Bi-Monthly Pest Control — Decatur",
    amount: `From $${PRICING.plans.pest.fromMonthly}/mo`,
    sub: `$${PRICING.plans.pest.startup} startup · ${PRICING.achFootnoteShort}`,
    bullets: [
      "Every-other-month exterior perimeter treatment",
      "30+ Alabama pests covered",
      "Free re-service between visits",
      "Interior treatment on request at no extra charge",
      "EPA-registered products applied per label directions",
    ],
  },
  faqs: [
    {
      q: "Does living near Wheeler Refuge mean more pests?",
      a: "More pressure, yes — a protected wetland is a permanent insect nursery, and homes near the boundary see the overflow. It doesn't mean pest control can't work; it means the barrier has to be maintained on schedule rather than sprayed once and forgotten. That's exactly what the bi-monthly program is for.",
    },
    {
      q: "Why do I get roaches in summer even with a clean house?",
      a: "Decatur's big outdoor roaches — smoky browns mostly — live in mulch, gutters, and tree holes, and river humidity keeps them active and wandering. They come in through gaps at night hunting moisture, cleanliness aside. Perimeter treatment intercepts them where they actually travel.",
    },
    {
      q: "Do you treat older homes with crawlspaces?",
      a: "Constantly — a large share of Old Decatur and Albany is crawlspace construction. We treat the crawl perimeter and the moisture-driven harborage lines that make those spaces cricket and millipede habitat.",
    },
    {
      q: "Which office covers Decatur?",
      a: "Our North Alabama office runs Decatur and Morgan County routes — call (256) 937-7676 and you're talking to the team that actually drives here, not a national dispatch center.",
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Decatur Service Area", href: "/decatur" },
  servicePage: { name: "Pest Control Service", href: "/services/pest-control" },
  schemaName: "EnviroCare Pest Control — Decatur, AL",
  canonicalPath: "/decatur-pest-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
