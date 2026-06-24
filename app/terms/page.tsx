import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | EnviroCare Pest & Termite Services",
  description:
    "Terms of service for EnviroCare Pest & Termite Services. Covers pest control, Sentricon® termite, mosquito, and tick services. Alabama governing law.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const BRAND_GREEN = "#0A7935";
const DEEP = "#07642B";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

export default function TermsPage() {
  const serif: React.CSSProperties = { fontFamily: "var(--font-serif)" };
  const sans: React.CSSProperties = { fontFamily: "var(--font-sans)" };

  return (
    <main style={{ background: CREAM, minHeight: "100vh", color: INK, ...sans }}>
      {/* HERO */}
      <section style={{ background: DEEP, color: "#fff", padding: "56px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <h1 style={{ ...serif, fontSize: "clamp(32px, 4.5vw, 44px)", fontWeight: 700, margin: "0 0 10px" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>Last updated: May 19, 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <article
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "56px 24px",
          fontSize: 15.5,
          lineHeight: 1.75,
          color: "#1f2937",
        }}
      >
        <p>
          These Terms of Service ("Terms") govern your use of EnviroCare Pest &amp; Termite Services ("EnviroCare," "we," "us," or
          "our") and any pest, termite, mosquito, or tick services you purchase from us. By scheduling service or using our website, you
          agree to these Terms.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>1. Services We Provide</h2>
        <p>EnviroCare offers residential and commercial pest control services in Alabama, including:</p>
        <ul>
          <li>Bi-monthly perimeter pest control (covers 30+ common household pests)</li>
          <li>Sentricon® Always Active™ termite baiting system (licensed by Corteva Agriscience)</li>
          <li>Mosquito yard barrier treatment (seasonal — March through November)</li>
          <li>Tick control</li>
          <li>Pre-construction termite treatment and WDO inspection letters for real estate transactions</li>
        </ul>
        <p>
          We do not offer bed bug treatment, wildlife removal, bat exclusion, lawn care, or standalone wasp and bee
          removal as general services. Carpenter bee treatment is available as an add-on for existing customers only.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>2. Service Agreements &amp; Billing</h2>
        <p>
          Ongoing services (pest control, termite, mosquito) are provided on a recurring schedule. By enrolling, you authorize us to
          perform service at the agreed frequency and to charge the agreed amount via your chosen payment method.
        </p>
        <ul>
          <li>Pest control is billed monthly (ACH) or per-visit at the bi-monthly rate</li>
          <li>Sentricon® is billed monthly or as an annual renewal following installation</li>
          <li>Mosquito service is seasonal (March–November) and billed monthly during that period</li>
        </ul>
        <p>
          Prices are subject to change with 30 days' notice. Bundled plans are offered for convenience and do not constitute a
          discount; each service in a bundle is priced at its standard rate.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>3. Re-Service &amp; Unlimited Visits</h2>
        <p>
          Active pest control plan customers are entitled to unlimited re-service visits between scheduled treatments at no additional
          charge, subject to the following conditions:
        </p>
        <ul>
          <li>The re-service request must be for a pest included in the plan (not bed bugs, wildlife, or other excluded pests)</li>
          <li>The customer's account must be current (no outstanding balance)</li>
          <li>Access to the property must be available during our normal service hours (Monday–Friday, 8 a.m.–5 p.m.)</li>
        </ul>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>4. Sentricon® Termite Service</h2>
        <p>
          Sentricon® Always Active™ is a termite baiting system licensed from Corteva Agriscience. "Sentricon®" and "Always Active™"
          are registered trademarks of Corteva Agriscience.
        </p>
        <p>
          EnviroCare provides up to $1,000,000 in repair coverage for active customers under our Sentricon® plan. The actual terms,
          limitations, and conditions of that coverage are defined in the signed service agreement issued to each customer. This
          website describes coverage in general terms only; the signed agreement governs.
        </p>
        <p>
          Annual renewal is required to maintain termite coverage. Lapsed accounts forfeit coverage until reinstated; EnviroCare
          reserves the right to inspect and re-treat before reinstating a lapsed account.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>5. Cancellation</h2>
        <p>
          You may cancel ongoing service at any time by contacting your EnviroCare office. We ask for reasonable notice (at least 5
          business days before the next scheduled service) so we can adjust routes. No cancellation fees apply for standard pest,
          mosquito, or tick plans.
        </p>
        <p>
          Sentricon® cancellation: if you cancel within the first 12 months of a new installation, an early termination fee equal to
          the cost of reinstallation may apply. See your signed service agreement for details.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>6. Access &amp; Safety</h2>
        <p>
          You agree to provide safe, unobstructed access to the treatment areas on service days. You are responsible for securing
          pets, removing items blocking access to exterior perimeters, and following any re-entry instructions provided by your
          technician after treatment.
        </p>
        <p>
          If access is denied on a scheduled service day, we will attempt to contact you. Service may be skipped without credit for
          the visit if we cannot gain access.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>7. Limitation of Liability</h2>
        <p>
          EnviroCare's liability for any claim arising from services rendered is limited to the cost of the service visit(s) giving
          rise to the claim, unless otherwise specified in a signed service agreement. We are not liable for consequential, incidental,
          or indirect damages except as required by Alabama law.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>8. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Alabama. Any disputes shall be resolved in the courts of Alabama, and
          you consent to personal jurisdiction in Alabama.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>9. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. The "Last updated" date at the top reflects the most recent revision. Continued
          use of our services after changes are posted constitutes acceptance of the revised Terms.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>10. Contact Us</h2>
        <p>Questions about these Terms? Contact the EnviroCare office that serves your area:</p>
        <ul>
          <li>
            <strong>Birmingham / Alabaster:</strong> (205) 940-6360 — 2025 Butler Rd, Alabaster, AL 35007
          </li>
          <li>
            <strong>Alex City / Lake Martin:</strong> (256) 234-6162 — 1785 Tallapoosa St, Alexander City, AL 35010
          </li>
          <li>
            <strong>Huntsville:</strong> (256) 937-7676 — 7027 Old Madison Pike, Suite 108, Huntsville, AL 35806
          </li>
        </ul>
        <p>
          Or email: <a href="mailto:service@envirocarellc.com" style={{ color: BRAND_GREEN }}>service@envirocarellc.com</a>
        </p>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid rgba(14,142,64,0.2)`, textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: BRAND_GREEN,
              color: "#fff",
              padding: "12px 28px",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            ← Return to Home
          </Link>
        </div>
      </article>
    </main>
  );
}
