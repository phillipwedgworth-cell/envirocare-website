import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | EnviroCare Pest & Termite Services",
  description:
    "How EnviroCare Pest & Termite Services collects, uses, and protects your information. Privacy policy for envirocarellc.com and EnviroCare digital services.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | EnviroCare Pest & Termite Services",
    description: "How EnviroCare Pest & Termite Services collects, uses, and protects your information. Privacy policy for envirocarellc.com and EnviroCare digital services.",
    url: 'https://www.envirocarellc.com/privacy',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Privacy Policy | EnviroCare Pest & Termite Services",
    description: "How EnviroCare Pest & Termite Services collects, uses, and protects your information. Privacy policy for envirocarellc.com and EnviroCare digital services.",
    images: ['/og-image.png'],
  },
};

const BRAND_GREEN = "#0A7935";
const DEEP = "#07642B";
const GOLD = "#F5A800";
const CREAM = "#FEFDF8";
const INK = "#0E1A0F";

export default function PrivacyPage() {
  const serif: React.CSSProperties = { fontFamily: "var(--font-serif)" };
  const sans: React.CSSProperties = { fontFamily: "var(--font-sans)" };

  return (
    <main style={{ background: CREAM, minHeight: "100vh", color: INK, ...sans }}>
      {/* HERO */}
      <section style={{ background: DEEP, color: "#fff", padding: "56px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <h1 style={{ ...serif, fontSize: "clamp(32px, 4.5vw, 44px)", fontWeight: 700, margin: "0 0 10px" }}>
            Privacy Policy
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
          EnviroCare Pest &amp; Termite Services ("EnviroCare," "we," "us," or "our") respects your privacy. This policy explains
          what information we collect when you use our website, request a quote, or sign up for service, and how we use it.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>1. Information We Collect</h2>
        <p>
          We collect information you give us directly when you fill out a contact or quote form, schedule service, sign up for
          our customer portal, or contact us by phone, text, or email. This may include:
        </p>
        <ul>
          <li>Name, email address, phone number, and service address</li>
          <li>Property details relevant to pest, termite, or mosquito service</li>
          <li>Payment information processed through our third-party payment portal</li>
          <li>Communications you send to us (text messages, emails, voicemails)</li>
        </ul>
        <p>
          We also collect limited information automatically when you visit our website, such as IP address, browser type, pages
          visited, and referring website. This is standard web analytics data used to improve the site.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>2. How We Use Information</h2>
        <p>We use the information you provide to:</p>
        <ul>
          <li>Schedule, deliver, and follow up on pest, termite, mosquito, and tick services</li>
          <li>Communicate with you about appointments, invoices, and service issues</li>
          <li>Process payments and manage your account</li>
          <li>Send service reminders, seasonal alerts, and (with your consent) marketing communications</li>
          <li>Improve our website and customer experience</li>
          <li>Comply with legal and regulatory requirements</li>
        </ul>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>3. How We Share Information</h2>
        <p>
          We do not sell your personal information. We share it only with trusted service providers who help us operate our
          business — for example:
        </p>
        <ul>
          <li>Our field service management system (Fieldster) for scheduling and routing</li>
          <li>Our payment processor and customer portal vendor</li>
          <li>Our texting and review-request platform (Captivated)</li>
          <li>Our phone answering service (SameDay AI)</li>
          <li>Our website analytics and form-handling vendors</li>
        </ul>
        <p>
          Each of these vendors is contractually required to protect your information and use it only for the purposes we
          authorize. We may also share information when required by law, court order, or to protect our rights and the safety
          of others.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>4. Text Messages &amp; Calls</h2>
        <p>
          By providing your phone number, you consent to receive calls and text messages from EnviroCare related to your
          service, including appointment confirmations, technician arrival notifications, and review requests. Standard message
          and data rates may apply. You can opt out of marketing texts at any time by replying STOP.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>5. Cookies &amp; Analytics</h2>
        <p>
          Our website uses cookies and similar technologies to remember your preferences and analyze site traffic. We may use
          third-party analytics providers (such as Google Analytics or Vercel Analytics) to understand how visitors use the
          site. You can disable cookies in your browser, though some site features may not work as well.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>6. Children's Privacy</h2>
        <p>
          Our services and website are intended for adults. We do not knowingly collect personal information from children
          under 13.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>7. Data Security</h2>
        <p>
          We use reasonable administrative, technical, and physical safeguards to protect your information. No system is 100%
          secure, but we work with reputable vendors and follow industry best practices.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>8. Your Choices</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to the personal information we hold about you</li>
          <li>Request correction or deletion of your information (subject to legal record-keeping requirements)</li>
          <li>Opt out of marketing emails and texts at any time</li>
          <li>Close your customer account by contacting any of our offices</li>
        </ul>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>9. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. The "Last updated" date at the top of this page will reflect the most
          recent revision. Material changes will be communicated through our website or by email when appropriate.
        </p>

        <h2 style={{ ...serif, fontSize: 24, color: DEEP, marginTop: 36, marginBottom: 12 }}>10. Contact Us</h2>
        <p>Questions about this policy? Reach out to the EnviroCare office that serves your area:</p>
        <ul>
          <li>
            <strong>Birmingham:</strong> (205) 940-6360 — 2025 Butler Rd, Alabaster, AL 35007
          </li>
          <li>
            <strong>Alex City / Lake Martin:</strong> (256) 234-6162 — 1785 Tallapoosa St, Alexander City, AL 35010
          </li>
          <li>
            <strong>Huntsville:</strong> (256) 937-7676 — 7027 Old Madison Pike, Suite 108, Huntsville, AL 35806
          </li>
        </ul>

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
