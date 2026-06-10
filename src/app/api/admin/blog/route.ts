import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { writeClient } from "@/lib/sanity/client";
import { plainTextToPortableText } from "@/lib/sanity/portable-text";
import { allBlogPostsAdminQuery } from "@/lib/sanity/queries";

const blogPostInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  authorId: z.string().min(1, "Author is required"),
  publishedAt: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
});

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const posts = await writeClient.fetch(allBlogPostsAdminQuery);
    return NextResponse.json(posts);
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const body = await request.json();
    const data = blogPostInputSchema.parse(body);

    const result = await writeClient.create({
      _type: "blogPost",
      title: data.title,
      slug: { _type: "slug", current: data.slug },
      author: { _type: "reference", _ref: data.authorId },
      ...(data.publishedAt ? { publishedAt: data.publishedAt } : {}),
      updatedAt: new Date().toISOString(),
      excerpt: data.excerpt ?? "",
      content: plainTextToPortableText(data.content),
      tags: data.tags ?? [],
    });

    return NextResponse.json(
      { success: true, id: result._id },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 400 },
      );
    }

    console.error("Failed to create blog post:", err);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
