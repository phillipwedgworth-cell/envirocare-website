// agents/lib/gbp.mjs
// Google Business Profile "local post" client. Guarded: returns { skipped:true }
// until the OAuth creds + location mapping are set.
//
// Reuses the same Google OAuth app you already use for GSC/GA4:
//   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
// Plus, for local posts:
//   GBP_ACCOUNT_ID            — Business Profile account id (accounts/XXXX)
//   GBP_LOCATION_HUNTSVILLE   — location id for each office (locations/XXXX)
//   GBP_LOCATION_BIRMINGHAM
//   GBP_LOCATION_LAKE_MARTIN
//
// ⚠️ The Business Profile API is access-restricted by Google — you must request
// quota for your GCP project before local posts will succeed.

const LOCATION_ENV = {
  huntsville: "GBP_LOCATION_HUNTSVILLE",
  birmingham: "GBP_LOCATION_BIRMINGHAM",
  lake_martin: "GBP_LOCATION_LAKE_MARTIN",
};

function locationResource(location) {
  const acct = process.env.GBP_ACCOUNT_ID;
  const loc = process.env[LOCATION_ENV[location]];
  if (!acct || !loc) return null;
  // Accept either bare ids or full resource paths.
  const a = acct.startsWith("accounts/") ? acct : `accounts/${acct}`;
  const l = loc.startsWith("locations/") ? loc : `locations/${loc}`;
  return `${a}/${l}`;
}

async function accessToken() {
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;
  const refresh_token = process.env.GOOGLE_REFRESH_TOKEN;
  if (!client_id || !client_secret || !refresh_token) return null;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id, client_secret, refresh_token, grant_type: "refresh_token" }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Google token: ${json.error_description || json.error || res.status}`);
  return json.access_token;
}

// Publish a GBP local post for a location.
// callToAction.actionType: CALL | LEARN_MORE | ... ; phone/url set accordingly.
export async function postGbp({ location, summary, actionType = "CALL", actionUrl, phone, imageUrl }) {
  const parent = locationResource(location);
  if (!parent) return { ok: false, skipped: true, reason: `GBP_ACCOUNT_ID / ${LOCATION_ENV[location]} not set` };
  let token;
  try {
    token = await accessToken();
  } catch (e) {
    return { ok: false, error: e.message };
  }
  if (!token) return { ok: false, skipped: true, reason: "Google OAuth creds not set" };

  const callToAction =
    actionType === "CALL"
      ? { actionType: "CALL" }
      : { actionType, url: actionUrl || "https://www.envirocarellc.com" };
  const localPost = {
    languageCode: "en-US",
    summary,
    callToAction,
    ...(imageUrl ? { media: [{ mediaFormat: "PHOTO", sourceUrl: imageUrl }] } : {}),
  };

  try {
    const res = await fetch(`https://mybusiness.googleapis.com/v4/${parent}/localPosts`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify(localPost),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: `GBP localPosts: ${json?.error?.message || res.status}` };
    return { ok: true, id: json.name, permalink: json.searchUrl || null };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
