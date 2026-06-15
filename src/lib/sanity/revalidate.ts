/** ISR revalidation interval for marketing pages (1 hour). */
export const MARKETING_REVALIDATE_SECONDS = 3600;

/** ISR revalidation interval for blog and docs content (30 minutes). */
export const CONTENT_REVALIDATE_SECONDS = 1800;

/** ISR revalidation interval for sitemap generation (1 hour). */
export const SITEMAP_REVALIDATE_SECONDS = 3600;

export const SANITY_CACHE_TAGS = {
  siteSettings: "sanity:site-settings",
  homePage: "sanity:home-page",
  features: "sanity:features",
  testimonials: "sanity:testimonials",
  integrations: "sanity:integrations",
  pricing: "sanity:pricing",
  caseStudies: "sanity:case-studies",
  blog: "sanity:blog",
  blogPost: "sanity:blog-post",
  docs: "sanity:docs",
  docPage: "sanity:doc-page",
  sitemap: "sanity:sitemap",
} as const;
