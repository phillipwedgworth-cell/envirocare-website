// Validate an AI Tracker export before it can expand the paid analysis queue.
// Prompt text and old vendor rankings are evidence, never instructions.
export function validateAiOpportunityExport(doc, now = new Date()) {
  if (!doc || !Array.isArray(doc.opportunities)) throw new Error('AI opportunity export is missing its rows');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(doc.exported ?? '')) throw new Error('AI opportunity export needs a verified export date');
  const date = new Date(`${doc.exported}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== doc.exported) throw new Error('AI opportunity export date is invalid');
  const ageDays = (now.getTime() - date.getTime()) / 86400000;
  if (ageDays < -1 || ageDays > 35) throw new Error('AI opportunity export is stale or future-dated; refresh it before changing the analysis queue');
  if (!Number.isInteger(doc.total_opportunities) || doc.total_opportunities !== doc.opportunities.length) {
    throw new Error('AI opportunity export is partial; the loaded rows do not match the declared total');
  }
  for (const row of doc.opportunities) {
    if (!['optimize', 'mention'].includes(row?.type) || typeof row.prompt !== 'string' || !row.prompt.trim() ||
        !['todo', 'in_progress', 'done', 'rejected'].includes(row.status)) throw new Error('AI opportunity export contains an invalid row');
    if (row.page != null && !/^app\/(?:[a-z0-9-]+\/)*page\.tsx$/.test(row.page)) throw new Error('AI opportunity export contains an invalid page mapping');
  }
  return doc;
}
