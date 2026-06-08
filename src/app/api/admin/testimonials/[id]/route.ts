import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { writeClient } from "@/lib/sanity/client";

const testimonialInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  quote: z.string().min(1, "Quote is required"),
  rating: z.number().min(0).max(5).optional(),
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
    const data = testimonialInputSchema.parse(body);

    await writeClient
      .patch(id)
      .set({
        name: data.name,
        company: data.company,
        quote: data.quote,
        rating: data.rating ?? 5,
      })
      .commit();

    return NextResponse.json({ success: true, id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.issues },
        { status: 400 },
      );
    }

    console.error("Failed to update testimonial:", err);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
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
    console.error("Failed to delete testimonial:", err);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 },
    );
  }
}
