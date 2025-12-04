import { defineField, defineType } from "sanity"

export const test = defineType({
	name: "test",
	title: "Test",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required().error("Title is required"),
		}),
		defineField({
			name: "module",
			title: "Module",
			type: "reference",
			to: [{ type: "module" }],
			validation: (Rule) =>
				Rule.required().error("Test must be linked to a module"),
			description: "The module this test belongs to",
		}),
		defineField({
			name: "questions",
			title: "Questions",
			type: "array",
			of: [
				defineField({
					type: "object",
					name: "question",
					title: "Question",
					fields: [
						defineField({
							name: "type",
							title: "Type",
							type: "string",
							options: {
								list: [
									{ title: "Multiple Choice", value: "MULTIPLE_CHOICE" },
									{ title: "True or False", value: "TRUE_FALSE" },
									{ title: "Short Answer", value: "SHORT_ANSWER" },
								],
							},
							validation: (Rule) =>
								Rule.required().error("Question type is required"),
						}),
						defineField({
							name: "questionText",
							title: "Question Text",
							type: "string",
							validation: (Rule) =>
								Rule.required().error("Question text is required"),
						}),
						defineField({
							name: "options",
							title: "Options",
							type: "array",
							of: [{ type: "string" }],
							hidden: ({ parent }) => parent?.type === "SHORT_ANSWER",
							validation: (Rule) =>
								Rule.custom((options, context) => {
									// @ts-expect-error
									const type = context?.parent?.type
									if (
										type === "MULTIPLE_CHOICE" &&
										(!options || options.length < 2)
									) {
										return "At least two options are required for multiple choice"
									}
									if (
										type === "TRUE_FALSE" &&
										(!options || options.length !== 2)
									) {
										return "Exactly two options (True and False) are required for true/false"
									}
									return true
								}),
							description:
								"Provide options for multiple choice or true/false questions.",
						}),
						defineField({
							name: "correctAnswer",
							title: "Correct Answer",
							type: "string",
							validation: (Rule) =>
								Rule.required().error("Correct answer is required"),
							description:
								"For multiple choice and true/false, must match one of the options above.",
						}),
					],
				}),
			],
			validation: (Rule) =>
				Rule.min(1).error("At least one question is required"),
		}),
	],
	preview: {
		select: {
			title: "title",
			module: "module.title",
		},
		prepare(selection) {
			const { title, module } = selection
			return {
				title: title,
				subtitle: module ? `Module: ${module}` : undefined,
			}
		},
	},
})
