import {
  MARKETING_REVALIDATE_SECONDS,
  SANITY_CACHE_TAGS,
} from "@/lib/sanity/revalidate";

describe("sanity revalidate config", () => {
  it("defines a positive ISR interval for marketing pages", () => {
    expect(MARKETING_REVALIDATE_SECONDS).toBeGreaterThan(0);
  });

  it("exposes cache tags for major marketing content types", () => {
    expect(SANITY_CACHE_TAGS).toMatchObject({
      siteSettings: expect.any(String),
      features: expect.any(String),
      pricing: expect.any(String),
      blog: expect.any(String),
      docs: expect.any(String),
    });
  });
});
