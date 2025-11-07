import { BookIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const homePage = defineType({
	name: "homePage",
	title: "Home Page",
	type: "document",
	icon: BookIcon,
	fields: [
		defineField({
			name: "latestFeature",
			title: "Latest Feature",
			type: "string",
		}),
		defineField({
			name: "features",
			title: "Features",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						defineField({
							name: "icon",
							title: "Icon",
							type: "string",
						}),
						defineField({
							name: "released",
							title: "Released",
							type: "boolean",
							initialValue: false,
						}),
						defineField({
							name: "name",
							title: "Name",
							type: "string",
						}),
						defineField({
							name: "description",
							title: "Description",
							type: "text",
						}),
					],
				},
			],
		}),
	],
})
