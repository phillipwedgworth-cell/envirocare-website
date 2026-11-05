// Actual draft-delivery workflow. Dependencies are explicit so failure paths can
// be tested without calling a model, Notion, a database, or a public review API.
import { evaluateReview, legacyReviewKey, replyProblems, reviewKey } from './review-response-policy.mjs';

export async function deliverReviewDrafts({ reviews, store, draft, deliver, scanReply, now = new Date() }) {
  if (!Array.isArray(reviews)) throw new Error('Review source is malformed');
  if (reviews.some(r => r.error)) throw new Error('Review source incomplete; no drafts delivered');
  const context = await store.context(); // A failed read must abort before any side effect.
  const outcomes = [];
  const seen = new Set();
  let lastOpening = '';
  for (const review of reviews) {
    const key = reviewKey(review);
    if (seen.has(key)) continue;
    seen.add(key);
    if (review.replyState === 'replied') { outcomes.push({ key, status: 'already_replied' }); continue; }
    const prior = await store.get(key);
    if (prior) {
      if (!['pending', 'delivered'].includes(prior.status)) throw new Error('Review delivery state is malformed');
      outcomes.push({ key, status: prior.status === 'delivered' ? 'already_delivered' : 'needs_reconciliation' });
      continue;
    }
    if (context.legacyKeys.includes(legacyReviewKey(review))) {
      // The old ledger could record success without a Notion write. Neither
      // trust it as delivered nor resend blindly. Preserve it for reconciliation.
      outcomes.push({ key, status: 'legacy_delivery_unverified' }); continue;
    }
    const generated = await draft(review, lastOpening);
    if (!generated || typeof generated.body !== 'string' || !['clear', 'concern', 'uncertain'].includes(generated.assessment)) throw new Error('Review draft response is malformed');
    const reply = `${generated.body.trim()}\n\n— The EnviroCare Team`;
    const problems = [...replyProblems(generated.body), ...replyProblems(reply), ...scanReply(reply)];
    if (problems.length) { outcomes.push({ key, status: 'draft_rejected', reasons: problems }); continue; }
    const decision = evaluateReview({ ...review, assessment: generated.assessment }, reply, context.policy, now);
    const claim = await store.claim(key, now);
    if (!claim) { outcomes.push({ key, status: 'concurrent_claim' }); continue; }
    try {
      const acknowledged = await deliver({ review, reply, decision, key, now });
      if (acknowledged !== true) {
        const error = new Error('Review draft destination did not acknowledge delivery');
        error.deliveryStatus = acknowledged === false ? 'not_sent' : 'unknown';
        throw error;
      }
      await store.complete(key, claim, { deliveredAt: now.toISOString(), replyHash: decision.replyHash });
      outcomes.push({ key, status: 'delivered', decision });
      lastOpening = generated.body.split(' ').slice(0, 5).join(' ');
    } catch (error) {
      if (error.deliveryStatus === 'not_sent') await store.release(key, claim);
      // A timeout or failed acknowledgement write is NOT a success, and its
      // pending claim prevents a duplicate until a human checks the destination.
      throw error;
    }
  }
  const count = outcomes.filter(o => o.status === 'delivered').length;
  const held = outcomes.filter(o => ['needs_reconciliation', 'legacy_delivery_unverified', 'draft_rejected'].includes(o.status)).length;
  return { ok: held === 0, count, held, outcomes, publicSendingEnabled: false };
}
