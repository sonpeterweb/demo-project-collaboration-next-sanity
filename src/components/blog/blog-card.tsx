import Link from "next/link";

import { SanityImage } from "@/components/common/sanity-image";
import type { BlogPostWithAuthor } from "@/lib/sanity/zod";

type BlogCardProps = {
  post: BlogPostWithAuthor;
};

function formatDate(input?: string | null) {
  if (!input) return "";
  return new Date(input).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-card rounded-lg border shadow-sm transition hover:shadow-md">
      {post.coverImage && (
        <Link
          href={`/blog/${post.slug.current}`}
          className="block overflow-hidden rounded-t-lg"
        >
          <SanityImage
            image={post.coverImage}
            alt={post.title}
            width={800}
            height={400}
            className="h-48 w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        </Link>
      )}
      <div className="space-y-3 p-5">
        <div className="text-muted-foreground text-xs tracking-wide uppercase">
          {formatDate(post.publishedAt)}
        </div>
        <Link href={`/blog/${post.slug.current}`}>
          <h3 className="text-foreground text-lg leading-tight font-semibold">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {post.excerpt}
          </p>
        )}
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          {post.author?.photo ? (
            <SanityImage
              image={post.author.photo}
              alt={post.author.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
              sizes="32px"
            />
          ) : (
            <div className="bg-muted h-8 w-8 rounded-full" />
          )}
          <div>
            <div className="text-foreground font-medium">
              {post.author?.name ?? "Unknown Author"}
            </div>
            <div>{post.tags?.slice(0, 2).join(", ")}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
