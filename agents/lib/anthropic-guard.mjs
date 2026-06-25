const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

/** @returns {'KEY_CAPPED'|'AUTH'|'RATE_LIMITED'|'OVERLOADED'|'OTHER'} */
export function classifyAnthropicFailure(status, body) {
  const type = body?.error?.type ?? "";
  const msg = (body?.error?.message ?? "").toLowerCase();

  // Spend/usage cap or empty balance — fleet-wide, human must act.
  if (status === 400 && type === "invalid_request_error" &&
      /usage limit|regain access|spend limit|credit balance|billing/.test(msg)) {
    return "KEY_CAPPED";
  }
  // Rotated / revoked / wrong key — fleet-wide, human must act.
  if (status === 401 || status === 403 ||
      type === "authentication_error" || type === "permission_error") {
    return "AUTH";
  }
  if (status === 429 || type === "rate_limit_error") return "RATE_LIMITED";
  if (status === 529 || type === "overloaded_error") return "OVERLOADED";
  return "OTHER";
}

export class AnthropicError extends Error {
  constructor(kind, status, body) {
    super(body?.error?.message || `Anthropic ${status}`);
    this.name = "AnthropicError";
    this.kind = kind;
    this.status = status;
    this.body = body;
    this.fleetWide = kind === "KEY_CAPPED" || kind === "AUTH";
  }
}

/** Every agent should call Claude through this. On non-2xx it throws an
 *  AnthropicError tagged with .kind so callers can log error_type. */
export async function callClaude({
  model, system, messages, max_tokens = 1024,
  apiKey = process.env.ANTHROPIC_API_KEY,
}) {
  const res = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({ model, system, messages, max_tokens }),
  });
  if (!res.ok) {
    let body = null;
    try { body = await res.json(); } catch {}
    throw new AnthropicError(classifyAnthropicFailure(res.status, body), res.status, body);
  }
  return res.json();
}
