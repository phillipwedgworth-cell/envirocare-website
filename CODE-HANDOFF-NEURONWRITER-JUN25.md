# Claude Code Handoff — 5 City Pages + Neuron Narrator cadence (Jun 25, 2026)

**Context:** This working tree has ~250 churned files. Commit ONLY the 15 paths below.
Everything is validated: cities.ts imports clean (35 cities), workflow YAML valid, drafts written.

## 1. Commit exactly these files (nothing else)

```bash
cd <repo root>   # phillipwedgworth-cell/envirocare-website, branch main

# 5 new city pages (routes + data + redirect + sitemap)
git add data/cities.ts app/sitemap.ts next.config.ts
git add app/bessemer/page.tsx app/mccalla/page.tsx app/gardendale/page.tsx \
        app/meridianville/page.tsx app/sylacauga/page.tsx

# Neuron Narrator: daily-score / push-fill cadence + 5 staged drafts
git add .github/workflows/neuronwriter-narrator.yml
git add agents/neuronwriter-content/manifest.json \
        agents/neuronwriter-content/pest-control-bessemer-al.html \
        agents/neuronwriter-content/pest-control-mccalla-al.html \
        agents/neuronwriter-content/pest-control-gardendale-al.html \
        agents/neuronwriter-content/pest-control-meridianville-al.html \
        agents/neuronwriter-content/pest-control-sylacauga-al.html

# verify the staged set is EXACTLY these 15 paths before committing
git status --short | grep '^[MA]'

git commit -m "feat(cities+narrator): add Bessemer/McCalla/Gardendale/Meridianville/Sylacauga pages; narrator daily-score + push/Monday fill; stage 5 city drafts"
git push origin main
```

## 2. What the push triggers automatically
- The push touches `agents/neuronwriter-content/**` and the workflow file, so **Neuron Narrator
  fires in `fill` mode immediately** — writes/pushes/scores drafts for all existing (~75) queries,
  emails the ready-to-ship ranking.
- After that: **daily 13:00 UTC = score**, **Monday 14:00 UTC = fill**, manual button = pick mode.

## 3. Verify after push
```bash
git show --stat HEAD          # confirm only the 15 files landed
gh run list --workflow "Neuron Narrator" --limit 3   # confirm the fill run started
```
- Confirm Vercel preview/prod builds clean (new routes compile).

## 4. Still manual / blocked (not in this commit)
- **5 new-city NeuronWriter queries** must be created in the project (`9d0bec3a70f4743c`):
  `pest control bessemer al`, `...mccalla al`, `...gardendale al`, `...meridianville al`,
  `...sylacauga al`. Blocked by the monthly `new-query` 429 quota until reset/credit (support
  chat already open). Once they exist, the staged drafts auto-push on the next fill — no code change.
- Pages only rank after the **domain cutover** from Scorpion (still pre-cutover).
- Pre-existing low scorer to revisit: `pre-construction pest treatment alabama = 44`.
aapprove
approve
