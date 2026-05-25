#!/usr/bin/env python3
"""
envirocare-crew/src/envirocare_crew/main.py
Entry point for running the EnviroCare CrewAI analysis.

Usage:
  python -m envirocare_crew.main
  # or from repo root after installing:
  crewai run
"""

import sys
import os
from pathlib import Path

# Load .env from project root if present
env_file = Path(__file__).resolve().parent.parent.parent.parent.parent / ".env"
if env_file.exists():
    for line in env_file.read_text().splitlines():
        m = __import__("re").match(r"^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$", line)
        if m and not os.environ.get(m.group(1)):
            os.environ[m.group(1)] = m.group(2).strip("\"'")
    print(f"[main] .env loaded from {env_file}")

def run():
    from .crew import run as crew_run
    return crew_run()

if __name__ == "__main__":
    result = run()
    sys.exit(0)
