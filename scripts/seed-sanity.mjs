import { createClient } from "@sanity/client";

function block(text) {
  return {
    _type: "block",
    _key: `${Math.random().toString(36).slice(2, 9)}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", text, marks: [] }],
  };
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const client = createClient({
  projectId: requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: requiredEnv("NEXT_PUBLIC_SANITY_DATASET"),
  token: requiredEnv("SANITY_API_READ_TOKEN"),
  apiVersion: "2025-01-01",
  useCdn: false,
});

async function hasDocuments(type) {
  const count = await client.fetch(`count(*[_type == $type])`, { type });
  return count > 0;
}

async function seedSiteSettings() {
  if (await hasDocuments("siteSettings")) return;

  await client.create({
    _type: "siteSettings",
    siteTitle: "Flowspace",
    metaDescription:
      "Flowspace helps teams collaborate, manage projects, and communicate effortlessly.",
    navLinks: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
      { label: "Contact", href: "/contact" },
    ],
  });
}

async function seedHomePage() {
  if (await hasDocuments("pageHome")) return;

  await client.create({
    _type: "pageHome",
    heroTitle: "Work Together, Flow Better.",
    heroSubtitle:
      "Flowspace helps teams collaborate, manage projects, and communicate effortlessly — all in one place.",
    cta: "Get Started",
  });
}

async function seedFeatures() {
  if (await hasDocuments("feature")) return;

  const features = [
    {
      title: "Real-time Collaboration",
      description: "Co-edit documents and tasks with your team in real time.",
      icon: "users",
      category: "Collaboration",
    },
    {
      title: "Project Workflows",
      description: "Organize work with boards, lists, and custom statuses.",
      icon: "kanban",
      category: "Productivity",
    },
    {
      title: "Secure Access",
      description: "Role-based permissions keep your workspace safe.",
      icon: "shield",
      category: "Security",
    },
  ];

  for (const feature of features) {
    await client.create({ _type: "feature", ...feature });
  }
}

async function seedPricing() {
  if (await hasDocuments("pricingTier")) return;

  await client.create({
    _type: "pricingTier",
    name: "Starter",
    monthlyPrice: 19,
    yearlyPrice: 190,
    features: ["Up to 10 users", "Basic workflows", "Email support"],
    buttonLabel: "Start Free Trial",
    popular: false,
  });

  await client.create({
    _type: "pricingTier",
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      "Unlimited users",
      "Advanced automations",
      "Priority support",
      "Audit logs",
    ],
    buttonLabel: "Get Started",
    popular: true,
  });
}

async function seedTestimonials() {
  if (await hasDocuments("testimonial")) return;

  await client.create({
    _type: "testimonial",
    name: "Alex Taylor",
    company: "Northwind Labs",
    quote:
      "Flowspace cut our coordination overhead in half and helped us ship faster.",
    rating: 5,
  });
}

async function seedAuthorAndBlogPost() {
  if (await hasDocuments("blogPost")) return;

  const author = await client.create({
    _type: "author",
    name: "Jordan Smith",
    slug: { _type: "slug", current: "jordan-smith" },
    bio: "Product engineer writing about collaboration and team workflows.",
  });

  await client.create({
    _type: "blogPost",
    title: "How High-Performing Teams Stay Aligned",
    slug: { _type: "slug", current: "how-teams-stay-aligned" },
    author: { _type: "reference", _ref: author._id },
    publishedAt: new Date().toISOString(),
    excerpt:
      "Practical strategies for keeping distributed teams focused and accountable.",
    tags: ["collaboration", "productivity"],
    content: [
      block(
        "Great teams don’t rely on endless meetings. They build systems for visibility, feedback, and accountability.",
      ),
      block(
        "Start with a shared source of truth for priorities, then automate status updates so everyone knows what changed.",
      ),
    ],
  });
}

async function seedCaseStudy() {
  if (await hasDocuments("caseStudy")) return;

  await client.create({
    _type: "caseStudy",
    title: "Northwind Labs scaled delivery by 40%",
    client: "Northwind Labs",
    summary:
      "A product team used Flowspace to streamline planning and reduce handoff delays.",
    outcomes: [
      { metric: "Delivery speed", value: "+40%" },
      { metric: "Meeting time", value: "-25%" },
    ],
    body: [
      block(
        "Northwind Labs adopted Flowspace to unify project tracking and async updates across three time zones.",
      ),
    ],
  });
}

async function seedDocs() {
  if (await hasDocuments("docPage")) return;

  await client.create({
    _type: "docPage",
    title: "Getting Started",
    slug: { _type: "slug", current: "getting-started" },
    category: "Guides",
    order: 1,
    content: [
      block("Welcome to Flowspace documentation."),
      block(
        "This guide walks through workspace setup, inviting teammates, and creating your first project.",
      ),
    ],
  });

  await client.create({
    _type: "docPage",
    title: "Authentication",
    slug: { _type: "slug", current: "authentication" },
    category: "API",
    order: 1,
    content: [
      block("Flowspace supports GitHub OAuth and token-based API access."),
      block("Use environment variables to configure credentials in your app."),
    ],
  });
}

async function main() {
  console.log("Seeding Sanity demo content...");

  await seedSiteSettings();
  await seedHomePage();
  await seedFeatures();
  await seedPricing();
  await seedTestimonials();
  await seedAuthorAndBlogPost();
  await seedCaseStudy();
  await seedDocs();

  console.log("Seed complete.");
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
