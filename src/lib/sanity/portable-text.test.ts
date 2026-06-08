import {
  plainTextToPortableText,
  portableTextToPlainText,
} from "@/lib/sanity/portable-text";

describe("portable-text helpers", () => {
  it("converts plain text paragraphs to portable text blocks", () => {
    const blocks = plainTextToPortableText(
      "First paragraph.\n\nSecond paragraph.",
    );

    expect(blocks).toHaveLength(2);
    expect(blocks[0]?.children[0]?.text).toBe("First paragraph.");
    expect(blocks[1]?.children[0]?.text).toBe("Second paragraph.");
  });

  it("returns an empty block for blank content", () => {
    const blocks = plainTextToPortableText("");

    expect(blocks).toHaveLength(1);
    expect(blocks[0]?.children[0]?.text).toBe("");
  });

  it("converts portable text blocks back to plain text", () => {
    const text = portableTextToPlainText([
      {
        _type: "block",
        _key: "a",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: "Hello", marks: [] }],
      },
      {
        _type: "block",
        _key: "b",
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: "World", marks: [] }],
      },
    ]);

    expect(text).toBe("Hello\n\nWorld");
  });
});
