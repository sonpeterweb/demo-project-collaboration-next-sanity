import { SanityImage } from "@/components/common/sanity-image";
import type { AuthorSummary } from "@/lib/sanity/zod";

type AuthorBioProps = {
  author: AuthorSummary;
  className?: string;
};

export function AuthorBio({ author, className }: AuthorBioProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-lg border p-4 ${className ?? ""}`}
    >
      {author.photo ? (
        <SanityImage
          image={author.photo}
          alt={author.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
          sizes="64px"
        />
      ) : (
        <div className="bg-muted h-16 w-16 rounded-full" />
      )}
      <div>
        <h4 className="text-lg font-semibold">{author.name}</h4>
        {author.bio && (
          <p className="text-muted-foreground text-sm">{author.bio}</p>
        )}
      </div>
    </div>
  );
}
