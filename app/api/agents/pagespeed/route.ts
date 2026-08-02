import { NextRequest, NextResponse } from "next/server";

// GET /api/agents/pagespeed?key=<COMMAND_CENTER_KEY>&path=/huntsville&strategy=mobile
//
// On-demand Core Web Vitals for the LIVE site, measured server-side with the
// PAGESPEED_API_KEY that already lives in this deployment's env.
//
// Why this exists: CWV sat "unknown" in the project docs for two months. The
// scheduled site-reviewer agent was the only thing measuring it, and it was
// pointed at https://envirocare-web.vercel.app — a deployment host that sits
// behind Vercel Authentication and 302s to a login page, so it was scoring the
// login screen. Meanwhile the keyless public PageSpeed API is rate-limited to
// 429 from most shared IPs, so nobody could get an independent second opinion.
// This route closes that loop: the key is here, so measure here.
//
// Returns BOTH lab and field data and labels which is which. Field data (CrUX)
// is what Google actually ranks on; lab data is a single throttled run and
// should never be quoted as "our LCP" on its own.

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PSI = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const SITE_BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.envirocarellc.com").replace(/\/$/, "");

// Default sweep — the pages the digest keeps making claims about.
const DEFAULT_PATHS = ["/", "/huntsville", "/birmingham", "/services/termite-control", "/services/mosquito-control"];

type Metric = { lab: string | null; score: number | null };

function audit(audits: Record<string, { displayValue?: string; score?: number | null }>, id: string): Metric {
  const a = audits?.[id];
  return { lab: a?.displayValue ?? null, score: typeof a?.score === "number" ? a.score : null };
}

async function measure(url: string, strategy: string) {
  const api = new URL(PSI);
  api.searchParams.set("url", url);
  api.searchParams.set("strategy", strategy);
  api.searchParams.append("category", "performance");
  const key = process.env.PAGESPEED_API_KEY;
  if (key) api.searchParams.set("key", key);

  const r = await fetch(api, { cache: "no-store" });
  const json = await r.json().catch(() => ({}));

  if (json?.error) return { url, strategy, error: json.error.message ?? `HTTP ${r.status}` };
  if (!r.ok) return { url, strategy, error: `HTTP ${r.status}` };

  const lh = json.lighthouseResult ?? {};
  const audits = lh.audits ?? {};
  const field = json.loadingExperience ?? {};
  const fm = field.metrics ?? {};

  return {
    url,
    strategy,
    // The URL Lighthouse actually ended up on. If this differs from `url`, the
    // request was redirected — e.g. to a login page — and every number below
    // describes that other page, not the one you asked for.
    finalUrl: lh.finalDisplayedUrl ?? lh.requestedUrl ?? null,
    redirected: Boolean(lh.finalDisplayedUrl && !lh.finalDisplayedUrl.startsWith(url)),
    performanceScore: typeof lh.categories?.performance?.score === "number"
      ? Math.round(lh.categories.performance.score * 100)
      : null,
    lab: {
      lcp: audit(audits, "largest-contentful-paint"),
      fcp: audit(audits, "first-contentful-paint"),
      tbt: audit(audits, "total-blocking-time"),
      cls: audit(audits, "cumulative-layout-shift"),
      speedIndex: audit(audits, "speed-index"),
    },
    // CrUX real-user data. Absent on low-traffic URLs — absence is not "fast".
    field: field.overall_category
      ? {
          overall: field.overall_category,
          lcpMs: fm.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
          lcpCategory: fm.LARGEST_CONTENTFUL_PAINT_MS?.category ?? null,
          inpMs: fm.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
          inpCategory: fm.INTERACTION_TO_NEXT_PAINT?.category ?? null,
          cls: fm.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile ?? null,
          clsCategory: fm.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category ?? null,
        }
      : null,
    topOpportunities: Object.values(audits)
      .filter((a: Record<string, unknown>) =>
        (a?.details as { type?: string } | undefined)?.type === "opportunity" &&
        ((a?.details as { overallSavingsMs?: number })?.overallSavingsMs ?? 0) > 100)
      .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
        ((b.details as { overallSavingsMs?: number }).overallSavingsMs ?? 0) -
        ((a.details as { overallSavingsMs?: number }).overallSavingsMs ?? 0))
      .slice(0, 3)
      .map((a: Record<string, unknown>) => ({
        title: a.title as string,
        savingsMs: Math.round((a.details as { overallSavingsMs?: number }).overallSavingsMs ?? 0),
      })),
  };
}

export async function GET(req: NextRequest) {
  const gate = process.env.COMMAND_CENTER_KEY;
  const key = req.nextUrl.searchParams.get("key") ?? "";
  // Fails closed: no gate configured means no access, not open access.
  if (!gate || key !== gate) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const strategy = req.nextUrl.searchParams.get("strategy") === "desktop" ? "desktop" : "mobile";
  const pathParam = req.nextUrl.searchParams.get("path");
  const paths = pathParam ? pathParam.split(",").map((p) => p.trim()).filter(Boolean) : DEFAULT_PATHS;

  // Serial, not parallel — PSI rate-limits hard and a 429 burst tells you nothing.
  const results: Awaited<ReturnType<typeof measure>>[] = [];
  for (const p of paths.slice(0, 8)) {
    results.push(await measure(`${SITE_BASE}${p.startsWith("/") ? p : `/${p}`}`, strategy));
  }

  const measured = results.filter((r) => !("error" in r) && r.performanceScore !== null);

  return NextResponse.json({
    measuredAt: new Date().toISOString(),
    siteBase: SITE_BASE,
    strategy,
    usingApiKey: Boolean(process.env.PAGESPEED_API_KEY),
    note:
      "lab = one throttled Lighthouse run. field = CrUX real-user data, which is what Google ranks on. " +
      "A null field block means CrUX has no sample for that URL — that is 'unknown', not 'fast'. " +
      "If redirected is true, the numbers describe the redirect target, not the requested URL.",
    pagesMeasured: measured.length,
    pagesFailed: results.length - measured.length,
    results,
  });
}
