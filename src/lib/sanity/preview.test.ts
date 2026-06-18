import {
  isPreviewSecretRequired,
  isValidPreviewSecret,
  normalizePreviewPath,
} from "@/lib/sanity/preview";

describe("preview auth", () => {
  const originalSecret = process.env.SANITY_PREVIEW_SECRET;

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.SANITY_PREVIEW_SECRET;
    } else {
      process.env.SANITY_PREVIEW_SECRET = originalSecret;
    }
  });

  it("allows any secret when SANITY_PREVIEW_SECRET is unset", () => {
    delete process.env.SANITY_PREVIEW_SECRET;
    expect(isValidPreviewSecret(null)).toBe(true);
    expect(isValidPreviewSecret("anything")).toBe(true);
    expect(isPreviewSecretRequired()).toBe(false);
  });

  it("requires matching secret when SANITY_PREVIEW_SECRET is set", () => {
    process.env.SANITY_PREVIEW_SECRET = "test-secret";
    expect(isValidPreviewSecret("test-secret")).toBe(true);
    expect(isValidPreviewSecret("wrong")).toBe(false);
    expect(isValidPreviewSecret(null)).toBe(false);
    expect(isPreviewSecretRequired()).toBe(true);
  });

  it("normalizes preview slugs into app paths", () => {
    expect(normalizePreviewPath(null)).toBe("/");
    expect(normalizePreviewPath("/")).toBe("/");
    expect(normalizePreviewPath("my-post")).toBe("/blog/my-post");
    expect(normalizePreviewPath("blog/my-post")).toBe("/blog/my-post");
    expect(normalizePreviewPath("docs/getting-started")).toBe(
      "/docs/getting-started",
    );
  });
});
