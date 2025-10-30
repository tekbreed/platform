import { defineField, defineType } from "sanity"
import { BookIcon } from "@sanity/icons"

export const tutorialLesson = defineType({
  name: "tutorialLesson",
  title: "Tutorial Lessons",
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
      title: "Created Date",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Created Date is required"),
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
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required().error("Order is required"),
      description: "The order of this lesson within the module",
    }),
    defineField({
      name: "module",
      title: "Module",
      type: "reference",
      to: [{ type: "tutorialModule" }],
      validation: (Rule) =>
        Rule.required().error("Module reference is required"),
      description: "The module this lesson belongs to",
    }),
  ],

  preview: {
    select: {
      title: "title",
      order: "order",
      module: "module.title",
    },
    prepare(selection) {
      const { title, order, module } = selection
      return {
        title: title,
        subtitle: module ? `${module} - Lesson ${order}` : `Lesson ${order}`,
      }
    },
  },
})
