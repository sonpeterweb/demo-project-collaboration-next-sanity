"use client";

import { RouteError } from "@/components/common/route-error";

export default function DocsError({
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
      title="Unable to load documentation"
      description="Something went wrong while loading the docs. Please try again."
      homeHref="/docs"
    />
  );
}
