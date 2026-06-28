"use client";
// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: components/CityHeroArt.tsx
// Commit: chore(compliance): remove orphaned Tuscaloosa scene + scrub McCalla public refs
// Push: main
// ─────────────────────────────────────
// components/CityHeroArt.tsx
// Unique gold city-landmark silhouette band for each city hero.
// Sits at the bottom of the green hero, behind the text (zIndex 0).
// On-brand: gold #F5A800 landmark + translucent depth. No photos, no trademarks.
// Built 6/1/2026. One scene per live city slug.

const GOLD = "#F5A800";
const GOLD_SOFT = "rgba(245,168,0,0.82)";
const DARK_A = "rgba(4,40,20,0.45)"; // front supporting silhouette
const DARK_B = "rgba(4,40,20,0.26)"; // back ridge
const WHITE = "rgba(255,255,255,0.07)";

// ---------- reusable element builders (return SVG fragment strings) ----------
const hill = (fill: string, topY: number) =>
  `<path d="M0,${topY} C220,${topY - 26} 420,${topY + 14} 640,${topY - 8} C860,${topY - 28} 1040,${topY + 8} 1200,${topY - 12} L1200,200 L0,200 Z" fill="${fill}"/>`;

const ridge = (fill: string, pts: string) =>
  `<path d="M0,200 ${pts} L1200,200 Z" fill="${fill}"/>`;

const building = (x: number, w: number, h: number, fill: string) =>
  `<rect x="${x}" y="${200 - h}" width="${w}" height="${h}" fill="${fill}"/>`;

const win = (x: number, y: number, fill = "rgba(7,100,43,0.5)") =>
  `<rect x="${x}" y="${y}" width="5" height="7" fill="${fill}"/>`;

const pine = (x: number, baseY: number, h: number, fill: string) => {
  const w = h * 0.5;
  return `<path d="M${x},${baseY - h} L${x - w / 2},${baseY - h * 0.45} L${x - w * 0.32},${baseY - h * 0.45} L${x - w * 0.6},${baseY} L${x + w * 0.6},${baseY} L${x + w * 0.32},${baseY - h * 0.45} L${x + w / 2},${baseY - h * 0.45} Z" fill="${fill}"/><rect x="${x - 2}" y="${baseY}" width="4" height="6" fill="${fill}"/>`;
};

const waterTower = (x: number, baseY: number, s: number, fill: string) =>
  `<g fill="${fill}"><rect x="${x - 2 * s}" y="${baseY - 18 * s}" width="${4 * s}" height="${18 * s}"/><rect x="${x + 8 * s}" y="${baseY - 18 * s}" width="${4 * s}" height="${18 * s}" transform="translate(${-16 * s},0)"/><ellipse cx="${x}" cy="${baseY - 22 * s}" rx="${10 * s}" ry="${6 * s}"/><rect x="${x - 10 * s}" y="${baseY - 24 * s}" width="${20 * s}" height="${5 * s}"/><rect x="${x - 9 * s}" y="${baseY - 30 * s}" width="${18 * s}" height="${7 * s}" rx="${2 * s}"/></g>`;

const dome = (cx: number, baseY: number, s: number, fill: string) =>
  `<g fill="${fill}"><rect x="${cx - 26 * s}" y="${baseY - 30 * s}" width="${52 * s}" height="${30 * s}"/><path d="M${cx - 18 * s},${baseY - 30 * s} A${18 * s},${18 * s} 0 0 1 ${cx + 18 * s},${baseY - 30 * s} Z"/><rect x="${cx - 2 * s}" y="${baseY - 56 * s}" width="${4 * s}" height="${10 * s}"/>${[-20, -10, 0, 10, 20].map((o) => `<rect x="${cx + o * s - 1.5 * s}" y="${baseY - 28 * s}" width="${3 * s}" height="${28 * s}" fill="rgba(7,100,43,0.45)"/>`).join("")}</g>`;

const waterLines = (y: number, fill = "rgba(255,255,255,0.12)") =>
  [0, 10, 20].map((o) => `<rect x="40" y="${y + o}" width="${1120}" height="2" rx="1" fill="${fill}"/>`).join("");

const sun = (x: number, y: number, r: number) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${GOLD}" opacity="0.9"/>`;

const dock = (x: number, y: number, fill: string) =>
  `<g fill="${fill}"><rect x="${x}" y="${y}" width="86" height="5"/>${[0, 20, 40, 60, 80].map((o) => `<rect x="${x + o}" y="${y}" width="4" height="16"/>`).join("")}</g>`;

// ---------- per-city scenes (viewBox 0 0 1200 200, baseline y=200) ----------
const scenes: Record<string, string> = {
  // ===== BIRMINGHAM METRO =====
  // Birmingham — Vulcan statue on column atop Red Mountain + downtown skyline
  "birmingham":
    hill(DARK_B, 150) +
    building(120, 38, 70, DARK_A) + building(165, 30, 95, DARK_A) + building(200, 44, 60, DARK_A) +
    building(980, 36, 78, DARK_A) + building(1022, 30, 100, DARK_A) + building(1058, 40, 64, DARK_A) +
    // Vulcan: ridge mound, column, figure with raised arm
    `<path d="M520,200 C560,140 640,140 680,200 Z" fill="${DARK_A}"/>` +
    `<rect x="596" y="96" width="8" height="64" fill="${GOLD}"/>` +
    `<g fill="${GOLD}"><circle cx="600" cy="84" r="9"/><rect x="592" y="92" width="16" height="26" rx="3"/><rect x="588" y="116" width="7" height="22"/><rect x="605" y="116" width="7" height="22"/><rect x="600" y="96" width="26" height="5" transform="rotate(-32 600 98)"/><rect x="624" y="66" width="5" height="20" transform="rotate(-32 624 76)"/></g>`,

  // Hoover — Galleria curve + suburban skyline + the Met
  "hoover":
    hill(DARK_B, 152) +
    building(150, 40, 56, DARK_A) + building(195, 34, 72, DARK_A) +
    `<path d="M520,200 L520,150 Q600,108 680,150 L680,200 Z" fill="${GOLD}"/>` +
    `<rect x="540" y="160" width="120" height="40" fill="rgba(7,100,43,0.4)"/>` +
    building(980, 36, 60, DARK_A) + building(1020, 30, 80, DARK_A) +
    pine(1090, 200, 56, DARK_A) + pine(90, 200, 48, DARK_A),

  // Vestavia Hills — Sibyl Temple rotunda (dome on ring of columns) on a ridge
  "vestavia-hills":
    hill(DARK_B, 150) +
    pine(120, 200, 60, DARK_A) + pine(160, 200, 44, DARK_A) +
    pine(1060, 200, 58, DARK_A) + pine(1100, 200, 46, DARK_A) +
    `<path d="M500,200 C560,150 640,150 700,200 Z" fill="${DARK_A}"/>` +
    `<g fill="${GOLD}"><path d="M566,150 A34,30 0 0 1 634,150 Z"/><rect x="560" y="150" width="80" height="6"/>${[0, 14, 28, 42, 56, 70].map((o) => `<rect x="${562 + o}" y="156" width="5" height="40"/>`).join("")}<rect x="556" y="196" width="88" height="5"/><rect x="598" y="120" width="4" height="14"/></g>`,

  // Mountain Brook — Tudor village rooflines + trees (English Village feel)
  "mountain-brook":
    hill(DARK_B, 156) +
    pine(70, 200, 54, DARK_A) + pine(1130, 200, 54, DARK_A) +
    // row of steep tudor gables, center one gold
    [200, 320, 440, 680, 800, 920].map((x, i) =>
      building(x, 90, 70, i === 2 ? "rgba(0,0,0,0)" : DARK_A) +
      `<path d="M${x - 6},${130} L${x + 45},${96} L${x + 96},130 Z" fill="${i === 2 ? GOLD : DARK_A}"/>`
    ).join("") +
    `<rect x="${440}" y="130" width="90" height="70" fill="${GOLD_SOFT}"/>` +
    win(470, 150, "rgba(7,100,43,0.5)") + win(500, 150, "rgba(7,100,43,0.5)"),

  // Homewood — bungalow rooflines + Shades Creek trees
  "homewood":
    hill(DARK_B, 158) +
    pine(80, 200, 50, DARK_A) + pine(1120, 200, 50, DARK_A) +
    [180, 300, 760, 880].map((x) =>
      building(x, 96, 56, DARK_A) + `<path d="M${x - 8},${144} L${x + 48},${118} L${x + 104},144 Z" fill="${DARK_A}"/>`
    ).join("") +
    // center gold bungalow with porch
    `<rect x="500" y="140" width="200" height="60" fill="${GOLD_SOFT}"/><path d="M492,140 L600,104 L708,140 Z" fill="${GOLD}"/>` +
    [520, 545, 655, 680].map((x) => `<rect x="${x}" y="158" width="6" height="42" fill="rgba(7,100,43,0.5)"/>`).join(""),

  // Alabaster — water tower + suburban rooftops (home market)
  "alabaster":
    hill(DARK_B, 158) +
    [120, 230, 340, 860, 970, 1080].map((x) =>
      building(x, 86, 50, DARK_A) + `<path d="M${x - 6},${150} L${x + 43},${126} L${x + 92},150 Z" fill="${DARK_A}"/>`
    ).join("") +
    waterTower(600, 196, 2.4, GOLD),

  // Chelsea — rolling rural ridges + barn + pines
  "chelsea":
    hill(DARK_B, 140) + hill(DARK_A, 168) +
    pine(150, 200, 56, DARK_A) + pine(1050, 200, 56, DARK_A) + pine(1095, 200, 42, DARK_A) +
    `<rect x="556" y="150" width="88" height="50" fill="${GOLD_SOFT}"/><path d="M548,150 L600,118 L652,150 Z" fill="${GOLD}"/>` +
    `<rect x="592" y="166" width="16" height="34" fill="rgba(7,100,43,0.5)"/>`,

  // Pelham — Oak Mountain ridges (tall peaks) + pine forest
  "pelham":
    `<path d="M0,200 L0,120 L260,40 L520,120 L520,200 Z" fill="${DARK_B}"/>` +
    `<path d="M680,200 L680,110 L940,46 L1200,110 L1200,200 Z" fill="${DARK_B}"/>` +
    `<path d="M360,200 L360,90 L600,30 L840,90 L840,200 Z" fill="${GOLD_SOFT}"/>` +
    pine(120, 200, 64, DARK_A) + pine(180, 200, 48, DARK_A) +
    pine(1020, 200, 64, DARK_A) + pine(1080, 200, 50, DARK_A) +
    pine(600, 200, 40, DARK_A),

  // Helena — Buck Creek old mill + waterwheel + creek
  "helena":
    hill(DARK_B, 154) +
    waterLines(176) +
    pine(110, 200, 52, DARK_A) + pine(1110, 200, 52, DARK_A) +
    // mill building gold + wheel
    `<rect x="540" y="120" width="90" height="80" fill="${GOLD_SOFT}"/><path d="M534,120 L585,92 L636,120 Z" fill="${GOLD}"/>` +
    `<g fill="${GOLD}"><circle cx="650" cy="170" r="26" fill="none" stroke="${GOLD}" stroke-width="4"/>${[0, 45, 90, 135].map((a) => `<rect x="648" y="146" width="4" height="48" transform="rotate(${a} 650 170)"/>`).join("")}</g>` +
    win(560, 140) + win(585, 140) + win(610, 140),

  // Calera — railroad depot + locomotive (Heart of Dixie RR)
  "calera":
    hill(DARK_B, 162) +
    `<rect x="0" y="188" width="1200" height="3" fill="${DARK_A}"/>` +
    [60, 160, 260, 360, 840, 940, 1040, 1140].map((x) => `<rect x="${x}" y="186" width="8" height="7" fill="${DARK_A}"/>`).join("") +
    // depot
    `<rect x="520" y="138" width="160" height="62" fill="${GOLD_SOFT}"/><path d="M508,138 L600,112 L692,138 Z" fill="${GOLD}"/>` +
    // locomotive
    `<g fill="${GOLD}"><rect x="700" y="150" width="120" height="40" rx="3"/><rect x="700" y="128" width="40" height="24"/><rect x="712" y="112" width="12" height="18"/><circle cx="724" cy="190" r="12"/><circle cx="772" cy="190" r="12"/><circle cx="812" cy="190" r="9"/></g>` +
    win(540, 156) + win(565, 156) + win(640, 156),

  // Trussville — Cahaba River + arched bridge + clock tower
  "trussville":
    hill(DARK_B, 156) +
    waterLines(178) +
    pine(90, 200, 50, DARK_A) + pine(1110, 200, 50, DARK_A) +
    `<path d="M360,176 Q600,108 840,176" fill="none" stroke="${DARK_A}" stroke-width="10"/>` +
    [400, 470, 540, 660, 730, 800].map((x) => `<rect x="${x}" y="150" width="5" height="26" fill="${DARK_A}"/>`).join("") +
    // clock tower gold
    `<g fill="${GOLD}"><rect x="585" y="96" width="30" height="80"/><path d="M580,96 L600,74 L620,96 Z"/><circle cx="600" cy="120" r="9" fill="rgba(7,100,43,0.6)"/></g>`,

  // Mt Laurel — planned tudor village + trees (sister to Mountain Brook, lighter)
  "mt-laurel":
    hill(DARK_B, 158) +
    pine(100, 200, 56, DARK_A) + pine(150, 200, 42, DARK_A) +
    pine(1050, 200, 56, DARK_A) + pine(1100, 200, 42, DARK_A) +
    [360, 470].map((x) => building(x, 90, 60, DARK_A) + `<path d="M${x - 6},140 L${x + 45},112 L${x + 96},140 Z" fill="${DARK_A}"/>`).join("") +
    `<rect x="560" y="134" width="100" height="66" fill="${GOLD_SOFT}"/><path d="M552,134 L610,104 L668,134 Z" fill="${GOLD}"/>` +
    win(582, 152) + win(610, 152) + win(638, 152) +
    [700, 800].map((x) => building(x, 90, 60, DARK_A) + `<path d="M${x - 6},140 L${x + 45},112 L${x + 96},140 Z" fill="${DARK_A}"/>`).join(""),

  // ===== LAKE MARTIN REGION =====
  // Lake Martin — sun, water, dock, pines (premium seasonal)
  "lake-martin":
    sun(980, 70, 34) +
    `<path d="M0,150 C220,134 420,162 640,148 C860,134 1040,160 1200,146 L1200,200 L0,200 Z" fill="rgba(7,100,43,0.32)"/>` +
    waterLines(168, "rgba(255,255,255,0.16)") +
    pine(90, 152, 70, DARK_A) + pine(140, 152, 52, DARK_A) + pine(1120, 150, 60, DARK_A) +
    dock(540, 150, GOLD) +
    `<path d="M640,150 l30,-10 l0,18 Z" fill="${GOLD}"/>`, // little sailboat

  // Alexander City — lake edge + Russell mill town skyline
  "alexander-city":
    `<path d="M0,158 C300,146 500,168 760,154 C960,144 1080,164 1200,156 L1200,200 L0,200 Z" fill="rgba(7,100,43,0.3)"/>` +
    waterLines(176, "rgba(255,255,255,0.14)") +
    pine(100, 158, 58, DARK_A) + pine(1110, 156, 56, DARK_A) +
    [500, 560].map((x) => building(x, 50, 64, DARK_A)).join("") +
    `<rect x="600" y="120" width="64" height="80" fill="${GOLD_SOFT}"/><rect x="606" y="112" width="10" height="10" fill="${GOLD}"/>` +
    win(612, 136) + win(632, 136) + win(652, 136) + dock(720, 158, GOLD),

  // Dadeville — lake + Tallapoosa County courthouse dome
  "dadeville":
    `<path d="M0,160 C260,150 480,170 760,156 C980,146 1100,166 1200,158 L1200,200 L0,200 Z" fill="rgba(7,100,43,0.3)"/>` +
    waterLines(178, "rgba(255,255,255,0.14)") +
    pine(110, 160, 56, DARK_A) + pine(1100, 158, 54, DARK_A) +
    dome(600, 200, 1.7, GOLD) +
    dock(840, 160, GOLD),

  // Eclectic — small-town water tower + lake horizon
  "eclectic":
    `<path d="M0,162 C300,154 520,172 800,160 C1000,150 1100,168 1200,162 L1200,200 L0,200 Z" fill="rgba(7,100,43,0.28)"/>` +
    waterLines(180, "rgba(255,255,255,0.12)") +
    pine(120, 162, 54, DARK_A) + pine(1090, 160, 52, DARK_A) +
    waterTower(600, 196, 2.5, GOLD) +
    [500, 700].map((x) => building(x, 60, 40, DARK_A)).join(""),

  // Auburn — rolling hills + water tower + oak (NO university marks)
  "auburn":
    hill(DARK_B, 138) + hill(DARK_A, 166) +
    // big oak tree gold
    `<g fill="${GOLD}"><rect x="596" y="150" width="8" height="50"/><circle cx="600" cy="132" r="34"/><circle cx="566" cy="146" r="22"/><circle cx="634" cy="146" r="22"/></g>` +
    waterTower(220, 196, 2.0, DARK_A) + waterTower(980, 196, 2.0, DARK_A) +
    pine(120, 200, 46, DARK_A) + pine(1090, 200, 46, DARK_A),

  // Opelika — historic railroad depot + tracks + smokestack
  "opelika":
    hill(DARK_B, 160) +
    `<rect x="0" y="188" width="1200" height="3" fill="${DARK_A}"/>` +
    [60, 160, 260, 940, 1040, 1140].map((x) => `<rect x="${x}" y="186" width="8" height="7" fill="${DARK_A}"/>`).join("") +
    `<rect x="520" y="132" width="170" height="68" fill="${GOLD_SOFT}"/><path d="M506,132 L605,104 L704,132 Z" fill="${GOLD}"/>` +
    `<rect x="720" y="96" width="16" height="104" fill="${GOLD}"/>` + // smokestack
    win(545, 150) + win(575, 150) + win(635, 150) + win(665, 150),

  // ===== HUNTSVILLE METRO =====
  // Huntsville — Saturn V rocket + launch flame (Rocket City)
  "huntsville":
    hill(DARK_B, 158) +
    building(120, 34, 50, DARK_A) + building(160, 28, 68, DARK_A) +
    building(1020, 32, 54, DARK_A) + building(1058, 26, 72, DARK_A) +
    // rocket
    `<g fill="${GOLD}"><path d="M590,40 Q600,20 610,40 L610,150 L590,150 Z"/><rect x="588" y="150" width="24" height="20"/><path d="M588,150 L572,182 L588,176 Z"/><path d="M612,150 L628,182 L612,176 Z"/><rect x="595" y="60" width="10" height="10" fill="rgba(7,100,43,0.6)"/></g>` +
    `<path d="M592,170 Q600,196 608,170 Z" fill="${GOLD_SOFT}"/>` +
    pine(80, 200, 40, DARK_A) + pine(1130, 200, 40, DARK_A),

  // Madison — small rocket + tech/research campus boxes
  "madison":
    hill(DARK_B, 160) +
    [140, 250, 360, 840, 950, 1060].map((x) => building(x, 70, 52, DARK_A)).join("") +
    // tech campus center gold low-rise + small rocket marker
    `<rect x="500" y="140" width="200" height="60" fill="${GOLD_SOFT}"/>` +
    [515, 540, 565, 635, 660, 685].map((x) => win(x, 156, "rgba(7,100,43,0.5)")).join("") +
    `<g fill="${GOLD}"><path d="M596,96 Q600,84 604,96 L604,140 L596,140 Z"/><path d="M596,140 L588,156 L596,152 Z"/><path d="M604,140 L612,156 L604,152 Z"/></g>`,

  // Athens — Limestone County courthouse dome + town square
  "athens":
    hill(DARK_B, 158) +
    pine(110, 200, 48, DARK_A) + pine(1100, 200, 48, DARK_A) +
    [200, 300, 820, 920].map((x) => building(x, 80, 50, DARK_A)).join("") +
    dome(600, 200, 2.2, GOLD),

  // Decatur — Tennessee River bridge + old bank columns
  "decatur":
    hill(DARK_B, 158) +
    waterLines(180, "rgba(255,255,255,0.13)") +
    // truss bridge
    `<g stroke="${GOLD}" stroke-width="3" fill="none"><path d="M120,168 L1080,168"/><path d="M120,168 L120,140 L1080,140 L1080,168"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${120 + i * 80},140 L${160 + i * 80},168 M${160 + i * 80},140 L${120 + i * 80},168"/>`).join("")}</g>` +
    // bank with columns gold
    `<g fill="${GOLD}"><path d="M540,116 L600,96 L660,116 Z"/><rect x="540" y="116" width="120" height="8"/>${[0, 22, 44, 66, 88].map((o) => `<rect x="${548 + o}" y="124" width="6" height="40"/>`).join("")}</g>`,

  // Hartselle — historic small-town main street storefronts
  "hartselle":
    hill(DARK_B, 160) +
    pine(90, 200, 46, DARK_A) + pine(1110, 200, 46, DARK_A) +
    // row of storefronts, center gold
    [180, 260, 340, 760, 840, 920].map((x) =>
      building(x, 74, 56, DARK_A) + `<rect x="${x - 4}" y="${142}" width="82" height="6" fill="${DARK_A}"/>`
    ).join("") +
    `<rect x="500" y="128" width="200" height="72" fill="${GOLD_SOFT}"/><rect x="494" y="122" width="212" height="8" fill="${GOLD}"/>` +
    [520, 560, 600, 640, 680].map((x) => win(x, 144)).join(""),

  // Harvest — rural fields, barn, water tower, big sky
  "harvest":
    hill(DARK_B, 134) + hill(DARK_A, 168) +
    // furrow lines
    [176, 184, 192].map((y) => `<path d="M0,${y} Q600,${y - 8} 1200,${y}" stroke="rgba(255,255,255,0.07)" stroke-width="2" fill="none"/>`).join("") +
    `<rect x="556" y="146" width="88" height="54" fill="${GOLD_SOFT}"/><path d="M548,146 L600,116 L652,146 Z" fill="${GOLD}"/>` +
    `<rect x="592" y="162" width="16" height="38" fill="rgba(7,100,43,0.5)"/>` +
    waterTower(980, 196, 1.9, DARK_A) +
    pine(140, 200, 44, DARK_A),

  // Hampton Cove — mountain cove + golf flag + pines (Monte Sano side)
  "hampton-cove":
    `<path d="M0,200 L0,90 L300,30 L600,96 L900,34 L1200,96 L1200,200 Z" fill="${DARK_B}"/>` +
    `<path d="M300,200 L300,108 L600,52 L900,108 L900,200 Z" fill="${GOLD_SOFT}"/>` +
    pine(110, 200, 60, DARK_A) + pine(160, 200, 44, DARK_A) +
    pine(1040, 200, 60, DARK_A) + pine(1090, 200, 46, DARK_A) +
    // golf flag gold
    `<g fill="${GOLD}"><rect x="598" y="120" width="4" height="60"/><path d="M602,120 L630,130 L602,140 Z"/><ellipse cx="600" cy="182" rx="20" ry="5" fill="rgba(7,100,43,0.4)"/></g>`,

  // fallback
  "_default":
    hill(DARK_B, 152) +
    building(150, 40, 60, DARK_A) + building(195, 32, 84, DARK_A) +
    building(980, 38, 64, DARK_A) + building(1020, 30, 88, DARK_A) +
    waterTower(600, 196, 2.2, GOLD) +
    pine(90, 200, 50, DARK_A) + pine(1120, 200, 50, DARK_A),
};

export default function CityHeroArt({ slug }: { slug: string }) {
  const inner = scenes[slug] ?? scenes["_default"];
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 210,
        pointerEvents: "none",
        zIndex: 0,
      }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
