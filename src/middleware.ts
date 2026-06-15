import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  isPreviewSecretRequired,
  PREVIEW_AUTH_COOKIE,
} from "@/lib/sanity/preview";

export function middleware(request: NextRequest) {
  const isDraftBypass = request.cookies.has("__prerender_bypass");

  if (isPreviewSecretRequired() && isDraftBypass) {
    const hasPreviewAuth = request.cookies.has(PREVIEW_AUTH_COOKIE);

    if (!hasPreviewAuth) {
      const url = request.nextUrl.clone();
      url.pathname = "/api/exit-preview";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
