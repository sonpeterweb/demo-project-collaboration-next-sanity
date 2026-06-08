import {
  FileTextIcon,
  MailIcon,
  MessageSquareQuoteIcon,
  TagsIcon,
} from "lucide-react";
import Link from "next/link";

import { writeClient } from "@/lib/sanity/client";

const sections = [
  {
    title: "Blog Posts",
    description: "Create, edit, and delete blog posts",
    href: "/admin/blog",
    icon: FileTextIcon,
  },
  {
    title: "Testimonials",
    description: "Manage customer testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuoteIcon,
  },
  {
    title: "Pricing Tiers",
    description: "Update pricing plans and features",
    href: "/admin/pricing",
    icon: TagsIcon,
  },
  {
    title: "Contact Submissions",
    description: "View inbound contact form messages",
    href: "/admin/contact",
    icon: MailIcon,
  },
];

export default async function AdminDashboardPage() {
  const [blogCount, testimonialCount, pricingCount, contactCount] =
    await Promise.all([
      writeClient.fetch<number>(`count(*[_type == "blogPost"])`),
      writeClient.fetch<number>(`count(*[_type == "testimonial"])`),
      writeClient.fetch<number>(`count(*[_type == "pricingTier"])`),
      writeClient.fetch<number>(`count(*[_type == "contactSubmission"])`),
    ]);

  const counts = [blogCount, testimonialCount, pricingCount, contactCount];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Choose a section below to manage content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="hover:bg-accent/50 rounded-lg border p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="size-5" aria-hidden="true" />
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {section.description}
                  </p>
                </div>
                <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium">
                  {counts[index]}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
