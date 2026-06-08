import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/admin-auth";
import { writeClient } from "@/lib/sanity/client";
import { allContactSubmissionsQuery } from "@/lib/sanity/queries";

export async function GET() {
  const { error } = await requireAdminSession();
  if (error) return error;

  try {
    const submissions = await writeClient.fetch(allContactSubmissionsQuery);
    return NextResponse.json(submissions);
  } catch (err) {
    console.error("Failed to fetch contact submissions:", err);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 },
    );
  }
}
