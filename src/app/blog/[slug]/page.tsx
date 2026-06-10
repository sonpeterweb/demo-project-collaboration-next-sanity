import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "sanity";

import { AuthorBio } from "@/components/blog/author-bio";
import { PortableTextRenderer } from "@/components/blog/portable-text-renderer";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { SanityImage } from "@/components/common/sanity-image";
import { Section } from "@/components/common/section";
import { env } from "@/env.mjs";
import { buildPostOgImage } from "@/lib/og";
import { isPreviewMode } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
  allBlogSlugsQuery,
  blogPostBySlugPreviewQuery,
  blogPostBySlugQuery,
} from "@/lib/sanity/queries";
import { SANITY_CACHE_TAGS } from "@/lib/sanity/revalidate";
import {
  type BlogPostWithAuthor,
  blogPostWithAuthorSchema,
} from "@/lib/sanity/zod";
import { buildMetadata } from "@/lib/seo";
import { calculateReadingTime } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/** Allow preview URLs for slugs not generated at build time (e.g. drafts). */
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>(
    allBlogSlugsQuery,
    {},
    {
      cacheKey: ["blog-slugs"],
      tags: [SANITY_CACHE_TAGS.blog],
    },
  );

  return (slugs ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) {
    return buildMetadata({ title: "Blog" });
  }

  return buildMetadata({
    title: post.title,
    description:
      post.excerpt ??
      `Read ${post.title} by ${post.author?.name ?? "Flowspace"}.`,
    image: buildPostOgImage(post.coverImage),
    url: `${env.APP_URL}/blog/${post.slug.current}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) {
    notFound();
  }

  const portableContent = Array.isArray(post.content)
    ? (post.content as PortableTextBlock[])
    : [];
  const readingTime = calculateReadingTime(
    portableTextToPlainText(portableContent),
  );

  return (
    <>
      <Header />
      <main id="main-content">
        <Section>
          <article className="mx-auto max-w-3xl space-y-6">
            <div className="space-y-3 text-center">
              <p className="text-muted-foreground text-sm tracking-wide uppercase">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : "Draft"}{" "}
                • {readingTime || 1} min read
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-muted-foreground text-lg">{post.excerpt}</p>
              )}
            </div>

            {post.coverImage && (
              <div className="overflow-hidden rounded-xl">
                <SanityImage
                  image={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}

            {portableContent.length > 0 && (
              <PortableTextRenderer value={portableContent} />
            )}

            {post.author && <AuthorBio author={post.author} />}
          </article>
        </Section>
      </main>
      <Footer />
    </>
  );
}

async function fetchPost(slug: string): Promise<BlogPostWithAuthor | null> {
  const preview = await isPreviewMode();
  const query = preview ? blogPostBySlugPreviewQuery : blogPostBySlugQuery;
  const data = await sanityFetch<unknown>(
    query,
    { slug },
    {
      cacheKey: ["blog-post", slug, preview ? "preview" : "published"],
      tags: [SANITY_CACHE_TAGS.blogPost, SANITY_CACHE_TAGS.blog],
      preview,
    },
  );
  const parsed = blogPostWithAuthorSchema.safeParse(data);
  if (parsed.success) {
    return parsed.data;
  }
  return null;
}

function portableTextToPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (!Array.isArray(block.children)) {
        return "";
      }
      return (
        block.children
          .map((child) => {
            if (
              typeof child === "object" &&
              "text" in child &&
              typeof child.text === "string"
            ) {
              return child.text;
            }
            return "";
          })
          .join("") ?? ""
      );
    })
    .filter(Boolean)
    .join("\n\n");
}
