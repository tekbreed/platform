import { defineField, defineType } from "sanity";
import { ClockIcon } from "@sanity/icons";

export const journey = defineType({
  name: "journey",
  title: "Journey",
  type: "document",
  icon: ClockIcon,
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
      options: {
        list: [
          { title: "Foundation", value: "foundation" },
          { title: "Growth", value: "growth" },
          { title: "Milestone", value: "milestone" },
          { title: "Achievement", value: "achievement" },
        ],
      },
      validation: (Rule) => Rule.required().error("Category is required"),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required().error("Year is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required().error("Image is required"),
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
      category: "category",
      year: "year",
      media: "image",
    },
    prepare(selection) {
      const { title, category, year } = selection;
      return {
        title: title,
        subtitle: `${category} - ${year}`,
        media: selection.media,
      };
    },
  },
});
