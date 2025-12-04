import { HelpCircleIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const faqs = defineType({
	name: "faqs",
	title: "FAQs",
	type: "document",
	icon: HelpCircleIcon,
	fields: [
		defineField({
			name: "question",
			title: "Question",
			type: "string",
			validation: (Rule) => Rule.required().error("Question is required"),
		}),
		defineField({
			name: "answer",
			title: "Answer",
			type: "text",
			validation: (Rule) => Rule.required().error("Answer is required"),
		}),
		defineField({
			name: "category",
			title: "Category",
			type: "string",
			options: {
				list: [
					{ title: "General", value: "general" },
					{ title: "Technical", value: "technical" },
					{ title: "Programs", value: "programs" },
					{ title: "Courses", value: "courses" },
					{ title: "Tutorials", value: "tutorials" },
					{ title: "Subscription", value: "subscription" },
				],
			},
			validation: (Rule) => Rule.required().error("Category is required"),
		}),
		defineField({
			name: "order",
			title: "Order",
			type: "number",
			description:
				"Order in which this FAQ should appear (lower numbers appear first)",
			initialValue: 0,
		}),
		defineField({
			name: "published",
			title: "Published",
			type: "boolean",
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: "question",
			category: "category",
			order: "order",
		},
		prepare(selection) {
			const { title, category, order } = selection
			return {
				title: title,
				subtitle: `${category} (Order: ${order})`,
			}
		},
	},
})
