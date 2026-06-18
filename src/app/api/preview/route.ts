import { type NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { isValidPreviewSecret } from "@/lib/sanity/preview";
import { createPreviewRedirect } from "@/lib/sanity/preview-server";

/**
 * Enable Next.js draft mode for viewing unpublished Sanity content.
 *
 * Usage: /api/preview?secret=YOUR_SECRET&slug=blog/my-post
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!isValidPreviewSecret(secret)) {
    return NextResponse.json(
      { message: "Invalid preview secret" },
      { status: 401 },
    );
  }

  const slug = request.nextUrl.searchParams.get("slug");
  return createPreviewRedirect(request, slug);
}
