import { PricingManager } from "@/components/admin/pricing-manager";
import { writeClient } from "@/lib/sanity/client";
import { allPricingTiersQuery } from "@/lib/sanity/queries";

export const metadata = {
  title: "Pricing",
};

export default async function AdminPricingPage() {
  const tiers = await writeClient.fetch(allPricingTiersQuery);

  return <PricingManager initialTiers={tiers} />;
}
