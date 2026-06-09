import type { ReactNode } from "react";

/** Must be a literal — see CONTENT_REVALIDATE_SECONDS in @/lib/sanity/revalidate */
export const revalidate = 1800;

export default function DocsLayout({ children }: { children: ReactNode }) {
  return children;
}
