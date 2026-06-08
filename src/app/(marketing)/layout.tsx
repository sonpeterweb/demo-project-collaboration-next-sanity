import type { ReactNode } from "react";

import { MARKETING_REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";

export const revalidate = MARKETING_REVALIDATE_SECONDS;

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return children;
}
