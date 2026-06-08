import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { writeClient } from "@/lib/sanity/client";
import { allPricingTiersQuery } from "@/lib/sanity/queries";

const pricingTierInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  monthlyPrice: z.number().min(0, "Monthly price must be 0 or greater"),
  yearlyPrice: z.number().min(0, "Yearly price must be 0 or greater"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  buttonLabel: z.string().optional(),
  popular: z.boolean().optional(),
});

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const tiers = await writeClient.fetch(allPricingTiersQuery);
    return NextResponse.json(tiers);
  } catch (err) {
    console.error("Failed to fetch pricing tiers:", err);
    return NextResponse.json(
      { error: "Failed to fetch pricing tiers" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const body = await request.json();
    const data = pricingTierInputSchema.parse(body);

    const result = await writeClient.create({
      _type: "pricingTier",
      name: data.name,
      monthlyPrice: data.monthlyPrice,
      yearlyPrice: data.yearlyPrice,
      features: data.features,
      buttonLabel: data.buttonLabel ?? "Get Started",
      popular: data.popular ?? false,
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

    console.error("Failed to create pricing tier:", err);
    return NextResponse.json(
      { error: "Failed to create pricing tier" },
      { status: 500 },
    );
  }
}
