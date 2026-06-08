import Link from "next/link";

import { MobileNav } from "@/components/common/mobile-nav";
import { SanityImage } from "@/components/common/sanity-image";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { cn } from "@/lib/utils";

export type HeaderProps = {
  className?: string;
};

export default async function Header({ className }: HeaderProps) {
  const settings = await getSiteSettings();
  const navLinks =
    settings?.navLinks
      ?.filter((link) => link?.label && link?.href)
      .map((link) => ({
        label: link.label,
        href: link.href,
      })) ?? [];
  const siteTitle = settings?.siteTitle ?? "next-starter";

  return (
    <header className={cn("relative w-full border-b", className)}>
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-lg font-bold"
        >
          {settings?.logo && (
            <SanityImage
              image={settings.logo}
              alt={`${siteTitle} logo`}
              width={32}
              height={32}
              fit="max"
              className="h-8 w-auto object-contain"
            />
          )}
          <span className="truncate">{siteTitle}</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="text-foreground/80 hover:text-foreground text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher className="hidden md:inline-flex" />
          <MobileNav navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
