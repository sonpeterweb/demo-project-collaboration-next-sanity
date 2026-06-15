import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { PREVIEW_AUTH_COOKIE } from "@/lib/sanity/preview";

/** Disable draft mode and return to the published site. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectPath = searchParams.get("redirect") ?? "/";

  const draft = await draftMode();
  draft.disable();

  const safePath = redirectPath.startsWith("/") ? redirectPath : "/";
  const response = NextResponse.redirect(new URL(safePath, request.url));
  response.cookies.delete(PREVIEW_AUTH_COOKIE);

  return response;
}
