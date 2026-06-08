import type { MetadataRoute } from "next";

import { env } from "@/env.mjs";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.APP_URL.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
