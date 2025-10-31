import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Members",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Name is required"),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required().error("Role is required"),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      validation: (Rule) => Rule.required().error("Bio is required"),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required().error("Image is required"),
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) =>
        Rule.min(1).error("At least one specialty is required"),
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "github",
          title: "GitHub",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
        defineField({
          name: "website",
          title: "Website",
          type: "url",
        }),
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description:
        "Order in which this team member should appear (lower numbers appear first)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      role: "role",
      order: "order",
      media: "image",
    },
    prepare(selection) {
      const { title, role, order } = selection;
      return {
        title: title,
        subtitle: `${role} (Order: ${order})`,
        media: selection.media,
      };
    },
  },
});
