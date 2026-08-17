import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { PRICING } from "@/data/pricing";

const TITLE = "Exterminator Madison AL | Local, Family-Owned | EnviroCare";
const DESC =
  `Looking for an exterminator in Madison AL? Local, fourth-generation company — one-time treatments or bi-monthly plans from $${PRICING.plans.pest.fromMonthly}/mo. Call (256) 937-7676.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/madison-exterminator', title: TITLE, description: DESC, images: ["/og/og-madison.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-madison.png"] },
};

const c: ComboContent = {
  eyebrow: "Exterminator · Madison, Alabama",
  h1: "Need an Exterminator in Madison?",
  h1Accent: "Get a Neighbor, Not a Call Center.",
  intro: [
    "When people search \"exterminator,\" they usually have a problem right now — a roach in the pantry, a wasp nest over the door, ant trails across the counter before guests arrive. What Madison mostly gets for that search is national franchises routing you through a scripted queue. EnviroCare is the other thing: a fourth-generation Alabama family company, working Madison from our office ten minutes away on Old Madison Pike.",
    "We handle the immediate problem — identified, treated, explained — and then tell you honestly whether it needs an ongoing plan or genuinely doesn't. A single wasp nest doesn't need a subscription. German roaches in a kitchen do. You'll get the real answer either way.",
  ],
  anglesHeading: "What Madison calls us about most",
  localAngles: [
    {
      title: "Roaches: the two very different kinds",
      body: "Big outdoor smoky-brown roaches wander in from mulch and gutters — annoying, fixable with a perimeter barrier. German roaches breeding behind a fridge are a different problem needing targeted gel baiting over several visits. Knowing which one you have changes everything; that identification is the first thing we do.",
    },
    {
      title: "Wasps, hornets, and yellow jackets",
      body: "Eaves, playsets, grill covers, and irrigation boxes across Madison's newer neighborhoods. We remove the nest, treat the void, and point out the conditions that invited it — untreated soffit gaps invite the next queen in spring.",
    },
    {
      title: "Spiders in garages and basements",
      body: "Wolf spiders and orb weavers follow the insects; the occasional brown recluse follows the clutter. Treatment targets the prey population and harborage lines, which is why it works when web-spraying doesn't.",
    },
    {
      title: "One-time fix or ongoing plan — your call",
      body: `One-time treatments for a specific problem are exactly that. If what you actually want is not seeing pests again, the bi-monthly plan (from $${PRICING.plans.pest.fromMonthly}/mo, $${PRICING.plans.pest.startup} startup) covers 30+ pests with free re-service between visits.`,
    },
  ],
  price: {
    label: "Exterminator Service — Madison",
    amount: `From $${PRICING.plans.pest.fromMonthly}/mo`,
    sub: `bi-monthly plan · $${PRICING.plans.pest.startup} startup · one-time treatments also available`,
    bullets: [
      "Same local technicians on every route",
      "Problem identified and explained, not just sprayed",
      "One-time service available — no plan required",
      "Free re-service between visits on the plan",
      "EPA-registered products applied per label directions",
    ],
  },
  faqs: [
    {
      q: "What's the difference between an exterminator and pest control?",
      a: "Mostly marketing-era vocabulary. \"Exterminator\" usually means someone who kills what you can see today; modern pest control prevents the next wave by treating the perimeter and conditions. We do both — the urgent fix first, prevention if you want it.",
    },
    {
      q: "Do I have to sign up for a plan to get one visit?",
      a: "No. One-time treatments are available for a specific problem — priced by the pest and the size of the job when we schedule. If the problem is the kind that recurs, we'll say so and let you decide.",
    },
    {
      q: "How fast can someone come out to Madison?",
      a: "Our North Alabama office runs Madison routes continuously, and we schedule promptly — call (256) 937-7676 and we'll give you a real slot, not a window promise we can't keep.",
    },
    {
      q: "Do you handle bed bugs or wildlife?",
      a: "No — we don't offer bed bug treatment or wildlife/animal removal, and we'd rather tell you that upfront than sell you the wrong service. For insects, spiders, and the pests our plans cover, we're your call.",
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Madison Service Area", href: "/madison" },
  servicePage: { name: "Pest Control Service", href: "/services/pest-control" },
  schemaName: "EnviroCare Exterminator — Madison, AL",
  canonicalPath: "/madison-exterminator",
};

export default function Page() {
  return <ComboPage c={c} />;
}
