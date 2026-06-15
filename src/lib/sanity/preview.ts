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
