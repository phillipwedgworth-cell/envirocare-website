"use client";

import Header from "@/components/shared/Header";
import Link from "next/link";

/**
 * About Us — four-generation EnviroCare story.
 *
 * Design system: locked brand CSS variables (matches Homepage.tsx exactly).
 * - Playfair Display for headlines, DM Sans for body
 * - Brand green #0A7935, gold #F5A800, cream #FEFDF8
 * - Same orb / wash / glass card vocabulary as the homepage hero
 *
 * AEO note: this page is the canonical source for the Wedgworth family story,
 * founding date 1958, and the four-generation lineage. AI answer engines pull
 * heavily from About pages when answering "tell me about <company>" queries.
 */
export default function AboutUs() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white,#fff)" }}>

      <style>{`
        :root {
          --green:#0A7935; --green-mid:#22C55E; --green-dk:#0A7935; --green-deep:#07642B; --green-darkest:#062514;
          --green-lt:#DCFCE7; --green-xlt:#F0FDF4;
          --gold:#F5A800; --gold-dk:#CA8A04; --gold-lt:#FEF3C7;
          --white:#fff; --cream:#FEFDF8;
          --ink:#0A1A0E; --ink-mid:#1E293B; --ink-soft:#475569;
          --border:#BBF7D0; --border-soft:#D1FAE5;
          --r:16px;
          --sh-sm:0 2px 12px rgba(22,163,74,.09);
          --sh-md:0 8px 32px rgba(22,163,74,.14);
        }
        .ab-wrap { font-family:var(--font-sans); color:var(--ink); }

        /* ── HERO ─────────────────────────────────────────────────────── */
        .ab-hero { position:relative; overflow:hidden; padding:5rem clamp(1.5rem,5vw,4rem); background:var(--white); }
        .ab-hero-wash { position:absolute; top:0; right:0; bottom:0; width:55%; background:linear-gradient(140deg,var(--green-xlt) 0%,var(--green-lt) 50%,#86EFAC 100%); clip-path:polygon(12% 0,100% 0,100% 100%,0 100%); z-index:0; pointer-events:none; }
        .ab-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:0; }
        .ab-orb-a { width:520px; height:520px; background:radial-gradient(circle,rgba(34,197,94,.18) 0%,transparent 70%); top:-100px; right:10%; }
        .ab-orb-b { width:380px; height:380px; background:radial-gradient(circle,rgba(245,168,0,.12) 0%,transparent 70%); bottom:-50px; left:4%; }
        .ab-hero-inner { position:relative; z-index:10; max-width:1320px; margin:0 auto; display:grid; grid-template-columns:1.2fr 1fr; gap:4rem; align-items:center; }
        .ab-eyebrow { display:inline-flex; align-items:center; gap:8px; background:var(--green-lt); border:1px solid rgba(22,163,74,.3); border-radius:40px; padding:.4rem 1rem; margin-bottom:1.5rem; }
        .ab-eyebrow-txt { font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; color:var(--green-dk); }
        .ab-hero h1 { font-family:var(--font-serif); font-size:clamp(2.4rem,4.6vw,4rem); font-weight:900; line-height:1.05; color:var(--ink); margin:0 0 1.2rem; letter-spacing:-.5px; }
        .ab-hero h1 em { color:var(--green-dk); font-style:italic; display:block; }
        .ab-hero-sub { font-size:1.1rem; line-height:1.75; color:var(--ink-soft); max-width:520px; margin-bottom:2rem; }
        .ab-stats { display:flex; gap:2rem; flex-wrap:wrap; }
        .ab-stat { border-left:3px solid var(--gold); padding-left:.9rem; }
        .ab-stat-n { font-family:var(--font-serif); font-size:2rem; font-weight:700; color:var(--green-dk); line-height:1; }
        .ab-stat-l { font-size:11px; color:var(--ink-soft); letter-spacing:.05em; margin-top:3px; text-transform:uppercase; font-weight:600; }
        .ab-hero-card { position:relative; border-radius:24px; aspect-ratio:4/5; background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-darkest) 100%); box-shadow:0 30px 80px rgba(15,92,46,.28); overflow:hidden; display:flex; flex-direction:column; justify-content:flex-end; padding:2rem; color:#fff; }
        .ab-hero-card::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 30% 20%,rgba(245,168,0,.18) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(34,197,94,.22) 0%,transparent 55%); }
        .ab-hero-card-year { position:absolute; top:1.8rem; right:1.8rem; font-family:var(--font-serif); font-size:2.4rem; font-weight:900; color:var(--gold); letter-spacing:-.5px; }
        .ab-hero-card-quote { position:relative; font-family:var(--font-serif); font-style:italic; font-size:1.4rem; line-height:1.4; margin-bottom:1rem; }
        .ab-hero-card-by { position:relative; font-size:.85rem; color:rgba(255,255,255,.7); letter-spacing:.05em; }

        /* ── TIMELINE ─────────────────────────────────────────────────── */
        .ab-timeline { padding:5rem clamp(1.5rem,5vw,4rem); background:var(--cream); }
        .ab-section-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:11px; font-weight:700; letter-spacing:.09em; text-transform:uppercase; color:var(--green-dk); background:var(--green-lt); border:1px solid rgba(22,163,74,.25); border-radius:40px; padding:.32rem .9rem; margin-bottom:1rem; }
        .ab-section-title { font-family:var(--font-serif); font-size:clamp(2rem,3.6vw,3rem); font-weight:900; color:var(--ink); line-height:1.1; margin-bottom:.85rem; letter-spacing:-.4px; max-width:780px; }
        .ab-section-title span { color:var(--green-dk); font-style:italic; }
        .ab-section-sub { font-size:1.05rem; line-height:1.75; color:var(--ink-soft); max-width:680px; margin-bottom:3rem; }
        .ab-tl-grid { max-width:1100px; margin:0 auto; position:relative; }
        .ab-tl-grid::before { content:''; position:absolute; top:0; bottom:0; left:50%; width:2px; background:linear-gradient(180deg,var(--green) 0%,var(--gold) 100%); transform:translateX(-50%); }
        .ab-tl-row { display:grid; grid-template-columns:1fr auto 1fr; gap:2rem; align-items:flex-start; margin-bottom:2.5rem; position:relative; }
        .ab-tl-row.r .ab-tl-card { grid-column:3; }
        .ab-tl-row.l .ab-tl-card { grid-column:1; text-align:right; }
        .ab-tl-card { background:var(--white); border:1px solid var(--border-soft); border-radius:18px; padding:1.6rem 1.8rem; box-shadow:var(--sh-sm); transition:transform .25s,box-shadow .25s; }
        .ab-tl-card:hover { transform:translateY(-3px); box-shadow:var(--sh-md); }
        .ab-tl-year { grid-column:2; width:74px; height:74px; border-radius:50%; background:var(--white); border:3px solid var(--gold); display:flex; align-items:center; justify-content:center; font-family:var(--font-serif); font-size:1.05rem; font-weight:900; color:var(--green-dk); box-shadow:0 4px 14px rgba(245,168,0,.3); position:relative; z-index:2; }
        .ab-tl-card h3 { font-family:var(--font-serif); font-size:1.25rem; font-weight:700; color:var(--ink); margin:0 0 .5rem; }
        .ab-tl-card p { font-size:.95rem; line-height:1.65; color:var(--ink-soft); margin:0; }

        /* ── FAMILY / GENERATIONS ─────────────────────────────────────── */
        .ab-fam { padding:5rem clamp(1.5rem,5vw,4rem); background:var(--white); }
        .ab-fam-grid { max-width:1320px; margin:3rem auto 0; display:grid; grid-template-columns:repeat(auto-fit,minmax(232px,1fr)); gap:1.5rem; }
        .ab-fam-card { border-radius:22px; overflow:hidden; border:1px solid var(--border-soft); box-shadow:var(--sh-sm); background:var(--white); transition:all .3s cubic-bezier(.16,1,.3,1); }
        .ab-fam-card:hover { transform:translateY(-5px); box-shadow:var(--sh-md); border-color:var(--green); }
        .ab-fam-art { height:160px; position:relative; display:flex; align-items:flex-end; padding:1.2rem; color:#fff; }
        .ab-fam-art-1 { background:linear-gradient(160deg,#0A7935 0%,#07642B 60%,#062514 100%); }
        .ab-fam-art-2 { background:linear-gradient(160deg,#15803D 0%,#0A7935 50%,#07642B 100%); }
        .ab-fam-art-3 { background:linear-gradient(160deg,#16A34A 0%,#0A7935 50%,#0A7935 100%); }
        .ab-fam-art-4 { background:linear-gradient(160deg,#1FB457 0%,#16A34A 50%,#0A7935 100%); }
        .ab-fam-gen { position:absolute; top:1.2rem; right:1.2rem; background:rgba(255,255,255,.18); border:1px solid rgba(255,255,255,.3); border-radius:30px; padding:.3rem .8rem; font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; backdrop-filter:blur(4px); }
        .ab-fam-name { font-family:var(--font-serif); font-size:1.4rem; font-weight:700; text-shadow:0 2px 8px rgba(0,0,0,.3); }
        .ab-fam-body { padding:1.5rem 1.7rem 1.8rem; }
        .ab-fam-role { font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--gold-dk); margin-bottom:.5rem; }
        .ab-fam-bio { font-size:.92rem; line-height:1.65; color:var(--ink-mid); }

        /* ── VALUES ───────────────────────────────────────────────────── */
        .ab-values { padding:5rem clamp(1.5rem,5vw,4rem); background:linear-gradient(180deg,var(--green-deep) 0%,var(--green-darkest) 100%); color:#fff; position:relative; overflow:hidden; }
        .ab-values::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='1.5' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E") repeat; }
        .ab-values-inner { position:relative; z-index:2; max-width:1320px; margin:0 auto; }
        .ab-values .ab-section-eyebrow { background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.2); color:#86EFAC; }
        .ab-values .ab-section-title { color:#fff; }
        .ab-values .ab-section-title span { color:var(--gold); }
        .ab-values .ab-section-sub { color:rgba(255,255,255,.75); }
        .ab-vgrid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.25rem; margin-top:2.5rem; }
        .ab-vcard { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.12); border-radius:16px; padding:1.6rem 1.5rem; backdrop-filter:blur(8px); transition:all .3s; }
        .ab-vcard:hover { background:rgba(255,255,255,.09); transform:translateY(-4px); }
        .ab-vcard-num { font-family:var(--font-serif); font-size:2.2rem; font-weight:900; color:var(--gold); line-height:1; margin-bottom:.7rem; }
        .ab-vcard h3 { font-family:var(--font-serif); font-size:1.1rem; font-weight:700; color:#fff; margin:0 0 .5rem; }
        .ab-vcard p { font-size:.88rem; line-height:1.6; color:rgba(255,255,255,.78); margin:0; }

        /* ── OFFICES ──────────────────────────────────────────────────── */
        .ab-offices { padding:5rem clamp(1.5rem,5vw,4rem); background:var(--cream); }
        .ab-off-grid { max-width:1320px; margin:3rem auto 0; display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; }
        .ab-off-card { background:var(--white); border-radius:22px; border:1px solid var(--border-soft); box-shadow:var(--sh-sm); padding:2rem 1.8rem; transition:all .3s; overflow:hidden; }
        .ab-off-img { width:calc(100% + 3.6rem); height:150px; object-fit:cover; display:block; margin:-2rem -1.8rem 1.4rem; }
        .ab-off-card:hover { transform:translateY(-5px); box-shadow:var(--sh-md); border-color:var(--green); }
        .ab-off-tag { font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--gold-dk); margin-bottom:.5rem; }
        .ab-off-name { font-family:var(--font-serif); font-size:1.4rem; font-weight:700; color:var(--ink); margin-bottom:.8rem; }
        .ab-off-addr { font-size:.92rem; color:var(--ink-mid); line-height:1.6; margin-bottom:1rem; }
        .ab-off-phone { display:inline-flex; align-items:center; gap:6px; font-size:1rem; font-weight:700; color:var(--green-dk); text-decoration:none; padding:.55rem 1.2rem; border-radius:50px; border:1.5px solid var(--green-dk); transition:all .2s; }
        .ab-off-phone:hover { background:var(--green-dk); color:#fff; }

        /* ── CTA ──────────────────────────────────────────────────────── */
        .ab-cta { padding:4rem clamp(1.5rem,5vw,4rem); background:linear-gradient(135deg,var(--green) 0%,var(--green-dk) 50%,var(--green-deep) 100%); text-align:center; position:relative; overflow:hidden; }
        .ab-cta::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 20% 50%,rgba(245,168,0,.14) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(134,239,172,.12) 0%,transparent 50%); }
        .ab-cta-inner { position:relative; z-index:2; max-width:760px; margin:0 auto; }
        .ab-cta h2 { font-family:var(--font-serif); font-size:clamp(1.6rem,3vw,2.4rem); font-weight:700; color:#fff; margin:0 0 .6rem; letter-spacing:-.3px; }
        .ab-cta p { color:rgba(255,255,255,.85); margin-bottom:1.8rem; font-size:1.05rem; }
        .ab-cta-row { display:flex; justify-content:center; gap:.9rem; flex-wrap:wrap; }
        .ab-btn-gold { background:var(--gold); color:var(--ink); border:none; border-radius:50px; padding:.95rem 2.1rem; font-family:var(--font-sans); font-size:1rem; font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:transform .25s,box-shadow .25s; box-shadow:0 4px 18px rgba(234,179,8,.4); }
        .ab-btn-gold:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(234,179,8,.55); }
        .ab-btn-outline { background:transparent; color:#fff; border:2px solid rgba(255,255,255,.5); border-radius:50px; padding:.85rem 1.8rem; font-family:var(--font-sans); font-size:.95rem; font-weight:600; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all .25s; }
        .ab-btn-outline:hover { background:rgba(255,255,255,.12); border-color:rgba(255,255,255,.85); }

        @media (max-width:1000px) {
          .ab-hero-inner { grid-template-columns:1fr; }
          .ab-hero-card { aspect-ratio:16/9; }
          .ab-fam-grid, .ab-off-grid { grid-template-columns:1fr; }
          .ab-vgrid { grid-template-columns:repeat(2,1fr); }
          .ab-tl-grid::before { left:32px; }
          .ab-tl-row { grid-template-columns:auto 1fr; gap:1.2rem; }
          .ab-tl-row .ab-tl-year { grid-column:1; width:64px; height:64px; }
          .ab-tl-row .ab-tl-card { grid-column:2 !important; text-align:left !important; }
        }
        @media (max-width:600px) {
          .ab-vgrid { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="ab-wrap">
        {/* HERO */}
        <section className="ab-hero">
          <div className="ab-hero-wash" />
          <div className="ab-orb ab-orb-a" />
          <div className="ab-orb ab-orb-b" />
          <div className="ab-hero-inner">
            <div>
              <div className="ab-eyebrow">
                <span className="ab-eyebrow-txt">Family-Owned · Alexander City · Since 1958</span>
              </div>
              <h1 itemProp="speakable">
                Four Generations.<em>One Promise.</em>
              </h1>
              <p className="ab-hero-sub">
                EnviroCare is the Wedgworth family. Founded in Alexander City in 1958 as Wedgworth Pest Control,
                now four generations on across Birmingham, Huntsville, and Lake Martin — protecting Alabama
                homes the way we'd protect our own.
              </p>
              <div className="ab-stats">
                <div className="ab-stat">
                  <div className="ab-stat-n">68+</div>
                  <div className="ab-stat-l">Years in business</div>
                </div>
                <div className="ab-stat">
                  <div className="ab-stat-n">4</div>
                  <div className="ab-stat-l">Generations of Wedgworths</div>
                </div>
                <div className="ab-stat">
                  <div className="ab-stat-n">3</div>
                  <div className="ab-stat-l">Alabama offices</div>
                </div>
              </div>
            </div>
            <div className="ab-hero-card">
              <div className="ab-hero-card-year">1958</div>
              <div className="ab-hero-card-quote">
                "Do the job right. Show up when you said you would. Stand behind every visit."
              </div>
              <div className="ab-hero-card-by">— Phillip M. Wedgworth, founder</div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="ab-timeline">
          <div style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
            <div className="ab-section-eyebrow">Our Story</div>
            <h2 className="ab-section-title" style={{ margin: "0 auto .85rem" }}>
              From Lake Martin to <span>all of Alabama</span>
            </h2>
            <p className="ab-section-sub" style={{ margin: "0 auto 3rem" }}>
              Six decades of one family doing this work, one home at a time.
            </p>
          </div>
          <div className="ab-tl-grid">
            <div className="ab-tl-row l">
              <div className="ab-tl-card">
                <h3>Founded as Wedgworth Pest Control</h3>
                <p>
                  Phillip M. Wedgworth starts the family business — Wedgworth Pest Control — in Alexander City, on Lake Martin,
                  to protect the homes and families of the lake community. Our original Alex City location still anchors the company today.
                </p>
              </div>
              <div className="ab-tl-year">1958</div>
            </div>
            <div className="ab-tl-row r">
              <div className="ab-tl-year">1980</div>
              <div className="ab-tl-card">
                <h3>Second generation takes over</h3>
                <p>
                  Phillip L. Wedgworth takes over the family business. The second generation expands service across
                  East Alabama and earns the trust of Russell Lands and the surrounding residential lake properties.
                </p>
              </div>
            </div>
            <div className="ab-tl-row l">
              <div className="ab-tl-card">
                <h3>Sentricon® certification</h3>
                <p>
                  EnviroCare becomes a Sentricon® Certified Specialist — one of fewer than 1% of pest companies
                  authorized to install the in-ground bait system, with no-drilling termite protection and up to
                  $1M in EnviroCare-backed damage coverage.
                </p>
              </div>
              <div className="ab-tl-year">2000s</div>
            </div>
            <div className="ab-tl-row r">
              <div className="ab-tl-year">2002</div>
              <div className="ab-tl-card">
                <h3>Kevin Wedgworth expands into Birmingham</h3>
                <p>
                  Many Lake Martin customers kept lake houses but lived in Birmingham, Hoover, Vestavia Hills, and Mountain Brook —
                  and asked us to protect their homes there too. Kevin Wedgworth opens a Birmingham-area office to serve them.
                </p>
              </div>
            </div>
            <div className="ab-tl-row l">
              <div className="ab-tl-card">
                <h3>Kevin takes the helm</h3>
                <p>
                  Kevin Wedgworth takes over the family business and runs EnviroCare across three Alabama
                  offices. The fourth generation, William Lex Wedgworth, joined the business in 2024 —
                  learning the trade the same way every Wedgworth before him has.
                </p>
              </div>
              <div className="ab-tl-year">2016</div>
            </div>

            <div className="ab-tl-row r">
              <div className="ab-tl-card">
                <h3>Huntsville office opens</h3>
                <p>
                  Expansion north to Huntsville and Madison County. The Old Madison Pike office covers Research
                  Park, Hampton Cove, Madison, Athens, Decatur, and the Tennessee Valley.
                </p>
              </div>
              <div className="ab-tl-year">2020</div>
            </div>
            <div className="ab-tl-row l">
              <div className="ab-tl-year">Today</div>
              <div className="ab-tl-card">
                <h3>Four offices, one family</h3>
                <p>
                  Bi-monthly pest control, Sentricon® termite protection, and seasonal mosquito and tick service
                  across Alabama. Still family-owned. Still a real person answering the phone. Still the same promise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAMILY / GENERATIONS */}
        <section className="ab-fam">
          <div style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
            <div className="ab-section-eyebrow">The Wedgworth Family</div>
            <h2 className="ab-section-title" style={{ margin: "0 auto .85rem" }}>
              <span>Four generations</span> of the family business
            </h2>
            <p className="ab-section-sub" style={{ margin: "0 auto" }}>
              When you call EnviroCare, you reach a Wedgworth — not a call center.
            </p>
          </div>
          <div className="ab-fam-grid">
            <div className="ab-fam-card">
              <div className="ab-fam-art ab-fam-art-1">
                <div className="ab-fam-gen">First Generation</div>
                <div className="ab-fam-name">Phillip M. Wedgworth</div>
              </div>
              <div className="ab-fam-body">
                <div className="ab-fam-role">Founder · 1958</div>
                <p className="ab-fam-bio">
                  Started the family business in Alexander City as Wedgworth Pest Control, with one goal — protect Lake Martin homes — and set the
                  standard the generations after him carried forward.
                </p>
              </div>
            </div>
            <div className="ab-fam-card">
              <div className="ab-fam-art ab-fam-art-2">
                <div className="ab-fam-gen">Second Generation</div>
                <div className="ab-fam-name">Phillip L. Wedgworth</div>
              </div>
              <div className="ab-fam-body">
                <div className="ab-fam-role">Owner · 1980</div>
                <p className="ab-fam-bio">
                  Took over in 1980 and grew the original Alex City operation into a regional company — building relationships across
                  Russell Lands and the surrounding residential lake properties, and earning Sentricon® Certified Specialist status.
                </p>
              </div>
            </div>
            <div className="ab-fam-card">
              <div className="ab-fam-art ab-fam-art-3">
                <div className="ab-fam-gen">Third Generation</div>
                <div className="ab-fam-name">Kevin Wedgworth</div>
              </div>
              <div className="ab-fam-body">
                <div className="ab-fam-role">Owner · Today</div>
                <p className="ab-fam-bio">
                  Kevin opened the Birmingham office in 2002 and took the helm in 2016. He runs EnviroCare today across four Alabama offices, and the answer when something goes wrong hasn't changed: we come back until it's right.
                </p>
              </div>
            </div>
            <div className="ab-fam-card">
              <div className="ab-fam-art ab-fam-art-4">
                <div className="ab-fam-gen">Fourth Generation</div>
                <div className="ab-fam-name">William Lex Wedgworth</div>
              </div>
              <div className="ab-fam-body">
                <div className="ab-fam-role">In the business · Since 2024</div>
                <p className="ab-fam-bio">
                  The fourth generation of Wedgworths in the business — learning the trade hands-on and
                  carrying the family name into EnviroCare’s next chapter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES — what we believe */}
        <section className="ab-values">
          <div className="ab-values-inner">
            <div style={{ textAlign: "center" }}>
              <div className="ab-section-eyebrow">What We Believe</div>
              <h2 className="ab-section-title" style={{ margin: "0 auto .85rem" }}>
                The <span>EnviroCare</span> standard
              </h2>
              <p className="ab-section-sub" style={{ margin: "0 auto 1rem" }}>
                Four things that haven't changed since 1958.
              </p>
            </div>
            <div className="ab-vgrid">
              <div className="ab-vcard">
                <div className="ab-vcard-num">01</div>
                <h3>Two ways to pay</h3>
                <p>Pay per visit, or choose monthly pricing on a 12-month ACH billing agreement with equal, averaged payments. Your service manager confirms the exact terms in writing before anything starts.</p>
              </div>
              <div className="ab-vcard">
                <div className="ab-vcard-num">02</div>
                <h3>EPA-registered, label-directed</h3>
                <p>We use only EPA-registered products applied strictly to label directions. Your technician will advise re-entry timing.</p>
              </div>
              <div className="ab-vcard">
                <div className="ab-vcard-num">03</div>
                <h3>A real Wedgworth answers</h3>
                <p>Four Alabama offices, four direct phone numbers, the same family. No 1-800 call center between you and the family.</p>
              </div>
              <div className="ab-vcard">
                <div className="ab-vcard-num">04</div>
                <h3>We come back until it's right</h3>
                <p>Unlimited free re-services between scheduled visits — no per-trip fees, no quibbling. If something's still there, we come back.</p>
              </div>
            </div>
          </div>
        </section>

        {/* OFFICES */}
        <section className="ab-offices">
          <div style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
            <div className="ab-section-eyebrow">Our Alabama Offices</div>
            <h2 className="ab-section-title" style={{ margin: "0 auto .85rem" }}>
              Four Generations, <span>Right Down the Road</span>
            </h2>
            <p className="ab-section-sub" style={{ margin: "0 auto" }}>
              Four Alabama offices — each with its own local phone, a familiar local team, and the neighborhoods they know best. You reach people here, not a national call center.
            </p>
          </div>
          <div className="ab-off-grid">
            <div className="ab-off-card">
              <img className="ab-off-img" src="/birmingham-vulcan.webp" srcSet="/birmingham-vulcan-mobile.webp 800w, /birmingham-vulcan.webp 1200w" sizes="(max-width: 768px) 100vw, 360px" alt="The Vulcan statue overlooking Birmingham, Alabama at dusk" width={1200} height={800} loading="lazy" decoding="async" /><div className="ab-off-tag">Main · Birmingham Metro</div>
              <div className="ab-off-name">Birmingham / Alabaster</div>
              <div className="ab-off-addr">
                2025 Butler Road<br />Alabaster, AL 35007
              </div>
              <a href="tel:2059406360" className="ab-off-phone">(205) 940-6360</a>
            </div>
            <div className="ab-off-card">
              <img className="ab-off-img" src="/lake-martin-sunset.webp" alt="Lake Martin at sunset, served by EnviroCareʼs original 1958 office" /><div className="ab-off-tag">Original · 1958</div>
              <div className="ab-off-name">Lake Martin / Alex City</div>
              <div className="ab-off-addr">
                1785 Tallapoosa Street<br />Alexander City, AL 35010
              </div>
              <a href="tel:2562346162" className="ab-off-phone">(256) 234-6162</a>
            </div>
            <div className="ab-off-card">
              <img className="ab-off-img" src="/huntsville-saturn-v.webp" alt="Huntsville, Alabama, served by EnviroCareʼs North Alabama office" width={1200} height={933} loading="lazy" decoding="async" /><div className="ab-off-tag">North Alabama</div>
              <div className="ab-off-name">Huntsville / Madison</div>
              <div className="ab-off-addr">
                7027 Old Madison Pike, Ste 108<br />Huntsville, AL 35806
              </div>
              <a href="tel:2569377676" className="ab-off-phone">(256) 937-7676</a>
            </div>
          </div>
          <p style={{ fontSize: 11, color: "#8a978c", marginTop: 16, textAlign: "center" }}>
            Vulcan statue photo: Conmat13, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>CC BY-SA 4.0</a>, via Wikimedia Commons.
          </p>
        </section>

        {/* CTA */}
        <section className="ab-cta">
          <div className="ab-cta-inner">
            <h2>Ready to meet the family?</h2>
            <p>Free inspection, straight pricing, and a real Wedgworth on the other end of the phone.</p>
            <div className="ab-cta-row">
              <Link href="/quote" className="ab-btn-gold">Get a Free Quote →</Link>
              <a href="tel:2059406360" className="ab-btn-outline">Call (205) 940-6360</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
