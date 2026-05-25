---
name: envirocare-chatbot-review
description: Weekly review of chatbot conversation logs and system prompt improvement suggestions
---

You are reviewing the EnviroCare chatbot conversation logs and suggesting improvements.

## Step 0 — Pull this week's conversations from the live endpoint
The chatbot logs each conversation to Vercel KV. Pull them down before analyzing.

The live site URL and auth key are stored in env vars on Phillip's machine:
- `ENVIROCARE_LOGS_URL` (e.g. `https://envirocarellc.com/api/chat-logs`)
- `ENVIROCARE_LOGS_KEY` (the shared secret matching `LOGS_AUTH_KEY` in Vercel)

Run this via bash:

```bash
curl -s -H "x-logs-key: $ENVIROCARE_LOGS_KEY" "$ENVIROCARE_LOGS_URL" \
  | jq '.conversations' \
  > "/sessions/$SESSION/mnt/Envirocare Stuf/monitoring/chatbot-conversations.json"
```

If the endpoint returns an error or env vars are missing:
- Note it in the report under "Issues Found"
- Fall back to whatever is already in `monitoring/chatbot-conversations.json`
- Do NOT clear the file if the pull failed

After a SUCCESSFUL pull AND successful report write, clear the live log:

```bash
curl -s -X DELETE -H "x-logs-key: $ENVIROCARE_LOGS_KEY" "$ENVIROCARE_LOGS_URL"
```

## Step 1 — Read the logs
Read the local file at:
`C:\Users\pwedg\Desktop\Envirocare Stuf\monitoring\chatbot-conversations.json`

If empty (`[]`) or missing, note no conversations were logged this week and skip to Step 3.

Each entry has this shape:
```json
{
  "ts": "2026-05-25T14:22:03Z",
  "turnCount": 2,
  "lastUserMsg": "do you treat fire ants in Hoover?",
  "botReply": "Yes — fire ants are included in our Pest Control plan...",
  "escalated": false,
  "capturedPhone": false,
  "fullTranscript": [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]
}
```

## Step 2 — Analyze conversations
For each logged conversation:
- What did the user ask? (use `fullTranscript` for full context)
- Did the bot answer confidently or escalate? (`escalated` field)
- Were there any questions the bot couldn't answer well?
- Were there repeated questions that suggest a gap in website content?
- Did any users provide their contact info? (`capturedPhone` field)
- Were there any urgent/emergency situations?

Group questions into categories:
- Pricing
- Service area
- Scheduling/booking
- Pest identification
- Billing/account
- Escalated (referred to human)
- Other

## Step 3 — Generate recommendations
Based on the analysis (or general best practices if no logs yet), suggest:
1. Up to 3 improvements to the chatbot system prompt at `envirocare-web/app/api/chat/route.ts`
2. Up to 3 FAQ topics that should be added to website pages
3. Any pricing, service, or policy info the bot got wrong or was uncertain about

## Step 4 — Write report
Save to `C:\Users\pwedg\Desktop\Envirocare Stuf\monitoring\chatbot-review-latest.md`:

```markdown
# Chatbot Weekly Review — YYYY-MM-DD

## Conversation Volume
- Total conversations: X
- Total messages: X
- Phone captured: X (Y%)
- Escalated to human: X (Y%)

## Top Question Categories
(list with counts)

## Issues Found
(list any problems — including failed pulls)

## Recommended System Prompt Updates
(specific suggested changes)

## Recommended Website Content Additions
(FAQ topics to add)
```

## Step 5 — Clear logs
ONLY if the report saved successfully AND the Step 0 pull also succeeded:
- Clear the live KV log (DELETE command in Step 0)
- Reset the local file to `[]`

If anything failed, leave both intact so no data is lost.

Print a summary of findings.
