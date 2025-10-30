import { defineField, defineType } from "sanity"
import { StackCompactIcon } from "@sanity/icons"

export const module = defineType({
  name: "module",
  title: "Modules",
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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Content", value: "CONTENT" },
          { title: "Exercise", value: "EXERCISE" },
        ],
      },
      validation: (Rule) => Rule.required().error("Module type is required"),
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
      name: "subModules",
      title: "Sub Modules",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "subModule" }],
        },
      ],
      validation: (Rule) =>
        Rule.min(1).error("At least one sub module is required."),
    }),
    defineField({
      name: "test",
      title: "Test",
      type: "reference",
      to: [{ type: "test" }],
      validation: (Rule) =>
        Rule.required().error("Each module must have a test"),
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
})
