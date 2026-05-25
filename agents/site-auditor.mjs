// agents/site-auditor.mjs
// Round 1 agent — runs alongside competitor-deep-dive.
// PERSONA: Technical SEO and Performance Engineer
// MODEL: claude-opus-4-20250514 | TEMPERATURE: 0.3 (data/precision)

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateSet } from "./lib/kv.mjs";
import { writeFinding, writeDiscussion } from "./lib/supabase.mjs";
import { knowledgeBlock } from "./lib/knowledge.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = "claude-opus-4-20250514";
const TEMPERATURE = 0.3;

const SYSTEM_PROMPT = `You are the Technical SEO and Performance Engineer for EnviroCare Pest Control.

YOUR IDENTITY:
You've audited 200+ local business websites. You know that a 3-second mobile load time costs 53% of visitors before they ever see the page. You care about details competitors skip — proper image sizing, font loading order, cumulative layout shift, schema markup that actually gets picked up by Google.

YOUR GOAL:
Get every EnviroCare page to 90+ PageSpeed, zero schema errors, zero broken H1s, zero accessibility violations. Not eventually — this sprint.

YOUR STANDARD:
You are relentless and specific. "Mobile PageSpeed 67/100" means nothing to a developer. "LCP 4.2s caused by uncompressed hero-family.jpg (221KB), fix by converting to WebP and lazy-loading below-fold images" — that's what you write. Every finding gets an IMPACT score (how much it affects rankings) and EFFORT score (how long to fix).`;

const BASE = "https://envirocarellc.com";

const KEY_PAGES = [
  { path: "/",                               name: "Homepage" },
  { path: "/contact-us",                     name: "Contact Us" },
  { path: "/about-us",                       name: "About Us" },
  { path: "/alabaster",                      name: "Alabaster" },
  { path: "/huntsville",                     name: "Huntsville" },
  { path: "/alexander-city",                 name: "Alexander City" },
  { path: "/lake-martin",                    name: "Lake Martin" },
  { path: "/services/pest-control",          name: "Pest Control" },
  { path: "/services/sentricon",             name: "Sentricon" },
  { path: "/services/mosquito-control",      name: "Mosquito Control" },
  { path: "/lake-martin/mosquito-control",   name: "Lake Martin Mosquito" },
  { path: "/lake-martin/termite-control",    name: "Lake Martin Termite" },
  { path: "/alexander-city/mosquito-control",name: "Alex City Mosquito" },
  { path: "/alexander-city/termite-control", name: "Alex City Termite" },
  { path: "/huntsville/termite-control",     name: "Huntsville Termite" },
  { path: "/pricing",                        name: "Pricing" },
  { path: "/blog",                           name: "Blog" },
];

async function fetchPage(path) {
  const url = `${BASE}${path}`;
  try {
    const start = Date.now();
    const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
    const loadMs = Date.now() - start;
    const html = await res.text();

    const metaDesc =
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{10,})["']/i)?.[1] ??
      html.match(/<meta[^>]+content=["']([^"']{10,})["'][^>]+name=["']description["']/i)?.[1] ??
      null;
    const title     = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
    const h1        = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim() ?? null;
    const hasSchema  = html.includes("application/ld+json");
    const hasViewport= html.includes('name="viewport"') || html.includes("name='viewport'");
    const imgCount   = (html.match(/<img /gi) ?? []).length;
    const imgNoAlt   = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) ?? []).length;
    const hasCanonical = html.includes('rel="canonical"') || html.includes("rel='canonical'");
    const hasPricing = /\$\d/.test(html);
    const hasLocalPhone = /\(205\)|\(256\)/.test(html);

    return {
      url, path, status: res.status, ok: res.ok, loadMs,
      metaDesc, title, h1, hasSchema, hasViewport, imgCount, imgNoAlt,
      hasCanonical, hasPricing, hasLocalPhone,
    };
  } catch (err) {
    return { url, path, ok: false, error: err.message };
  }
}

async function getPageSpeed(url) {
  try {
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=seo&category=accessibility`;
    const res = await fetch(psiUrl, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return null;
    const d = await res.json();
    const cats   = d.lighthouseResult?.categories ?? {};
    const audits = d.lighthouseResult?.audits ?? {};
    return {
      performance:   Math.round((cats.performance?.score   ?? 0) * 100),
      seo:           Math.round((cats.seo?.score           ?? 0) * 100),
      accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
      lcp:  audits["largest-contentful-paint"]?.displayValue ?? null,
      cls:  audits["cumulative-layout-shift"]?.displayValue ?? null,
      tbt:  audits["total-blocking-time"]?.displayValue ?? null,
      fcp:  audits["first-contentful-paint"]?.displayValue ?? null,
    };
  } catch {
    return null;
  }
}

async function writeSummary(lines, knowledge, feedback = null) {
  const prompt = `${SYSTEM_PROMPT}

${knowledge}

RAW AUDIT FINDINGS:
${lines.join("\n")}

${feedback ? `FEEDBACK FROM CHIEF STRATEGY OFFICER:\n${feedback}\n` : ""}

Summarize these findings in 5-8 bullets. Lead with the worst issues first.
Each bullet must be specific enough to act on today.

STRICT FORMAT:
- Start IMMEDIATELY with "• " — zero words before the first bullet
- No title, no header, no intro, no sign-off
- Each bullet: • [Page name]: [specific problem] — [exact fix]. IMPACT: X/10 EFFORT: X/10
- Include real numbers: scores, char counts, load times, image counts
- Under 220 words total`;

  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 500,
    temperature: TEMPERATURE,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text ?? lines.join("\n");
}

export async function run() {
  console.log("[site-auditor] Starting — Technical SEO Engineer online");
  const knowledge = knowledgeBlock();
  const lines = [];

  console.log("[site-auditor] Running PageSpeed…");
  const speed = await getPageSpeed(BASE);
  if (speed) {
    const pSev = speed.performance < 50 ? "critical" : speed.performance < 80 ? "warning" : "info";
    lines.push(`Homepage mobile: Performance=${speed.performance}/100, SEO=${speed.seo}/100, Accessibility=${speed.accessibility}/100`);
    lines.push(`Core Web Vitals: LCP=${speed.lcp}, CLS=${speed.cls}, TBT=${speed.tbt}, FCP=${speed.fcp}`);
    await writeFinding("site-auditor", "performance", pSev, BASE,
      `Mobile PageSpeed: ${speed.performance}/100`, speed);
    await writeDiscussion({
      agentName: "site-auditor",
      message: `Homepage mobile PageSpeed: ${speed.performance}/100 (target: 90+). LCP=${speed.lcp}, CLS=${speed.cls}. ${speed.performance < 80 ? "BELOW target — directly hurts rankings and bounce rate." : "On target."}`,
      impactScore: speed.performance < 50 ? 9 : speed.performance < 80 ? 7 : 3,
      effortScore: 5,
    });
    if (speed.seo < 80) {
      await writeFinding("site-auditor", "seo", "warning", BASE,
        `Lighthouse SEO: ${speed.seo}/100`, { score: speed.seo });
    }
  } else {
    lines.push("PageSpeed API unavailable — check PSI quota");
  }

  console.log("[site-auditor] Checking key pages…");
  let missingH1 = 0;
  let missingSchema = 0;
  let missingMeta = 0;
  let missingCanonical = 0;

  for (const pg of KEY_PAGES) {
    const r = await fetchPage(pg.path);

    if (!r.ok) {
      lines.push(`${pg.name} (${pg.path}): UNREACHABLE — ${r.error ?? r.status}`);
      await writeFinding("site-auditor", "seo", "critical", r.url,
        `Page unreachable: ${r.error ?? r.status}`, { path: pg.path });
      continue;
    }

    if (!r.h1) {
      missingH1++;
      lines.push(`${pg.name}: MISSING H1 — cannot rank without primary keyword in H1`);
      await writeFinding("site-auditor", "seo", "critical", r.url, "Missing H1 tag", { page: pg.name });
    }

    if (!r.hasSchema) {
      missingSchema++;
      lines.push(`${pg.name}: no JSON-LD schema — missing LocalBusiness/Service structured data`);
      await writeFinding("site-auditor", "seo", "warning", r.url, "No schema.org markup (JSON-LD)", { page: pg.name });
    }

    if (!r.metaDesc) {
      missingMeta++;
      lines.push(`${pg.name}: MISSING meta description — CTR penalty in search results`);
      await writeFinding("site-auditor", "seo", "warning", r.url, "Missing meta description", { page: pg.name });
    } else if (r.metaDesc.length < 120 || r.metaDesc.length > 160) {
      lines.push(`${pg.name}: meta description ${r.metaDesc.length} chars (target: 120-160)`);
      await writeFinding("site-auditor", "seo", "info", r.url,
        `Meta description ${r.metaDesc.length} chars (ideal 120-160)`, { length: r.metaDesc.length });
    }

    if (!r.hasCanonical) {
      missingCanonical++;
      lines.push(`${pg.name}: no canonical tag — duplicate content risk`);
      await writeFinding("site-auditor", "seo", "warning", r.url, "Missing canonical tag", { page: pg.name });
    }

    if (r.loadMs > 3000) {
      lines.push(`${pg.name}: ${r.loadMs}ms server response (target: <1000ms)`);
      await writeFinding("site-auditor", "performance", "warning", r.url,
        `Slow load: ${r.loadMs}ms`, { loadMs: r.loadMs });
    }

    if (r.imgNoAlt > 0) {
      lines.push(`${pg.name}: ${r.imgNoAlt}/${r.imgCount} images missing alt text — accessibility + SEO`);
      await writeFinding("site-auditor", "seo", "info", r.url,
        `${r.imgNoAlt} image(s) missing alt text`, { imgNoAlt: r.imgNoAlt, imgCount: r.imgCount });
    }
  }

  // Write aggregate discussions for Round 2 agents to reference
  if (missingH1 > 0) {
    await writeDiscussion({
      agentName: "site-auditor",
      message: `${missingH1} pages missing H1 tags — this is the single fastest SEO fix available. Each missing H1 is a page that cannot rank for its primary keyword. Fix takes 5 minutes per page.`,
      impactScore: 9,
      effortScore: 2,
    });
  }
  if (missingSchema > 0) {
    await writeDiscussion({
      agentName: "site-auditor",
      message: `${missingSchema} pages missing JSON-LD schema — affects Google local pack appearance and rich snippets. LocalBusiness schema on all location pages is highest-priority schema fix.`,
      impactScore: 7,
      effortScore: 3,
    });
  }
  if (missingMeta > 0) {
    await writeDiscussion({
      agentName: "site-auditor",
      message: `${missingMeta} pages missing meta descriptions — Google writes its own which is usually worse than what you'd write. Each missing meta description reduces click-through rate from search results.`,
      impactScore: 6,
      effortScore: 2,
    });
  }

  const draft = await writeSummary(lines, knowledge);

  const final = await criticLoop({
    workerName: "site-auditor",
    task: "Technical SEO audit summary with specific findings, scores, and IMPACT/EFFORT ratings for EnviroCare",
    output: draft,
    rubric: `
- First character is "•" — no title, no intro
- Worst issues first (missing H1 > missing schema > PageSpeed > missing meta)
- Every bullet names a specific page and includes a real number (score, count, time)
- Each bullet has IMPACT: X/10 and EFFORT: X/10
- Each suggests a specific fix, not vague guidance
- If PageSpeed unavailable, one bullet noting it is fine
- Under 230 words
- No sign-off`,
    revise: (feedback) => writeSummary(lines, knowledge, feedback),
    onEscalate: async () => console.warn("[site-auditor] Critic maxed out"),
  });

  await stateSet("site-auditor:last-run", { lines, date: new Date().toISOString() });
  console.log("[site-auditor] Done");
  return final;
}
