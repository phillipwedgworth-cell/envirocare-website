// app/blog/page.tsx
// Blog index — server-rendered. Wires the index to data/blog-posts so the real
// posts (previously orphaned behind a hardcoded "Coming Soon" placeholder) are
// listed and linkable. Styling carried via BLOG_CSS (see blogStyles.ts).
import Link from 'next/link';
import { getAllPosts } from '@/data/blog-posts';
import { BLOG_CSS } from './blogStyles';
import { breadcrumbList } from '@/lib/seo/breadcrumbs';

export const metadata = {
  alternates: { canonical: '/blog' },
  title: 'Alabama Pest Control Blog — Real Knowledge From EnviroCare Since 1958',
  description: 'Real Alabama pest knowledge from 68 years in the field. Seasonal guides, Sentricon® deep-dives, and homeowner advice you won\'t find in big-box marketing.',
  openGraph: {
    title: 'Alabama Pest Control Blog — Real Knowledge From EnviroCare Since 1958',
    description: 'Real Alabama pest knowledge from 68 years in the field. Seasonal guides, Sentricon® deep-dives, and homeowner advice you won\'t find in big-box marketing.',
    url: 'https://www.envirocarellc.com/blog',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alabama Pest Control Blog — Real Knowledge From EnviroCare Since 1958',
    description: 'Real Alabama pest knowledge from 68 years in the field. Seasonal guides, Sentricon® deep-dives, and homeowner advice you won\'t find in big-box marketing.',
    images: ['/og-image.png'],
  },
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[(m || 1) - 1]} ${d}, ${y}`;
}

export default function Page() {
  const posts = [...getAllPosts()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...breadcrumbList([{ name: 'Blog', path: '/blog' }]) }) }} />
      <style dangerouslySetInnerHTML={{ __html: BLOG_CSS }} />

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="city-eyebrow"><span className="city-eyebrow-txt">EnviroCare Pest Journal</span></div>
          <h1>Real Alabama<em>Pest Knowledge</em></h1>
          <p className="page-hero-sub">68 years of field experience, distilled into articles — seasonal pest guides, Sentricon® deep-dives, and Alabama-specific advice you won&apos;t find in big-box pest control marketing.</p>
          <div className="page-hero-cta">
            <a href="tel:2059406360" className="btn-gold" style={{ overflow: 'visible' }}>Call (205) 940-6360</a>
            <Link href="/faq" className="btn-outline-white">See FAQ →</Link>
          </div>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <div className="section-eyebrow">From The Field</div>
          <h2 className="section-title">Latest <span>Articles</span></h2>
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card" style={{ textDecoration: 'none' }}>
                <div className="blog-thumb"><div className="blog-thumb-icon" aria-hidden="true">{post.heroEmoji}</div></div>
                <div className="blog-body">
                  <div className="blog-cat">{post.category}</div>
                  <div className="blog-title">{post.title}</div>
                  <div className="blog-excerpt">{post.excerpt}</div>
                  <div className="blog-meta">
                    <span>{post.author}</span>
                    <span>{fmtDate(post.publishedAt)} · {post.readMinutes} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="office-cta">
        <div className="office-cta-inner">
          <div className="section-eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Got A Question Now?</div>
          <h3>Talk To A Pest Pro</h3>
          <div className="office-cta-addr">Birmingham · Lake Martin · Huntsville · Auburn</div>
          <div className="office-cta-row">
            <a href="tel:2059406360" className="btn-gold" style={{ overflow: 'visible' }}>Call (205) 940-6360</a>
            <Link href="/faq" className="btn-outline-white">See FAQ →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
