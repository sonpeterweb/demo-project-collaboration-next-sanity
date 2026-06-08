import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import { siteSettingsQuery } from "@/lib/sanity/queries";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";
import { type SiteSettings, siteSettingsSchema } from "@/lib/sanity/zod";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const data = await cachedSanityFetch<unknown>(
      ["site-settings"],
      siteSettingsQuery,
      {},
      { tags: [SANITY_CACHE_TAGS.siteSettings] },
    );
    const parsed = siteSettingsSchema.safeParse(data);
    if (!parsed.success) return null;
    return parsed.data;
  } catch {
    return null;
  }
}
