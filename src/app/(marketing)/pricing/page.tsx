import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Section } from "@/components/common/section";
import { PricingToggle } from "@/components/marketing/pricing-toggle.client";
import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import { allPricingTiersQuery } from "@/lib/sanity/queries";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";
import { type PricingTier, pricingTierSchema } from "@/lib/sanity/zod";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description: "Flexible plans for teams of all sizes.",
});

export default async function PricingPage() {
  const tiers = await cachedSanityFetch<unknown>(
    ["all-pricing-tiers"],
    allPricingTiersQuery,
    {},
    { tags: [SANITY_CACHE_TAGS.pricing] },
  );
  const safeTiers: PricingTier[] = (Array.isArray(tiers) ? tiers : [])
    .map((t) => pricingTierSchema.safeParse(t))
    .filter((r): r is { success: true; data: PricingTier } => r.success)
    .map((r) => r.data);

  return (
    <>
      <Header />
      <main id="main-content">
        <Section
          title="Pricing"
          description="Flexible plans to get your team moving."
        >
          <PricingToggle tiers={safeTiers} />
        </Section>
      </main>
      <Footer />
    </>
  );
}
