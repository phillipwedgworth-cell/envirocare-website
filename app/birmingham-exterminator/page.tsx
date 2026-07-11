import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Exterminator Birmingham AL | EnviroCare — Family-Owned Since 1958",
  description:
    "Looking for an exterminator in Birmingham? Here's what we do differently: exterior-first bi-monthly protection that stops pests before they're inside. From $35/mo. (205) 940-6360.",
  alternates: { canonical: "./" },
};

const c: ComboContent = {
  eyebrow: "Exterminator · Birmingham, Alabama",
  h1: "Looking for an Exterminator in Birmingham?",
  h1Accent: "Here's What We Do Differently.",
  intro: [
    "When people search for an exterminator, they usually have a problem right now — roaches in the kitchen, ants in the bathroom, a spider situation in the garage. We handle that. A licensed technician treats the active problem on the first visit, interior and exterior, and free re-visits stand behind it until it's gone.",
    "But here's the difference between an exterminator and EnviroCare: an exterminator comes back every time something gets in. We treat your home from the outside, every other month, so pests stop getting in at all. Four generations of the Wedgworth family have refined that exterior-first approach across Birmingham since 1958.",
  ],
  anglesHeading: "Exterminator visit vs. the EnviroCare program",
  localAngles: [
    {
      title: "Kill today's problem first",
      body: "The first visit treats what brought you here — German roaches, sugar ants, spiders, wasps, whatever Birmingham's humidity has produced. Interior treatment is included whenever you're seeing pests inside.",
    },
    {
      title: "Then seal the perimeter",
      body: "Foundation, entry points, eaves, and webbing get a long-lasting exterior barrier. In Birmingham's older neighborhoods — where settled foundations mean plenty of entry cracks — the perimeter is where the battle is actually won.",
    },
    {
      title: "Bi-monthly beats emergency calls",
      body: "Six exterior treatments a year, $35/month on autopay, and you usually don't need to be home. Cheaper than two emergency exterminator visits, and the problems stop recurring.",
    },
    {
      title: "Free re-service in between",
      body: "If anything shows up between visits, we come back at no charge — that's standard, not an upsell. No long-term contract when paying per visit; monthly pricing uses a 12-month ACH billing agreement.",
    },
  ],
  price: {
    label: "Bi-Monthly Pest Program — Birmingham",
    amount: "$35/mo",
    sub: "on ACH autopay · or $70 per visit",
    bullets: [
      "30+ Alabama pests covered",
      "Fire ant & tick treatment available from $150",
      "Interior service whenever needed",
      "Unlimited free re-services",
      "Equal monthly ACH payments (12-month agreement)",
    ],
  },
  faqs: [
    {
      q: "Do you do one-time exterminator visits in Birmingham?",
      a: "Yes — a single visit with a licensed technician runs $70 and includes a 30-day guarantee with follow-up. Most customers convert it to the bi-monthly program afterward because it costs the same per visit and the problems stop coming back.",
    },
    {
      q: "How fast can you get to my house?",
      a: "Our Birmingham-area office is at 2025 Butler Rd in Alabaster with routes across the metro daily. Call (205) 940-6360 — most new services are scheduled within a few days, and active infestations get priority.",
    },
    {
      q: "What pests do Birmingham exterminator calls usually involve?",
      a: "German and American roaches in older kitchens, odorous house ants after rain, brown recluse in garages and basements, wasps at the eaves, and fall invaders off Red Mountain. All covered under the program — roach and ant work is our bread and butter.",
    },
    {
      q: "What about termites?",
      a: "Termites are a separate program — Sentricon® bait stations with up to $1M in damage repair coverage, because Birmingham's old housing stock on damp clay is prime termite ground. The inspection is free.",
    },
  ],
  office: { name: "Birmingham Office", phone: "(205) 940-6360", tel: "2059406360", address: "2025 Butler Rd, Alabaster, AL 35007" },
  cityHub: { name: "Birmingham Pest Control", href: "/birmingham" },
  servicePage: { name: "Pest Control Service", href: "/services/pest-control" },
  schemaName: "EnviroCare Exterminator — Birmingham, AL",
  canonicalPath: "/birmingham-exterminator",
};

export default function Page() {
  return <ComboPage c={c} />;
}
