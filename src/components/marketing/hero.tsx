import { Section } from "@/components/common/section";
import { HeroClient } from "@/components/marketing/hero.client";
import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import { homePageHeroQuery } from "@/lib/sanity/queries";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";
import { type HomePage, homePageSchema } from "@/lib/sanity/zod";

async function getHome(): Promise<HomePage | null> {
  try {
    const data = await cachedSanityFetch<unknown>(
      ["home-page-hero"],
      homePageHeroQuery,
      {},
      { tags: [SANITY_CACHE_TAGS.homePage] },
    );
    const parsed = homePageSchema.safeParse(data);
    if (!parsed.success) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

export default async function Hero() {
  const home = await getHome();
  const title = home?.heroTitle ?? "Work Together, Flow Better.";
  const subtitle =
    home?.heroSubtitle ??
    "Flowspace helps teams collaborate, manage projects, and communicate effortlessly — all in one place.";
  const cta = home?.cta ?? "Get Started";

  return (
    <Section
      className="overflow-hidden py-16 md:py-20 lg:py-24"
      containerClassName="max-w-6xl"
    >
      <HeroClient title={title} subtitle={subtitle} cta={cta} />
    </Section>
  );
}
