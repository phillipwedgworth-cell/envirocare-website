# Ad-Automation Draft + Notify Flow

Goal: Agent generates ad drafts and notifies reviewer to approve/publish.

High-level flow:
1. Agent produces ad copy draft (title, body, CTA, landing URL) and stores draft in `agent_drafts` (Supabase or local JSON in dev).
2. Agent sends notification email to reviewer (`NOTIFY_EMAIL`) with a secure review link.
3. Reviewer clicks link, reviews draft UI (simple preview page), and can `Approve` or `Request Changes`.
4. Approve -> optionally create GitHub PR (via `agents/lib/github.mjs`) or POST to ad platform API.
5. Request Changes -> agent receives feedback and runs a revision loop (critic) and re-sends notification.

API endpoints (serverless):
- `POST /api/ads/draft` — agent or UI can create a draft and optionally notify reviewer
- `GET /api/ads/:id` — preview draft JSON
- `POST /api/ads/:id/approve` — mark a draft approved
- `POST /api/ads/:id/feedback` — record reviewer feedback and set status to needs-changes

Data model (Supabase table `agent_drafts`):
- id, agent_name, title, body, cta, landing_url, status (pending-review/approved/needs-changes/published), created_at, updated_at, metadata

Notifications:
- Use `RESEND_API_KEY` to send email w/ review link; include JWT or signed token to authenticate reviewer action.
- Env vars: `RESEND_API_KEY`, `NOTIFY_EMAIL`, `NOTIFY_FROM`, `SUPABASE_URL`, `SUPABASE_KEY`, `GITHUB_TOKEN`.

Security:
- Short-lived signed tokens for review links.
- Rate-limit publish endpoint.

Next steps I can take now:
- Scaffold the Supabase table migration SQL and a minimal `POST /api/ads/draft` endpoint.
- Add a simple email template and a preview UI under `app/`.
- Wire up `agents/lib/github.mjs` to create PRs on approve.

Confirm which pieces you want me to implement first (DB + API + email, or the review UI + PR flow)."