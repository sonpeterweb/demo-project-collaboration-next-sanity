"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type RouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  description?: string;
  homeHref?: string;
};

export function RouteError({
  error,
  reset,
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this page.",
  homeHref = "/",
}: RouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="mb-2 text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground mb-4">
          {process.env.NODE_ENV !== "production" ? error.message : description}
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href={homeHref}>Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
