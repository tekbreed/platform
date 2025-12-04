import groq from "groq"
import { z } from "zod/v4"

import type { Article } from "@repo/utils/content.server/articles/types"
import { client } from "@repo/utils/content.server/loader"

/**
 * GROQ query to fetch all categories
 * @returns {string} GROQ query string that returns:
 * - Category information (id, title, slug)
 * - All categories in the system
 */
export const categoryQuery = groq`*[_type == "category"] {
  "id": _id,
  title,
  "slug": slug.current
}`

/**
 * Schema for article category
 * Defines the structure of a category that an article can belong to.
 *
 * @property {string} id - Unique identifier for the category
 * @property {string} title - Display title of the category
 * @property {string} slug - URL-friendly identifier for the category
 */
export const CategorySchema = z.object({
	id: z.string(),
	title: z.string(),
	slug: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

export async function getArticles(request: Request) {
	const url = new URL(request.url)
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1)
	const search = (url.searchParams.get("search") || "").trim()
	const category = (url.searchParams.get("category") || "").trim()
	const pageSize = 9
	const start = (page - 1) * pageSize

	const query = groq`{
		"articles": *[
			_type == 'article' 
			&& published == true
			${category ? `&& category->slug.current == $category` : ""}
			${search ? `&& (title match $search || excerpt match $search || pt::text(content) match $search)` : ""}
		] | order(createdAt desc) [$start...$end] {
			"id": _id,
			title,
			"slug": slug.current,
			"image": image.asset->url,
			createdAt,
			"updatedAt": _updatedAt,
			"category": category->{
				"id": _id,
				title,
				"slug": slug.current
			},
			"author": author->{
				"id": _id,
				name,
				"image": image.asset->url,
				bio
			}
		},
		"total": count(*[
			_type == 'article' 
			&& published == true
			${category ? `&& category->slug.current == $category` : ""}
			${search ? `&& (title match $search || excerpt match $search || pt::text(content) match $search)` : ""}
		])
	}`

	const params = {
		start,
		end: start + pageSize,
		...(search && { search: `${search}*` }),
		...(category && { category }),
	}

	const { articles, total } = await client.fetch<{
		articles: Article[]
		total: number
	}>(query, params)

	const categories =
		await client.fetch<z.infer<typeof CategorySchema>[]>(categoryQuery)

	const totalPages = Math.ceil(total / pageSize)

	return {
		articles,
		total,
		page,
		pageSize,
		search,
		category,
		categories,
		totalPages,
	}
}
