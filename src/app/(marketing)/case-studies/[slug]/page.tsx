import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "sanity";

import { PortableTextRenderer } from "@/components/blog/portable-text-renderer";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { SanityImage } from "@/components/common/sanity-image";
import { Section } from "@/components/common/section";
import { env } from "@/env.mjs";
import { buildOgImageUrl } from "@/lib/og";
import { cachedSanityFetch } from "@/lib/sanity/cached-fetch";
import {
  allCaseStudySlugsQuery,
  caseStudyBySlugQuery,
} from "@/lib/sanity/queries";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";
import { type CaseStudy, caseStudySchema } from "@/lib/sanity/zod";
import { buildMetadata } from "@/lib/seo";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await cachedSanityFetch<Array<{ slug: string }>>(
    ["case-study-slugs"],
    allCaseStudySlugsQuery,
    {},
    { tags: [SANITY_CACHE_TAGS.caseStudies] },
  );

  return (slugs ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await fetchCaseStudy(slug);
  if (!study) {
    return buildMetadata({ title: "Case Studies" });
  }

  return buildMetadata({
    title: study.title,
    description: study.summary ?? `${study.client} — ${study.title}`,
    image: buildOgImageUrl(study.image),
    url: `${env.APP_URL}/case-studies/${study.slug.current}`,
  });
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await fetchCaseStudy(slug);
  if (!study) {
    notFound();
  }

  const body = Array.isArray(study.body)
    ? (study.body as PortableTextBlock[])
    : [];

  return (
    <>
      <Header />
      <main id="main-content">
        <Section containerClassName="max-w-3xl">
          <Link
            href="/case-studies"
            className="text-muted-foreground hover:text-foreground mb-6 inline-block text-sm"
          >
            ← All case studies
          </Link>

          <article className="space-y-6">
            {study.logo && (
              <div className="h-10 w-28">
                <SanityImage
                  image={study.logo}
                  alt={study.client}
                  width={140}
                  height={60}
                  fit="max"
                  className="h-full w-auto object-contain"
                  sizes="140px"
                />
              </div>
            )}

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm tracking-wide uppercase">
                {study.client}
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {study.title}
              </h1>
              {study.summary && (
                <p className="text-muted-foreground text-lg">{study.summary}</p>
              )}
            </div>

            {study.image && (
              <div className="overflow-hidden rounded-xl">
                <SanityImage
                  image={study.image}
                  alt={study.title}
                  width={1200}
                  height={630}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}

            {body.length > 0 && <PortableTextRenderer value={body} />}

            {study.outcomes && study.outcomes.length > 0 && (
              <dl className="grid gap-4 sm:grid-cols-2">
                {study.outcomes.map((outcome) => (
                  <div
                    key={outcome.metric}
                    className="rounded-lg border p-4 text-sm"
                  >
                    <dt className="text-muted-foreground">{outcome.metric}</dt>
                    <dd className="text-2xl font-semibold">{outcome.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        </Section>
      </main>
      <Footer />
    </>
  );
}

async function fetchCaseStudy(slug: string): Promise<CaseStudy | null> {
  const data = await cachedSanityFetch<unknown>(
    ["case-study", slug],
    caseStudyBySlugQuery,
    { slug },
    { tags: [SANITY_CACHE_TAGS.caseStudies] },
  );
  const parsed = caseStudySchema.safeParse(data);
  return parsed.success ? parsed.data : null;
}
