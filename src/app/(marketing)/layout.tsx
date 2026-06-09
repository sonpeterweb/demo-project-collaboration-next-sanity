import type { ReactNode } from "react";

/** Must be a literal — see MARKETING_REVALIDATE_SECONDS in @/lib/sanity/revalidate */
export const revalidate = 3600;

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return children;
}
