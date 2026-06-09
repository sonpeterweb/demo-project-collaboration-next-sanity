import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Section } from "@/components/common/section";
import { LegalPage } from "@/components/marketing/legal-page";
import { getPrivacySections } from "@/lib/legal/privacy-content";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Flowspace collects, uses, and protects your information.",
});

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const siteTitle = settings?.siteTitle ?? "Flowspace";
  const lastUpdated = "June 8, 2025";
  const effectiveDate = "June 8, 2025";

  return (
    <>
      <Header />
      <main id="main-content">
        <Section
          title="Privacy Policy"
          description="How we handle your data when you use Flowspace."
          containerClassName="max-w-6xl"
        >
          <LegalPage
            title="Privacy Policy"
            lastUpdated={lastUpdated}
            effectiveDate={effectiveDate}
            intro={
              <>
                Your privacy matters to us. This policy describes the
                information {siteTitle} collects when you visit our website or
                use our collaboration platform, and how we use, store, and
                protect it.
              </>
            }
            sections={getPrivacySections(siteTitle)}
            contactEmail="privacy@flowspace.dev"
            contactLabel="Email privacy team"
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
