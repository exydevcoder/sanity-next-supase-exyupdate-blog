import { defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineField({
      name: "block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Small", value: "small" },
        { title: "Medium", value: "medium" },
        { title: "Large", value: "large" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineField({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
              }),
            ],
          }),
          defineField({
            name: "color",
            type: "object",
            title: "Text Color",
            fields: [
              defineField({
                name: "value",
                type: "string",
                title: "Color",
                options: {
                  list: [
                    { title: "Red", value: "#ef4444" },
                    { title: "Blue", value: "#3b82f6" },
                    { title: "Green", value: "#10b981" },
                    { title: "Purple", value: "#8b5cf6" },
                    { title: "Orange", value: "#f97316" },
                    { title: "Pink", value: "#ec4899" },
                    { title: "Yellow", value: "#eab308" },
                    { title: "Gray", value: "#6b7280" },
                  ],
                  layout: "dropdown",
                },
              }),
            ],
          }),
          defineField({
            name: "highlight",
            type: "object",
            title: "Highlight",
            fields: [
              defineField({
                name: "value",
                type: "string",
                title: "Background Color",
                options: {
                  list: [
                    { title: "Yellow Highlight", value: "#fef3c7" },
                    { title: "Blue Highlight", value: "#dbeafe" },
                    { title: "Green Highlight", value: "#d1fae5" },
                    { title: "Pink Highlight", value: "#fce7f3" },
                    { title: "Purple Highlight", value: "#e9d5ff" },
                    { title: "Orange Highlight", value: "#fed7aa" },
                  ],
                  layout: "dropdown",
                },
              }),
            ],
          }),
        ],
      },
    }),
    // Add blockquote as a separate block type instead of a style
    defineField({
      name: "blockquote",
      type: "object",
      title: "Quote",
      fields: [
        defineField({
          name: "quote",
          type: "text",
          title: "Quote",
          rows: 4,
        }),
        defineField({
          name: "author",
          type: "string",
          title: "Author (optional)",
        }),
        defineField({
          name: "source",
          type: "string",
          title: "Source (optional)",
        }),
      ],
      preview: {
        select: {
          quote: "quote",
          author: "author",
        },
        prepare({ quote, author }) {
          return {
            title: quote ? `"${quote.substring(0, 50)}${quote.length > 50 ? "..." : ""}"` : "Quote",
            subtitle: author ? `— ${author}` : "Quote block",
          };
        },
      },
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "code",
      type: "code",
      title: "Code Block",
      options: {
        languageAlternatives: [
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "NodeJs", value: "nodejs" },
        ],
      },
    }),
  ],
});