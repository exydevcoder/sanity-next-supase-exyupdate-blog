import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from '@sanity/code-input'; // Add this import
import { EarthAmericasIcon } from "@sanity/icons";
import { schemaTypes } from "@/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const config = defineConfig({
  projectId,
  dataset,
  title: "ExyUpdate",
  apiVersion: "2023-08-01",
  basePath: "/admin",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Posts")
              .icon(EarthAmericasIcon)
              .child(S.documentTypeList("post")),
            S.listItem().title("Authors").child(S.documentTypeList("author")),
            S.listItem()
              .title("Categories")
              .child(S.documentTypeList("category")),
            S.listItem()
              .title("Adverts")
              .child(S.documentTypeList("adverts")),
          ]),
    }),
    codeInput(), // Add the code input plugin
  ],
  schema: {
    types: schemaTypes,
  },
});