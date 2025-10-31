import { defineField, defineType } from "sanity";
import { StackCompactIcon } from "@sanity/icons";

export const subModule = defineType({
  name: "subModule",
  title: "Sub Modules",
  type: "document",
  icon: StackCompactIcon,
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
      name: "lessons",
      title: "Lessons",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "lesson" }],
        },
      ],
      validation: (Rule) =>
        Rule.min(1).error("At least one lesson is required."),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
