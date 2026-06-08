import Link from "next/link";
import type { ReactNode } from "react";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNav } from "@/components/admin/admin-nav";

type AdminShellProps = {
  userName?: string | null;
  children: ReactNode;
};

export function AdminShell({ userName, children }: AdminShellProps) {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href="/admin" className="text-xl font-semibold">
                Admin Panel
              </Link>
              <p className="text-muted-foreground text-sm">
                Manage site content and submissions
              </p>
            </div>
            <AdminHeader userName={userName} />
          </div>
          <AdminNav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
