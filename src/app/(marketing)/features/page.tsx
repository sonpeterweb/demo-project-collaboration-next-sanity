import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Section } from "@/components/common/section";
import { FeatureCard } from "@/components/marketing/feature-card";
import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import { allFeaturesQuery } from "@/lib/sanity/queries";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";
import { type Feature, featureSchema } from "@/lib/sanity/zod";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Features",
  description: "Explore what you can do with our platform.",
});

export default async function FeaturesPage() {
  const features = await cachedSanityFetch<unknown>(
    ["all-features"],
    allFeaturesQuery,
    {},
    { tags: [SANITY_CACHE_TAGS.features] },
  );
  const safeFeatures: Feature[] = (Array.isArray(features) ? features : [])
    .map((f) => featureSchema.safeParse(f))
    .filter((r): r is { success: true; data: Feature } => r.success)
    .map((r) => r.data);

  return (
    <>
      <Header />
      <main id="main-content">
        <Section
          title="Features"
          description="Explore what you can do with our platform."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safeFeatures.map((f) => (
              <FeatureCard
                key={f._id}
                title={f.title}
                description={f.description}
                icon={f.icon}
              />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
