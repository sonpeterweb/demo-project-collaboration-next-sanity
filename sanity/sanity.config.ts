import { codeInput } from "@sanity/code-input";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemas";

// Sanity Studio configuration
// Only SANITY_STUDIO_* env vars are exposed to the Studio bundle (loaded from sanity/.env)
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Flowspace CMS",
  projectId,
  dataset,
  plugins: [structureTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
