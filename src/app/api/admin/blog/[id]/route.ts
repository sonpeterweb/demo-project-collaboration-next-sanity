import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { writeClient } from "@/lib/sanity/client";
import { plainTextToPortableText } from "@/lib/sanity/portable-text";

const blogPostInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  authorId: z.string().min(1, "Author is required"),
  publishedAt: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const data = blogPostInputSchema.parse(body);

    const patch = writeClient.patch(id).set({
      title: data.title,
      slug: { _type: "slug", current: data.slug },
      author: { _type: "reference", _ref: data.authorId },
      updatedAt: new Date().toISOString(),
      excerpt: data.excerpt ?? "",
      content: plainTextToPortableText(data.content),
      tags: data.tags ?? [],
      ...(data.publishedAt ? { publishedAt: data.publishedAt } : {}),
    });

    if (!data.publishedAt) {
      patch.unset(["publishedAt"]);
    }

    await patch.commit();

    return NextResponse.json({ success: true, id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 400 },
      );
    }

    console.error("Failed to update blog post:", err);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const { id } = await context.params;
    await writeClient.delete(id);
    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Failed to delete blog post:", err);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
