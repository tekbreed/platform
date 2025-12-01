import groq from "groq"
import { z } from "zod/v4"

import { AuthorSchema } from "@repo/utils/content.server/authors/types"
import { client } from "@repo/utils/content.server/loader"
import { bundleMarkdown } from "@repo/utils/mdx.server"
import { bundleComponents, MarkdownConverter } from "@repo/utils/misc.server"
import { ComponentSchema, SandpackTemplateSchema } from "@repo/utils/sanity"

import { CategorySchema } from "./loader.index.server"

/**
 * Schema for related articles
 * Defines the structure of articles that are related to the current article.
 *
 * @property {string} id - Unique identifier for the related article
 * @property {string} title - Title of the related article
 * @property {string} slug - URL-friendly identifier for the related article
 * @property {string} createdAt - Creation timestamp of the related article
 * @property {string} image - URL of the related article's image
 * @property {string} excerpt - Short description of the related article
 */
const RelatedArticlesSchema = z
	.array(
		z.object({
			id: z.string(),
			title: z.string(),
			slug: z.string(),
			createdAt: z.string(),
			category: CategorySchema,
			author: AuthorSchema,
			image: z.string(),
			excerpt: z.string(),
			content: z.string(),
		}),
	)
	.default([])

/**
 * Schema for a complete article
 * Defines the structure of an article in the system.
 *
 * @property {string} id - Unique identifier for the article
 * @property {string} title - Title of the article
 * @property {string} slug - URL-friendly identifier for the article
 * @property {string} createdAt - Creation timestamp
 * @property {CategorySchema} category - The article's category
 * @property {Author} [author] - The article's author (optional for backward compatibility)
 * @property {TagsSchema} tags - Array of tags associated with the article
 * @property {string} image - URL of the article's main image
 * @property {string} excerpt - Short description of the article
 * @property {string} content - The markdown bundled content of the article
 * @property {string} markdown - The markdown content before processing
 * @property {string} html - The processed html content before processing
 * @property {RelatedArticlesSchema} relatedArticles - Array of related articles
 * @property {SandpackTemplateSchema[]} sandpackTemplates - Array of associated Sandpack templates
 * @property {ComponentSchema[]} reactComponents - Array of React components used in the article
 */
export const ArticleSchema = z.object({
	id: z.string(),
	title: z.string(),
	slug: z.string(),
	createdAt: z.iso.datetime({ offset: true }),
	updatedAt: z.iso.datetime({ offset: true }),
	category: CategorySchema,
	author: AuthorSchema,
	image: z.string(),
	featured: z.boolean().nullable(),
	published: z.boolean().nullable(),
	excerpt: z.string(),
	content: z.string(),
	markdown: z.string(),
	html: z.string(),
	relatedArticles: RelatedArticlesSchema,
	sandpackTemplates: z.array(SandpackTemplateSchema),
	reactComponents: z.array(ComponentSchema),
})

/**
 * Type representing a complete article
 */
export type Article = z.infer<typeof ArticleSchema>

/**
 * Type representing an array of related articles
 */
export type RelatedArticles = z.infer<typeof RelatedArticlesSchema>

/**
 * Type representing a Sandpack template
 */
export type SandpackTemplate = z.infer<typeof SandpackTemplateSchema>

/**
 * GROQ query to fetch detailed information about a specific article
 * @returns {string} GROQ query string that returns article details including:
 * - Basic article information (id, title, slug, etc.)
 * - Category information
 * - Tags
 * - Image URL
 * - Content
 * - Associated Sandpack templates
 * - Associated React components
 */
export const articleDetailsQuery = groq`*[_type == "article" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
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
    skills,
    socialLinks,
    createdAt,
    bio
  },
  "image": image.asset->url,
  excerpt,
  content,
  "sandpackTemplates": sandpackTemplates[]->{
    "id": _id,
    title,
    "slug": slug.current,
    description,
    template,
    sandpackFiles,
    options,
    customSetup
  },
  "reactComponents": reactComponents[]->{
    "id": _id,
    title,
    file
  }
}`

/**
 * GROQ query to fetch articles related to a specific article
 * @returns {string} GROQ query string that returns up to 3 related articles based on:
 * - Shared tags
 * - Same category
 * - Excludes the current article
 * - Sorted by creation date
 */
export const relatedQuery = groq`
  *[_type == "article" && published == true && slug.current != $slug && ( category._ref == $categoryId )] | order(createdAt desc) [0...3] {
    id,
    title,
    slug,
    createdAt,
    image,
    content,
    category->{
      id,
      title,
      slug
    }
  }
`

/**
 * Retrieves detailed information about a specific article by its slug
 * @param {string} slug - The slug of the article to retrieve
 * @returns {Promise<Article & {content: string, relatedArticles: Article[], sandpackTemplates: any[]}>}
 * Detailed article information including processed content, related articles, and sandpack templates
 * @example
 * // Get full details of an article about React hooks
 * const article = await getArticleDetails("react-hooks-guide");
 * console.log(article.title); // "Complete Guide to React Hooks"
 */
export async function getArticleDetails(slug: string) {
	const article = await client.fetch<Article>(articleDetailsQuery, { slug })
	const relatedArticles = await client.fetch<RelatedArticles>(relatedQuery, {
		slug,
		categoryId: article.category?.id,
	})

	const refinedComponents = bundleComponents(article.reactComponents)

	const { code } = await bundleMarkdown({
		source: article.content,
		files: refinedComponents,
	})

	/**
	 * Tiptap editor needs html
	 * MDX previewer needs bundled markdown
	 */
	return {
		...article,
		content: code,
		markdown: article.content,
		html: await MarkdownConverter.toHtml(article.content),
		relatedArticles:
			(await Promise.all(
				(relatedArticles ?? []).map(async (a) => ({
					...a,
					markdown: a.content,
				})),
			)) || [],
		sandpackTemplates: article.sandpackTemplates || [],
	}
}
