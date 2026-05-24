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

---

# CFO AGENT SECTION — ADD TO CLAUDE-CODE-INSTRUCTIONS.md

## CFO Agent Build State

**Status:** Foundation deployed (May 24, 2026)  
**Branch:** `feature/cfo-agent`  
**Commit:** 832e99d

### File Locations

**GitHub: `phillipwedgworth-cell/envirocare-website`**
```
agents/cfo-agent.mjs
app/api/cfo/run/route.ts
lib/quickbooks.ts
lib/multi-model.ts
```

**Google Drive: `EnviroCare CFO/`**
```
Source Reports/
  Fathom Monthly/
  Detail Reports/
  Tax Returns/
Weekly Briefs/
Monthly Deep Dives/
```

**Supabase Tables:**
```
cfo_snapshots
cfo_briefs
```

### Environment Variables (Vercel)

Required for CFO agent to run:
```
QUICKBOOKS_CLIENT_ID=         [From QuickBooks developer portal]
QUICKBOOKS_CLIENT_SECRET=     [From QuickBooks developer portal]
QUICKBOOKS_REALM_ID=          [Your company ID from QB]
OPENAI_API_KEY=               [From platform.openai.com]
GEMINI_API_KEY=               [From ai.google.dev]
ANTHROPIC_API_KEY=            [Already exists]
SUPABASE_URL=                 [Already exists]
SUPABASE_ANON_KEY=            [Already exists]
GOOGLE_DRIVE_FOLDER_ID=       [EnviroCare CFO folder ID]
RESEND_API_KEY=               [Already exists]
```

### Multi-Model Analysis Pattern

**Each weekly run calls three models in parallel:**

1. **Claude Sonnet 4** — Conservative analyst (risk, cash, margins)
2. **Gemini 1.5 Pro** — Growth analyst (revenue, seasonal, expansion)
3. **GPT-4o** — Benchmark analyst (industry comps, ratios)

**Orchestrator (Claude) synthesizes:**
- Consensus findings
- Disagreements (most valuable signal)
- Actionable recommendations
- Alert triggers

### Data Flow

```
QuickBooks MCP → Raw financials
     ↓
cfo_snapshots table (normalized)
     ↓
Multi-model analysis (3 parallel API calls)
     ↓
cfo_briefs table (archive)
     ↓
Google Doc (running brief) + Email alert (if critical)
```

### Next Build Steps

1. **Session 2:** Build `lib/multi-model.ts` with Claude/Gemini/GPT callers
2. **Session 3:** Build Google Doc writer integration
3. **Session 4:** Deploy to Vercel with cron, test first run

### Cost Estimate

- QuickBooks MCP: Free (direct connection, not API tier)
- Claude API: ~$2/week (Sonnet calls)
- Gemini API: ~$1/week (1.5 Pro calls)
- GPT-4o API: ~$2/week (standard calls)
- Total: **~$20/month** for weekly multi-model analysis

### Alert Thresholds

Critical alerts (immediate email):
- Cash < $30,000
- Gross margin < 60%
- Revenue decline > 15% MoM

Watch alerts (flagged in brief):
- Cash < $50,000
- Gross margin < 65%
- Revenue decline > 10% MoM
- OpEx > 35% of revenue

### Cron Schedule

- **When:** Every Monday 6:00 AM Central Time
- **Endpoint:** `/api/cfo/run`
- **Timeout:** 60 seconds (multi-model requires extended)

### Google Drive Folder ID

To get the folder ID for `GOOGLE_DRIVE_FOLDER_ID` env variable:
1. Open `EnviroCare CFO/` folder in Drive
2. Look at URL: `https://drive.google.com/drive/folders/XXXXX`
3. `XXXXX` is the folder ID

### Related Docs

- `CFO-AGENT-PLAYBOOK.md` (EnviroCare Claude Project) — Strategy and architecture
- `ENVIROCARE-SEO-COMMAND-CENTER.md` — SEO operations (separate agent)
- `30-DAY-PREFLIP-PLAYBOOK.md` — Website transition plan

---

**Last updated:** May 24, 2026  
**Next session priority:** Build multi-model caller library
