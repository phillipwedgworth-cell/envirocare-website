// app/pricing/page.tsx — server wrapper so metadata is exported correctly
// Interactive content lives in PricingContent.tsx ("use client")

import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pest Control Pricing Alabama | Starting at $35/mo | EnviroCare",
  description:
    "Honest Alabama pest control pricing — Pest Control $35/mo, Sentricon Termite $32/mo, Mosquito+Tick $49/mo. No contract, no initial fee. Compare vs. Cook's and Waynes.",
  alternates: { canonical: './' },
};

export default function PricingPage() {
  return <PricingContent />;
}
