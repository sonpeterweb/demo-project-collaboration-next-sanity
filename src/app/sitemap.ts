import type { MetadataRoute } from "next";

import { env } from "@/env.mjs";
import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import { sitemapEntriesQuery } from "@/lib/sanity/queries";
import {
  SANITY_CACHE_TAGS,
  SITEMAP_REVALIDATE_SECONDS,
} from "@/lib/sanity/revalidate";

type SitemapEntry = {
  slug: string;
  updatedAt?: string;
};

type SitemapData = {
  blogPosts: SitemapEntry[];
  docPages: SitemapEntry[];
};

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/features", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/case-studies", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/docs", changeFrequency: "weekly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.APP_URL.replace(/\/$/, "");

  let dynamicEntries: SitemapData = { blogPosts: [], docPages: [] };

  try {
    dynamicEntries = await cachedSanityFetch<SitemapData>(
      ["sitemap-entries"],
      sitemapEntriesQuery,
      {},
      {
        revalidate: SITEMAP_REVALIDATE_SECONDS,
        tags: [SANITY_CACHE_TAGS.sitemap],
      },
    );
  } catch (error) {
    console.error("Failed to fetch sitemap entries from Sanity:", error);
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = (
    dynamicEntries.blogPosts ?? []
  ).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const docEntries: MetadataRoute.Sitemap = (dynamicEntries.docPages ?? []).map(
    (page) => ({
      url: `${baseUrl}/docs/${page.slug}`,
      lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  return [...staticEntries, ...blogEntries, ...docEntries];
}
