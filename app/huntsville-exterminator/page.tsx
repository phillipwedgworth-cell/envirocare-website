import type { Metadata } from "next";
import ComboPage, { type ComboContent } from "@/components/ComboPage";

export const metadata: Metadata = {
  title: "Exterminator Huntsville AL | EnviroCare — Local Since 1958",
  description:
    "Need an exterminator in Huntsville? We fix the problem, then keep it from coming back — bi-monthly protection from $35/mo. (256) 937-7676.",
  alternates: { canonical: "./" },
  openGraph: {
    title: "Exterminator Huntsville AL | EnviroCare — Local Since 1958",
    description: "Need an exterminator in Huntsville? We fix the problem, then keep it from coming back — bi-monthly protection from $35/mo. (256) 937-7676.",
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Exterminator Huntsville AL | EnviroCare — Local Since 1958",
    description: "Need an exterminator in Huntsville? We fix the problem, then keep it from coming back — bi-monthly protection from $35/mo. (256) 937-7676.",
    images: ['/og-image.png'],
  },
};

const c: ComboContent = {
  eyebrow: "Exterminator · Huntsville, Alabama",
  h1: "Need an Exterminator in Huntsville?",
  h1Accent: "Fix It Today. Keep It Fixed.",
  intro: [
    "Whether it's roaches in a Jones Valley kitchen, sugar ants marching through a Providence new-build, or a brown recluse in the garage, an exterminator visit handles today's emergency. Our licensed technicians treat the active problem on visit one — interior included — and free re-visits back the work until it's done.",
    "Then we do the thing a one-time exterminator can't: stop the next problem before it starts. EnviroCare treats your home from the outside every other month, sealing Huntsville's pest pressure out at the perimeter. Family-owned since 1958, dispatched from our own office on Old Madison Pike.",
  ],
  anglesHeading: "What a Huntsville exterminator call looks like with us",
  localAngles: [
    {
      title: "Today's problem, treated today",
      body: "First visit hits the active infestation — kitchen roach treatment, ant trail sourcing, spider harborage in garages and crawlspaces. Madison County's new-construction ant problems are practically a specialty at this point.",
    },
    {
      title: "New-build pests are different",
      body: "Fresh sod arrives with fire-ant colonies; graded clay invites sugar ants; first-year homes haven't had a perimeter defense yet. Huntsville's growth corridors fill our routes with exactly this work.",
    },
    {
      title: "The exterior-first difference",
      body: "Six perimeter treatments a year keep pests from ever reaching the kitchen. You usually don't need to be home, and the $35/month autopay price doesn't spike when something extra shows up — re-service is free.",
    },
    {
      title: "A local office, not a call center",
      body: "7027 Old Madison Pike Ste 108 — real people, same technician on your route, and a direct line at (256) 937-7676. We cover Huntsville, Madison, Athens, Harvest, Hampton Cove, and Decatur.",
    },
  ],
  price: {
    label: "Bi-Monthly Pest Program — Huntsville",
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
      q: "Do you do one-time exterminator visits in Huntsville?",
      a: "Yes — $70 for a single licensed-technician visit with a 30-day guarantee. Most folks roll it into the bi-monthly program afterward since the per-visit price is the same and the pests stop returning.",
    },
    {
      q: "How quickly can someone come out?",
      a: "Routes run across Madison County daily from the Old Madison Pike office. Call (256) 937-7676 — most new services schedule within a few days, and active infestations get priority placement.",
    },
    {
      q: "What do Huntsville exterminator calls usually involve?",
      a: "Sugar ants and fire ants in newer subdivisions, German roaches in older rentals, brown recluse in Jones Valley garages and storage, wasps at the eaves, and October's stink-bug wave off Monte Sano. All covered by the program.",
    },
    {
      q: "Is termite work separate?",
      a: "Yes — termites get their own program: Sentricon® bait stations with up to $1M in damage repair coverage, which matters in Madison County where new slabs sit on freshly disturbed, termite-prone soil. The inspection is free.",
    },
  ],
  office: { name: "Huntsville Office", phone: "(256) 937-7676", tel: "2569377676", address: "7027 Old Madison Pike Ste 108, Huntsville, AL 35806" },
  cityHub: { name: "Huntsville Pest Control", href: "/huntsville" },
  servicePage: { name: "Pest Control Service", href: "/services/pest-control" },
  schemaName: "EnviroCare Exterminator — Huntsville, AL",
  canonicalPath: "/huntsville-exterminator",
};

export default function Page() {
  return <ComboPage c={c} />;
}
