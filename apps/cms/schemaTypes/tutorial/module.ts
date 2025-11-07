import { StackCompactIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const tutorialModule = defineType({
	name: "tutorialModule",
	title: "Tutorial Modules",
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
			name: "description",
			title: "Description",
			type: "text",
			validation: (Rule) => Rule.required().error("Description is required"),
		}),
		defineField({
			name: "order",
			title: "Order",
			type: "number",
			validation: (Rule) => Rule.required().error("Order is required"),
			description: "The order of this module within the tutorial",
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
			name: "lessons",
			title: "Lessons",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "tutorialLesson" }],
				},
			],
			validation: (Rule) =>
				Rule.min(1).error("At least one lesson is required."),
		}),
		defineField({
			name: "tutorial",
			title: "Tutorial",
			type: "reference",
			to: [{ type: "tutorial" }],
			validation: (Rule) =>
				Rule.required().error("Tutorial reference is required"),
			description: "The tutorial this module belongs to",
		}),
	],

	preview: {
		select: {
			title: "title",
			order: "order",
			tutorial: "tutorial.title",
		},
		prepare(selection) {
			const { title, order, tutorial } = selection
			return {
				title: title,
				subtitle: tutorial
					? `${tutorial} - Module ${order}`
					: `Module ${order}`,
			}
		},
	},
})
