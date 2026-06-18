import { EyeIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { buildAdminPreviewUrl } from "@/lib/sanity/preview";
import { cn } from "@/lib/utils";

type PreviewOpenButtonProps = {
  slug: string;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
};

export function PreviewOpenButton({
  slug,
  label = "Preview",
  className,
  variant = "outline",
  size = "sm",
  disabled = false,
}: PreviewOpenButtonProps) {
  if (disabled || !slug.trim()) {
    return (
      <Button
        type="button"
        variant={variant}
        size={size}
        className={cn(className)}
        disabled
        aria-label={label}
      >
        <EyeIcon className="size-4" aria-hidden="true" />
        {size !== "icon" && label}
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link
        href={buildAdminPreviewUrl(slug)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <EyeIcon className="size-4" aria-hidden="true" />
        {size !== "icon" && label}
      </Link>
    </Button>
  );
}
