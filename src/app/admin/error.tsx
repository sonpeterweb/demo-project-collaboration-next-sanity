"use client";

import { RouteError } from "@/components/common/route-error";

export default function AdminError({
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
      title="Admin panel error"
      description="Something went wrong in the admin panel. Please try again."
      homeHref="/admin"
    />
  );
}
