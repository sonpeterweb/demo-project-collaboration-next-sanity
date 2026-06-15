import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import {
  isValidPreviewSecret,
  PREVIEW_AUTH_COOKIE,
} from "@/lib/sanity/preview";

/**
 * Enable Next.js draft mode for viewing unpublished Sanity content.
 *
 * Usage: /api/preview?secret=YOUR_SECRET&slug=blog/my-post
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
  const secret = searchParams.get("secret");

  if (!isValidPreviewSecret(secret)) {
    return NextResponse.json(
      { message: "Invalid preview secret" },
      { status: 401 },
    );
  }

  const draft = await draftMode();
  draft.enable();

  const redirectUrl = normalizePreviewPath(slug);
  const response = NextResponse.redirect(new URL(redirectUrl, request.url));

  response.cookies.set(PREVIEW_AUTH_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}
