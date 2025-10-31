import { defineField, defineType } from "sanity";
import { StackCompactIcon } from "@sanity/icons";

export const roadmap = defineType({
  name: "roadmap",
  title: "Roadmap",
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
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().error("Description is required"),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required().error("Category is required"),
      options: {
        list: [
          "articles",
          "tutorials",
          "ai-learning-assistant",
          "courses",
          "programs",
          "team-learning",
          "job-board",
          "learning-resources-store",
        ],
      },
    }),

    defineField({
      name: "progress",
      title: "Progress",
      type: "number",
      validation: (Rule) => Rule.required().error("Progress is required"),
    }),

    defineField({
      name: "status",
      title: "  Status",
      type: "string",
      validation: (Rule) => Rule.required().error("Status is required"),
      options: {
        list: ["Completed", "In Progress", "Planned"],
      },
    }),

    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required().error("Start Date is required"),
    }),

    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required().error("Order is required"),
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
  ],
  preview: {
    select: {
      title: "title",
      startDate: "startDate",
      order: "order",
      published: "published",
      content: "content",
    },
    prepare(selection) {
      const { title, startDate, order, published, content } = selection;
      return {
        title: title,
        subtitle: `${startDate} - ${order} - ${published ? "Published" : "Draft"} - ${content.slice(0, 50)}`,
      };
    },
  },
});
