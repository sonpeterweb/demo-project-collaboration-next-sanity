import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import {
  normalizePreviewPath,
  PREVIEW_AUTH_COOKIE,
} from "@/lib/sanity/preview";

/** Enable draft mode, set the preview auth cookie, and redirect to the target page. */
export async function createPreviewRedirect(
  request: Request,
  slug: string | null,
): Promise<NextResponse> {
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
