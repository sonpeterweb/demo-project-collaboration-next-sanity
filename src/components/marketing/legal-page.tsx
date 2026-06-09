import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export type LegalPageProps = {
  title: string;
  lastUpdated: string;
  effectiveDate: string;
  intro: ReactNode;
  sections: LegalSection[];
  contactEmail: string;
  contactLabel: string;
};

export function LegalPage({
  title,
  lastUpdated,
  effectiveDate,
  intro,
  sections,
  contactEmail,
  contactLabel,
}: LegalPageProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-16">
      <aside className="hidden lg:block">
        <nav
          aria-label={`${title} table of contents`}
          className="sticky top-24 space-y-1"
        >
          <p className="text-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
            On this page
          </p>
          <ol className="space-y-2 text-sm">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-muted-foreground hover:text-foreground block leading-snug transition-colors"
                >
                  <span className="text-muted-foreground/70 mr-1.5 tabular-nums">
                    {index + 1}.
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <article className="mx-auto w-full max-w-3xl">
        <header className="mb-10 space-y-4 border-b pb-8">
          <div className="flex flex-wrap gap-2">
            <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
              Last updated {lastUpdated}
            </span>
            <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
              Effective {effectiveDate}
            </span>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {intro}
          </p>
        </header>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24"
              aria-labelledby={`${section.id}-heading`}
            >
              <h2
                id={`${section.id}-heading`}
                className="text-foreground mb-5 flex items-baseline gap-3 text-xl font-semibold tracking-tight md:text-2xl"
              >
                <span className="text-muted-foreground/60 text-base font-medium tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <LegalBody>{section.content}</LegalBody>
            </section>
          ))}
        </div>

        <aside className="bg-muted/40 mt-14 rounded-xl border p-6 md:p-8">
          <h2 className="text-foreground mb-2 text-lg font-semibold">
            Questions about this document?
          </h2>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            Our team typically responds within two business days. For urgent
            security or privacy matters, include &quot;Urgent&quot; in your
            subject line.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${contactEmail}`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              {contactLabel}
            </a>
            <Link
              href="/contact"
              className="border-input bg-background hover:bg-muted inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
            >
              Contact form
            </Link>
          </div>
        </aside>
      </article>
    </div>
  );
}

function LegalBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-muted-foreground space-y-4 text-[0.9375rem] leading-7",
        "[&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold",
        "[&_p]:leading-7",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
        "[&_li]:pl-1",
        "[&_strong]:text-foreground [&_strong]:font-semibold",
        "[&_a]:text-foreground hover:[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LegalCallout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-muted/50 my-6 rounded-lg border px-5 py-4">
      <p className="text-foreground mb-2 text-sm font-semibold">{title}</p>
      <div className="text-muted-foreground space-y-2 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
