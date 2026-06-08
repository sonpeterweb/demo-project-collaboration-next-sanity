import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import { getClient, isPreviewMode } from "@/lib/sanity/client";
import {
  CONTENT_REVALIDATE_SECONDS,
  MARKETING_REVALIDATE_SECONDS,
} from "@/lib/sanity/revalidate";

type SanityFetchOptions = {
  cacheKey?: string[];
  tags?: string[];
  revalidate?: number;
  preview?: boolean;
};

/**
 * Fetch Sanity content with ISR caching for published routes.
 * Bypasses cache automatically when preview mode is active.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: SanityFetchOptions = {},
): Promise<T> {
  const preview = options.preview ?? (await isPreviewMode());

  if (preview) {
    const client = await getClient(true);
    return client.fetch<T>(query, params);
  }

  const cacheKey = options.cacheKey ?? [
    query,
    ...Object.entries(params).flatMap(([key, value]) => [key, String(value)]),
  ];

  const revalidate =
    options.revalidate ??
    (options.tags?.some((tag) => tag.includes("blog") || tag.includes("doc"))
      ? CONTENT_REVALIDATE_SECONDS
      : MARKETING_REVALIDATE_SECONDS);

  return cachedSanityFetch<T>(cacheKey, query, params, {
    revalidate,
    tags: options.tags ?? cacheKey,
  });
}
