import { type City } from '@/data/cities';

const CITY_DEPTH_CSS = `
.cd-wrap{font-family:var(--font-sans);color:#0E1A0F}
.cd-pest{padding:5rem clamp(1.5rem,5vw,4rem);background:linear-gradient(135deg,#FEFDF8 0%,#fff 100%)}
.cd-faq{padding:5rem clamp(1.5rem,5vw,4rem);background:#fff;border-top:1px solid rgba(14,142,64,.12)}
.cd-inner{max-width:1100px;margin:0 auto}
.cd-eyebrow{display:inline-block;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#0A7935;font-weight:700;margin-bottom:14px}
.cd-title{font-family:var(--font-serif);font-weight:900;font-size:clamp(1.8rem,3.6vw,2.6rem);line-height:1.12;color:#0E1A0F;margin:0 0 .5rem;max-width:820px}
.cd-title em{font-style:italic;color:#0A7935}
.cd-sub{font-size:1.05rem;color:#4b5563;max-width:720px;margin:0 0 2.2rem}
.cd-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.1rem}
.cd-item{background:#fff;padding:1.5rem;border-radius:14px;border:1px solid rgba(14,142,64,.15)}
.cd-item .cd-emoji{font-size:30px;margin-bottom:.5rem}
.cd-item h3{font-family:var(--font-serif);font-size:1.15rem;color:#07642B;margin:0 0 .4rem;font-weight:700}
.cd-item p{font-size:.92rem;color:#4b5563;line-height:1.55;margin:0}
.cd-faqlist{max-width:840px;margin-top:.5rem}
.cd-faqlist details{border:1px solid rgba(14,142,64,.15);border-radius:10px;margin-bottom:12px;background:#FAFAF7;overflow:hidden}
.cd-faqlist summary{padding:1.1rem 1.4rem;cursor:pointer;font-weight:600;color:#07642B;font-size:1rem;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:1rem}
.cd-faqlist summary::-webkit-details-marker{display:none}
.cd-faqlist summary::after{content:'+';font-size:24px;color:#0A7935;transition:transform .2s;flex:0 0 auto}
.cd-faqlist details[open] summary::after{transform:rotate(45deg)}
.cd-faqlist details p{padding:0 1.4rem 1.2rem;color:#4b5563;font-size:.97rem;line-height:1.6;margin:0}
.cd-review{padding:4rem clamp(1.5rem,5vw,4rem);background:linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%);border-top:1px solid rgba(14,142,64,.12)}
.cd-review-card{max-width:680px;background:#fff;border-radius:16px;border-left:4px solid #0A7935;padding:2rem 2rem 1.5rem;box-shadow:0 4px 20px rgba(14,142,64,.1)}
.cd-review-card p{font-size:1.08rem;line-height:1.7;color:#1E293B;margin:0 0 1rem;font-style:italic}
.cd-review-card p::before{content:'“';font-size:2rem;color:#0A7935;line-height:0;vertical-align:-.4rem;margin-right:.2rem}
.cd-review-footer{font-size:.92rem;font-weight:600;color:#07642B}
.cd-nearby{padding:2.5rem clamp(1.5rem,5vw,4rem) 3rem;background:#fff;border-top:1px solid rgba(14,142,64,.12)}
.cd-nearby-label{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#0A7935;font-weight:700;margin-bottom:12px}
.cd-nearby-links{display:flex;flex-wrap:wrap;gap:10px}
.cd-nearby-links a{display:inline-block;padding:8px 16px;border:1px solid rgba(14,142,64,.3);border-radius:999px;color:#07642B;font-weight:600;font-size:.92rem;text-decoration:none;background:#FEFDF8;transition:background .15s}
.cd-nearby-links a:hover{background:#E8F5EE}
`;

export default function CityDepth({ city }: { city: City }) {
  const hasPest = !!(city.pestContext && city.pestContext.length);
  const hasFaq = !!(city.faqs && city.faqs.length);
  const hasReview = !!(city.review);
  const hasNearby = !!(city.nearby && city.nearby.length);
  if (!hasPest && !hasFaq && !hasReview && !hasNearby) return null;

  return (
    <div className="cd-wrap">
      <style dangerouslySetInnerHTML={{ __html: CITY_DEPTH_CSS }} />

      {hasPest && (
        <section className="cd-pest">
          <div className="cd-inner">
            <div className="cd-eyebrow">Why {city.name}</div>
            <h2 className="cd-title">
              {city.pestHeadline || <>Local pest pressure in <em>{city.name}.</em></>}
            </h2>
            <p className="cd-sub">
              What we treat most often around {city.name} — and how each program handles it.
            </p>
            <div className="cd-grid">
              {city.pestContext!.map((p, i) => (
                <div className="cd-item" key={i}>
                  <div className="cd-emoji" aria-hidden="true">{p.emoji}</div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasReview && (
        <section className="cd-review">
          <div className="cd-inner">
            <div className="cd-eyebrow">{city.name} Customer</div>
            <blockquote className="cd-review-card">
              <p>{city.review!.text}</p>
              <footer className="cd-review-footer">— {city.review!.name}, {city.review!.location}</footer>
            </blockquote>
          </div>
        </section>
      )}

      {hasFaq && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: city.faqs!.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }) }}
          />
          <section className="cd-faq">
            <div className="cd-inner">
              <div className="cd-eyebrow">{city.name} FAQs</div>
              <h2 className="cd-title">Answers for <em>{city.name} homeowners.</em></h2>
              <div className="cd-faqlist">
                {city.faqs!.map((f, i) => (
                  <details key={i}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {hasNearby && (
        <section className="cd-nearby">
          <div className="cd-inner">
            <div className="cd-nearby-label">Also serving nearby</div>
            <div className="cd-nearby-links">
              {city.nearby!.map((n) => (
                <a key={n.slug} href={`/${n.slug}`}>{n.name}</a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
