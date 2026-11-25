# envirocare-dev (Claude Code plugin)

Install in Claude Code:

```
/plugin install envirocare-dev --marketplace phillipwedgworth-cell/envirocare-website
```

What it adds:

- **`neuronarrator` MCP server**: NeuronWriter's official remote MCP at
  `https://app.neuronwriter.com/mcp/http`. The first use opens NeuronWriter's
  sign-in and asks you to approve access (OAuth). No API key is stored in this
  repo. NeuronWriter requires its Gold plan or higher for MCP.
- **`neuronarrator` skill**: which NeuronWriter calls are read-only, how to read
  a never-saved editor, and the import rules.
- **`fieldster-api` skill**: the verified Fieldster (Key7) API facts and the
  read-only rule, pointing at `agents/lib/fieldster.mjs`.

The scheduled agents do not use this plugin. They keep using GitHub secrets:
`NEURONWRITER_API_KEY` for the narrator and `FIELDSTER_API_TOKEN` (or
`FIELDSTER_API_KEY`) for the Fieldster jobs.
