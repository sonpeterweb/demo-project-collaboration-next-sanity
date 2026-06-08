import { ContactTable } from "@/components/admin/contact-table";
import { writeClient } from "@/lib/sanity/client";
import { allContactSubmissionsQuery } from "@/lib/sanity/queries";

export const metadata = {
  title: "Contact Submissions",
};

export default async function AdminContactPage() {
  const submissions = await writeClient.fetch(allContactSubmissionsQuery);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Contact Submissions
        </h1>
        <p className="text-muted-foreground mt-2">
          Read-only view of inbound contact form messages.
        </p>
      </div>

      <ContactTable submissions={submissions} />
    </div>
  );
}
