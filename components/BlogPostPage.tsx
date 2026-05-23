'use client';

import { getPostBySlug } from '@/data/blog-posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const SITE_URL = 'https://envirocare-web.vercel.app';
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        author: { '@type': 'Person', name: post.author },
        publisher: {
          '@type': 'Organization',
          name: 'EnviroCare Pest & Termite Services',
          foundingDate: '1958',
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        articleSection: post.category,
        url: postUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Field Notes', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <main className="bpp-main">
      <style dangerouslySetInnerHTML={{ __html: POST_CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="bpp-hero">
          <div className="bpp-hero-inner">
            <Link href="/blog" className="bpp-back">← All Field Notes</Link>
            <div className="bpp-meta">
              <span className="bpp-cat">{post.category}</span>
              <span className="bpp-time">{post.readMinutes} min read</span>
            </div>
            <div className="bpp-emoji">{post.heroEmoji}</div>
            <h1 className="bpp-title">{post.title}</h1>
            <p className="bpp-excerpt">{post.excerpt}</p>
            <div className="bpp-byline">
              By <strong>{post.author}</strong> · {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </div>
          </div>
        </header>

        <div className="bpp-body-wrap">
          <div className="bpp-body" dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>

        <section className="bpp-cta-section">
          <div className="bpp-cta-inner">
            <h2 className="bpp-cta-title">Ready to Schedule?</h2>
            <p className="bpp-cta-sub">Call the EnviroCare office nearest you.</p>
            <div className="bpp-cta-phones">
              <a href="tel:2059406360" className="bpp-cta-phone">
                <strong>Birmingham</strong>(205) 940-6360
              </a>
              <a href="tel:2562346162" className="bpp-cta-phone">
                <strong>Lake Martin / Alex City</strong>(256) 234-6162
              </a>
              <a href="tel:2569377676" className="bpp-cta-phone">
                <strong>Huntsville</strong>(256) 937-7676
              </a>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

const POST_CSS = `
.bpp-main {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #FEFDF8;
  color: #0E1A0F;
}
.bpp-hero {
  padding: 80px 24px 60px;
  background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%);
}
.bpp-hero-inner {
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}
.bpp-back {
  display: inline-block;
  font-size: 14px;
  color: #0E8E40;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 32px;
}
.bpp-back:hover { text-decoration: underline; }
.bpp-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}
.bpp-cat {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #0E8E40;
  background: #E8F5EE;
  padding: 6px 14px;
  border-radius: 999px;
}
.bpp-time {
  font-size: 13px;
  color: #5A6660;
}
.bpp-emoji {
  font-size: 64px;
  margin-bottom: 20px;
}
.bpp-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 20px;
  color: #0E1A0F;
}
.bpp-excerpt {
  font-size: 19px;
  color: #5A6660;
  line-height: 1.55;
  margin: 0 0 28px;
  font-style: italic;
}
.bpp-byline {
  font-size: 14px;
  color: #5A6660;
}
.bpp-byline strong { color: #0E1A0F; }
.bpp-body-wrap {
  padding: 60px 24px;
}
.bpp-body {
  max-width: 720px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.7;
  color: #1A2620;
}
.bpp-body p { margin: 0 0 1.4em; }
.bpp-body p.lede {
  font-size: 22px;
  line-height: 1.5;
  color: #0E1A0F;
  border-left: 4px solid #F5A800;
  padding-left: 20px;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
}
.bpp-body h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 30px;
  font-weight: 700;
  margin: 2em 0 0.6em;
  color: #0E1A0F;
  line-height: 1.25;
}
.bpp-body h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  margin: 1.6em 0 0.5em;
  color: #0E1A0F;
}
.bpp-body ul, .bpp-body ol {
  margin: 0 0 1.4em;
  padding-left: 1.5em;
}
.bpp-body li {
  margin-bottom: 0.6em;
}
.bpp-body strong { color: #0E1A0F; }
.bpp-body em { font-style: italic; }
.bpp-body a {
  color: #0E8E40;
  font-weight: 600;
}
.bpp-cta-section {
  padding: 80px 24px;
  background: linear-gradient(135deg, #0E8E40 0%, #0A7935 100%);
  color: #fff;
}
.bpp-cta-inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.bpp-cta-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  margin: 0 0 12px;
}
.bpp-cta-sub {
  font-size: 17px;
  opacity: 0.92;
  margin: 0 0 32px;
}
.bpp-cta-phones {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
}
.bpp-cta-phone {
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
}
.bpp-cta-phone strong {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.85;
}
.bpp-cta-phone:hover { background: rgba(255, 255, 255, 0.25); }
`;
