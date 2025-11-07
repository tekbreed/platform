import { BookIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export { tutorialModule } from "./module"

export const tutorial = defineType({
	name: "tutorial",
	title: "Tutorials",
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
			name: "overview",
			title: "Overview",
			type: "markdown",
			validation: (Rule) => Rule.required().error("Overview is required"),
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
			name: "image",
			title: "Image",
			type: "image",
			validation: (Rule) => Rule.required().error("Image is required"),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "reference",
			to: [{ type: "category" }],
			validation: (Rule) => Rule.required().error("Category is required"),
		}),
		defineField({
			name: "author",
			title: "Author",
			type: "reference",
			to: [{ type: "author" }],
			validation: (Rule) => Rule.required().error("Author is required"),
		}),
		defineField({
			name: "tags",
			title: "Tags",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "tag" }],
				},
			],
		}),
		defineField({
			name: "published",
			title: "Published",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "premium",
			title: "Premium",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "createdAt",
			title: "Created Date",
			type: "datetime",
			validation: (Rule) => Rule.required().error("Created Date is required"),
		}),
		defineField({
			name: "modules",
			title: "Modules",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "tutorialModule" }],
				},
			],
			validation: (Rule) =>
				Rule.min(1).error("At least one module is required."),
		}),
	],

	preview: {
		select: {
			title: "title",
			subtitle: "slug.current",
			media: "category",
		},
	},
})
