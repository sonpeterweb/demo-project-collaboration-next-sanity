import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { writeClient } from "@/lib/sanity/client";

const pricingTierInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  monthlyPrice: z.number().min(0, "Monthly price must be 0 or greater"),
  yearlyPrice: z.number().min(0, "Yearly price must be 0 or greater"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  buttonLabel: z.string().optional(),
  popular: z.boolean().optional(),
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
    const data = pricingTierInputSchema.parse(body);

    await writeClient
      .patch(id)
      .set({
        name: data.name,
        monthlyPrice: data.monthlyPrice,
        yearlyPrice: data.yearlyPrice,
        features: data.features,
        buttonLabel: data.buttonLabel ?? "See features",
        popular: data.popular ?? false,
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

    console.error("Failed to update pricing tier:", err);
    return NextResponse.json(
      { error: "Failed to update pricing tier" },
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
    console.error("Failed to delete pricing tier:", err);
    return NextResponse.json(
      { error: "Failed to delete pricing tier" },
      { status: 500 },
    );
  }
}
