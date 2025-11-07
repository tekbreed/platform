import { UserIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const author = defineType({
	name: "author",
	title: "Authors",
	type: "document",
	icon: UserIcon,
	fields: [
		defineField({
			name: "name",
			title: "Full Name",
			type: "string",
			validation: (Rule) => Rule.required().error("Name is required"),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required().error("Slug is required"),
			hidden: ({ document }) => !document?.name,
		}),
		defineField({
			name: "image",
			title: "Profile Image",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required().error("Profile image is required"),
		}),
		defineField({
			name: "bio",
			title: "Bio",
			type: "text",
			rows: 4,
			validation: (Rule) => Rule.required().error("Bio is required"),
		}),
		defineField({
			name: "skills",
			title: "Skills",
			type: "array",
			of: [
				{
					type: "string",
				},
			],
			options: {
				layout: "tags",
			},
			validation: (Rule) => Rule.min(1).error("At least one skill is required"),
		}),
		defineField({
			name: "socialLinks",
			title: "Social Media Links",
			type: "object",
			fields: [
				{
					name: "github",
					title: "GitHub",
					type: "url",
				},
				{
					name: "linkedin",
					title: "LinkedIn",
					type: "url",
				},
				{
					name: "twitter",
					title: "Twitter/X",
					type: "url",
				},
				{
					name: "website",
					title: "Personal Website",
					type: "url",
				},
			],
		}),
		defineField({
			name: "supportUrl",
			title: "Support the Author",
			type: "url",
			description: "URL to support the author",
		}),
		defineField({
			name: "isActive",
			title: "Active Author",
			type: "boolean",
			initialValue: true,
			description:
				"Whether this author is currently active and can be assigned to new articles",
		}),
		defineField({
			name: "createdAt",
			title: "Created At",
			type: "datetime",
			readOnly: true,
			initialValue: () => new Date().toISOString(),
		}),
	],

	preview: {
		select: {
			title: "name",
			subtitle: "bio",
			media: "image",
		},
	},
})
