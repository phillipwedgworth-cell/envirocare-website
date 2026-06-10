// agents/lib/notion.mjs
// Thin Notion API client for EnviroCare agent reporting.
// Auth: NOTION_TOKEN env var (Bearer). Silently no-ops when the token is absent.

const BASE = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

// NeuronWriter QA weekly log page — "NeuronWriter QA — Automation Spec (Jun 9 2026)"
const WEEKLY_PAGE_ID = '37b202ee-7a71-81d1-952d-da64def90de0';
const WEEKLY_HEADING_TEXT = 'Weekly results log';

function notionHeaders() {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error('NOTION_TOKEN is not set');
  return {
    Authorization: `Bearer ${token}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  };
}

async function notionGet(path) {
  const resp = await fetch(`${BASE}${path}`, { headers: notionHeaders() });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Notion GET ${path} → ${resp.status}: ${text.slice(0, 300)}`);
  }
  return resp.json();
}

async function notionPost(path, body) {
  const resp = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Notion POST ${path} → ${resp.status}: ${text.slice(0, 300)}`);
  }
  return resp.json();
}

function richText(content) {
  return [{ type: 'text', text: { content: String(content) } }];
}

function heading3Block(text) {
  return { object: 'block', type: 'heading_3', heading_3: { rich_text: richText(text) } };
}

function bulletBlock(text) {
  return { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: richText(text) } };
}

function dividerBlock() {
  return { object: 'block', type: 'divider', divider: {} };
}

// Find the block ID of the "Weekly results log" heading_2 on the page.
// Returns null if not found (fallback: append at end of page).
async function findWeeklyHeadingId(pageId) {
  try {
    const data = await notionGet(`/blocks/${pageId}/children?page_size=100`);
    for (const block of (data.results ?? [])) {
      const h2Text = block?.heading_2?.rich_text?.[0]?.text?.content ?? '';
      if (h2Text.includes(WEEKLY_HEADING_TEXT)) return block.id;
    }
    return null;
  } catch {
    return null;
  }
}

// Append the NeuronWriter QA run summary under the "Weekly results log" heading.
// Inserts newest-first: each call goes right after the heading, pushing prior runs down.
// Silently no-ops if NOTION_TOKEN is missing.
export async function appendWeeklyResult(results) {
  if (!process.env.NOTION_TOKEN) {
    console.log('[notion] NOTION_TOKEN not set — skipping Notion post');
    return;
  }

  const date = new Date().toISOString().slice(0, 10);
  const passCount = results.filter(r => !r.error && r.score >= 70).length;
  const failCount = results.filter(r => !r.error && r.score < 70).length;
  const errorCount = results.filter(r => r.error).length;

  // Build score bullets
  const bullets = results.map(r => {
    if (r.error) return `⚠️  ${r.page.replace('app/', '')} — error: ${String(r.error).slice(0, 80)}`;
    const flag = r.score < 70 ? '🔴' : (r.score <= 80 ? '✅' : '🟡');
    const note = r.score < 70 ? ` — BELOW THRESHOLD (+${70 - r.score} needed)` : (r.score > 80 ? ' — above target band' : '');
    return `${flag} ${r.page.replace('app/', '')} | ${r.keyword} | ${r.score}/100${note}`;
  });

  const summary = failCount > 0
    ? `🔴 ${failCount} page${failCount > 1 ? 's' : ''} below threshold · ${passCount} passing · target band 70-80`
    : `✅ All ${passCount} pages in target band (70-80)${errorCount ? ` · ${errorCount} skipped (errors)` : ''}`;

  const blocks = [
    heading3Block(`📅 ${date} — NeuronWriter QA (${results.length} pages)`),
    ...bullets.map(bulletBlock),
    bulletBlock(summary),
    dividerBlock(),
  ];

  try {
    const headingId = await findWeeklyHeadingId(WEEKLY_PAGE_ID);

    // Insert after the heading (newest-first) or at end of page as fallback.
    const targetId = headingId ?? WEEKLY_PAGE_ID;
    const body = headingId
      ? { children: blocks, after: headingId }
      : { children: blocks };

    await notionPost(`/blocks/${targetId}/children`, body);
    console.log(`[notion] posted ${results.length}-page QA run to Notion (after ${headingId ? 'heading' : 'page end'})`);
  } catch (err) {
    console.error(`[notion] appendWeeklyResult failed: ${err.message}`);
  }
}
