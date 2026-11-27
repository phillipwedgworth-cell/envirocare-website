import { withOpenGraph } from '@/lib/seo/open-graph';
import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { PRICING } from "@/data/pricing";

// Added 2026-11-26 from BrightLocal's AI Insights (Alabaster, Oct 24 2026), which
// named Vestavia Hills among the cities that needed a page for each service.
// /vestavia-hills stays the "pest control Vestavia Hills" page; this one answers
// the "exterminator" search, the same split used for Birmingham, Huntsville,
// Madison and Decatur. Local details only from /vestavia-hills (fall invaders off
// Rocky Ridge, spiders on wooded lots, fire ants in Liberty Park clay). Prices
// only from data/pricing.ts. Jefferson County -> 16th Ave S office.

const pest = PRICING.plans.pest;
const TITLE = "Exterminator in Vestavia Hills, AL | EnviroCare";
const DESC =
  `Exterminator in Vestavia Hills, AL: first-visit treatment inside and out, then bi-monthly exterior service from $${pest.fromMonthly}/month on ACH. Call (205) 991-2882.`;

export const metadata: Metadata = withOpenGraph({
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { url: "https://www.envirocarellc.com/vestavia-hills-exterminator", title: TITLE, description: DESC, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
});

const c: ComboContent = {
  eyebrow: "Exterminator · Vestavia Hills, Alabama",
  h1: "Need an Exterminator in Vestavia Hills?",
  h1Accent: "Start With the Problem, Then Keep It Outside.",
  intro: [
    "Most people who search for an exterminator in Vestavia Hills have something in the house right now: spiders in the garage off a wooded lot, ants in the kitchen after a week of rain, or a south wall covered in lady beetles and stink bugs in October. The first visit deals with that. A licensed technician treats the active problem inside and out, and if pests come back between scheduled visits, we come back at no charge.",
    `After that, the work moves outside. Our bi-monthly program treats the foundation, entry points and eaves every other month so pests have a harder time getting in at all. It is $${pest.fromMonthly}/month on ACH autopay or $${pest.perVisit} per bi-monthly visit, served from our Birmingham office on 16th Ave S.`,
  ],
  anglesHeading: "What Vestavia Hills exterminator calls usually involve",
  localAngles: [
    {
      title: "Spiders off the tree line",
      body: "Wooded lots and green corridors bring brown recluses and black widows into garages, crawlspaces and storage areas. We treat the harborage zones at the foundation and sweep the webbing at the eaves.",
    },
    {
      title: "Fall invaders off the ridge",
      body: "Every October the ridge above Rocky Ridge and Vestavia East pushes Asian lady beetles, stink bugs and boxelder bugs onto sunny walls. Exterior treatment before they settle in keeps far fewer of them from finding the gaps around windows and soffits.",
    },
    {
      title: "Ants after the rain",
      body: "Clay soil along the Cahaba watershed floods ant nests after a storm, and the colonies move toward the house. Nuisance ants are part of the regular program. Fire ants are a separate, standalone treatment.",
    },
    {
      title: "Fire ants in Liberty Park yards",
      body: "Newer subdivisions on disturbed red clay are fire ant country. Fire ant treatment is open to anyone, whether or not you are on a pest plan, and the minimum is $150.",
    },
  ],
  sections: [
    {
      heading: "What the regular program covers",
      paras: [
        "The bi-monthly service covers the common household pests that pressure Alabama homes, with interior service whenever you are seeing pests inside. Some pests need their own targeted treatment and are not part of the standard plan.",
      ],
      list: [
        "Covered: ants (other than fire ants), cockroaches, spiders, silverfish, crickets and earwigs",
        "Eave treatment that discourages wasps from building; active nests are an add-on",
        "Separate treatments: fire ants, fleas (an interior service) and ticks (a seasonal yard treatment)",
        "Termites are a separate Sentricon® program that starts with a free termite inspection",
      ],
    },
  ],
  price: {
    label: "Bi-Monthly Pest Program — Vestavia Hills",
    amount: `$${pest.fromMonthly}/mo`,
    sub: `on ACH autopay · or $${pest.perVisit} per visit`,
    bullets: [
      "First visit treats the active problem, inside and out",
      "Exterior treatment every other month",
      "Interior service whenever needed",
      "Free re-services between scheduled visits",
      "Equal monthly ACH payments (12-month agreement)",
    ],
  },
  faqs: [
    {
      q: "How much does an exterminator cost in Vestavia Hills?",
      a: `The bi-monthly program is $${pest.fromMonthly}/month on ACH, a 12-month agreement billed in equal monthly payments, or $${pest.perVisit} per bi-monthly visit. The initial service is a separate one-time charge, $${PRICING.initialServiceRegular} regular, currently $${pest.startup} (${PRICING.initialServicePromo.label}). Terms are confirmed in writing before service starts.`,
    },
    {
      q: "Do you treat inside the house?",
      a: "Yes. If pests show up inside between visits, we come back and treat inside at no extra charge. The regular schedule focuses on the exterior because that is where most pests get in.",
    },
    {
      q: "What about wasps and carpenter bees?",
      a: "Eave treatment discourages wasps from building, and active stinging-insect nests are an add-on for pest customers. Carpenter bee service is available to existing customers only.",
    },
    {
      q: "Is fire ant treatment included?",
      a: "No. Fire ant control is a standalone service that is open to anyone. $150 minimum, and larger properties are priced by the square footage treated, with the number given before any work starts.",
    },
    {
      q: "Do you cover Cahaba Heights, Liberty Park and Rocky Ridge?",
      a: "Yes. Our Birmingham office serves all of Vestavia Hills, including Cahaba Heights, Rocky Ridge, Liberty Park, Vestavia East and the Highway 31 corridor. Call (205) 991-2882 and we will confirm your address.",
    },
  ],
  office: { name: "Birmingham Office", phone: "(205) 991-2882", tel: "2059912882", address: "2120 16th Ave S, Ste 302, Birmingham, AL 35205" },
  cityHub: { name: "Vestavia Hills Pest Control", href: "/vestavia-hills" },
  servicePage: { name: "Pest Control Service", href: "/services/pest-control" },
  related: [
    { name: "Termite Control in Vestavia Hills", href: "/vestavia-hills-termite-control" },
    { name: "Mosquito Control in Vestavia Hills", href: "/vestavia-hills-mosquito-control" },
    { name: "Fire Ant Control", href: "/services/fire-ant" },
  ],
  areaServed: [
    { name: "Cahaba Heights", href: "/cahaba-heights" },
    { name: "Liberty Park", href: "/liberty-park" },
    { name: "Mountain Brook", href: "/mountain-brook" },
    { name: "Homewood", href: "/homewood" },
    { name: "Hoover", href: "/hoover" },
  ],
  schemaName: "EnviroCare Exterminator — Vestavia Hills, AL",
  city: "Vestavia Hills",
  serviceType: "Pest control",
  offers: ["fireAnt"],
  canonicalPath: "/vestavia-hills-exterminator",
};

export default function Page() {
  return <ComboPage c={c} />;
}
