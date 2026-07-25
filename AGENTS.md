<!-- BEGIN:nextjs-agent-rules -->
# SINGLE REPO — READ FIRST

**The only live repo is `phillipwedgworth-cell/envirocare-website`.**

**Live site: https://www.envirocarellc.com** — always use this host in agents,
scrapers, audits and tests.

Do NOT use `https://envirocare-web.vercel.app` or any `*.vercel.app` deployment
URL. Those sit behind Vercel Authentication and 302 to a login page, so anything
that fetches them measures the login screen. This file previously named that host
as "live", which is how three scheduled agents (site-reviewer, neuronwriter-qa,
neuronwriter-optimize) ended up auditing the wrong site for months and reporting
a page-speed "crisis" that no independent check could reproduce. Fixed 2026-07-25.

The Vercel project serving the live domain is `envirocare-web-only-testing`
(the name is misleading — it IS production, and it holds the Upstash KV chatbot
store). Do not move the domain off it. See `claude/WHICH-VERCEL-PROJECT-IS-LIVE.md`.
The old repo `envirocare-web` is archived at `phillipwedgworth-cell/zz-ARCHIVED-envirocare-web-OLD` — never push there.
Local primary clone: `C:\Users\pwedg\Desktop\Envirocare Stuf\envirocare-website-deploy\`

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
