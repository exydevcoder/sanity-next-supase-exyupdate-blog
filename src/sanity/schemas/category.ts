import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Category Image",
      type: "image",
      options: {
        hotspot: true, // Enables image cropping
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }],
      // This prevents circular references
      options: {
        filter: "!defined(parent)",
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "parent.title",
      media: "image", // This selects the image for preview
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        media, // This displays the image in the preview
        subtitle: subtitle ? `Subcategory of ${subtitle}` : "Main category",
      };
    },
  },
});