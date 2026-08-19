// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: app/quote/page.tsx
// Commit: fix(fonts): use font tokens
// Push: main
// ───────────────────────────────────
import ScheduleRequest from '../../components/ScheduleRequest';
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata = {
  alternates: { canonical: '/quote' },
  title: "Request a Free Pest Control Visit | EnviroCare Alabama",
  description: "Tell us what works best and our office will call to set up your free pest control visit. Pest, termite, and mosquito service across Alabama — no obligation.",
  openGraph: {
    title: "Request a Free Pest Control Visit | EnviroCare Alabama",
    description: "Tell us what works best and our office will call to set up your free pest control visit. Pest, termite, and mosquito service across Alabama — no obligation.",
    url: 'https://www.envirocarellc.com/quote',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Request a Free Pest Control Visit | EnviroCare Alabama",
    description: "Tell us what works best and our office will call to set up your free pest control visit. Pest, termite, and mosquito service across Alabama — no obligation.",
    images: ['/og-image.png'],
  },
};

export default function QuotePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Request a Quote', path: '/quote' }]) }) }} />
      <section style={{ background: '#FEFDF8', padding: '48px 16px 40px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 600, color: '#0E1A0F', marginBottom: 8 }}>
              Request a Free Pest Control Visit
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", color: '#5b6f60', fontSize: '15.5px', margin: 0 }}>
              Tell us what works best and our office will call to set it up — most visits don&rsquo;t require you home.
            </p>
          </div>
          <ScheduleRequest />
        </div>
      </section>
      <p style={{
        textAlign: 'center',
        fontFamily: "var(--font-sans)",
        fontSize: '14px',
        color: '#5A6660',
        padding: '0 16px 40px',
        margin: 0,
      }}>
        Need help choosing?{' '}
        <a
          href="/pricing"
          style={{ color: '#0E8E40', textDecoration: 'underline', fontWeight: 600 }}
        >
          View our transparent pricing →
        </a>
      </p>
    </>
  );
}
