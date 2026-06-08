type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: string;
  markDefs: unknown[];
  children: Array<{
    _type: "span";
    text: string;
    marks: string[];
  }>;
};

function createBlockKey(index: number): string {
  return `block-${index}-${Math.random().toString(36).slice(2, 9)}`;
}

export function plainTextToPortableText(text: string): PortableTextBlock[] {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return [
      {
        _type: "block",
        _key: createBlockKey(0),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: "", marks: [] }],
      },
    ];
  }

  return paragraphs.map((paragraph, index) => ({
    _type: "block",
    _key: createBlockKey(index),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", text: paragraph, marks: [] }],
  }));
}

export function portableTextToPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) {
    return "";
  }

  return blocks
    .filter(
      (block): block is PortableTextBlock =>
        typeof block === "object" &&
        block !== null &&
        "_type" in block &&
        block._type === "block" &&
        "children" in block &&
        Array.isArray(block.children),
    )
    .map((block) =>
      block.children
        .map((child) => child.text ?? "")
        .join("")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n");
}
