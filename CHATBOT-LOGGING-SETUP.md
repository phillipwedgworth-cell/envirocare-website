# Chatbot Logging — One-Time Setup

The chatbot now logs every conversation to Vercel KV. Once set up, the weekly chatbot-review scheduled task pulls those conversations down and analyzes them instead of staring at an empty file.

You only do this once.

## What I changed in the code
- `app/api/chat/route.ts` — added `logConversation()` that pushes to Vercel KV after each reply
- `app/api/chat-logs/route.ts` — NEW endpoint, returns the logged conversations (auth: `x-logs-key` header). DELETE clears the log.
- `package.json` — added `@vercel/kv` dependency
- `scheduled-task-chatbot-review.md` — updated SKILL for the weekly review task (pulls from endpoint before analyzing)

## Setup — 4 steps, ~5 minutes

### 1. Install the new dependency
In `envirocare-web/`:
```bash
npm install
```
This pulls in `@vercel/kv`.

### 2. Create a Vercel KV store
1. Open the Vercel dashboard → your `envirocare-web` project
2. Click the **Storage** tab
3. Click **Create Database** → choose **KV (Redis)**
4. Name it something like `envirocare-chatbot-logs`
5. Click **Create** → on the next screen, click **Connect to Project** → select `envirocare-web` → **Production + Preview + Development**

Vercel auto-injects these env vars into your deploy: `KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc. You don't have to set them manually.

### 3. Set the auth key for the read endpoint
In the Vercel dashboard → **Settings** → **Environment Variables**, add:
- **Name:** `LOGS_AUTH_KEY`
- **Value:** any long random string (open a terminal and run `openssl rand -hex 32` — paste the result)
- **Environments:** Production, Preview, Development

This is the secret the weekly review task uses to read the logs. Anyone without it gets a 401.

### 4. Set the same vars on your local machine for the scheduled task
The weekly review runs locally and needs to know the URL + key. Set these in your Windows environment variables (Start → "Edit the system environment variables" → Environment Variables):
- `ENVIROCARE_LOGS_URL` = `https://your-actual-domain.com/api/chat-logs` (whatever your live Vercel domain is)
- `ENVIROCARE_LOGS_KEY` = the same random string you put in Vercel as `LOGS_AUTH_KEY`

### 5. Push the code
```bash
git add app/api/chat/route.ts app/api/chat-logs/ package.json package-lock.json CHATBOT-LOGGING-SETUP.md scheduled-task-chatbot-review.md
git commit -m "Add chatbot conversation logging to Vercel KV"
git push
```
Vercel deploys. Done.

### 6. Update the scheduled task SKILL
Open the EnviroCare Chatbot Review scheduled task in Claude, paste the contents of `scheduled-task-chatbot-review.md` over the existing prompt, save.

## Smoke test
1. After Vercel finishes deploying, open the live site, chat with the bot for a couple turns.
2. From your terminal:
   ```bash
   curl -H "x-logs-key: YOUR_KEY" https://your-domain.com/api/chat-logs
   ```
   You should see your test conversation in the JSON response.
3. If it works, you're done. Next Monday's chatbot review will have real data.

## What to expect cost-wise
Vercel KV free tier: 30k commands/month + 256 MB storage. EnviroCare's traffic uses maybe 50-200 commands/week. Free forever at this scale.

## Rolling back
If anything breaks chat:
1. Revert `app/api/chat/route.ts` to the previous commit (`git revert <commit-sha>`)
2. The bot was logging fire-and-forget with try/catch, so KV failures shouldn't have broken chat — but if they did, revert is one command.
