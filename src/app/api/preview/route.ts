import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Enable Next.js draft mode for viewing unpublished Sanity content.
 *
 * Usage: /api/preview?slug=blog/my-post
 */
function normalizePreviewPath(slug: string | null): string {
  if (!slug?.trim()) return "/";

  const path = slug.trim().replace(/^\/+/, "");
  // Common mistake: passing only the post slug instead of blog/my-post
  if (!path.includes("/")) {
    return `/blog/${path}`;
  }

  return `/${path}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const draft = await draftMode();
  draft.enable();

  const redirectUrl = normalizePreviewPath(slug);
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
