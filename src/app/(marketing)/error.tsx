"use client";

import { RouteError } from "@/components/common/route-error";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RouteError
      error={error}
      reset={reset}
      description="We couldn't load this page. Please try again."
    />
  );
}
