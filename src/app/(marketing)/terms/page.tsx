import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Section } from "@/components/common/section";
import { LegalPage } from "@/components/marketing/legal-page";
import { getTermsSections } from "@/lib/legal/terms-content";
import { getSiteSettings } from "@/lib/sanity/site-settings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for using the Flowspace platform.",
});

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const siteTitle = settings?.siteTitle ?? "Flowspace";
  const lastUpdated = "June 8, 2025";
  const effectiveDate = "June 8, 2025";

  return (
    <>
      <Header />
      <main id="main-content">
        <Section
          title="Terms of Service"
          description="The rules and guidelines for using Flowspace."
          containerClassName="max-w-6xl"
        >
          <LegalPage
            title="Terms of Service"
            lastUpdated={lastUpdated}
            effectiveDate={effectiveDate}
            intro={
              <>
                Please read these Terms carefully before using {siteTitle}. They
                explain your rights and responsibilities, our billing practices,
                acceptable use rules, and how disputes are handled.
              </>
            }
            sections={getTermsSections(siteTitle)}
            contactEmail="legal@flowspace.dev"
            contactLabel="Email legal team"
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
