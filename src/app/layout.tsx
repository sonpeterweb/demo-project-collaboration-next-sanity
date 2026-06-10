import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SkipLink } from "@/components/common/skip-link";
import { PreviewModeIndicator } from "@/components/preview-mode-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env.mjs";
import { fonts } from "@/lib/fonts";
import { isPreviewMode } from "@/lib/sanity/client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL(env.APP_URL),
  openGraph: {
    type: "website",
    siteName: siteConfig.title,
    images: [
      {
        url: "/opengraph-image.png",
        alt: `${siteConfig.title} — ${siteConfig.description}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isPreview = await isPreviewMode();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`bg-background text-foreground min-h-screen antialiased ${fonts.join(" ")}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipLink />
          <PreviewModeIndicator isPreview={isPreview} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
