import type { Metadata } from "next";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Section } from "@/components/common/section";
import { FeatureCard } from "@/components/marketing/feature-card";
import Hero from "@/components/marketing/hero";
import Integrations from "@/components/marketing/integrations";
import { Reveal } from "@/components/marketing/reveal.client";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import {
  featuredFeaturesQuery,
  featuredTestimonialsQuery,
} from "@/lib/sanity/queries";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";
import {
  type Feature,
  featureSchema,
  type Testimonial,
  testimonialSchema,
} from "@/lib/sanity/zod";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Home",
  description:
    "Flowspace helps teams collaborate, manage projects, and communicate effortlessly — all in one place.",
});

export default async function HomePage() {
  const [features, testimonials] = await Promise.all([
    cachedSanityFetch<unknown>(
      ["featured-features"],
      featuredFeaturesQuery,
      {},
      { tags: [SANITY_CACHE_TAGS.features] },
    ),
    cachedSanityFetch<unknown>(
      ["featured-testimonials"],
      featuredTestimonialsQuery,
      {},
      { tags: [SANITY_CACHE_TAGS.testimonials] },
    ),
  ]);

  const safeFeatures: Feature[] = (Array.isArray(features) ? features : [])
    .map((f) => featureSchema.safeParse(f))
    .filter((r): r is { success: true; data: Feature } => r.success)
    .map((r) => r.data);

  const safeTestimonials: Testimonial[] = (
    Array.isArray(testimonials) ? testimonials : []
  )
    .map((t) => testimonialSchema.safeParse(t))
    .filter((r): r is { success: true; data: Testimonial } => r.success)
    .map((r) => r.data);

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />

        <Section
          title="Features"
          description="A few highlights from the platform."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safeFeatures.map((f, i) => (
              <Reveal key={f._id} delay={i * 0.05}>
                <FeatureCard
                  title={f.title}
                  description={f.description}
                  icon={f.icon}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section title="What customers say" description="Trusted by teams.">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safeTestimonials.map((t, i) => (
              <Reveal key={t._id} delay={i * 0.05}>
                <TestimonialCard
                  name={t.name}
                  company={t.company}
                  quote={t.quote}
                  avatar={t.avatar}
                  rating={t.rating ?? null}
                />
              </Reveal>
            ))}
          </div>
        </Section>

        <Integrations
          title="Built with"
          items={[
            { name: "Sanity" },
            { name: "Next.js" },
            { name: "Tailwind CSS" },
            { name: "Vercel" },
            { name: "GitHub" },
            { name: "Radix UI" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
