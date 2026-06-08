/**
 * @jest-environment node
 */

jest.mock("next/cache", () => ({
  unstable_cache: jest.fn((fn: () => Promise<unknown>) => async () => fn()),
}));

jest.mock("./cached-fetch", () => ({
  cachedSanityFetch: jest.fn(),
}));

jest.mock("./client", () => ({
  getClient: jest.fn(),
  isPreviewMode: jest.fn(),
}));

import { cachedSanityFetch } from "./cached-fetch";
import { getClient, isPreviewMode } from "./client";
import { sanityFetch } from "./fetch";

const mockedCachedFetch = cachedSanityFetch as jest.Mock;
const mockedGetClient = getClient as jest.Mock;
const mockedIsPreviewMode = isPreviewMode as jest.Mock;

describe("sanityFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedIsPreviewMode.mockResolvedValue(false);
    mockedCachedFetch.mockResolvedValue({ ok: true });
  });

  it("uses cached fetch for published content", async () => {
    const result = await sanityFetch(
      "*[_type == 'test']",
      {},
      {
        cacheKey: ["test"],
        tags: ["sanity:test"],
      },
    );

    expect(result).toEqual({ ok: true });
    expect(mockedCachedFetch).toHaveBeenCalled();
    expect(mockedGetClient).not.toHaveBeenCalled();
  });

  it("bypasses cache in preview mode", async () => {
    mockedIsPreviewMode.mockResolvedValue(true);
    mockedGetClient.mockResolvedValue({
      fetch: jest.fn().mockResolvedValue({ preview: true }),
    });

    const result = await sanityFetch("*[_type == 'test']");

    expect(result).toEqual({ preview: true });
    expect(mockedCachedFetch).not.toHaveBeenCalled();
  });
});
