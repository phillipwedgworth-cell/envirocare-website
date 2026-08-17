import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { PRICING } from "@/data/pricing";

const TITLE = "Pest Control Madison AL | Bi-Monthly Service | EnviroCare";
const DESC =
  `Pest control in Madison AL from $${PRICING.plans.pest.fromMonthly}/mo — bi-monthly perimeter service covering 30+ pests, free re-service between visits. Family-owned since 1958. Call (256) 937-7676.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: 'https://www.envirocarellc.com/madison-pest-control', title: TITLE, description: DESC, images: ["/og/og-madison.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-madison.png"] },
};

const c: ComboContent = {
  eyebrow: "Pest Control · Madison, Alabama",
  h1: "Pest Control in Madison,",
  h1Accent: "Built for a City That's Still Being Built.",
  intro: [
    "Madison has doubled in a generation, and most of it is new: Clift Farm and Town Madison rising along I-565, Mill Creek and Heritage-area subdivisions filling in westward, starter streets going vertical off County Line Road. Every one of those builds broke ground on red-clay farmland — and the ants, spiders, roaches, and crickets that lived in that soil didn't leave. They moved into the nearest foundation, which is now somebody's kitchen wall.",
    "EnviroCare's North Alabama office services Madison on a bi-monthly perimeter program: we treat the outside barrier every other month so pests are stopped before they're inside, and if anything shows up between visits, we come back at no charge. Fourth-generation family company, since 1958 — when you call, you reach a person, not a national queue.",
  ],
  anglesHeading: "What pest pressure looks like in Madison specifically",
  localAngles: [
    {
      title: "New-construction ant surges",
      body: "Grading a lot scatters established ant colonies, and odorous house ants re-colonize along fresh slab edges and irrigation lines. New Clift Farm and Town Madison homes often see trails within the first year — a perimeter barrier plus targeted baiting breaks the cycle instead of chasing it indoors.",
    },
    {
      title: "Red clay, wet springs, smooth crickets",
      body: "Madison's clay holds moisture against foundations through the Tennessee Valley's wet spring. That's exactly what camel crickets, millipedes, and earwigs follow into garages and basements. We treat the moisture line they travel, not just the garage floor where you see them.",
    },
    {
      title: "Greenway and creek-line spiders",
      body: "Homes backing the Bradford Creek greenway and Mill Creek corridors get the insect life of the creek — and the wolf spiders and orb weavers that hunt it. Every visit includes knocking down webs at eaves and entries and treating the perimeter that feeds them.",
    },
    {
      title: "Transplant-friendly, contract-honest",
      body: "A lot of Madison is new to Alabama — Redstone, defense, aerospace. If you've never dealt with Southern pest pressure, we'll walk the property with you on the first visit and explain what's normal here, what isn't, and exactly what the plan covers.",
    },
  ],
  price: {
    label: "Bi-Monthly Pest Control — Madison",
    amount: `From $${PRICING.plans.pest.fromMonthly}/mo`,
    sub: `$${PRICING.plans.pest.startup} startup · ${PRICING.achFootnoteShort}`,
    bullets: [
      "Every-other-month exterior perimeter treatment",
      "30+ Alabama pests covered",
      "Free re-service between visits if anything comes back",
      "Interior treated on request — no extra charge",
      "EPA-registered products applied per label directions",
    ],
  },
  faqs: [
    {
      q: "Why am I seeing ants in a brand-new Madison house?",
      a: "New construction disturbs the colonies that were already living on the lot, and the survivors relocate along your slab and utility penetrations. It's the most common first-year call we get in Clift Farm and Town Madison. A perimeter treatment plus baiting at the trails resolves it — and the bi-monthly schedule keeps the next colony from moving in.",
    },
    {
      q: "Do you treat inside the house or just outside?",
      a: "The program is exterior-first — stopping pests at the barrier means fewer products used inside your home. Interior treatment is included whenever you want it, at no extra charge; just ask when we schedule your visit.",
    },
    {
      q: "What happens if pests show up between visits?",
      a: "We come back and re-treat at no charge. Covered re-service between scheduled visits is part of the plan, not an upsell.",
    },
    {
      q: "Does the Madison plan cover mosquitoes, fire ants, or termites?",
      a: `Those are separate services — mosquito treatment runs seasonally March through November, fire ant control is priced by yard size, and termite protection is quoted after a free WDO inspection. Many Madison customers pair one or more with pest control for one technician and one invoice.`,
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Madison Service Area", href: "/madison" },
  servicePage: { name: "Pest Control Service", href: "/services/pest-control" },
  schemaName: "EnviroCare Pest Control — Madison, AL",
  canonicalPath: "/madison-pest-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
