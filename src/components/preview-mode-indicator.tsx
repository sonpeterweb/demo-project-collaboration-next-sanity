"use client";

import { EyeIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type PreviewModeIndicatorProps = {
  isPreview: boolean;
};

export function PreviewModeIndicator({ isPreview }: PreviewModeIndicatorProps) {
  if (!isPreview) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 border-b border-yellow-600 bg-yellow-500 px-4 py-2 text-center text-sm font-medium text-yellow-950 dark:border-yellow-700 dark:bg-yellow-600 dark:text-yellow-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EyeIcon className="size-4" />
          <span>
            Draft mode is on — unpublished content is visible across the site
          </span>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-7 text-yellow-950 hover:bg-yellow-400 dark:text-yellow-50 dark:hover:bg-yellow-700"
        >
          <a href="/api/exit-preview">
            <XIcon className="mr-1 size-3" />
            Exit Preview
          </a>
        </Button>
      </div>
    </div>
  );
}
