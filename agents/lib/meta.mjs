// agents/lib/meta.mjs
// Thin Meta Graph API client for posting to a Facebook Page and Instagram Business
// account. Fully guarded: if the tokens aren't set it returns { skipped:true } so
// the poster can no-op cleanly until you add the secrets.
//
// Required env:
//   META_PAGE_ID     — the Facebook Page's numeric id
//   META_PAGE_TOKEN  — a long-lived Page access token (app scopes:
//                      pages_manage_posts, pages_read_engagement,
//                      instagram_content_publish, instagram_basic)
//   IG_BUSINESS_ID   — (optional) Instagram Business account id, for IG posts

const GRAPH = "https://graph.facebook.com/v21.0";

function creds() {
  return {
    pageId: process.env.META_PAGE_ID,
    token: process.env.META_PAGE_TOKEN,
    igId: process.env.IG_BUSINESS_ID,
  };
}

async function graph(path, params) {
  const url = `${GRAPH}/${path}`;
  const body = new URLSearchParams(params);
  const res = await fetch(url, { method: "POST", body });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || `HTTP ${res.status}`;
    throw new Error(`Meta Graph ${path}: ${msg}`);
  }
  return json;
}

// Post to the Facebook Page. With imageUrl → photo post; otherwise text (+ optional link).
export async function postToFacebook({ message, link, imageUrl }) {
  const { pageId, token } = creds();
  if (!pageId || !token) return { ok: false, skipped: true, reason: "META_PAGE_ID/META_PAGE_TOKEN not set" };
  try {
    if (imageUrl) {
      const r = await graph(`${pageId}/photos`, { url: imageUrl, caption: message ?? "", access_token: token });
      return { ok: true, id: r.post_id || r.id, permalink: r.post_id ? `https://facebook.com/${r.post_id}` : null };
    }
    const r = await graph(`${pageId}/feed`, { message: message ?? "", ...(link ? { link } : {}), access_token: token });
    return { ok: true, id: r.id, permalink: r.id ? `https://facebook.com/${r.id}` : null };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// Post to Instagram Business. IG requires an image — two-step: create container, then publish.
export async function postToInstagram({ caption, imageUrl }) {
  const { igId, token } = creds();
  if (!igId || !token) return { ok: false, skipped: true, reason: "IG_BUSINESS_ID/META_PAGE_TOKEN not set" };
  if (!imageUrl) return { ok: false, error: "Instagram post requires an imageUrl" };
  try {
    const container = await graph(`${igId}/media`, { image_url: imageUrl, caption: caption ?? "", access_token: token });
    const published = await graph(`${igId}/media_publish`, { creation_id: container.id, access_token: token });
    return { ok: true, id: published.id, permalink: null };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
