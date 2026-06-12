import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: '/pay' },
  title: "Pay Your Bill",
  description: "Make a payment on your EnviroCare Pest Control account. Online payment portal coming soon — call your local office to pay by phone.",
  robots: { index: false, follow: true },
};

const OFFICES = [
  { name: "Birmingham", phone: "(205) 940-6360", tel: "2059406360" },
  { name: "Lake Martin · Alexander City", phone: "(256) 234-6162", tel: "2562346162" },
  { name: "Huntsville", phone: "(256) 937-7676", tel: "2569377676" },
];

export default function PayPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#FEFDF8", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <a href="/" style={{ display: "inline-block", marginBottom: "2rem" }}>
          <img src="/logo.png" alt="EnviroCare" width={260} height={100} style={{ width: 240, height: "auto" }} />
        </a>

        <div style={{ display: "inline-block", border: "1.5px solid #0E8E40", borderRadius: 6, padding: "5px 16px", marginBottom: 18, fontSize: 12, letterSpacing: "0.14em", color: "#0E8E40", fontFamily: "'DM Sans',system-ui,sans-serif", fontWeight: 800, textTransform: "uppercase" }}>
          Customer Portal
        </div>

        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#0E1A0F", lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: "1rem" }}>
          Pay Your Bill
        </h1>
        <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "1.05rem", color: "#5A7060", lineHeight: 1.7, marginBottom: "2.4rem" }}>
          Our online payment portal is launching soon. In the meantime, call your local office and we&apos;ll take payment over the phone — same family, same service.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
          {OFFICES.map(o => (
            <a key={o.tel} href={`tel:${o.tel}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid rgba(14,142,64,0.18)", borderRadius: 14, padding: "1rem 1.2rem", textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif" }}>
              <span style={{ color: "#0E1A0F", fontWeight: 600, fontSize: "0.98rem" }}>{o.name}</span>
              <span style={{ color: "#0E8E40", fontWeight: 700, fontSize: "1.05rem" }}>{o.phone}</span>
            </a>
          ))}
        </div>

        <a href="/" style={{ fontFamily: "'DM Sans',system-ui,sans-serif", color: "#5A7060", fontSize: "0.92rem", textDecoration: "none", borderBottom: "1px solid rgba(14,142,64,0.25)", paddingBottom: 2 }}>← Back to home</a>
      </div>
    </main>
  );
}
