import { SanityImage } from "@/components/common/sanity-image";
import type { CaseStudy } from "@/lib/sanity/zod";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <article className="rounded-2xl border p-6 shadow-sm">
      {caseStudy.logo && (
        <div className="mb-4 h-10 w-24">
          <SanityImage
            image={caseStudy.logo}
            alt={caseStudy.client}
            width={120}
            height={60}
            fit="max"
            className="h-full w-auto object-contain"
            sizes="120px"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold">{caseStudy.title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{caseStudy.summary}</p>
      {caseStudy.image && (
        <div className="my-4 overflow-hidden rounded-xl">
          <SanityImage
            image={caseStudy.image}
            alt={caseStudy.title}
            width={800}
            height={400}
            className="h-48 w-full object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
      {caseStudy.outcomes && (
        <dl className="grid gap-3 md:grid-cols-2">
          {caseStudy.outcomes.map((outcome) => (
            <div key={outcome.metric} className="rounded-lg border p-3 text-sm">
              <dt className="text-muted-foreground">{outcome.metric}</dt>
              <dd className="text-lg font-semibold">{outcome.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
