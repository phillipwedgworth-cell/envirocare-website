#!/usr/bin/env python3
"""
envirocare-crew/test_crew.py
Smoke test — runs a 3-agent mini crew WITHOUT chromadb/memory.
Verifies API keys work and agents collaborate correctly.

Usage:
  cd envirocare-crew
  python test_crew.py
"""

import os
import sys
from pathlib import Path

# Load .env from repo root
env_file = Path(__file__).parent.parent / ".env"
if env_file.exists():
    import re
    for line in env_file.read_text().splitlines():
        m = re.match(r"^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$", line)
        if m and not os.environ.get(m.group(1)):
            os.environ[m.group(1)] = m.group(2).strip("\"'")
    print(f"[test] .env loaded")

from crewai import Agent, Task, Crew, Process, LLM

# ── Agents ─────────────────────────────────────────────────────────────────
researcher = Agent(
    role="Competitive Researcher",
    goal=(
        "Compare cookspest.com vs envirocare-web.vercel.app homepages. "
        "Find 5 things Cook's does better and 5 things EnviroCare does better. "
        "Be specific — exact elements, exact sections."
    ),
    backstory=(
        "You are a former digital strategist at a national pest control chain. "
        "You compare sites pixel by pixel. You know Cook's Pest has been in Alabama since 1928 "
        "and dominates Huntsville. You also know EnviroCare was founded 1958, has Sentricon $1M "
        "warranty, and is the ONLY pest control company with a dedicated Lake Martin office. "
        "You look for real, specific differences — not generic observations."
    ),
    llm=LLM(model="anthropic/claude-opus-4-20250514", temperature=0.5),
    verbose=True,
    allow_delegation=False,
)

strategist = Agent(
    role="Creative Director",
    goal=(
        "Read the researcher findings. Propose 3 bold, specific design changes to "
        "envirocare-web.vercel.app that would make it clearly better than Cook's Pest. "
        "Each proposal must include: exact copy, exact CSS hex colors, exact placement on page."
    ),
    backstory=(
        "You spent 15 years at branding agencies for luxury home services. "
        "You hate generic. You study competitor sites obsessively. "
        "You know EnviroCare's real story — 68 years, 3rd generation Kevin Wedgworth, "
        "Sentricon certified, Lake Martin exclusivity — and you know most pest control sites "
        "waste this story by burying it below the fold. You fix that."
    ),
    llm=LLM(model="anthropic/claude-opus-4-20250514", temperature=0.7),
    verbose=True,
    allow_delegation=False,
)

critic = Agent(
    role="Chief Strategy Officer",
    goal=(
        "Review the researcher findings and strategist proposals. "
        "Kill anything generic. Pick the single most impactful change to make TODAY. "
        "Explain exactly what it is, where on the page, what the copy says, and "
        "why it will move the needle vs Cook's Pest specifically."
    ),
    backstory=(
        "You have reviewed thousands of AI recommendations and 90% say nothing. "
        "You reject any proposal without specific copy, specific placement, and "
        "specific expected impact on calls or rankings. "
        "You demand one clear winner backed by real competitor evidence."
    ),
    llm=LLM(model="anthropic/claude-opus-4-20250514", temperature=0.4),
    verbose=True,
    allow_delegation=False,
)

# ── Tasks ───────────────────────────────────────────────────────────────────
task1 = Task(
    description=(
        "Visit https://www.cookspest.com and https://envirocare-web.vercel.app. "
        "Compare the homepages in detail. "
        "\n\nOutput a numbered list:"
        "\n5 THINGS COOK'S DOES BETTER (with specific evidence from their site)"
        "\n5 THINGS ENVIROCARE DOES BETTER (with specific evidence from our site)"
        "\n\nBe specific — name the exact section, element, or copy that supports each point."
    ),
    agent=researcher,
    expected_output=(
        "Two numbered lists: '5 THINGS COOK'S DOES BETTER' and '5 THINGS ENVIROCARE DOES BETTER'. "
        "Each item cites specific evidence from the actual sites."
    ),
)

task2 = Task(
    description=(
        "Read the researcher's comparison above. "
        "As Creative Director, propose 3 bold design changes to envirocare-web.vercel.app "
        "that directly counter the Cook's advantages the researcher found. "
        "\n\nEach proposal must include:"
        "\n- WHAT: exact element and section on the page"
        "\n- CHANGE: exact new copy or CSS (include hex colors)"
        "\n- WHY: which specific Cook's advantage this counters"
        "\n- IMPACT: X/10 | EFFORT: X/10"
    ),
    agent=strategist,
    expected_output=(
        "3 numbered design proposals, each with WHAT/CHANGE/WHY/IMPACT/EFFORT."
    ),
    context=[task1],
)

task3 = Task(
    description=(
        "Review the researcher comparison and strategist proposals. "
        "Pick the single best action to take TODAY. "
        "\n\nOutput:"
        "\nACTION #1 (THE WINNER): [title]"
        "\nWHAT EXACTLY: [specific enough to implement in the next 2 hours]"
        "\nWHY THIS WINS: [cite specific researcher finding + competitor weakness]"
        "\nEXPECTED RESULT: [what this moves — calls, rankings, conversions]"
        "\nIMPACT: X/10 | EFFORT: X/10"
        "\n\nSECOND PLACE (save for next week): [brief description]"
        "\nDISCARDED (too vague): [anything you're killing and why]"
    ),
    agent=critic,
    expected_output=(
        "Final ranked recommendation with ACTION #1, SECOND PLACE, and DISCARDED sections."
    ),
    context=[task1, task2],
)

# ── Crew (no memory to avoid chromadb dependency) ──────────────────────────
crew = Crew(
    agents=[researcher, strategist, critic],
    tasks=[task1, task2, task3],
    process=Process.sequential,
    memory=False,   # set True once chromadb is properly installed
    verbose=True,
)

# ── Run ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "="*60)
    print("  EnviroCare Test Crew — Cook's vs EnviroCare Analysis")
    print("="*60 + "\n")

    result = crew.kickoff()

    print("\n\n" + "="*60)
    print("  FINAL CREW OUTPUT")
    print("="*60)
    print(result)
