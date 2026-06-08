import { unstable_cache } from "next/cache";

import { client } from "@/lib/sanity/client";
import { MARKETING_REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

type CachedFetchOptions = {
  revalidate?: number;
  tags?: string[];
};

/**
 * Fetch published Sanity content with Next.js ISR caching.
 * Use for marketing and other public, non-preview routes.
 */
export async function cachedSanityFetch<T>(
  cacheKey: string[],
  query: string,
  params: Record<string, unknown> = {},
  options: CachedFetchOptions = {},
): Promise<T> {
  const revalidate = options.revalidate ?? MARKETING_REVALIDATE_SECONDS;
  const tags = options.tags ?? cacheKey;

  const fetcher = unstable_cache(
    async () => client.fetch<T>(query, params),
    cacheKey,
    { revalidate, tags },
  );

  return fetcher();
}
