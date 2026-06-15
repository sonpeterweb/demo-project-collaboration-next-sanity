import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/env.mjs";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";

const TYPE_TO_TAGS: Record<string, string[]> = {
  siteSettings: [SANITY_CACHE_TAGS.siteSettings],
  pageHome: [SANITY_CACHE_TAGS.homePage],
  feature: [SANITY_CACHE_TAGS.features],
  integration: [SANITY_CACHE_TAGS.integrations],
  testimonial: [SANITY_CACHE_TAGS.testimonials],
  pricingTier: [SANITY_CACHE_TAGS.pricing],
  caseStudy: [SANITY_CACHE_TAGS.caseStudies],
  blogPost: [SANITY_CACHE_TAGS.blog, SANITY_CACHE_TAGS.blogPost],
  docPage: [SANITY_CACHE_TAGS.docs, SANITY_CACHE_TAGS.docPage],
};

/**
 * Sanity webhook endpoint for on-demand ISR revalidation.
 * Configure in Sanity → API → Webhooks with:
 *   URL: https://your-site.com/api/revalidate?secret=YOUR_SECRET
 *   Trigger: Create / Update / Delete on relevant document types
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (
    !env.SANITY_REVALIDATE_SECRET ||
    secret !== env.SANITY_REVALIDATE_SECRET
  ) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = (await request.json()) as { _type?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const docType = body._type;
  if (!docType || !TYPE_TO_TAGS[docType]) {
    return NextResponse.json(
      { message: `Unsupported document type: ${docType ?? "unknown"}` },
      { status: 400 },
    );
  }

  const tags = [...TYPE_TO_TAGS[docType], SANITY_CACHE_TAGS.sitemap];
  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    now: Date.now(),
  });
}
