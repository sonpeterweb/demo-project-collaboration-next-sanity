import { calculateReadingTime, cn } from "@/lib/utils";

describe("utils", () => {
  describe("cn", () => {
    it("merges class names", () => {
      expect(cn("px-2", "py-1", false && "hidden")).toBe("px-2 py-1");
    });
  });

  describe("calculateReadingTime", () => {
    it("returns 0 for empty content", () => {
      expect(calculateReadingTime("")).toBe(0);
      expect(calculateReadingTime(null)).toBe(0);
    });

    it("returns at least 1 minute for non-empty text", () => {
      expect(calculateReadingTime("hello world")).toBe(1);
    });

    it("estimates longer content in minutes", () => {
      const words = Array.from({ length: 400 }, (_, i) => `word${i}`).join(" ");
      expect(calculateReadingTime(words)).toBe(2);
    });
  });
});
