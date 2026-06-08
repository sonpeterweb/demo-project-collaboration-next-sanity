import type { ReactNode } from "react";

import { CONTENT_REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

export const revalidate = CONTENT_REVALIDATE_SECONDS;

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
