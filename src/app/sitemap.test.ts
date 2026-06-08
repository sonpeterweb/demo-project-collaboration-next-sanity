/**
 * @jest-environment node
 */

jest.mock("../env.mjs", () => ({
  env: { APP_URL: "https://example.com" },
}));

jest.mock("../lib/sanity/cached-fetch", () => ({
  cachedSanityFetch: jest.fn(),
}));

import { cachedSanityFetch } from "../lib/sanity/cached-fetch";
import sitemap from "./sitemap";

const mockedCachedFetch = cachedSanityFetch as jest.Mock;

describe("sitemap", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("includes static routes and dynamic Sanity content", async () => {
    mockedCachedFetch.mockResolvedValue({
      blogPosts: [
        { slug: "hello-world", updatedAt: "2025-01-01T00:00:00.000Z" },
      ],
      docPages: [
        { slug: "getting-started", updatedAt: "2025-01-02T00:00:00.000Z" },
      ],
    });

    const entries = await sitemap();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: "https://example.com" }),
        expect.objectContaining({ url: "https://example.com/blog" }),
        expect.objectContaining({
          url: "https://example.com/blog/hello-world",
        }),
        expect.objectContaining({
          url: "https://example.com/docs/getting-started",
        }),
      ]),
    );
  });

  it("falls back to static routes when Sanity fetch fails", async () => {
    mockedCachedFetch.mockRejectedValue(new Error("Sanity unavailable"));

    const entries = await sitemap();

    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0]?.url).toBe("https://example.com");
  });
});
