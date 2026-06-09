import {
  blogPostWithAuthorSchema,
  docPageSchema,
  featureSchema,
  pricingTierSchema,
  testimonialSchema,
} from "@/lib/sanity/zod";

/** Shapes returned by public GROQ queries (no _rev). */
describe("sanity zod schemas", () => {
  it("accepts feature documents from featuredFeaturesQuery", () => {
    const result = featureSchema.safeParse({
      _id: "feature-1",
      _type: "feature",
      _createdAt: "2025-01-01T00:00:00Z",
      _updatedAt: "2025-01-01T00:00:00Z",
      title: "Real-time Collaboration",
      description: "Co-edit documents and tasks with your team in real time.",
      icon: "users",
      category: "Collaboration",
    });
    expect(result.success).toBe(true);
  });

  it("accepts pricing tiers from allPricingTiersQuery", () => {
    const result = pricingTierSchema.safeParse({
      _id: "tier-1",
      _type: "pricingTier",
      _createdAt: "2025-01-01T00:00:00Z",
      _updatedAt: "2025-01-01T00:00:00Z",
      name: "Starter",
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: ["Up to 10 users"],
      buttonLabel: "Start Free Trial",
      popular: false,
    });
    expect(result.success).toBe(true);
  });

  it("accepts testimonials from featuredTestimonialsQuery", () => {
    const result = testimonialSchema.safeParse({
      _id: "testimonial-1",
      _type: "testimonial",
      _createdAt: "2025-01-01T00:00:00Z",
      _updatedAt: "2025-01-01T00:00:00Z",
      name: "Alex Taylor",
      company: "Northwind Labs",
      quote: "Flowspace cut our coordination overhead in half.",
      rating: 5,
    });
    expect(result.success).toBe(true);
  });

  it("accepts blog posts from blogPostsPaginatedQuery", () => {
    const result = blogPostWithAuthorSchema.safeParse({
      _id: "post-1",
      _type: "blogPost",
      _createdAt: "2025-01-01T00:00:00Z",
      _updatedAt: "2025-01-01T00:00:00Z",
      title: "How High-Performing Teams Stay Aligned",
      slug: { _type: "slug", current: "how-teams-stay-aligned" },
      author: {
        _id: "author-1",
        name: "Jordan Smith",
        slug: { _type: "slug", current: "jordan-smith" },
        bio: "Product engineer.",
      },
      publishedAt: "2025-01-01T00:00:00Z",
      excerpt: "Practical strategies for distributed teams.",
      tags: ["collaboration"],
    });
    expect(result.success).toBe(true);
  });

  it("accepts doc pages from allDocPagesQuery", () => {
    const result = docPageSchema.safeParse({
      _id: "doc-1",
      _type: "docPage",
      _createdAt: "2025-01-01T00:00:00Z",
      _updatedAt: "2025-01-01T00:00:00Z",
      title: "Getting Started",
      slug: { _type: "slug", current: "getting-started" },
      category: "Guides",
      order: 1,
      content: [
        {
          _type: "block",
          _key: "block1",
          style: "normal",
          markDefs: [],
          children: [
            { _type: "span", text: "Welcome to Flowspace documentation." },
          ],
        },
      ],
      parent: null,
    });
    expect(result.success).toBe(true);
  });
});
