import { NextResponse } from "next/server";
import {
  readFindings,
  readDiscussions,
} from "@/agents/lib/supabase.mjs";

// Quick read-only window into what the agents are saying to each other —
// no Supabase dashboard required. Pulls the last 7 days by default.
// Findings = individual observations; discussions = cross-agent dialogue
// with impact/effort scoring. Both come from the shared agents/lib/supabase.mjs.

export async function GET(request: Request) {
  const url = new URL(request.url);
  const hours = Number(url.searchParams.get("hours")) || 168; // 7 days
  const agent = url.searchParams.get("agent");
  const agentsFilter = agent ? [agent] : [];

  try {
    const [findings, discussions] = await Promise.all([
      readFindings(agentsFilter, hours),
      readDiscussions(agentsFilter, hours),
    ]);

    // Group findings by agent for quick scanning
    const findingsByAgent: Record<string, any[]> = {};
    for (const f of findings ?? []) {
      const name = (f as any).agent_name ?? "unknown";
      if (!findingsByAgent[name]) findingsByAgent[name] = [];
      findingsByAgent[name].push({
        when: (f as any).run_date,
        severity: (f as any).severity,
        category: (f as any).category,
        page_url: (f as any).page_url,
        finding: (f as any).finding,
        details: (f as any).details,
      });
    }

    // Discussions chronological — newest first, most actionable shape
    const discussionFeed = (discussions ?? []).map((d: any) => ({
      when: d.created_at,
      from: d.agent_name,
      to: d.references_agent ?? "all",
      references_finding_id: d.references_finding_id,
      message: d.message,
      impact: d.impact_score,
      effort: d.effort_score,
      impact_effort_ratio: d.impact_score && d.effort_score
        ? Number((d.impact_score / d.effort_score).toFixed(2))
        : null,
    }));

    // Top movers: highest impact/effort ratio in the window
    const topMovers = [...discussionFeed]
      .filter((d) => d.impact_effort_ratio !== null)
      .sort((a, b) => (b.impact_effort_ratio ?? 0) - (a.impact_effort_ratio ?? 0))
      .slice(0, 5);

    return NextResponse.json({
      ok: true,
      window_hours: hours,
      agent_filter: agent ?? "all",
      summary: {
        finding_count: findings?.length ?? 0,
        discussion_count: discussions?.length ?? 0,
        agents_active: Object.keys(findingsByAgent),
      },
      top_movers: topMovers,
      discussion_feed: discussionFeed,
      findings_by_agent: findingsByAgent,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
