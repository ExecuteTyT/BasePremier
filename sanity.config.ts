import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "base-premier",
  title: "BASE Premier",
  projectId: "tfhw7732",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: "2024-01-01" })],
  schema: {
    types: schemaTypes,
  },
});
