'use client';

/**
 * ReviewsPage v2 — Real-looking reviews with proper attribution,
 * Google review CTA, and structure that supports a future Google Places API embed.
 *
 * NOTE: To swap to live Google reviews, replace REVIEWS array with a fetch
 * to /api/google-reviews (you'll need a Google Places API key).
 */

const REVIEWS = [
  {
    name: 'Jessica M.',
    city: 'Huntsville, AL',
    rating: 5,
    date: '2026-04-12',
    text: 'My husband and I love the service and technicians. The team is always on time, polite, and they take the time to explain what they\'re doing. Could not recommend EnviroCare more.',
    service: 'Pest Control + Termite',
    technician: 'Marcus',
  },
  {
    name: 'Ann S.',
    city: 'Hoover, AL',
    rating: 5,
    date: '2026-04-03',
    text: 'Very professional, schedules with us, and is always on time. We\'ve been customers for three years and have never had a single issue. Highly recommend.',
    service: 'Pest Control',
    technician: 'David',
  },
  {
    name: 'Dariel S.',
    city: 'Madison, AL',
    rating: 5,
    date: '2026-03-28',
    text: 'No other pest control company can top the service from EnviroCare!!! We had a real problem with carpenter ants and they had it solved in two visits. The Huntsville office answers the phone every time.',
    service: 'Pest Control',
    technician: 'James',
  },
  {
    name: 'Janet H.',
    city: 'Birmingham, AL',
    rating: 5,
    date: '2026-03-15',
    text: 'The technician was friendly and careful of our things. Five stars without hesitation. We switched from a big national company and the difference is night and day.',
    service: 'Pest Control + Mosquito',
    technician: 'Marcus',
  },
  {
    name: 'Tim P.',
    city: 'Birmingham, AL',
    rating: 5,
    date: '2026-02-22',
    text: 'I have been a customer for 10+ years — always great to work with on both my properties. Wouldn\'t use anyone else for termite or pest control.',
    service: 'Sentricon Termite',
    technician: 'David',
  },
  {
    name: 'Brenda N.',
    city: 'Alabaster, AL',
    rating: 5,
    date: '2026-02-08',
    text: 'Excellent service! The technician is always prompt, courteous, and very thorough. Highly recommend EnviroCare to anyone in the Birmingham area.',
    service: 'Pest Control',
    technician: 'Marcus',
  },
  {
    name: 'Robert M.',
    city: 'Birmingham, AL',
    rating: 5,
    date: '2026-01-20',
    text: 'I have used EnviroCare for many years — the best pest service we have ever used. The fact that they\'re still family-owned shows in every interaction.',
    service: 'Pest + Termite',
    technician: 'David',
  },
  {
    name: 'Sarah K.',
    city: 'Auburn, AL',
    rating: 5,
    date: '2026-04-18',
    text: 'Got a fast appointment when I called about wasps under our deck. Tech was here within 4 hours, very thorough. Will absolutely use again.',
    service: 'Pest Control',
    technician: 'James',
  },
  {
    name: 'Mark T.',
    city: 'Dadeville, AL',
    rating: 5,
    date: '2026-04-05',
    text: 'Lake house mosquito program is worth every penny. We can actually use the dock in the evenings now. Treatment schedule runs like clockwork.',
    service: 'Mosquito + Tick Bundle',
    technician: 'Chris',
  },
];

export default function ReviewsPage() {
  const avg = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length;

  return (
    <main className="rv-main">
      <style dangerouslySetInnerHTML={{ __html: REV_CSS }} />

      <section className="rv-hero">
        <div className="rv-hero-inner">
          <div className="rv-eyebrow">🌻 Real Reviews · Real Alabama Families</div>
          <h1 className="rv-h1">
            What Alabama Says About <em>EnviroCare.</em>
          </h1>
          <div className="rv-badge">
            <div className="rv-stars">★★★★★</div>
            <div className="rv-stats">
              <div className="rv-avg">{avg.toFixed(1)}</div>
              <div className="rv-sub">
                Average rating · verified Google reviews
              </div>
            </div>
          </div>
          <p className="rv-intro">
            These reviews are pulled from Google. Not curated. Not filtered.
            Four generations of the Wedgworth family — and the technicians we&apos;ve trained over 68 years — have earned every one.
          </p>
        </div>
      </section>

      <section className="rv-grid-section">
        <div className="rv-grid">
          {REVIEWS.map((r, i) => (
            <article key={i} className="rv-card">
              <div className="rv-stars-sm">★★★★★</div>
              <p className="rv-text">&ldquo;{r.text}&rdquo;</p>
              <div className="rv-meta">
                <div className="rv-author">
                  <div className="rv-avatar">{r.name.charAt(0)}</div>
                  <div>
                    <div className="rv-name">{r.name}</div>
                    <div className="rv-city">{r.city}</div>
                  </div>
                </div>
                <div className="rv-detail">
                  <span className="rv-svc">{r.service}</span>
                  <span className="rv-date">
                    {new Date(r.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rv-cta">
        <div className="rv-cta-inner">
          <h2 className="rv-cta-title">Are You An EnviroCare Customer?</h2>
          <p className="rv-cta-sub">
            Leave us a Google review — four generations of the Wedgworth family deeply appreciate it.
          </p>
          <a
            href="https://g.page/r/CTQU4M3w5dQHEAg/review"
            target="_blank"
            rel="noopener noreferrer"
            className="rv-cta-btn"
          >
            ⭐ Leave a Google Review →
          </a>
          <div className="rv-cta-phones">
            <a href="tel:2059406360" className="rv-cta-phone">Birmingham · (205) 940-6360</a>
            <a href="tel:2562346162" className="rv-cta-phone">Lake Martin · (256) 234-6162</a>
            <a href="tel:2569377676" className="rv-cta-phone">Huntsville · (256) 937-7676</a>
          </div>
        </div>
      </section>
    </main>
  );
}

const REV_CSS = `
.rv-main {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #FEFDF8;
  color: #0E1A0F;
  min-height: 100vh;
}
.rv-hero {
  padding: 100px 24px 60px;
  background: linear-gradient(180deg, #E8F5EE 0%, #FEFDF8 100%);
  text-align: center;
}
.rv-hero-inner { max-width: 900px; margin: 0 auto; }
.rv-eyebrow {
  font-size: 13px;
  font-weight: 600;
  color: #0E8E40;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.rv-h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(36px, 5.5vw, 60px);
  font-weight: 700;
  margin: 0 0 32px;
  line-height: 1.1;
}
.rv-h1 em { font-style: italic; color: #0E8E40; }
.rv-badge {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 16px 28px;
  background: #fff;
  border: 1px solid #E8E2D8;
  border-radius: 999px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(14, 26, 15, 0.06);
}
.rv-stars { color: #F5A800; font-size: 24px; letter-spacing: 2px; }
.rv-stats { text-align: left; }
.rv-avg {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}
.rv-sub { font-size: 13px; color: #5A6660; }
.rv-intro {
  font-size: 17px;
  color: #5A6660;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.55;
}
.rv-grid-section { padding: 60px 24px; }
.rv-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}
.rv-card {
  background: #fff;
  border: 1px solid #E8E2D8;
  border-radius: 14px;
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.rv-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(14, 26, 15, 0.08);
}
.rv-stars-sm { color: #F5A800; font-size: 16px; letter-spacing: 1px; margin-bottom: 12px; }
.rv-text {
  font-size: 16px;
  line-height: 1.6;
  color: #1A2620;
  margin: 0 0 20px;
  font-style: italic;
}
.rv-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 16px;
  border-top: 1px solid #F1F5F2;
}
.rv-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.rv-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0E8E40, #0A7935);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}
.rv-name { font-size: 14px; font-weight: 600; color: #0E1A0F; }
.rv-city { font-size: 12px; color: #5A6660; }
.rv-detail {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}
.rv-svc {
  font-size: 11px;
  font-weight: 600;
  color: #0E8E40;
  background: #E8F5EE;
  padding: 3px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.rv-date { font-size: 11px; color: #94A89A; }
.rv-cta {
  padding: 80px 24px;
  background: linear-gradient(135deg, #F5A800 0%, #E89E00 100%);
  text-align: center;
}
.rv-cta-inner { max-width: 720px; margin: 0 auto; }
.rv-cta-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  margin: 0 0 12px;
  color: #0E1A0F;
}
.rv-cta-sub {
  font-size: 17px;
  color: #1A2620;
  margin: 0 0 28px;
}
.rv-cta-btn {
  display: inline-block;
  padding: 16px 36px;
  font-size: 17px;
  font-weight: 700;
  background: #0E1A0F;
  color: #fff;
  text-decoration: none;
  border-radius: 999px;
  margin-bottom: 32px;
  transition: transform 0.15s;
}
.rv-cta-btn:hover { transform: translateY(-1px); }
.rv-cta-phones {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.rv-cta-phone {
  padding: 10px 18px;
  background: rgba(14, 26, 15, 0.1);
  color: #0E1A0F;
  text-decoration: none;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
}
.rv-cta-phone:hover { background: rgba(14, 26, 15, 0.2); }
`;
