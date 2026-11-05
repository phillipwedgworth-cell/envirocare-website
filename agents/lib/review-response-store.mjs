// Strict, per-review delivery claims in the existing agent_state table.
// Unique primary-key inserts prevent concurrent runs delivering the same draft.
// Unlike the general KV helper, errors never masquerade as missing state.
import { randomUUID } from 'node:crypto';

export function createReviewStore(client) {
  if (!client) throw new Error('Review workflow requires durable Supabase state');
  const table = () => client.from('agent_state');
  const rowKey = (key) => `review-responder:delivery:v2:${key}`;
  async function read(key) {
    const { data, error } = await table().select('value').eq('key', key).maybeSingle();
    if (error) throw new Error(`Review state read failed: ${error.code ?? 'database error'}`);
    if (data && (!Object.hasOwn(data, 'value') || data.value === null)) throw new Error('Review state response malformed');
    return data?.value ?? null;
  }
  return {
    async context() {
      const [legacyKeys, policy] = await Promise.all([
        read('review-responder:drafted-keys'), read('review-responder:reply-policy'),
      ]);
      if (legacyKeys !== null && (!Array.isArray(legacyKeys) || legacyKeys.some(k => typeof k !== 'string'))) throw new Error('Legacy review ledger is malformed');
      if (policy !== null && (typeof policy !== 'object' || Array.isArray(policy))) throw new Error('Review policy state is malformed');
      return { legacyKeys: legacyKeys ?? [], policy: policy ?? {} };
    },
    get: (key) => read(rowKey(key)),
    async claim(key, now) {
      const claim = { status: 'pending', attemptId: randomUUID(), startedAt: now.toISOString() };
      const { error } = await table().insert({ key: rowKey(key), value: claim });
      if (error?.code === '23505') return null;
      if (error) throw new Error(`Review claim failed: ${error.code ?? 'database error'}`);
      return claim;
    },
    async complete(key, claim, metadata) {
      const { data, error } = await table().update({
        value: { ...claim, ...metadata, status: 'delivered' }, updated_at: new Date().toISOString(),
      }).eq('key', rowKey(key)).eq('value->>attemptId', claim.attemptId)
        .eq('value->>status', 'pending').select('key').maybeSingle();
      if (error || !data) throw new Error('Draft delivered but acknowledgement could not be persisted; reconcile before retry');
    },
    async release(key, claim) {
      // Only use when the destination confirms it accepted nothing. Unknown
      // network/5xx outcomes retain a pending claim for manual reconciliation.
      const { error } = await table().delete().eq('key', rowKey(key))
        .eq('value->>attemptId', claim.attemptId).eq('value->>status', 'pending');
      if (error) throw new Error('Could not release failed draft claim; reconcile before retry');
    },
  };
}
