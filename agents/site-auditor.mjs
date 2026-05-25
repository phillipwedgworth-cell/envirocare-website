// agents/site-auditor.mjs
// Fetches key pages of envirocarellc.com
// Checks page speed (PSI API), meta descriptions, schema markup, HTTP status
// Writes findings to agent_findings table, flags anything scoring below 80

import Anthropic from "@anthropic-ai/sdk";
import { criticLoop } from "./lib/critic.mjs";
import { stateSet } from "./lib/kv.mjs";
import { writeFinding } from "./lib/supabase.mjs";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const BASE = "https://envirocarellc.com";

const KEY_PAGES = [
  { path: "/",                         name: "Homepage" },
  { path: "/contact-us",               name: "Contact Us" },
  { path: "/alabaster",                name: "Alabaster" },
  { path: "/huntsville",               name: "Huntsville" },
  { path: "/alexander-city",           name: "Alexander City" },
  { path: "/services/pest-control",    name: "Pest Control" },
  { path: "/services/sentricon",       name: "Sentricon" },
  { path: "/services/mosquito-control",name: "Mosquito Control" },
  { path: "/lake-martin",              name: "Lake Martin" },
  { path: "/lake-martin/mosquito-control", name: "Lake Martin Mosquito" },
  { path: "/lake-martin/termite-control",  name: "Lake Martin Termite" },
  { path: "/alexander-city/mosquito-control", name: "Alex City Mosquito" },
  { path: "/alexander-city/termite-control",  name: "Alex City Termite" },
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

    const title    = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
    const h1       = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim() ?? null;
    const hasSchema = html.includes("application/ld+json");
    const hasViewport = html.includes('name="viewport"') || html.includes("name='viewport'");
    const imgCount  = (html.match(/<img /gi) ?? []).length;
    const imgNoAlt  = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) ?? []).length;

    return { url, path, status: res.status, ok: res.ok, loadMs, metaDesc, title, h1, hasSchema, hasViewport, imgCount, imgNoAlt };
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
    const cats = d.lighthouseResult?.categories ?? {};
    const audits = d.lighthouseResult?.audits ?? {};
    return {
      performance:   Math.round((cats.performance?.score   ?? 0) * 100),
      seo:           Math.round((cats.seo?.score           ?? 0) * 100),
      accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
      lcp:   audits["largest-contentful-paint"]?.displayValue ?? null,
      cls:   audits["cumulative-layout-shift"]?.displayValue ?? null,
      tbt:   audits["total-blocking-time"]?.displayValue ?? null,
      fcp:   audits["first-contentful-paint"]?.displayValue ?? null,
    };
  } catch {
    return null;
  }
}

async function writeSummary(lines, feedback = null) {
  const prompt = `Summarize this EnviroCare website audit in 5-8 bullets.

FINDINGS:
${lines.join("\n")}
${feedback ? `\nPREVIOUS REVIEW FEEDBACK:\n${feedback}` : ""}

STRICT FORMAT RULES — violations cause rejection:
- Start IMMEDIATELY with "• " — zero words before the first bullet
- No title, no header, no "Here are...", no sign-off
- Each bullet: specific page name + exact number/score + what it means
- If PageSpeed unavailable, one bullet noting it is fine — do not fabricate scores
- Under 150 words total`;

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content.find(b => b.type === "text")?.text ?? lines.join("\n");
}

export async function run() {
  console.log("[site-auditor] Starting");
  const lines = [];

  console.log("[site-auditor] Running PageSpeed…");
  const speed = await getPageSpeed(BASE);
  if (speed) {
    const pSev = speed.performance < 50 ? "critical" : speed.performance < 80 ? "warning" : "info";
    const sSev = speed.seo < 80 ? "warning" : "info";
    lines.push(`Homepage mobile PageSpeed: ${speed.performance}/100 | SEO: ${speed.seo}/100 | Accessibility: ${speed.accessibility}/100`);
    lines.push(`LCP: ${speed.lcp} | CLS: ${speed.cls} | TBT: ${speed.tbt}`);
    await writeFinding("site-auditor", "performance", pSev, BASE,
      `Mobile PageSpeed: ${speed.performance}/100`, speed);
    if (speed.seo < 80) {
      await writeFinding("site-auditor", "seo", sSev, BASE,
        `Lighthouse SEO score: ${speed.seo}/100`, { score: speed.seo });
    }
  } else {
    lines.push("PageSpeed API unavailable — skipped");
  }

  console.log("[site-auditor] Checking key pages…");
  for (const pg of KEY_PAGES) {
    const r = await fetchPage(pg.path);

    if (!r.ok) {
      lines.push(`${pg.name} (${pg.path}): unreachable — ${r.error ?? r.status}`);
      await writeFinding("site-auditor", "seo", "critical", r.url,
        `Page unreachable: ${r.error ?? r.status}`, { path: pg.path });
      continue;
    }

    if (!r.metaDesc) {
      lines.push(`${pg.name}: MISSING meta description`);
      await writeFinding("site-auditor", "seo", "warning", r.url,
        "Missing meta description", { page: pg.name });
    } else if (r.metaDesc.length < 120 || r.metaDesc.length > 160) {
      lines.push(`${pg.name}: meta description ${r.metaDesc.length} chars (ideal 120-160)`);
      await writeFinding("site-auditor", "seo", "info", r.url,
        `Meta description ${r.metaDesc.length} chars (ideal 120-160)`, { length: r.metaDesc.length });
    }

    if (!r.hasSchema) {
      lines.push(`${pg.name}: no schema.org markup`);
      await writeFinding("site-auditor", "seo", "warning", r.url,
        "No schema.org markup (JSON-LD)", { page: pg.name });
    }

    if (!r.h1) {
      lines.push(`${pg.name}: missing H1`);
      await writeFinding("site-auditor", "seo", "warning", r.url,
        "Missing H1 tag", { page: pg.name });
    }

    if (r.loadMs > 3000) {
      lines.push(`${pg.name}: slow load ${r.loadMs}ms`);
      await writeFinding("site-auditor", "performance", "warning", r.url,
        `Slow load time: ${r.loadMs}ms`, { loadMs: r.loadMs });
    }

    if (r.imgNoAlt > 0) {
      lines.push(`${pg.name}: ${r.imgNoAlt}/${r.imgCount} images missing alt text`);
      await writeFinding("site-auditor", "seo", "info", r.url,
        `${r.imgNoAlt} image(s) missing alt text`, { imgNoAlt: r.imgNoAlt, imgCount: r.imgCount });
    }
  }

  const draft = await writeSummary(lines);

  const final = await criticLoop({
    workerName: "site-auditor",
    task: "Summarize EnviroCare website audit with specific scores, page issues, and SEO flags",
    output: draft,
    rubric: `
- First character is "•" — no title, no intro sentence
- Leads with worst issues first
- Every bullet names specific pages and includes a count or score
- If PageSpeed API was unavailable, one bullet noting it is acceptable — PASS this
- Under 150 words
- No sign-off or closing sentence`,
    revise: (feedback) => writeSummary(lines, feedback),
    onEscalate: async () => console.warn("[site-auditor] Critic maxed out"),
  });

  await stateSet("site-auditor:last-run", { lines, date: new Date().toISOString() });
  console.log("[site-auditor] Done");
  return final;
}
