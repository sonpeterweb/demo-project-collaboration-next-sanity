import { buildMetadata, buildOpenGraph, buildTwitter } from "@/lib/seo";

describe("seo helpers", () => {
  it("builds metadata with title and description", () => {
    const metadata = buildMetadata({
      title: "Pricing",
      description: "Flexible plans for every team.",
      url: "https://example.com/pricing",
    });

    expect(metadata.title).toBe("Pricing");
    expect(metadata.description).toBe("Flexible plans for every team.");
    expect(metadata.alternates?.canonical).toBe("https://example.com/pricing");
  });

  it("builds open graph metadata", () => {
    const og = buildOpenGraph({
      title: "Blog",
      description: "Latest updates",
      url: "https://example.com/blog",
    });

    expect(og).toMatchObject({
      title: "Blog",
      type: "website",
    });
  });

  it("builds twitter card metadata", () => {
    const twitter = buildTwitter({
      title: "Docs",
      description: "Platform documentation",
    });

    expect(twitter).toMatchObject({
      card: "summary_large_image",
      title: "Docs",
    });
  });
});
