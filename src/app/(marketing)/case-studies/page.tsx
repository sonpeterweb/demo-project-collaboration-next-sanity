import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Section } from "@/components/common/section";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import { allCaseStudiesQuery } from "@/lib/sanity/queries";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";
import { type CaseStudy, caseStudySchema } from "@/lib/sanity/zod";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies",
  description:
    "Success stories from teams using Flowspace to collaborate better.",
});

export default async function CaseStudiesPage() {
  const raw = await cachedSanityFetch<unknown>(
    ["all-case-studies"],
    allCaseStudiesQuery,
    {},
    { tags: [SANITY_CACHE_TAGS.caseStudies] },
  );
  const caseStudies: CaseStudy[] = (Array.isArray(raw) ? raw : [])
    .map((item) => caseStudySchema.safeParse(item))
    .filter(
      (result): result is { success: true; data: CaseStudy } => result.success,
    )
    .map((result) => result.data);

  return (
    <>
      <Header />
      <main id="main-content">
        <Section
          title="Case Studies"
          description="See how Flowspace helps high-performing teams deliver results."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study._id} caseStudy={study} />
            ))}
          </div>
          {caseStudies.length === 0 && (
            <p className="text-muted-foreground text-center">
              No case studies published yet.
            </p>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
