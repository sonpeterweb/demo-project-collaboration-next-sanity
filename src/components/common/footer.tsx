import Link from "next/link";

import { getSiteSettings } from "@/lib/sanity/site-settings";
import { cn } from "@/lib/utils";

export type FooterProps = {
  className?: string;
};

export default async function Footer({ className }: FooterProps) {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t py-6", className)}>
      <div className="text-muted-foreground container flex flex-col items-center justify-between gap-2 text-center text-sm md:flex-row md:text-left">
        <p>
          © {year} {settings?.siteTitle ?? "next-starter"}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
