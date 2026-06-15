import { env } from "@/env.mjs";

export const siteConfig = {
  title: "Flowspace",
  description:
    "CMS-driven marketing platform built with Next.js + Sanity — demonstrates headless CMS, preview, caching, admin CRUD, and SEO.",
  keywords: [
    "Next.js",
    "Sanity CMS",
    "headless CMS",
    "marketing site",
    "portfolio demo",
  ],
  url: env.APP_URL,
};
