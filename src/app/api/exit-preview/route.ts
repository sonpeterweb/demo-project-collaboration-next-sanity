import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/** Disable draft mode and return to the published site. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectPath = searchParams.get("redirect") ?? "/";

  const draft = await draftMode();
  draft.disable();

  const safePath = redirectPath.startsWith("/") ? redirectPath : "/";
  return NextResponse.redirect(new URL(safePath, request.url));
}
