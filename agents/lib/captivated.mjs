// ─── CLAUDE CODE: DEPLOY THIS FILE ───
// Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
// Path: agents/lib/captivated.mjs
// Commit: feat(agents): Captivated Messaging API client, reads open / sends gated
// Push: main
// ─────────────────────────────────────
//
// WHY THIS EXISTS
// ---------------
// agents/knowledge/goals.md, priority #1 this quarter:
//
//   "The map pack floor for Huntsville is ~150 reviews; EnviroCare has 34 ...
//    The review engine (Fieldster + Captivated) is wired but MAY NOT BE FIRING
//    — contact Harris Ramm to confirm."
//
// That question has been open long enough to be worth answering with data
// rather than a phone call. Captivated exposes a REST API; this is the client
// for it. The first job built on it is a READ-ONLY audit (captivated-audit.mjs)
// that answers "is it actually firing?" — not a sender.
//
// SAFETY MODEL — copied deliberately from scripts/sync_contacts.py
// ----------------------------------------------------------------
// Reads are open. WRITES THAT REACH A CUSTOMER ARE DOUBLE-GATED and refuse to
// run unless BOTH are present:
//
//     1. the caller passes { allowSend: true }, AND
//     2. the environment sets CAPTIVATED_ALLOW_SENDS=1
//
// Missing either one and sendBulk()/sendMessage() throw before any network
// call. This is the same shape sync_contacts.py uses for Fieldster writes, and
// for the same reason: a bulk endpoint that texts real customers should not be
// one typo away from firing. There is no "dry run that accidentally wasn't".
//
// A third gate is enforced by the caller, not here: every outbound body must
// pass scripts/lib/compliance-rules.mjs before it is handed to sendBulk(). See
// scripts/test-captivated-templates.mjs. The Sep 9 sweep found the $1M and
// guarantee language reaching Google through BrightLocal and the OneUp queue
// precisely because no guard read those surfaces. Texting is the third such
// surface and it is the most direct one — it lands in a customer's hand.
//
// CREDENTIAL
// ----------
// Read from the environment, never hard-coded — this is a public repository.
// The key was added to Vercel as `captivated_api`; CAPTIVATED_API_KEY and two
// other spellings are accepted as fallbacks so a casing mismatch between Vercel,
// .env and GitHub Actions cannot produce a 401 that looks like a revoked token.

import { cleanEnv, envWasDirty } from "./env-url.mjs";

const BASE = (cleanEnv("CAPTIVATED_BASE_URL") || "https://api.captivated.works").replace(/\/+$/, "");
const PREFIX = "/api/command/v1";

// Order matters only for predictability; any one of these is accepted.
const KEY_NAMES = ["CAPTIVATED_API_KEY", "captivated_api", "CAPTIVATED_API", "CAPTIVATED_API_TOKEN"];

export function apiKey() {
  for (const name of KEY_NAMES) {
    const v = cleanEnv(name);
    if (!v) continue;
    if (envWasDirty(name)) {
      // A BOM'd or space-padded key reaches the API verbatim and comes back as
      // 401 — an auth error that looks like an expired token but is a paste
      // artifact. Say so once, loudly, so it gets fixed at the source.
      console.warn(`[captivated] ${name} had stray/invisible characters; trimmed. Fix it in Vercel.`);
    }
    return { key: v, source: name };
  }
  return { key: null, source: null };
}

export function isConfigured() {
  return Boolean(apiKey().key);
}

export function sendsEnabled() {
  return cleanEnv("CAPTIVATED_ALLOW_SENDS") === "1";
}

class CaptivatedError extends Error {
  constructor(message, { status = null, body = null, path = null } = {}) {
    super(message);
    this.name = "CaptivatedError";
    this.status = status;
    this.body = body;
    this.path = path;
  }
}
export { CaptivatedError };

/**
 * Low-level request. Returns parsed JSON, or throws CaptivatedError.
 * Never logs the key. Never logs a full response body on success.
 */
async function request(method, path, { body = null, timeoutMs = 20000 } = {}) {
  const { key, source } = apiKey();
  if (!key) {
    throw new CaptivatedError(
      `no API key in the environment — set one of: ${KEY_NAMES.join(", ")}`,
      { path },
    );
  }

  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);

  let res;
  try {
    res = await fetch(url, {
      method,
      signal: ac.signal,
      headers: {
        // Docs, "Using & Managing Access Tokens": Authorization: Bearer <token>
        authorization: `Bearer ${key}`,
        accept: "application/json",
        ...(body ? { "content-type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch (e) {
    clearTimeout(timer);
    const why = e.name === "AbortError" ? `timed out after ${timeoutMs}ms` : e.message;
    throw new CaptivatedError(`${method} ${path} failed: ${why}`, { path });
  }
  clearTimeout(timer);

  const text = await res.text().catch(() => "");
  let parsed = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = null;
    }
  }

  if (!res.ok) {
    // 401 is by far the most likely first failure, and the most likely cause is
    // the key rather than the endpoint. Say which env var was used so the fix
    // is obvious without printing the value.
    const hint =
      res.status === 401
        ? ` — key came from ${source}; confirm it is the token Captivated showed you once, and that it has not been revoked`
        : "";
    throw new CaptivatedError(`${method} ${path} → HTTP ${res.status}${hint}`, {
      status: res.status,
      body: parsed ?? text.slice(0, 400),
      path,
    });
  }
  return parsed;
}

// ── Reads. Open. ────────────────────────────────────────────────────────────

export const listTemplates = () => request("GET", `${PREFIX}/templates`);
export const getTemplate = (id) => request("GET", `${PREFIX}/templates/${encodeURIComponent(id)}`);
export const listTags = () => request("GET", `${PREFIX}/tags`);
export const listContacts = () => request("GET", `${PREFIX}/contacts`);
export const getContact = (id) => request("GET", `${PREFIX}/contacts/${encodeURIComponent(id)}`);
export const listConversations = () => request("GET", `${PREFIX}/conversations`);
export const getConversationMessages = (id) =>
  request("GET", `${PREFIX}/conversations/${encodeURIComponent(id)}/messages`);
export const getMessage = (id) => request("GET", `${PREFIX}/messages/${encodeURIComponent(id)}`);
export const getJob = (jobId) => request("GET", `${PREFIX}/jobs/${encodeURIComponent(jobId)}`);

// ── Template management. Writes, but they touch templates, not customers. ───
// Still worth a deliberate flag so a script cannot rewrite the library by
// accident while merely reading it.

export function createTemplate(payload, { allowWrite = false } = {}) {
  if (!allowWrite) throw new CaptivatedError("createTemplate requires { allowWrite: true }");
  return request("POST", `${PREFIX}/templates`, { body: payload });
}
export function updateTemplate(id, payload, { allowWrite = false } = {}) {
  if (!allowWrite) throw new CaptivatedError("updateTemplate requires { allowWrite: true }");
  return request("PATCH", `${PREFIX}/templates/${encodeURIComponent(id)}`, { body: payload });
}

// ── Sends. DOUBLE-GATED. These reach real phones. ───────────────────────────

function assertSendAllowed(fnName, allowSend) {
  if (!allowSend) {
    throw new CaptivatedError(
      `${fnName} refused: caller did not pass { allowSend: true }. This function texts real customers.`,
    );
  }
  if (!sendsEnabled()) {
    throw new CaptivatedError(
      `${fnName} refused: CAPTIVATED_ALLOW_SENDS is not "1". Both the flag and the env var are required.`,
    );
  }
}

/**
 * Send one message. Double-gated.
 * @param {object} payload  shape per POST /api/command/v1/messages
 */
export function sendMessage(payload, { allowSend = false } = {}) {
  assertSendAllowed("sendMessage", allowSend);
  return request("POST", `${PREFIX}/messages`, { body: payload });
}

/**
 * Bulk send. Double-gated. Returns the job envelope; poll with getJob().
 * @param {object} payload  shape per POST /api/command/v1/messages/bulk_create
 */
export function sendBulk(payload, { allowSend = false } = {}) {
  assertSendAllowed("sendBulk", allowSend);
  return request("POST", `${PREFIX}/messages/bulk_create`, { body: payload });
}

/**
 * Poll a bulk job to completion. Read-only, so it is not gated — you may need
 * it to inspect a job somebody else started.
 */
export async function waitForJob(jobId, { timeoutMs = 120000, intervalMs = 3000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  let last = null;
  while (Date.now() < deadline) {
    last = await getJob(jobId);
    const status = String(last?.status ?? last?.state ?? "").toLowerCase();
    if (["completed", "complete", "finished", "succeeded", "failed", "error"].includes(status)) {
      return last;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return { ...(last || {}), timedOut: true };
}

// ── Contacts. bulk_upsert edits customer records, so it is gated too. ───────

export const bulkGetContacts = (payload) => request("POST", `${PREFIX}/contacts/bulk_get`, { body: payload });

export function bulkUpsertContacts(payload, { allowWrite = false } = {}) {
  if (!allowWrite) throw new CaptivatedError("bulkUpsertContacts requires { allowWrite: true } — it edits customer records");
  return request("POST", `${PREFIX}/contacts/bulk_upsert`, { body: payload });
}

export default {
  apiKey,
  isConfigured,
  sendsEnabled,
  listTemplates,
  getTemplate,
  listTags,
  listContacts,
  getContact,
  listConversations,
  getConversationMessages,
  getMessage,
  getJob,
  waitForJob,
  createTemplate,
  updateTemplate,
  sendMessage,
  sendBulk,
  bulkGetContacts,
  bulkUpsertContacts,
  CaptivatedError,
};
