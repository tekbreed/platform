import { DashboardIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const category = defineType({
	name: "category",
	type: "document",
	title: "Categories",
	icon: DashboardIcon,
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
	],
})
