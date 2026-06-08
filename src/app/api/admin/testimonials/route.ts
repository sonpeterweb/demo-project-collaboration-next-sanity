import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { writeClient } from "@/lib/sanity/client";
import { allTestimonialsQuery } from "@/lib/sanity/queries";

const testimonialInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  quote: z.string().min(1, "Quote is required"),
  rating: z.number().min(0).max(5).optional(),
});

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const testimonials = await writeClient.fetch(allTestimonialsQuery);
    return NextResponse.json(testimonials);
  } catch (err) {
    console.error("Failed to fetch testimonials:", err);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const body = await request.json();
    const data = testimonialInputSchema.parse(body);

    const result = await writeClient.create({
      _type: "testimonial",
      name: data.name,
      company: data.company,
      quote: data.quote,
      rating: data.rating ?? 5,
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

    console.error("Failed to create testimonial:", err);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 },
    );
  }
}
