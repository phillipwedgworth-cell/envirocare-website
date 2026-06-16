import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Termite Control Birmingham AL | Sentricon® · Up to $1M Coverage | EnviroCare",
  description:
    "Termite control in Birmingham — pre-1980 housing stock on damp clay soil is prime subterranean termite ground. Sentricon® with up to $1M repair coverage, no drilling. (205) 940-6360.",
  alternates: { canonical: "./" },
};

const c: ComboContent = {
  eyebrow: "Termite Control · Birmingham, Alabama",
  h1: "Termite Control in Birmingham —",
  h1Accent: "Protect the House, Not Just Treat It.",
  intro: [
    "Birmingham is one of the heaviest subterranean termite markets in America: a city of pre-1980 homes standing on moist red clay, in a climate that never gets cold enough to slow a colony down. Eastern subterranean termites cause more damage in Alabama each year than fire and storms combined — and homeowner's insurance doesn't cover a dollar of it.",
    "EnviroCare has protected Birmingham homes since 1958 — four generations of the Wedgworth family, Sentricon® Certified Specialists, with up to $1,000,000 in damage repair coverage standing behind the work.",
  ],
  anglesHeading: "Why Birmingham homes are termite targets",
  localAngles: [
    {
      title: "Pre-1980 housing stock",
      body: "Highland Park, Crestwood, Forest Park, Homewood, and most Over-the-Mountain neighborhoods are full of homes with original foundations, vented crawlspaces, and decades of soil contact. That's exactly the access subterranean termites hunt for.",
    },
    {
      title: "Red clay that holds moisture",
      body: "Jefferson County's clay soil stays damp against foundations year-round — termites travel through moisture, and Birmingham's soil gives them a highway. Sentricon® stations intercept them in that soil before they reach wood.",
    },
    {
      title: "No drilling in historic masonry",
      body: "Liquid treatments drill holes every 12 inches through slabs, patios, and driveways. Sentricon® bait stations go in the ground around the perimeter — nothing drilled, no tank trucks, no scarred brick on a 1920s foundation.",
    },
    {
      title: "Colony elimination, not a chemical moat",
      body: "Bait gets carried back to the colony and ends it — including the queen. A liquid barrier just redirects foragers until it degrades in 5–7 years.",
    },
  ],
  price: {
    label: "Sentricon® Protection — Birmingham",
    amount: "Free inspection",
    sub: "priced after a free WDO inspection",
    bullets: [
      "Sentricon® Always Active™ bait stations",
      "Up to $1,000,000 damage repair coverage",
      "Annual inspection + station service",
      "Free WDO letter yearly for active customers",
      "Free termite inspection to start — no obligation",
    ],
  },
  faqs: [
    {
      q: "How do I know if my Birmingham home has termites?",
      a: "Mud tubes on the foundation, swarmers (flying termites) in spring, hollow-sounding wood, and bubbling paint are the classic signs — but most active colonies show nothing at all. The free inspection covers the foundation, crawlspace, and attic access.",
    },
    {
      q: "What does the $1M coverage actually mean?",
      a: "If subterranean termites damage your home while you're on the Sentricon® Always Active™ program and we've maintained it, EnviroCare covers repairs up to $1,000,000. It's our guarantee, not a vague warranty.",
    },
    {
      q: "Is Sentricon® better than a liquid treatment for older homes?",
      a: "For Birmingham's housing stock, almost always. Liquid requires drilling through original slabs and masonry and retreating every 5–7 years. Sentricon® stations install in the soil with zero drilling and eliminate the colony itself.",
    },
    {
      q: "I'm buying or selling a home — can you handle the termite letter?",
      a: "Yes — we issue the official Alabama Wood Infestation Report (WDO letter) accepted by every lender, usually within 48 hours of inspection. One per year is free for active termite customers.",
    },
  ],
  office: { name: "Birmingham Office", phone: "(205) 940-6360", tel: "2059406360", address: "2025 Butler Rd, Alabaster, AL 35007" },
  cityHub: { name: "Birmingham Pest Control", href: "/birmingham" },
  servicePage: { name: "Termite Control Service", href: "/services/termite-control" },
  schemaName: "EnviroCare Termite Control — Birmingham, AL",
  canonicalPath: "/birmingham-termite-control",
};

export default function Page() {
  return <ComboPage c={c} />;
}
