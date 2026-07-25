import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";
import { PRICING } from "@/data/pricing";

const TITLE = "Exterminator Decatur AL | Local Since 1958 | EnviroCare";
const DESC =
  `Need an exterminator in Decatur AL? Fourth-generation Alabama company — one-time treatments or plans from $${PRICING.plans.pest.fromMonthly}/mo. Real local techs. (256) 937-7676.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "./" },
  openGraph: { title: TITLE, description: DESC, images: ["/og/og-decatur.png"], type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/og/og-decatur.png"] },
};

const c: ComboContent = {
  eyebrow: "Exterminator · Decatur, Alabama",
  h1: "Looking for a Decatur Exterminator?",
  h1Accent: "Hire the Family, Skip the Franchise.",
  intro: [
    "Type \"exterminator Decatur AL\" and you'll mostly get national brands whose nearest decision-maker is three states away. EnviroCare is the other option: an Alabama family company in its fourth generation, running Decatur and Morgan County routes out of our North Alabama office — close enough that the technician treating your house drove past Point Mallard to get there.",
    "Whether it's a one-time problem — a wasp nest over the back door, roaches after a week of river fog, ants marching the countertop — or the start of something recurring, you get the same approach: identify it, treat it correctly, and tell you honestly whether it needs ongoing service or doesn't.",
  ],
  anglesHeading: "The calls we get from Decatur",
  localAngles: [
    {
      title: "Smoky-brown roaches off the river",
      body: "Decatur's signature call. Humid nights send these big outdoor roaches out of tree holes and mulch into kitchens and bathrooms. One-time knockdown works for an incident; the perimeter plan is what makes them stop being a summer tradition.",
    },
    {
      title: "Ants after every river-weather swing",
      body: "Odorous house ants surge indoors after heavy rain and again in late-summer drought — both are moisture events, and Decatur gets plenty of each. Baiting the trail plus treating the foundation line beats spraying the counter every time.",
    },
    {
      title: "Wasps and yellow jackets",
      body: "Eaves in Albany's historic porches, playsets in Southwest Decatur, irrigation boxes in Burningtree. Nest removed, void treated, entry conditions explained so next spring's queen looks elsewhere.",
    },
    {
      title: "Millipedes and crickets after high water",
      body: "When the river runs high or a wet week saturates Decatur's clay, millipedes and camel crickets abandon the soil in numbers — garages and daylight basements along the low side of town fill up first. It looks alarming and treats straightforwardly: the moisture line at the foundation is the highway, and that's what we treat.",
    },
    {
      title: "Straight answers on one-time vs. plan",
      body: `A single nest is a single visit. German roaches or recurring ants are a program. One-time service is available with no plan attached; the bi-monthly plan (from $${PRICING.plans.pest.fromMonthly}/mo, $${PRICING.plans.pest.startup} startup) exists for problems that recur — and we'll tell you which one you're looking at.`,
    },
  ],
  price: {
    label: "Exterminator Service — Decatur",
    amount: `From $${PRICING.plans.pest.fromMonthly}/mo`,
    sub: `bi-monthly plan · $${PRICING.plans.pest.startup} startup · one-time treatments available`,
    bullets: [
      "Local technicians who run Decatur weekly",
      "Identification first — treatment matched to the actual pest",
      "One-time service with no plan required",
      "Free re-service between visits on the plan",
      "EPA-registered products applied per label directions",
    ],
  },
  faqs: [
    {
      q: "Can you handle a one-time problem without signing me up for anything?",
      a: "Yes. One-time treatments are a real service, priced by the pest and the job when you call. If the problem is the recurring kind we'll say so plainly — but the choice stays yours.",
    },
    {
      q: "Why are the roaches here so big?",
      a: "Those are smoky-brown roaches — outdoor breeders that thrive in Decatur's river humidity and mature-tree neighborhoods. They're not a sanitation verdict on your home; they wander in hunting moisture. Perimeter interception is the fix.",
    },
    {
      q: "Do you serve all of Decatur and Morgan County?",
      a: "Yes — from Old Decatur and Albany through Southwest, Burningtree, and out the Beltline. Priceville and the county routes run on the same schedule. Call (256) 937-7676.",
    },
    {
      q: "What don't you treat?",
      a: "Bed bugs and wildlife/animal removal aren't services we offer, and we'll tell you that on the phone rather than waste your visit fee. Insects, spiders, and everything our plans list — that's our lane, and we're good in it.",
    },
  ],
  office: { name: "North Alabama Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Decatur Service Area", href: "/decatur" },
  servicePage: { name: "Pest Control Service", href: "/services/pest-control" },
  schemaName: "EnviroCare Exterminator — Decatur, AL",
  canonicalPath: "/decatur-exterminator",
};

export default function Page() {
  return <ComboPage c={c} />;
}
