(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,58918,e=>{"use strict";var r=e.i(43476),a=e.i(71645);let i=`
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  /* REAL ENVIROCARE BRAND — vibrant mint, not generic emerald */
  --green:#0E8E40; --green-mid:#22C55E; --green-dk:#0A7935; --green-deep:#07642B; --green-darkest:#062514;
  --green-lt:#DCFCE7; --green-xlt:#F0FDF4;
  --gold:#F5A800; --gold-dk:#CA8A04; --gold-lt:#FEF3C7; --gold-deep:#A16207;
  --white:#fff; --cream:#FFFDF8;
  --ink:#0A1A0E; --ink-mid:#1E293B; --ink-soft:#475569;
  --border:#BBF7D0; --border-soft:#D1FAE5;
  --r:16px;
  --sh-sm:0 2px 12px rgba(22,163,74,.09);
  --sh-md:0 8px 32px rgba(22,163,74,.14);
  --sh-lg:0 24px 60px rgba(22,163,74,.18);
  --sh-xl:0 30px 80px rgba(15,92,46,.28);
}
html{scroll-behavior:smooth}
body{font-family:"DM Sans",sans-serif;background:var(--white);color:var(--ink);overflow-x:hidden;-webkit-font-smoothing:antialiased}

/* ─── ANNOUNCEMENT BAR */
.ann{background:var(--green-deep);color:rgba(255,255,255,.9);font-size:12.5px;font-weight:500;padding:9px 2rem;text-align:center;letter-spacing:.02em}
.ann strong{color:var(--gold)}
.ann a{color:var(--gold);text-decoration:none;font-weight:600;margin-left:4px}
.ann a:hover{text-decoration:underline}

/* ─── NAV */
nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.97);backdrop-filter:blur(18px);border-bottom:1px solid var(--border-soft);padding:0 clamp(1.5rem,5vw,4rem)}
.nav-inner{max-width:1320px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:96px}
.logo-wrap{width:300px;flex-shrink:0;animation:logoIn 1.4s cubic-bezier(.16,1,.3,1) both;transform-origin:left center}
@keyframes logoIn{0%{transform:scale(1.4) translateX(4%);opacity:0;filter:blur(2px)}100%{transform:scale(1) translateX(0);opacity:1;filter:blur(0)}}
#ec-logo{filter:drop-shadow(0 1px 2px rgba(15,92,46,.18)) drop-shadow(0 4px 12px rgba(15,92,46,.1));transition:filter .3s;width:100%;height:auto;display:block}
#ec-logo:hover{filter:drop-shadow(0 2px 6px rgba(15,92,46,.28)) drop-shadow(0 6px 18px rgba(15,92,46,.16))}

.nav-links{display:flex;gap:2rem;list-style:none;align-items:center}
.nav-links a{font-size:13.5px;font-weight:500;color:var(--ink-mid);text-decoration:none;transition:color .2s;position:relative}
.nav-links a::after{content:'';position:absolute;left:0;bottom:-2px;width:0;height:2px;background:var(--green);transition:width .25s}
.nav-links a:hover{color:var(--green)}
.nav-links a:hover::after,.nav-links a.active::after{width:100%}
.nav-links a.active{color:var(--green);font-weight:600}
.nav-right{display:flex;align-items:center;gap:.7rem}
.nav-phone{font-size:13px;font-weight:600;color:var(--green-dk);text-decoration:none;display:flex;align-items:center;gap:6px;padding:.4rem .85rem;border-radius:50px;border:1.5px solid rgba(22,163,74,.25);transition:all .2s}
.nav-phone:hover{background:var(--green-lt);border-color:var(--green)}
.nav-cta{background:var(--gold);color:var(--ink);border:none;border-radius:50px;padding:.6rem 1.4rem;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;font-family:"DM Sans",sans-serif;transition:all .2s;white-space:nowrap;box-shadow:0 2px 12px rgba(234,179,8,.32)}
.nav-cta:hover{background:var(--gold-dk);transform:translateY(-1px);box-shadow:0 6px 20px rgba(234,179,8,.45)}

/* ─── HERO */
.hero{position:relative;overflow:hidden;background:var(--white);padding:5rem clamp(1.5rem,5vw,4rem) 5rem}
.hero-wash{position:absolute;top:0;right:0;bottom:0;width:55%;background:linear-gradient(140deg,var(--green-xlt) 0%,var(--green-lt) 50%,#86EFAC 100%);clip-path:polygon(12% 0,100% 0,100% 100%,0 100%);z-index:0;pointer-events:none}
.hero-wash::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(22,163,74,0.07)' stroke-width='1'%3E%3Cpath d='M30 0 Q30 30 60 30'/%3E%3Cpath d='M0 30 Q30 30 30 60'/%3E%3C/g%3E%3C/svg%3E") repeat;opacity:.5}
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0}
.orb-a{width:520px;height:520px;background:radial-gradient(circle,rgba(34,197,94,.18) 0%,transparent 70%);top:-100px;right:10%;animation:oa 16s ease-in-out infinite alternate}
.orb-b{width:380px;height:380px;background:radial-gradient(circle,rgba(234,179,8,.12) 0%,transparent 70%);bottom:-50px;left:4%;animation:ob 12s ease-in-out infinite alternate}
@keyframes oa{from{transform:translate(0,0)}to{transform:translate(-55px,45px)}}
@keyframes ob{from{transform:translate(0,0)}to{transform:translate(38px,-38px)}}
.hero-inner{position:relative;z-index:10;max-width:1320px;margin:0 auto;display:grid;grid-template-columns:1fr 1.05fr;gap:4rem;align-items:center}

.eyebrow-pill{display:inline-flex;align-items:center;gap:8px;background:var(--green-lt);border:1px solid rgba(22,163,74,.3);border-radius:40px;padding:.4rem 1rem .4rem .65rem;margin-bottom:1.5rem}
.dot-wrap{position:relative;width:10px;height:10px;display:flex;align-items:center;justify-content:center}
.dot-core{width:8px;height:8px;border-radius:50%;background:var(--green-mid);z-index:1;animation:dcb 2.2s ease-in-out infinite}
.dot-ring{position:absolute;inset:-4px;border-radius:50%;border:1.5px solid var(--green-mid);animation:drx 2.2s ease-out infinite}
@keyframes dcb{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.82);opacity:.7}}
@keyframes drx{0%{transform:scale(.5);opacity:.9}100%{transform:scale(2.4);opacity:0}}
.eyebrow-txt{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--green-dk)}

.hero h1{font-family:"Playfair Display",serif;font-size:clamp(2.4rem,4.6vw,4rem);font-weight:900;line-height:1.05;color:var(--ink);margin-bottom:1.4rem;letter-spacing:-.5px}
.hero h1 em{color:var(--green-dk);font-style:italic;display:block}
.hero h1 .gd{color:var(--gold-dk)}
.hero-sub{font-size:1.08rem;line-height:1.75;color:var(--ink-soft);max-width:480px;margin-bottom:2.2rem}
.cta-row{display:flex;gap:.9rem;flex-wrap:wrap;margin-bottom:2.5rem}

.btn-gold{position:relative;background:var(--gold);color:var(--ink);border:none;border-radius:50px;padding:.95rem 2.1rem;font-family:"DM Sans",sans-serif;font-size:1rem;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:transform .25s,box-shadow .25s;box-shadow:0 4px 18px rgba(234,179,8,.4);overflow:visible}
.btn-gold::before,.btn-gold::after{content:"";position:absolute;border-radius:50px;border:2px solid rgba(234,179,8,.65);pointer-events:none}
.btn-gold::before{inset:-5px;animation:gp 2.8s ease-out infinite}
.btn-gold::after{inset:-11px;border-color:rgba(234,179,8,.28);animation:gp 2.8s ease-out .55s infinite}
.btn-gold:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(234,179,8,.55)}
@keyframes gp{0%{transform:scale(1);opacity:1}70%,100%{transform:scale(1.28);opacity:0}}
.btn-green{background:transparent;color:var(--green-dk);border:2px solid var(--green-dk);border-radius:50px;padding:.92rem 1.8rem;font-family:"DM Sans",sans-serif;font-size:1rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .25s}
.btn-green:hover{background:var(--green-dk);color:var(--white);box-shadow:0 6px 20px rgba(21,128,61,.32)}
.btn-outline-white{background:transparent;color:var(--white);border:2px solid rgba(255,255,255,.5);border-radius:50px;padding:.75rem 1.6rem;font-family:"DM Sans",sans-serif;font-size:.95rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .25s}
.btn-outline-white:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.85)}

.stats{display:flex;gap:2rem;flex-wrap:wrap;margin-bottom:2rem}
.stat{border-left:3px solid var(--gold);padding-left:.9rem}
.stat-n{font-family:"Playfair Display",serif;font-size:1.85rem;font-weight:700;color:var(--green-dk);line-height:1}
.stat-l{font-size:10.5px;color:var(--ink-soft);letter-spacing:.05em;margin-top:3px;text-transform:uppercase;font-weight:600}

.badges{display:flex;gap:.7rem;flex-wrap:wrap}
.badge{display:flex;align-items:center;gap:6px;background:var(--green-lt);border:1px solid rgba(22,163,74,.2);border-radius:8px;padding:.45rem .85rem;font-size:12px;font-weight:500;color:var(--ink-mid)}
.badge .ck{color:var(--green-dk);font-weight:700;font-size:13px}

/* ─── HERO VISUAL */
.visual{position:relative}
.img-frame{position:relative;border-radius:24px;aspect-ratio:1/1;background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-darkest) 100%);box-shadow:var(--sh-xl);overflow:hidden}
/* image slot — drop your real Alabama home photo here */
.img-frame img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s ease}
.img-frame:hover img{transform:scale(1.04)}
.img-fade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(6,37,20,.4) 100%);pointer-events:none}
/* fallback illustration, hidden when image loads */
.hero-illust-bg{position:absolute;inset:0;background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-darkest) 100%)}
.hero-illust-bg::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 20%,rgba(234,179,8,.18) 0%,transparent 55%),radial-gradient(circle at 80% 80%,rgba(34,197,94,.22) 0%,transparent 55%)}
.hero-illust-bg .grid-p{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at center,black 30%,transparent 75%)}
.hero-illust-bg svg{position:absolute;inset:0;width:100%;height:100%}

/* glass cards */
.gc{position:absolute;background:rgba(255,255,255,.96);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.6);border-radius:16px;box-shadow:0 12px 36px rgba(15,92,46,.32),0 2px 8px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.95);z-index:5}
.gc-rating{bottom:-22px;left:-26px;padding:.95rem 1.2rem;display:flex;align-items:center;gap:12px;animation:bob1 3.8s ease-in-out infinite}
@keyframes bob1{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.gc-svc{top:-16px;right:-22px;padding:.85rem 1.1rem;display:flex;flex-direction:column;gap:6px;animation:bob2 2.8s ease-in-out infinite}
@keyframes bob2{0%,100%{transform:translateY(0)}50%{transform:translateY(-13px)}}
.gc-stars{display:flex;gap:2px;margin-bottom:3px}
.gc-star{color:var(--gold);font-size:14px}
.gc-rn{font-size:1.4rem;font-weight:700;color:var(--ink);line-height:1;font-family:"Playfair Display",serif}
.gc-rl,.gc-rc{font-size:10px;color:var(--ink-soft);white-space:nowrap;font-weight:500}
.gc-rc{opacity:.75}
.gc-row{display:flex;align-items:center;gap:10px}
.gc-ic{width:36px;height:36px;border-radius:10px;background:var(--green-lt);border:1px solid rgba(22,163,74,.25);display:flex;align-items:center;justify-content:center;color:var(--green-dk)}
.gc-st{font-size:13px;font-weight:700;color:var(--ink);white-space:nowrap}
.gc-ss{font-size:10px;color:var(--ink-soft);white-space:nowrap}
.gc-avail{display:inline-flex;align-items:center;gap:5px;background:var(--green-lt);border:1px solid rgba(22,163,74,.25);border-radius:20px;padding:3px 10px;font-size:9.5px;font-weight:700;color:var(--green-dk);letter-spacing:.06em;text-transform:uppercase;width:fit-content}
.gc-dot{width:6px;height:6px;border-radius:50%;background:var(--green-mid);animation:dcb 1.8s ease-in-out infinite}
.gc-est{position:absolute;top:30%;left:-26px;padding:.7rem 1rem;display:flex;flex-direction:column;gap:2px;animation:bob1 4.4s ease-in-out infinite}
.gc-est-label{font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--green-dk)}
.gc-est-val{font-family:"Playfair Display",serif;font-size:1.5rem;font-weight:700;color:var(--ink);line-height:1}

/* ─── SECTION SHARED */
.section{padding:5.5rem clamp(1.5rem,5vw,4rem)}
.container{max-width:1320px;margin:0 auto}
.section-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--green-dk);background:var(--green-lt);border:1px solid rgba(22,163,74,.25);border-radius:40px;padding:.32rem .9rem;margin-bottom:1rem}
.section-title{font-family:"Playfair Display",serif;font-size:clamp(2rem,3.6vw,3rem);font-weight:900;color:var(--ink);line-height:1.1;margin-bottom:.85rem;letter-spacing:-.4px}
.section-title span{color:var(--green-dk)}
.section-sub{font-size:1.05rem;line-height:1.75;color:var(--ink-soft);max-width:580px}

/* ─── TRUST STRIP */
.trust{background:var(--white);border-top:3px solid var(--gold);border-bottom:1px solid var(--border-soft);padding:1.2rem clamp(1.5rem,5vw,4rem)}
.trust-inner{max-width:1320px;margin:0 auto;display:flex;justify-content:center;gap:2.5rem;flex-wrap:wrap}
.ti{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:500;color:var(--ink-soft)}
.ti-chk{width:20px;height:20px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:11px;color:white;flex-shrink:0;font-weight:700}

/* ─── MARQUEE */
.mq{background:var(--green-deep);padding:.95rem 0;overflow:hidden}
.mq-track{display:flex;width:max-content;animation:mqs 38s linear infinite}
.mq-track:hover{animation-play-state:paused}
.mq-item{display:flex;align-items:center;gap:.7rem;padding:0 2.2rem;font-size:12.5px;font-weight:600;color:rgba(255,255,255,.55);letter-spacing:.05em;white-space:nowrap}
.mq-item strong{color:rgba(255,255,255,.92)}
.mq-item::after{content:"";display:inline-block;width:5px;height:5px;border-radius:50%;background:rgba(234,179,8,.6);margin-left:2.2rem}
@keyframes mqs{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ─── CORE PROGRAMS — 4 PILLARS */
.programs{background:linear-gradient(180deg,var(--green-deep) 0%,var(--green-darkest) 100%);padding:6rem clamp(1.5rem,5vw,4rem);position:relative;overflow:hidden}
.programs::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='1.5' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E") repeat}
.programs::after{content:'';position:absolute;top:-40%;right:-10%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(234,179,8,.1) 0%,transparent 70%);pointer-events:none}
.programs .section-eyebrow{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.2);color:#86EFAC}
.programs .section-title{color:var(--white)}
.programs .section-title span{color:var(--gold)}
.programs .section-sub{color:rgba(255,255,255,.72);max-width:680px}
.prog-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-top:3rem;position:relative;z-index:2}
.prog-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:0;position:relative;overflow:hidden;transition:all .35s cubic-bezier(.16,1,.3,1);cursor:pointer;backdrop-filter:blur(8px)}
.prog-card:hover{background:rgba(255,255,255,.09);transform:translateY(-6px);box-shadow:0 24px 50px rgba(0,0,0,.35);border-color:rgba(255,255,255,.22)}
.prog-card.featured{background:linear-gradient(180deg,rgba(234,179,8,.16) 0%,rgba(234,179,8,.04) 100%);border-color:rgba(234,179,8,.5)}
.prog-card.featured:hover{background:linear-gradient(180deg,rgba(234,179,8,.22) 0%,rgba(234,179,8,.06) 100%)}
.prog-badge{position:absolute;top:.9rem;right:.9rem;background:var(--gold);color:var(--ink);font-size:8.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:20px;z-index:3}
.prog-art{width:100%;height:140px;border-radius:20px 20px 0 0;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.prog-art-1{background:linear-gradient(135deg,#16A34A 0%,#15803D 100%)}
.prog-art-2{background:linear-gradient(135deg,#CA8A04 0%,#A16207 100%)}
.prog-art-3{background:linear-gradient(135deg,#22C55E 0%,#16A34A 100%)}
.prog-art-4{background:linear-gradient(135deg,#15803D 0%,#0F5C2E 100%)}
.prog-art svg{position:relative;z-index:2;width:80%;height:80%}
.prog-art-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);background-size:32px 32px;opacity:.7}
.prog-body{padding:1.4rem 1.4rem 1.5rem}
.prog-name{font-family:"Playfair Display",serif;font-size:1.2rem;font-weight:700;color:var(--white);margin-bottom:.45rem;letter-spacing:-.2px}
.prog-desc{font-size:.85rem;line-height:1.6;color:rgba(255,255,255,.72);margin-bottom:1rem}
.prog-features{list-style:none;margin-bottom:1.25rem}
.prog-features li{display:flex;align-items:flex-start;gap:7px;font-size:.8rem;color:rgba(255,255,255,.78);margin-bottom:.4rem}
.prog-chk{color:#86EFAC;font-size:12px;flex-shrink:0;margin-top:1px;font-weight:700}
.prog-link{display:inline-flex;align-items:center;gap:6px;font-size:.83rem;font-weight:600;color:var(--gold);text-decoration:none;transition:gap .2s}
.prog-link:hover{gap:11px}

/* ─── SERVICES GRID — premium icon cards */
.services-bg{background:var(--cream);position:relative}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:3rem}
.svc-card{background:var(--white);border:1px solid var(--border-soft);border-radius:18px;padding:1.75rem 1.5rem;transition:all .3s cubic-bezier(.16,1,.3,1);cursor:pointer;position:relative;overflow:hidden}
.svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green) 0%,var(--green-mid) 50%,var(--gold) 100%);transform:scaleX(0);transform-origin:left;transition:transform .35s ease}
.svc-card:hover{border-color:var(--green);transform:translateY(-4px);box-shadow:var(--sh-md)}
.svc-card:hover::before{transform:scaleX(1)}
.svc-icon-box{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--green-lt) 0%,#BBF7D0 100%);display:flex;align-items:center;justify-content:center;margin-bottom:1.1rem;position:relative;transition:all .3s}
.svc-icon-box::after{content:'';position:absolute;inset:0;border-radius:14px;background:linear-gradient(135deg,var(--green) 0%,var(--green-mid) 100%);opacity:0;transition:opacity .3s}
.svc-card:hover .svc-icon-box::after{opacity:1}
.svc-icon-box svg{position:relative;z-index:2;width:28px;height:28px;color:var(--green-dk);transition:color .3s}
.svc-card:hover .svc-icon-box svg{color:var(--white)}
.svc-name{font-family:"Playfair Display",serif;font-size:1.15rem;font-weight:700;color:var(--ink);margin-bottom:.4rem;letter-spacing:-.2px}
.svc-desc{font-size:.875rem;color:var(--ink-soft);line-height:1.6;margin-bottom:.9rem}
.svc-tag{display:inline-block;background:var(--green-lt);color:var(--green-dk);font-size:10px;font-weight:700;padding:3px 9px;border-radius:20px;letter-spacing:.05em;text-transform:uppercase}

/* ─── LOCATIONS */
.loc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.loc-card{border-radius:22px;overflow:hidden;border:1px solid var(--border-soft);box-shadow:var(--sh-sm);transition:all .35s cubic-bezier(.16,1,.3,1);background:var(--white)}
.loc-card:hover{transform:translateY(-5px);box-shadow:var(--sh-md);border-color:var(--green)}
.loc-art{position:relative;height:170px;overflow:hidden;display:flex;align-items:flex-end;padding:1.1rem}
.loc-art-1{background:linear-gradient(160deg,#16A34A 0%,#15803D 60%,#0F5C2E 100%)}
.loc-art-2{background:linear-gradient(160deg,#22C55E 0%,#16A34A 50%,#15803D 100%)}
.loc-art-3{background:linear-gradient(160deg,#15803D 0%,#0F5C2E 60%,#062514 100%)}
.loc-art svg{position:absolute;inset:0;width:100%;height:100%}
.loc-art-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:24px 24px;opacity:.5}
.loc-city-name{position:relative;z-index:2;font-family:"Playfair Display",serif;font-size:1.3rem;font-weight:700;color:var(--white);text-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;gap:8px}
.loc-body{padding:1.4rem 1.5rem 1.6rem}
.loc-office{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--green-dk);margin-bottom:.5rem}
.loc-addr{font-size:.875rem;color:var(--ink-mid);margin-bottom:.6rem;line-height:1.5;font-weight:500}
.loc-serves{font-size:.8rem;color:var(--ink-soft);line-height:1.55;margin-bottom:1rem}
.loc-phone{display:inline-flex;align-items:center;gap:6px;font-size:.9rem;font-weight:700;color:var(--green-dk);text-decoration:none;padding:.5rem 1.05rem;border-radius:50px;border:1.5px solid var(--green-dk);transition:all .2s}
.loc-phone:hover{background:var(--green-dk);color:var(--white)}

/* ─── REVIEWS */
.reviews-bg{background:linear-gradient(180deg,var(--green-xlt) 0%,var(--green-lt) 100%)}
.review-track-wrap{overflow:hidden;margin-top:2.5rem;position:relative}
.review-track-wrap::before,.review-track-wrap::after{content:'';position:absolute;top:0;bottom:0;width:90px;z-index:2;pointer-events:none}
.review-track-wrap::before{left:0;background:linear-gradient(90deg,var(--green-xlt),transparent)}
.review-track-wrap::after{right:0;background:linear-gradient(-90deg,var(--green-lt),transparent)}
.review-track{display:flex;gap:1.25rem;width:max-content;animation:revScroll 50s linear infinite}
.review-track:hover{animation-play-state:paused}
.rev-card{width:320px;flex-shrink:0;background:var(--white);border:1px solid var(--border-soft);border-radius:18px;padding:1.65rem;box-shadow:var(--sh-sm);position:relative}
.rev-quote{position:absolute;top:-10px;right:18px;font-family:"Playfair Display",serif;font-size:3.5rem;color:var(--gold);line-height:1;opacity:.3}
.rev-stars{display:flex;gap:2px;margin-bottom:.8rem}
.rev-star{color:var(--gold);font-size:14px}
.rev-text{font-size:.92rem;line-height:1.65;color:var(--ink-mid);margin-bottom:1.1rem;font-style:italic}
.rev-who{display:flex;align-items:center;gap:10px;padding-top:1rem;border-top:1px solid var(--border-soft)}
.rev-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--green) 0%,var(--green-mid) 100%);color:white;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0;box-shadow:0 2px 8px rgba(22,163,74,.3)}
.rev-name{font-size:.88rem;font-weight:600;color:var(--ink)}
.rev-loc{font-size:.78rem;color:var(--ink-soft)}
@keyframes revScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ─── PLANS */
.plans-bg{background:var(--white)}
.plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3rem}
.plan-card{border-radius:22px;border:1.5px solid var(--border-soft);padding:2.1rem 1.85rem;position:relative;transition:all .3s;background:var(--white)}
.plan-card:hover{transform:translateY(-5px);box-shadow:var(--sh-md)}
.plan-card.featured{border-color:var(--green);box-shadow:0 0 0 3px rgba(22,163,74,.1),var(--sh-md);background:linear-gradient(180deg,#F8FFF9 0%,var(--white) 50%)}
.plan-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--green) 0%,var(--green-mid) 100%);color:white;font-size:9.5px;font-weight:700;padding:5px 16px;border-radius:20px;white-space:nowrap;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 4px 14px rgba(22,163,74,.4)}
.plan-name{font-family:"Playfair Display",serif;font-size:1.4rem;font-weight:700;color:var(--ink);margin-bottom:.5rem}
.plan-icon-row{display:flex;align-items:center;gap:.45rem;margin-bottom:.85rem;flex-wrap:wrap}
.plan-icon-pill{display:inline-flex;align-items:center;gap:5px;background:var(--green-lt);border:1px solid rgba(22,163,74,.25);border-radius:30px;padding:4px 11px;font-size:11px;font-weight:600;color:var(--green-dk)}
.plan-icon-pill svg{width:11px;height:11px}
.plan-tag-line{font-size:.88rem;color:var(--ink-soft);margin-bottom:1.3rem;line-height:1.5;font-style:italic}
.plan-price{margin-bottom:1.4rem}
.plan-price sup{font-size:1.1rem;font-weight:700;color:var(--green-dk);vertical-align:top;margin-top:.4rem;display:inline-block}
.plan-price .num{font-size:3rem;font-weight:700;color:var(--green-dk);font-family:"Playfair Display",serif;line-height:1}
.plan-price .per{font-size:.85rem;color:var(--ink-soft);margin-left:2px}
.plan-price-note{font-size:11px;color:var(--ink-soft);margin-top:.4rem;display:block}
.plan-features{list-style:none;margin-bottom:1.6rem}
.plan-features li{display:flex;align-items:flex-start;gap:9px;font-size:.88rem;color:var(--ink-mid);margin-bottom:.55rem;line-height:1.5}
.plan-chk{color:var(--green);font-weight:700;flex-shrink:0;margin-top:2px}
.plan-cta{display:block;text-align:center;background:var(--green-dk);color:var(--white);border:none;border-radius:50px;padding:.85rem;font-family:"DM Sans",sans-serif;font-size:.95rem;font-weight:700;cursor:pointer;text-decoration:none;transition:all .2s}
.plan-cta:hover{background:var(--green-deep);transform:translateY(-1px);box-shadow:0 6px 16px rgba(15,92,46,.32)}
.plan-card.featured .plan-cta{background:var(--gold);color:var(--ink)}
.plan-card.featured .plan-cta:hover{background:var(--gold-dk);box-shadow:0 6px 16px rgba(234,179,8,.45)}

/* coupons */
.coupon-row{display:flex;gap:1rem;flex-wrap:wrap;margin-top:2.5rem}
.coupon{flex:1;min-width:240px;border-radius:var(--r);padding:1.4rem 1.3rem;text-align:center;position:relative;overflow:hidden}
.coupon-1{background:var(--gold-lt);border:2px dashed var(--gold)}
.coupon-2{background:var(--green-lt);border:2px dashed var(--green)}
.coupon-3{background:var(--green-lt);border:2px dashed var(--green-dk)}
.coupon-icon{width:42px;height:42px;border-radius:12px;background:var(--white);display:flex;align-items:center;justify-content:center;margin:0 auto .65rem;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.coupon-title{font-family:"Playfair Display",serif;font-size:1.05rem;margin-bottom:.3rem;font-weight:700;color:var(--ink)}
.coupon-sub{font-size:.8rem;color:var(--ink-soft);line-height:1.5}

/* ─── BUNDLE BANNER */
.bundle{background:linear-gradient(135deg,var(--green) 0%,var(--green-dk) 50%,var(--green-deep) 100%);padding:3.5rem clamp(1.5rem,5vw,4rem);text-align:center;position:relative;overflow:hidden}
.bundle::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 20% 50%,rgba(234,179,8,.14) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(134,239,172,.12) 0%,transparent 50%);pointer-events:none}
.bundle-inner{position:relative;z-index:2}
.bundle-title{font-family:"Playfair Display",serif;font-size:clamp(1.6rem,3vw,2.3rem);font-weight:700;color:var(--white);margin-bottom:.6rem;letter-spacing:-.3px}
.bundle-sub{color:rgba(255,255,255,.82);margin-bottom:1.8rem;font-size:1.02rem}
.bundle-pills{display:flex;justify-content:center;gap:.85rem;flex-wrap:wrap;margin-bottom:2rem}
.bundle-pill{background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.27);border-radius:50px;padding:.5rem 1.15rem;font-size:.875rem;color:rgba(255,255,255,.92);font-weight:500}
.bundle-pill strong{color:var(--gold);font-weight:700}

/* ─── FOOTER */
footer{background:var(--ink);color:rgba(255,255,255,.7);padding:4.5rem clamp(1.5rem,5vw,4rem) 2rem;position:relative}
footer::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--green) 0%,var(--gold) 50%,var(--green) 100%)}
.footer-grid{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem}
.footer-brand{font-size:.9rem;line-height:1.7;color:rgba(255,255,255,.55)}
.footer-brand strong{color:var(--white);display:block;margin-bottom:.6rem;font-size:1.05rem;font-family:"Playfair Display",serif}
.footer-phone{color:var(--gold);text-decoration:none;font-weight:600;font-size:.875rem;display:inline-block;margin-top:.4rem;transition:color .2s}
.footer-phone:hover{color:#FCD34D}
.footer-head{font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:1.1rem}
.footer-links{list-style:none}
.footer-links li{margin-bottom:.55rem}
.footer-links a{color:rgba(255,255,255,.6);text-decoration:none;font-size:.875rem;transition:color .2s}
.footer-links a:hover{color:var(--gold)}
.footer-bottom{max-width:1320px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;border-top:1px solid rgba(255,255,255,.08);padding-top:1.5rem;font-size:.8rem;color:rgba(255,255,255,.35)}
.footer-bottom a{color:rgba(255,255,255,.35);text-decoration:none;transition:color .2s}
.footer-bottom a:hover{color:rgba(255,255,255,.6)}

/* ─── RESPONSIVE */
@media(max-width:1100px){
  .prog-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:1000px){
  .hero-inner,.loc-grid,.plans-grid{grid-template-columns:1fr}
  .svc-grid{grid-template-columns:repeat(2,1fr)}
  .nav-links{display:none}
  .logo-wrap{width:240px}
  .hero-wash{display:none}
  .footer-grid{grid-template-columns:1fr 1fr}
  /* Heritage block stacks on tablet */
  section[style*="background:var(--cream)"] .container > div{grid-template-columns:1fr !important;gap:2.5rem !important}
}
@media(max-width:600px){
  .hero h1{font-size:2.1rem}
  .svc-grid,.prog-grid{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr}
  .logo-wrap{width:200px}
  .nav-inner{height:78px}
  .section{padding:4rem 1.5rem}
  .visual{display:none} /* hide hero truck photo only on phone, keeps tablet rich */
}

/* ─── CITY HERO */
.city-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-dk) 50%,var(--green) 100%);padding:5rem clamp(1.5rem,5vw,4rem) 5rem;color:#fff}
.city-hero::before{content:"";position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'%3E%3Cpath d='M30 0 Q30 30 60 30'/%3E%3Cpath d='M0 30 Q30 30 30 60'/%3E%3C/g%3E%3C/svg%3E") repeat;opacity:.7;pointer-events:none}
.city-hero-inner{position:relative;z-index:2;max-width:1320px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1fr;gap:4rem;align-items:center}
.city-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:40px;padding:.4rem 1rem;margin-bottom:1.4rem;backdrop-filter:blur(8px)}
.city-eyebrow-txt{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,.92)}
.city-hero h1{font-family:"Playfair Display",serif;font-size:clamp(2.6rem,5vw,4.4rem);font-weight:900;line-height:1.02;color:#fff;margin-bottom:1.2rem;letter-spacing:-.5px}
.city-hero h1 em{color:var(--gold);font-style:italic;display:block;font-weight:700}
.city-hero-sub{font-size:1.1rem;line-height:1.7;color:rgba(255,255,255,.88);max-width:520px;margin-bottom:2rem}
.city-stats{display:flex;gap:1.6rem;flex-wrap:wrap;margin-bottom:2rem}
.city-stat{border-left:3px solid var(--gold);padding-left:.9rem}
.city-stat-n{font-family:"Playfair Display",serif;font-size:1.85rem;font-weight:700;color:#fff;line-height:1}
.city-stat-l{font-size:10.5px;color:rgba(255,255,255,.75);letter-spacing:.05em;margin-top:3px;text-transform:uppercase;font-weight:600}
.city-cta-row{display:flex;gap:.9rem;flex-wrap:wrap}
.city-art-box{position:relative;border-radius:24px;overflow:hidden;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);aspect-ratio:5/4;backdrop-filter:blur(4px)}
.city-art-box svg{position:absolute;inset:0;width:100%;height:100%}
.city-art-name{position:absolute;bottom:1.4rem;left:1.6rem;font-family:"Playfair Display",serif;font-size:1.6rem;font-weight:700;color:#fff;letter-spacing:.5px;z-index:3;text-shadow:0 2px 8px rgba(0,0,0,.35)}

/* ─── NEIGHBORHOODS */
.nbhd-section{padding:5rem clamp(1.5rem,5vw,4rem);background:var(--cream)}
.nbhd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.7rem;max-width:1100px;margin:2rem auto 0}
.nbhd-chip{background:#fff;border:1.5px solid var(--border);border-radius:50px;padding:.7rem 1.2rem;font-size:13px;font-weight:600;color:var(--green-dk);text-align:center;transition:all .25s;cursor:default}
.nbhd-chip:hover{background:var(--green-lt);border-color:var(--green);transform:translateY(-2px);box-shadow:var(--sh-sm)}

/* ─── WHY HERE */
.whyhere{padding:5rem clamp(1.5rem,5vw,4rem);background:var(--white)}
.whyhere-inner{max-width:920px;margin:0 auto;text-align:center}
.whyhere h2{font-family:"Playfair Display",serif;font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;color:var(--ink);margin-bottom:1.4rem;line-height:1.1}
.whyhere h2 span{color:var(--green-dk);font-style:italic}
.whyhere p{font-size:1.15rem;line-height:1.75;color:var(--ink-soft);max-width:720px;margin:0 auto}

/* ─── OFFICE CARD */
.office-cta{padding:4rem clamp(1.5rem,5vw,4rem);background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-darkest) 100%);color:#fff}
.office-cta-inner{max-width:920px;margin:0 auto;text-align:center}
.office-cta h3{font-family:"Playfair Display",serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:900;color:#fff;margin-bottom:.6rem}
.office-cta-addr{font-size:1.05rem;color:rgba(255,255,255,.85);margin-bottom:1.6rem}
.office-cta-row{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap}

@media(max-width:1000px){
  .city-hero-inner{grid-template-columns:1fr}
  .city-art-box{aspect-ratio:16/9}
}

/* ─── PAGE HERO (REALTOR / BUILDERS / FAQ) */
.page-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-dk) 50%,var(--green) 100%);padding:5rem clamp(1.5rem,5vw,4rem) 5rem;color:#fff}
.page-hero::before{content:"";position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'%3E%3Cpath d='M30 0 Q30 30 60 30'/%3E%3Cpath d='M0 30 Q30 30 30 60'/%3E%3C/g%3E%3C/svg%3E") repeat;opacity:.7;pointer-events:none}
.page-hero-inner{position:relative;z-index:2;max-width:1100px;margin:0 auto;text-align:center}
.page-hero h1{font-family:"Playfair Display",serif;font-size:clamp(2.6rem,5vw,4.4rem);font-weight:900;line-height:1.02;color:#fff;margin-bottom:1.2rem;letter-spacing:-.5px}
.page-hero h1 em{color:var(--gold);font-style:italic;display:block;font-weight:700}
.page-hero-sub{font-size:1.15rem;line-height:1.7;color:rgba(255,255,255,.88);max-width:680px;margin:0 auto 2rem}
.page-hero-cta{display:flex;gap:.9rem;justify-content:center;flex-wrap:wrap}

/* Workflow steps (Realtor, Builders) */
.flow-section{padding:5rem clamp(1.5rem,5vw,4rem);background:var(--cream)}
.flow-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.6rem;max-width:1180px;margin:2.4rem auto 0}
.flow-card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:1.8rem 1.6rem;position:relative;transition:transform .25s,box-shadow .25s}
.flow-card:hover{transform:translateY(-4px);box-shadow:var(--sh-md)}
.flow-num{position:absolute;top:-14px;left:1.6rem;background:var(--gold);color:var(--ink);width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:"Playfair Display",serif;font-weight:900;font-size:1.05rem;border:3px solid var(--cream)}
.flow-title{font-family:"Playfair Display",serif;font-size:1.2rem;font-weight:700;color:var(--green-dk);margin:.8rem 0 .6rem;line-height:1.25}
.flow-desc{font-size:14.5px;color:var(--ink-soft);line-height:1.65}

/* Big stat band */
.stat-band{padding:4rem clamp(1.5rem,5vw,4rem);background:linear-gradient(135deg,var(--green-deep) 0%,var(--green-darkest) 100%);color:#fff}
.stat-band-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:2rem;text-align:center}
.stat-band-n{font-family:"Playfair Display",serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;color:var(--gold);line-height:1;margin-bottom:.4rem}
.stat-band-l{font-size:13px;color:rgba(255,255,255,.85);letter-spacing:.04em;text-transform:uppercase;font-weight:600}

/* FAQ category section */
.faq-cat{padding:4rem clamp(1.5rem,5vw,4rem);background:var(--white)}
.faq-cat:nth-child(even){background:var(--cream)}
.faq-list-wide{max-width:920px;margin:2rem auto 0}
`;e.s(["default",0,function(){return(0,a.useEffect)(()=>{if("u"<typeof document)return;let e=[];return[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap"}].forEach(r=>{if(document.head.querySelector(`link[href="${r.href}"]`))return;let a=document.createElement("link");Object.entries(r).forEach(([e,r])=>{"crossOrigin"===e?a.crossOrigin=r:a.setAttribute(e,r)}),document.head.appendChild(a),e.push(a)}),()=>{e.forEach(e=>e.remove())}},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:i}}),(0,r.jsxs)("div",{className:"ann",children:["🌻 ",(0,r.jsx)("strong",{children:"Family-owned since 1958"})," · Three generations of the Wedgworth family · Sentricon® up to $1M coverage",(0,r.jsx)("a",{href:"tel:2056495278",children:"Call (205) 649-5278 →"})]}),(0,r.jsx)("nav",{children:(0,r.jsxs)("div",{className:"nav-inner",children:[(0,r.jsx)("div",{className:"logo-wrap",children:(0,r.jsx)("img",{id:"ec-logo",src:"/logo.png",alt:"EnviroCare Pest & Termite Services"})}),(0,r.jsxs)("ul",{className:"nav-links",children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/",children:"Home"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/services",children:"Services"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/pricing",children:"Pricing"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/why-envirocare",children:"Why EnviroCare"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/contact",children:"Contact"})})]}),(0,r.jsxs)("div",{className:"nav-right",children:[(0,r.jsx)("a",{href:"tel:2056495278",className:"nav-phone",children:"(205) 649-5278"}),(0,r.jsx)("a",{href:"tel:2056495278",className:"nav-cta",children:"Get Free Quote"})]})]})}),(0,r.jsx)("section",{className:"page-hero",children:(0,r.jsxs)("div",{className:"page-hero-inner",children:[(0,r.jsx)("div",{className:"city-eyebrow",children:(0,r.jsx)("span",{className:"city-eyebrow-txt",children:"For Realtors & Closing Attorneys"})}),(0,r.jsxs)("h1",{children:["Your Closing\\'s Best",(0,r.jsx)("em",{children:"Termite Partner"})]}),(0,r.jsx)("p",{className:"page-hero-sub",children:"Fast WDO inspection letters, lender-ready NPMA-33 form, accepted by every Alabama lender we\\'ve worked with. Keep your closings on track — most letters delivered in 48 hours."}),(0,r.jsxs)("div",{className:"page-hero-cta",children:[(0,r.jsx)("a",{href:"tel:2056495278",className:"btn-gold",style:{overflow:"visible"},children:"Call (205) 649-5278"}),(0,r.jsx)("a",{href:"/services/real-estate-wdo",className:"btn-outline-white",children:"Learn More →"})]})]})}),(0,r.jsx)("div",{className:"trust",children:(0,r.jsxs)("div",{className:"trust-inner",children:[(0,r.jsxs)("div",{className:"ti",children:[(0,r.jsx)("div",{className:"ti-chk",children:"★"}),"4.9 Google · 500+ Reviews"]}),(0,r.jsxs)("div",{className:"ti",children:[(0,r.jsx)("div",{className:"ti-chk",children:"✓"}),"NPMA-33 Standard Letter"]}),(0,r.jsxs)("div",{className:"ti",children:[(0,r.jsx)("div",{className:"ti-chk",children:"✓"}),"VA / FHA / Conventional Accepted"]}),(0,r.jsxs)("div",{className:"ti",children:[(0,r.jsx)("div",{className:"ti-chk",children:"✓"}),"48-Hour Turnaround"]}),(0,r.jsxs)("div",{className:"ti",children:[(0,r.jsx)("div",{className:"ti-chk",children:"✓"}),"$75 Standalone Fee"]})]})}),(0,r.jsx)("section",{className:"flow-section",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("div",{className:"section-eyebrow",children:"How It Works"}),(0,r.jsxs)("h2",{className:"section-title",children:["From Order To ",(0,r.jsx)("span",{children:"Closing Table"})]}),(0,r.jsx)("p",{className:"section-sub",children:"Four steps. No surprises. No closing delays."}),(0,r.jsxs)("div",{className:"flow-grid",children:[(0,r.jsxs)("div",{className:"flow-card",children:[(0,r.jsx)("div",{className:"flow-num",children:"1"}),(0,r.jsx)("div",{className:"flow-title",children:"You Order"}),(0,r.jsx)("div",{className:"flow-desc",children:"Call or email service@envirocarellc.com with property address, target closing date, and access details."})]}),(0,r.jsxs)("div",{className:"flow-card",children:[(0,r.jsx)("div",{className:"flow-num",children:"2"}),(0,r.jsx)("div",{className:"flow-title",children:"We Inspect"}),(0,r.jsx)("div",{className:"flow-desc",children:"Trained tech checks all accessible areas — attic, crawlspace, garage, exterior. 45-60 min on average."})]}),(0,r.jsxs)("div",{className:"flow-card",children:[(0,r.jsx)("div",{className:"flow-num",children:"3"}),(0,r.jsx)("div",{className:"flow-title",children:"Letter Delivered"}),(0,r.jsx)("div",{className:"flow-desc",children:"NPMA-33 letter emailed within 48 hours. Most under 24. Lender gets copy direct if you want."})]}),(0,r.jsxs)("div",{className:"flow-card",children:[(0,r.jsx)("div",{className:"flow-num",children:"4"}),(0,r.jsx)("div",{className:"flow-title",children:"Treatment If Needed"}),(0,r.jsx)("div",{className:"flow-desc",children:"If we find active issues, you get photos + quote so you can negotiate. We can treat before closing."})]})]})]})}),(0,r.jsx)("section",{className:"stat-band",children:(0,r.jsxs)("div",{className:"stat-band-inner",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"stat-band-n",children:"48 hrs"}),(0,r.jsx)("div",{className:"stat-band-l",children:"Typical Letter Turnaround"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"stat-band-n",children:"$75"}),(0,r.jsx)("div",{className:"stat-band-l",children:"Standalone Fee"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"stat-band-n",children:"100%"}),(0,r.jsx)("div",{className:"stat-band-l",children:"AL Lenders Accepting"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"stat-band-n",children:"68 Years"}),(0,r.jsx)("div",{className:"stat-band-l",children:"Trusted In Alabama"})]})]})}),(0,r.jsx)("section",{className:"wedge",style:{background:"var(--white)"},children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("div",{className:"section-eyebrow",children:"For Closing Attorneys & Title"}),(0,r.jsxs)("h2",{className:"section-title",children:["Built For ",(0,r.jsx)("span",{children:"Closing Speed"})]}),(0,r.jsxs)("div",{className:"wedge-grid",children:[(0,r.jsxs)("div",{className:"wedge-card",children:[(0,r.jsx)("div",{className:"wedge-lead",children:"Standard Form"}),(0,r.jsx)("div",{className:"wedge-body",children:"NPMA-33 is the federal standard — same form your lender already accepts. No special version, no rejection at closing."})]}),(0,r.jsxs)("div",{className:"wedge-card",children:[(0,r.jsx)("div",{className:"wedge-lead",children:"Direct To Lender"}),(0,r.jsx)("div",{className:"wedge-body",children:"We can email the letter direct to the loan officer if you give us the contact. Saves you a forward."})]}),(0,r.jsxs)("div",{className:"wedge-card",children:[(0,r.jsx)("div",{className:"wedge-lead",children:"Same-Day If Needed"}),(0,r.jsx)("div",{className:"wedge-body",children:"Closing tomorrow and the lender needs WDO? Call us — we\\'ll prioritize same-day inspection when possible."})]})]})]})}),(0,r.jsx)("section",{className:"office-cta",children:(0,r.jsxs)("div",{className:"office-cta-inner",children:[(0,r.jsx)("div",{className:"section-eyebrow",style:{color:"rgba(255,255,255,.7)"},children:"Ready To Order?"}),(0,r.jsx)("h3",{children:"Get A WDO Letter Started"}),(0,r.jsx)("div",{className:"office-cta-addr",children:"Birmingham · Lake Martin · Huntsville · Auburn"}),(0,r.jsxs)("div",{className:"office-cta-row",children:[(0,r.jsx)("a",{href:"tel:2056495278",className:"btn-gold",style:{overflow:"visible"},children:"Call (205) 649-5278"}),(0,r.jsx)("a",{href:"mailto:service@envirocarellc.com",className:"btn-outline-white",children:"Email Service Team →"})]})]})}),(0,r.jsxs)("footer",{id:"contact",children:[(0,r.jsxs)("div",{className:"footer-grid",children:[(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:"footer-brand",children:[(0,r.jsx)("strong",{children:"EnviroCare Pest & Termite Services"}),"Family-owned and operated since 1958 — now in its third generation of the Wedgworth family. Serving Alabama from three offices.",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)("a",{href:"tel:2056495278",className:"footer-phone",style:{fontSize:"1.05rem",fontWeight:700},children:"📞 (205) 649-5278 — Main Line"}),(0,r.jsx)("br",{}),(0,r.jsx)("a",{href:"tel:2059406360",className:"footer-phone",children:"📞 (205) 940-6360 — Birmingham"}),(0,r.jsx)("br",{}),(0,r.jsx)("a",{href:"tel:2562346162",className:"footer-phone",children:"📞 (256) 234-6162 — Lake Martin / Alex City"}),(0,r.jsx)("br",{}),(0,r.jsx)("a",{href:"tel:2569377676",className:"footer-phone",children:"📞 (256) 937-7676 — Huntsville"})]})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"footer-head",children:"Core Services"}),(0,r.jsxs)("ul",{className:"footer-links",children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/services/pest-control",children:"Pest Control"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/services/termite-control",children:"Termite Control"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/services/mosquito-control",children:"Mosquito Control"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/services/tick-control",children:"Tick Control"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/pricing",children:"Plans & Pricing"})})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"footer-head",children:"For Professionals"}),(0,r.jsxs)("ul",{className:"footer-links",children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/realtor",children:"For Realtors"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/builders",children:"For Builders"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/services/real-estate-wdo",children:"WDO Letters"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/services/commercial",children:"Commercial Service"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/faq",children:"FAQ"})})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"footer-head",children:"Service Areas"}),(0,r.jsxs)("ul",{className:"footer-links",children:[(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/birmingham",children:"Birmingham, AL"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/hoover",children:"Hoover, AL"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/lake-martin",children:"Lake Martin, AL"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/huntsville",children:"Huntsville, AL"})}),(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"/auburn",children:"Auburn, AL"})})]})]})]}),(0,r.jsxs)("div",{className:"footer-bottom",children:[(0,r.jsx)("span",{children:"© 2026 EnviroCare Pest & Termite Services LLC. All rights reserved. Licensed in Alabama · Sentricon® Certified Specialist"}),(0,r.jsxs)("div",{style:{display:"flex",gap:"1.5rem"},children:[(0,r.jsx)("a",{href:"/privacy",children:"Privacy Policy"}),(0,r.jsx)("a",{href:"/terms",children:"Terms of Service"}),(0,r.jsx)("a",{href:"/sitemap.xml",children:"Sitemap"})]})]})]})]})}])}]);