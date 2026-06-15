'use client';

import { getAllPosts } from '@/data/blog-posts';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="bp-main">
      <style dangerouslySetInnerHTML={{ __html: BLOG_CSS }} />

      {/* Header */}
      <section className="bp-hero">
        <div className="bp-hero-inner">
          <div className="bp-eyebrow">🌻 EnviroCare Field Notes</div>
          <h1 className="bp-h1">
            Alabama Pest Control, <em>Honestly Explained.</em>
          </h1>
          <p className="bp-sub">
            Four generations of the Wedgworth family treating Alabama homes. The notes below are
            written by Kevin — what we actually see, what works, what doesn&apos;t, and why.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="bp-section">
        <div className="bp-grid">
          {posts.map((post) => (
            <article key={post.slug} className="bp-card">
              <Link href={`/blog/${post.slug}`} className="bp-card-link">
                <div className="bp-card-emoji">{post.heroEmoji}</div>
                <div className="bp-card-meta">
                  <span className="bp-card-cat">{post.category}</span>
                  <span className="bp-card-time">{post.readMinutes} min read</span>
                </div>
                <h2 className="bp-card-title">{post.title}</h2>
                <p className="bp-card-excerpt">{post.excerpt}</p>
                <div className="bp-card-foot">
                  <span className="bp-card-author">{post.author}</span>
                  <span className="bp-card-date">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <span className="bp-card-arrow">Read →</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bp-cta-section">
        <div className="bp-cta-inner">
          <h2 className="bp-cta-title">Have a Pest Question We Haven&apos;t Written About?</h2>
          <p className="bp-cta-sub">
            Call us. Three offices across Alabama. Family-owned since 1958.
          </p>
          <div className="bp-cta-phones">
            <a href="tel:2059406360" className="bp-cta-phone">
              <strong>Birmingham</strong>(205) 940-6360
            </a>
            <a href="tel:2562346162" className="bp-cta-phone">
              <strong>Lake Martin / Alex City</strong>(256) 234-6162
            </a>
            <a href="tel:2569377676" className="bp-cta-phone">
              <strong>Huntsville</strong>(256) 937-7676
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

const BLOG_CSS = `
.bp-main {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #FEFDF8;
  color: #0E1A0F;
  min-height: 100vh;
}
.bp-hero {
  padding: 100px 24px 60px;
  background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%);
}
.bp-hero-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.bp-eyebrow {
  font-size: 13px;
  font-weight: 600;
  color: #0E8E40;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.bp-h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(36px, 5.5vw, 60px);
  font-weight: 700;
  margin: 0 0 20px;
  line-height: 1.1;
}
.bp-h1 em {
  font-style: italic;
  color: #0E8E40;
}
.bp-sub {
  font-size: 18px;
  color: #5A6660;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.55;
}
.bp-section {
  padding: 60px 24px;
}
.bp-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
.bp-card {
  background: #fff;
  border: 1px solid #E8E2D8;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.bp-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(14, 26, 15, 0.08);
}
.bp-card-link {
  display: block;
  padding: 28px 24px;
  text-decoration: none;
  color: inherit;
  height: 100%;
}
.bp-card-emoji {
  font-size: 48px;
  margin-bottom: 16px;
}
.bp-card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.bp-card-cat {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #0E8E40;
  background: #E8F5EE;
  padding: 4px 10px;
  border-radius: 999px;
}
.bp-card-time {
  font-size: 13px;
  color: #94A89A;
}
.bp-card-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 12px;
  color: #0E1A0F;
}
.bp-card-excerpt {
  font-size: 15px;
  color: #5A6660;
  line-height: 1.55;
  margin: 0 0 20px;
}
.bp-card-foot {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #94A89A;
  padding-top: 16px;
  border-top: 1px solid #F1F5F2;
  margin-bottom: 12px;
}
.bp-card-author { font-weight: 600; color: #5A6660; }
.bp-card-arrow {
  font-size: 14px;
  font-weight: 600;
  color: #F5A800;
}
.bp-cta-section {
  padding: 80px 24px;
  background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
  color: #fff;
}
.bp-cta-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.bp-cta-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  margin: 0 0 12px;
}
.bp-cta-sub {
  font-size: 17px;
  opacity: 0.92;
  margin: 0 0 32px;
}
.bp-cta-phones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}
.bp-cta-phone {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  transition: background 0.2s;
}
.bp-cta-phone strong {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.85;
}
.bp-cta-phone:hover {
  background: rgba(255, 255, 255, 0.25);
}
`;
