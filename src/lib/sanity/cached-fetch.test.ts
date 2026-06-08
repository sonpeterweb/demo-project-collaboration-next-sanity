/**
 * @jest-environment node
 */

jest.mock("next/cache", () => ({
  unstable_cache: jest.fn((fn: () => Promise<unknown>) => async () => fn()),
}));

jest.mock("./client", () => ({
  client: {
    fetch: jest.fn(),
  },
}));

import { unstable_cache } from "next/cache";

import { cachedSanityFetch } from "./cached-fetch";
import { client } from "./client";
import { MARKETING_REVALIDATE_SECONDS } from "./revalidate";

const mockedFetch = client.fetch as jest.Mock;
const mockedUnstableCache = unstable_cache as jest.Mock;

describe("cachedSanityFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetch.mockResolvedValue({ ok: true });
  });

  it("wraps Sanity fetches with unstable_cache", async () => {
    const result = await cachedSanityFetch(
      ["test-key"],
      "*[_type == 'test'][0]",
      { slug: "demo" },
      { tags: ["sanity:test"] },
    );

    expect(result).toEqual({ ok: true });
    expect(mockedUnstableCache).toHaveBeenCalledWith(
      expect.any(Function),
      ["test-key"],
      {
        revalidate: MARKETING_REVALIDATE_SECONDS,
        tags: ["sanity:test"],
      },
    );
    expect(mockedFetch).toHaveBeenCalledWith("*[_type == 'test'][0]", {
      slug: "demo",
    });
  });
});
