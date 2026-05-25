"""
envirocare-crew/src/envirocare_crew/tools/supabase_tool.py
Writes crew outputs to the Supabase agent_findings and agent_runs tables.
"""

import os
import re
from datetime import datetime, timezone

try:
    from supabase import create_client, Client
    _supabase_available = True
except ImportError:
    _supabase_available = False
    print("[supabase] supabase-py not installed — output will only print to console")


def _get_client():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key or not _supabase_available:
        return None
    return create_client(url, key)


def write_run_to_supabase(agent_name: str, status: str, output: str) -> None:
    """Write a full agent run to agent_runs table."""
    client = _get_client()
    if not client:
        print(f"[supabase] Skipping write_run — no client (agent={agent_name})")
        return
    try:
        client.table("agent_runs").insert({
            "agent_name": agent_name,
            "status": status,
            "output": output[:10000],  # truncate very long outputs
            "created_at": datetime.now(timezone.utc).isoformat(),
        }).execute()
        print(f"[supabase] Wrote run for {agent_name}")
    except Exception as e:
        print(f"[supabase] write_run error: {e}")


def write_findings_to_supabase(output_text: str) -> None:
    """
    Parse the critic's final output and write each top-5 recommendation
    to agent_findings table with impact/effort scores.
    """
    client = _get_client()
    if not client:
        print("[supabase] Skipping write_findings — no client")
        return

    # Parse numbered recommendations from the final output
    # Matches lines like "[1]. Title" or "1. Title"
    sections = re.split(r'\n\[?\d+\]?\.', output_text)

    now = datetime.now(timezone.utc).isoformat()
    written = 0

    for section in sections[1:6]:  # top 5 only
        if not section.strip():
            continue

        # Extract impact and effort scores
        impact_match = re.search(r'IMPACT:\s*(\d+)/10', section, re.IGNORECASE)
        effort_match = re.search(r'EFFORT:\s*(\d+)/10', section, re.IGNORECASE)
        impact = int(impact_match.group(1)) if impact_match else 7
        effort = int(effort_match.group(1)) if effort_match else 5

        # Extract agent attribution
        agent_match = re.search(r'AGENT:\s*(\w+[\w_-]*)', section, re.IGNORECASE)
        agent_name = agent_match.group(1) if agent_match else "critic"

        # First line = summary
        first_line = section.strip().split('\n')[0].strip().lstrip('.')[:200]

        sev = "critical" if impact >= 8 else "warning" if impact >= 6 else "info"

        try:
            client.table("agent_findings").insert({
                "agent_name": agent_name,
                "category": "crew-final",
                "severity": sev,
                "page_url": "https://envirocare-web.vercel.app",
                "finding": first_line,
                "details": {
                    "full_text": section.strip()[:2000],
                    "impact_score": impact,
                    "effort_score": effort,
                    "ratio": round(impact / max(effort, 1), 2),
                },
                "run_date": now,
            }).execute()
            written += 1
        except Exception as e:
            print(f"[supabase] write_finding error: {e}")

    print(f"[supabase] Wrote {written} findings from crew final output")


def write_discussion_to_supabase(
    agent_name: str,
    references_agent: str | None,
    message: str,
    impact_score: int,
    effort_score: int,
) -> None:
    """Write a cross-agent discussion entry."""
    client = _get_client()
    if not client:
        return
    try:
        client.table("agent_discussions").insert({
            "agent_name": agent_name,
            "references_agent": references_agent,
            "message": message[:1000],
            "impact_score": impact_score,
            "effort_score": effort_score,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }).execute()
    except Exception as e:
        print(f"[supabase] write_discussion error: {e}")
