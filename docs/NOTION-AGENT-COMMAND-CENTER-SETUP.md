# Agent Command Center — Notion Setup (5 minutes, one time)

You're doing this once. After this, the agents auto-update Notion and you never paste a status doc into Notion again.

---

## Step 1 — Create the integration token (90 seconds)

1. Open https://www.notion.so/my-integrations
2. **+ New integration**
3. Name: `EnviroCare Agents`
4. Associated workspace: your EnviroCare workspace
5. Type: **Internal**
6. Capabilities: tick **Read content**, **Update content**, **Insert content** (leave the others off)
7. **Submit**
8. Copy the **Internal Integration Secret** (it starts with `ntn_` — looks like `ntn_xxxxxxxxxxxxxxxxxxxxxxxxxx`)

Save this. It is your new `NOTION_TOKEN`.

---

## Step 2 — Create the Agent Command Center page (2 minutes)

In Notion, create a new page anywhere in your workspace:

- Title: **Agent Command Center**
- Inside it, add a new **database (full page)** child
- Database title: **Agent Activity**

Add these properties (delete the default `Tags` etc., add these):

| Property name | Type | Notes |
|---|---|---|
| **Title** | Title | (default — this becomes the activity card title) |
| **Agent** | Select | Options: `aeo-watch`, `monday-orchestrator`, `review-drafter`, `neuronwriter-qa`, `rank-watch`, `gsc-watch` |
| **Type** | Select | Options: `finding`, `run-summary`, `error`, `cost`, `review-draft` |
| **Status** | Select | Options: `Pending Review`, `Approved`, `Dismissed`, `Auto-Filed` |
| **Priority** | Select | Options: `🔴 High`, `🟡 Med`, `🟢 Low` |
| **URL** | URL | Source link if relevant |
| **Tags** | Multi-select | (free-form — agents will add these as they post) |
| **Created** | Created time | auto |
| **Last edited** | Last edited time | auto |

Optional but nice:
- **Cost USD** | Number | Format: Dollar
- **Panel verdict** | Select | Options: `SHIP`, `SKIP`, `HOLD`, `SPLIT`

---

## Step 3 — Connect the integration to the database (30 seconds)

1. With the **Agent Activity** database open, click the **`...`** menu in the top-right
2. Scroll to **Connections** → **`+ Add connections`**
3. Search for `EnviroCare Agents` → click to connect
4. Confirm the dialog

The integration now has read/write access to **this database only**. It cannot see anything else in your workspace.

---

## Step 4 — Grab the database ID (30 seconds)

While viewing the database:

1. Look at the URL — it'll be something like:
   `https://www.notion.so/yourworkspace/abc123def456...?v=xyz789`
2. The DB ID is the 32-character string **before the `?v=`** — `abc123def456...`
3. Save that. It is your new `NOTION_AGENT_DB_ID`.

---

## Step 5 — Update GitHub secrets (1 minute)

In `phillipwedgworth-cell/envirocare-website` → Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `NOTION_TOKEN` | (the `ntn_...` token from Step 1) — **replace** the old `adm_` one |
| `NOTION_AGENT_DB_ID` | (the 32-char DB ID from Step 4) — new secret |

Optional cleanup:
- The old `NOTION_APPROVALS_DB_ID` can be deleted (we're consolidating)

---

## What happens after this

Every agent run will append a card to **Agent Activity** with the right Agent, Type, Status, and a description. You'll have one page that shows you:

- Today's findings (filter: `Type = finding` + `Created today`)
- Pending review (filter: `Status = Pending Review`)
- This week's runs (filter: `Type = run-summary` + `Created this week`)
- Any errors (filter: `Type = error`)
- Total cost this month (sum the `Cost USD` column, filter by Created month)

You can save those as views inside the database. They become your daily dashboard.

No more "paste this status doc into Notion." The agents do it themselves.
