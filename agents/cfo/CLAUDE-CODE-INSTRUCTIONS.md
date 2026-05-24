# CFO Agent Claude Code Instructions

This folder contains the instructions for EnviroCare's CFO agent implementation.

## Purpose

The CFO agent reads `cfo_snapshots` from Supabase and writes a concise, executive-ready brief to `cfo_briefs`.

## Table requirements

- `cfo_snapshots`
  - Stores financial snapshot payloads.
  - Includes raw JSON and normalized JSON for analysis.
  - Includes a source identifier and period metadata.

- `cfo_briefs`
  - Stores generated advisory output.
  - Includes separate fields for Claude, Gemini, and GPT analyses.
  - Includes synthesis, flags, and an optional Google Doc URL.

## Behavior

1. Fetch the latest 12 `cfo_snapshots` rows.
2. If no snapshot data exists, return a single bullet recommending snapshot population.
3. If data exists, summarize recent metrics and recommend one top action.
4. Write the final brief to `cfo_briefs` with the generation timestamp.

## Output format

- Start with `• ` on the first line.
- Write 5 short bullets.
- Mention revenue, cash flow, margin, operating risk, and one recommendation.
- Do not include a title or sign-off.
- Keep the response under 160 words.
