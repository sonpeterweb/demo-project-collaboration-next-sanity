/**
 * @jest-environment node
 */

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

jest.mock("../../lib/sanity/client", () => ({
  urlFor: jest.fn((source: SanityImageSource) => ({
    width: jest.fn().mockReturnThis(),
    height: jest.fn().mockReturnThis(),
    fit: jest.fn().mockReturnThis(),
    quality: jest.fn().mockReturnThis(),
    url: jest.fn(
      () => `https://cdn.sanity.io/images/test/${JSON.stringify(source)}`,
    ),
  })),
}));

import { urlFor } from "../../lib/sanity/client";

describe("SanityImage URL builder", () => {
  it("builds optimized CDN URLs via urlFor", () => {
    const image = {
      _type: "image" as const,
      asset: { _ref: "image-abc", _type: "reference" as const },
    };

    const url = urlFor(image)
      .width(800)
      .height(400)
      .fit("crop")
      .quality(80)
      .url();

    expect(url).toContain("cdn.sanity.io");
    expect(urlFor).toHaveBeenCalledWith(image);
  });
});
