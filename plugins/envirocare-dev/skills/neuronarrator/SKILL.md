---
name: neuronarrator
description: Use when reading, scoring or saving NeuronWriter editors for EnviroCare (project 9d0bec3a70f4743c) through the neuronarrator MCP server or agents/neuronwriter-narrator.mjs. Covers which calls are read-only, how to tell a never-saved editor from a failed read, and the import rules.
---

# NeuroNarrator (NeuronWriter) for EnviroCare

The `neuronarrator` MCP server in this plugin is NeuronWriter's official remote
MCP (`https://app.neuronwriter.com/mcp/http`). It signs in with OAuth on
NeuronWriter's own site, so no API key lives in this repo, in prompts or in env
files. NeuronWriter documents it as requiring the Gold plan or higher.

The scheduled agent `agents/neuronwriter-narrator.mjs` uses the REST API
(`NEURONWRITER_API_KEY`, a GitHub secret) instead. Both reach the same project.

## Project

- EnviroCare project id: `9d0bec3a70f4743c`. If a query's `project` is anything
  else, stop: it is not ours.
- About 278 queries (Nov 25, 2026). `list-queries` rows carry no score.

## Calls, by risk

| Call | Effect |
|---|---|
| `list-projects`, `list-queries`, `get-query`, `get-content`, `get-competitors-content` | Read only |
| `evaluate-content` | Read only, quota-free: scores HTML without saving it |
| `import-content` | **Writes** the editor. Overwrites what is there |
| `new-query` | **Spends** the monthly analysis quota (75/month) |
| `new-project`, `mark-content-as-done`, `update-query-tags` | Changes the account |

Never call a write or quota call to "test" something.

## Reading an editor correctly

- A saved editor returns `content`, `title`, `description`, `created`, `type`,
  `query`, `keyword`, `language`, `engine`, `project`.
- A **never-saved** editor returns a bare `{}` (verified Nov 25, 2026, e.g.
  `d7f3561c4bca777b`, data center pest control construction handover). Treat it
  as empty only when `get-content` with `revision_type: "all"` is also `{}` and
  `get-query` says `status: "ready"` in project `9d0bec3a70f4743c`. That is the
  rule the narrator now applies.
- Any other odd shape (`null`, `[]`, an `error` field, non-string `content`) is
  an unknown read. Do not overwrite an editor you could not read.
- `err` in a narrator report means "not scored", never "below 65%".

## Before any import

1. Read the current editor, including autosaves, and score it with
   `evaluate-content`.
2. Score the candidate with `evaluate-content` on the same query id, unsaved.
3. Import only if the candidate scores higher and passes the editorial gates in
   `agents/lib/editorial-quality.mjs` and the compliance canon in `AGENTS.md`
   (EnviroCare's $1M damage repair coverage wording, no safety or same-day
   claims, liquid termite treatment for existing customers only, NAP from
   `data/offices.ts`, prices from `data/pricing.ts`).
4. Import once, then read it back. A NeuronWriter score is keyword coverage only;
   it is never approval to publish on the website.
