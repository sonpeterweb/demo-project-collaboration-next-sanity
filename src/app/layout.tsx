import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SkipLink } from "@/components/common/skip-link";
import { PreviewModeIndicator } from "@/components/preview-mode-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env.mjs";
import { fonts } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "Flowspace",
    template: "%s | Flowspace",
  },
  description: "Flowspace helps teams collaborate and communicate.",
  metadataBase: new URL(env.APP_URL),
  openGraph: {
    type: "website",
    siteName: "Flowspace",
    images: [
      {
        url: "/opengraph-image.png",
        alt: "Flowspace — collaborate, manage projects, and communicate in one place.",
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

export default function RootLayout({ children }: { children: ReactNode }) {
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
          <PreviewModeIndicator />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
