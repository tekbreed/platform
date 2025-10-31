import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const lesson = defineType({
  name: "lesson",
  title: "Lessons",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
      hidden: ({ document }) => !document?.title,
    }),

    defineField({
      name: "createdAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Published Date is required"),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "markdown",
      validation: (Rule) => Rule.required().error("Content is required"),
    }),
    defineField({
      name: "sandpackTemplates",
      title: "Embedded Sandpack Templates",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "sandpack" }],
        },
      ],
    }),
    defineField({
      name: "reactComponents",
      title: "Embedded React Components",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "component" }],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "image",
    },
  },
});
