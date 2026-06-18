/** Cookie set by /api/preview after a valid preview secret is supplied. */
export const PREVIEW_AUTH_COOKIE = "sanity-preview-auth";

/**
 * Returns true when preview mode may be enabled.
 * When SANITY_PREVIEW_SECRET is unset (local/CI), preview is open.
 */
export function isValidPreviewSecret(secret: string | null): boolean {
  const expected = process.env.SANITY_PREVIEW_SECRET;
  if (!expected) return true;
  return secret === expected;
}

export function isPreviewSecretRequired(): boolean {
  return Boolean(process.env.SANITY_PREVIEW_SECRET);
}

/** Normalize a preview slug into an app path (e.g. `my-post` → `/blog/my-post`). */
export function normalizePreviewPath(slug: string | null): string {
  if (!slug?.trim()) return "/";

  const path = slug.trim().replace(/^\/+/, "");
  if (!path) return "/";
  if (!path.includes("/")) {
    return `/blog/${path}`;
  }

  return `/${path}`;
}

/** Build an authenticated admin preview URL (no secret in the link). */
export function buildAdminPreviewUrl(slug: string): string {
  return `/api/admin/preview?slug=${encodeURIComponent(slug)}`;
}

/** Build a preview URL for a blog post slug. */
export function buildBlogPreviewUrl(postSlug: string): string {
  const slug = postSlug.includes("/") ? postSlug : `blog/${postSlug}`;
  return buildAdminPreviewUrl(slug);
}
