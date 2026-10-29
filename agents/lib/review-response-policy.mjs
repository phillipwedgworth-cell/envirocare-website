// Shared review eligibility checks, used by the real draft workflow below.
// This module does not send replies. No config/env flag can enable public sends.
import { createHash } from 'node:crypto';

export const REVIEW_POLICY = Object.freeze({
  publicSendingEnabled: false,
  perLocation24h: 3,
  global24h: 10,
  initialManualApprovals: 10,
  maxReplyChars: 450,
  maxReplyWords: 70,
  maxReplySentences: 3,
  replyReadMaxAgeMs: 5 * 60 * 1000,
});

const LOCATIONS = new Set(['Alabaster', 'Birmingham', 'Huntsville', 'Alex City']);
const DAY_MS = 24 * 60 * 60 * 1000;
const digest = (value) => createHash('sha256').update(value).digest('hex');
export const replyHash = (text) => digest(String(text).trim());
export const reviewFingerprint = (r) => digest(JSON.stringify([
  r.id ?? null, r.location, r.directory, r.rating, r.publishTime, r.text,
]));

export function reviewKey(r) {
  const identity = r.id ? `id:${r.id}` : `fingerprint:${reviewFingerprint(r)}`;
  return digest(JSON.stringify([r.location, String(r.directory).toLowerCase(), identity]));
}

export function legacyReviewKey(r) {
  return r.id ? `id:${r.id}` : `fp:${r.location}|${r.directory}|${r.author}|${r.publishTime}|${r.text.slice(0, 40)}`;
}

function timestamp(value) {
  // Date-only/locale dates cannot establish which side of activation a review is on.
  return typeof value === 'string' && /T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value)
    ? Date.parse(value) : NaN;
}

export function replyProblems(reply) {
  const text = typeof reply === 'string' ? reply.trim() : '';
  const reasons = [];
  if (!text) reasons.push('empty reply');
  if (text.length > REVIEW_POLICY.maxReplyChars) reasons.push('reply exceeds 450 characters');
  if (text.split(/\s+/).filter(Boolean).length > REVIEW_POLICY.maxReplyWords) reasons.push('reply exceeds 70 words');
  if ((text.match(/[.!?]+(?=\s|$)/g) ?? []).length > REVIEW_POLICY.maxReplySentences) reasons.push('reply exceeds three sentences');
  return reasons;
}

// Conservative lexical holds supplement the structured assessment; they do not
// prove that an unflagged review is complaint-free. Unknown assessment stays manual.
export function concernInReview(text) {
  return /\b(complain\w*|refund\w*|overcharg\w*|lawsuit|attorney|lawyer|damage\w*|injur\w*|sick|poison\w*|allerg\w*|unsafe|disappoint\w*|rude|late|missed|unhappy|dissatisf\w*|terrible|awful|poor|bad|however|but|except|wish|unfortunately|problem\w*|issue\w*|concern\w*|cancel\w*)\b|\b(?:not|never|didn['’]?t|wasn['’]?t|isn['’]?t)\s+\w+|ignore.*instructions|system prompt|https?:\/\//i.test(String(text));
}

export function evaluateReview(review, reply, state = {}, now = new Date()) {
  const reasons = [];
  const nowMs = +new Date(now);
  const activated = timestamp(state.activatedAt);
  const published = timestamp(review.publishTime);
  const id = reviewKey(review);
  if (!LOCATIONS.has(review.location)) reasons.push('unknown location');
  if (!review.id) reasons.push('stable review ID missing');
  if (String(review.directory).toLowerCase() !== 'google') reasons.push('Google review required');
  if (review.rating !== 5) reasons.push('1–4 stars require manual response');
  if (review.assessment !== 'clear' || concernInReview(review.text)) reasons.push('complaint or uncertain content requires manual response');
  if (!Number.isFinite(activated) || activated > nowMs) reasons.push('activation not configured');
  if (!Number.isFinite(published) || published > nowMs) reasons.push('review creation time is unverified');
  else if (Number.isFinite(activated) && published <= activated) reasons.push('review predates activation; no backlog');
  if (review.replyState !== 'unreplied') reasons.push(review.replyState === 'replied' ? 'existing reply must not be overwritten' : 'live reply status unknown');
  const checked = timestamp(review.replyCheckedAt);
  if (!Number.isFinite(checked) || nowMs - checked > REVIEW_POLICY.replyReadMaxAgeMs || checked > nowMs) reasons.push('fresh provider reply read required');

  const events = state.events;
  const eventsValid = state.historyVerified === true && Array.isArray(events) && events.every(e =>
    e && typeof e.key === 'string' && LOCATIONS.has(e.location) &&
    ['reserved', 'delivered', 'unknown'].includes(e.status) && Number.isFinite(timestamp(e.at)) && timestamp(e.at) <= nowMs);
  if (!eventsValid) reasons.push('delivery history is unverified');
  const history = eventsValid ? events : [];
  if (history.some(e => e.key === id)) reasons.push('review already delivered, reserved or unresolved');
  const recent = history.filter(e => timestamp(e.at) > nowMs - DAY_MS);
  if (recent.length >= REVIEW_POLICY.global24h) reasons.push('10-reply rolling 24-hour global limit');
  if (recent.filter(e => e.location === review.location).length >= REVIEW_POLICY.perLocation24h) reasons.push('3-reply rolling 24-hour location limit');

  const approvals = Array.isArray(state.initialApprovals) ? state.initialApprovals : [];
  const approved = new Set(approvals.filter(a => a && typeof a.key === 'string' && a.key &&
    typeof a.replyHash === 'string' && /^[a-f0-9]{64}$/.test(a.replyHash) &&
    typeof a.approvedBy === 'string' && a.approvedBy.trim() &&
    Number.isFinite(timestamp(a.approvedAt)) && timestamp(a.approvedAt) > activated && timestamp(a.approvedAt) <= nowMs
  ).map(a => a.key));
  const initialReviewsRemaining = Math.max(0, REVIEW_POLICY.initialManualApprovals - approved.size);
  if (initialReviewsRemaining) reasons.push(`first 10 replies require human review (${initialReviewsRemaining} remaining)`);
  reasons.push(...replyProblems(reply));
  return {
    key: id, replyHash: replyHash(reply), policyEligible: reasons.length === 0,
    publicSendingEnabled: false, disposition: 'manual_review',
    reasons: [...reasons, 'public sending disabled; verified provider integration required'],
    initialReviewsRemaining,
  };
}
