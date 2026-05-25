"""
EnviroCare CrewAI Crew
src/envirocare_crew/crew.py

3-round agentic system:
  Round 1 (parallel): site_auditor + competitor_analyst
  Round 2 (sequential): design_advisor + content_strategist (read Round 1)
  Round 3: critic (reads all, kills generic, ranks top 5)
"""

import os
from pathlib import Path
from crewai import Agent, Task, Crew, Process, LLM
from crewai.knowledge.source.text_file_knowledge_source import TextFileKnowledgeSource
from crewai_tools import ScrapeWebsiteTool, SerperDevTool

from .tools.supabase_tool import write_findings_to_supabase, write_run_to_supabase

# ── Paths ───────────────────────────────────────────────────────────────────
CREW_DIR  = Path(__file__).resolve().parent.parent.parent   # envirocare-crew/
KNOWLEDGE = CREW_DIR / "knowledge"
CONFIG    = Path(__file__).parent / "config"

# ── LLMs ────────────────────────────────────────────────────────────────────
opus_creative   = LLM(model="anthropic/claude-opus-4-20250514", temperature=0.7)
opus_precise    = LLM(model="anthropic/claude-opus-4-20250514", temperature=0.3)
opus_critic     = LLM(model="anthropic/claude-opus-4-20250514", temperature=0.4)
gpt4o           = LLM(model="openai/gpt-4o",                   temperature=0.5)
gemini_pro      = LLM(model="google/gemini-2.5-pro",           temperature=0.6)

# ── Knowledge Sources ────────────────────────────────────────────────────────
knowledge_sources = [
    TextFileKnowledgeSource(file_paths=[str(KNOWLEDGE / "brand.md")]),
    TextFileKnowledgeSource(file_paths=[str(KNOWLEDGE / "competitors.md")]),
    TextFileKnowledgeSource(file_paths=[str(KNOWLEDGE / "goals.md")]),
]

# ── Tools ────────────────────────────────────────────────────────────────────
scrape_tool  = ScrapeWebsiteTool()
search_tool  = SerperDevTool()


def build_crew() -> Crew:
    # ── AGENTS ──────────────────────────────────────────────────────────────
    site_auditor = Agent(
        config=str(CONFIG / "agents.yaml"),
        agent_id="site_auditor",
        tools=[scrape_tool],
        knowledge_sources=knowledge_sources,
    )

    competitor_analyst = Agent(
        config=str(CONFIG / "agents.yaml"),
        agent_id="competitor_analyst",
        tools=[scrape_tool, search_tool],
        knowledge_sources=knowledge_sources,
    )

    design_advisor = Agent(
        config=str(CONFIG / "agents.yaml"),
        agent_id="design_advisor",
        tools=[scrape_tool],
        knowledge_sources=knowledge_sources,
    )

    content_strategist = Agent(
        config=str(CONFIG / "agents.yaml"),
        agent_id="content_strategist",
        tools=[search_tool],
        knowledge_sources=knowledge_sources,
    )

    critic = Agent(
        config=str(CONFIG / "agents.yaml"),
        agent_id="critic",
        knowledge_sources=knowledge_sources,
    )

    # ── TASKS ────────────────────────────────────────────────────────────────
    audit_task = Task(
        config=str(CONFIG / "tasks.yaml"),
        task_id="audit_site",
        agent=site_auditor,
    )

    competitor_task = Task(
        config=str(CONFIG / "tasks.yaml"),
        task_id="analyze_competitors",
        agent=competitor_analyst,
    )

    design_task = Task(
        config=str(CONFIG / "tasks.yaml"),
        task_id="design_recommendations",
        agent=design_advisor,
        context=[audit_task, competitor_task],
    )

    content_task = Task(
        config=str(CONFIG / "tasks.yaml"),
        task_id="content_plan",
        agent=content_strategist,
        context=[audit_task, competitor_task],
    )

    final_task = Task(
        config=str(CONFIG / "tasks.yaml"),
        task_id="final_review",
        agent=critic,
        context=[audit_task, competitor_task, design_task, content_task],
    )

    # ── CREW ─────────────────────────────────────────────────────────────────
    return Crew(
        agents=[site_auditor, competitor_analyst, design_advisor, content_strategist, critic],
        tasks=[audit_task, competitor_task, design_task, content_task, final_task],
        process=Process.sequential,
        memory=True,
        planning=True,
        verbose=True,
    )


def run():
    """Entry point — runs the crew and writes results to Supabase."""
    print("\n" + "="*60)
    print("  EnviroCare CrewAI — Starting 3-Round Analysis")
    print("="*60 + "\n")

    crew = build_crew()
    result = crew.kickoff()

    # Write final output to Supabase
    write_run_to_supabase("crew-orchestrator", "ok", str(result))

    # Parse and write individual recommendations from final output
    output_text = str(result)
    write_findings_to_supabase(output_text)

    print("\n" + "="*60)
    print("  FINAL OUTPUT")
    print("="*60)
    print(output_text)

    return result
