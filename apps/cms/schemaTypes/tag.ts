import { defineField, defineType } from "sanity"
import { TagsIcon } from "@sanity/icons"

export const tag = defineType({
  name: "tag",
  type: "document",
  title: "Tags",
  icon: TagsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
      hidden: ({ document }) => !document?.title,
    }),
  ],
})
