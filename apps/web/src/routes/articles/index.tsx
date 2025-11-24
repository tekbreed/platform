import { Link, useSearchParams } from "react-router"

import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { Header } from "@repo/ui/composed/page-header"

import type { Article } from "@repo/utils/content.server/articles/types"
import { articlesQuery } from "@repo/utils/content.server/articles/queries"
import { client } from "@repo/utils/content.server/loader"

import type { Route } from "./+types/index"

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url)
	const page = Number(url.searchParams.get("page")) || 1
	const search = url.searchParams.get("search") || ""
	const category = url.searchParams.get("category") || ""
	const pageSize = 9
	const start = (page - 1) * pageSize
	const end = start + pageSize

	// Build filter query
	let filters = '_type == "article"'
	if (category) {
		filters += ` && category->slug.current == "${category}"`
	}

	const query = articlesQuery({
		search,
		filters,
		order: "createdAt desc",
	})

	const { articles, total } = await client.fetch<{
		articles: Article[]
		total: number
	}>(query, {
		start,
		end,
		search,
	})

	// Fetch all categories for the filter
	const categories = await client.fetch<Array<{ title: string; slug: string }>>(
		`*[_type == "category"] | order(title asc) { title, "slug": slug.current }`,
	)

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

// export function meta() {
// 	return generateMetadata({
// 		title: "Articles",
// 		description:
// 			"Read our latest articles, tutorials, and insights on web development.",
// 	})
// }

export default function ArticlesRoute({ loaderData }: Route.ComponentProps) {
	const {
		articles,
		categories,
		page,
		totalPages,
		category: activeCategory,
	} = loaderData
	const [searchParams, setSearchParams] = useSearchParams()

	const handleCategoryClick = (categorySlug: string) => {
		const newParams = new URLSearchParams(searchParams)
		if (categorySlug === activeCategory) {
			// Toggle off if clicking the same category
			newParams.delete("category")
		} else {
			newParams.set("category", categorySlug)
		}
		newParams.delete("page") // Reset to page 1 when changing category
		setSearchParams(newParams)
	}

	const handlePageChange = (newPage: number) => {
		const newParams = new URLSearchParams(searchParams)
		newParams.set("page", newPage.toString())
		setSearchParams(newParams)
		// Scroll to top
		window.scrollTo({ top: 0, behavior: "smooth" })
	}

	return (
		<>
			<Header
				className="mb-12"
				description="Explore our latest thoughts, tutorials, and insights."
				enableSearch
				placeholder="search articles..."
				title="Articles"
			/>

			{/* Category Filter */}
			{categories && categories.length > 0 && (
				<div className="mx-auto w-full max-w-6xl px-4 pb-8">
					<div className="flex flex-wrap items-center gap-2">
						<Badge
							className="cursor-pointer transition-colors hover:bg-primary/20"
							onClick={() => {
								const newParams = new URLSearchParams(searchParams)
								newParams.delete("category")
								newParams.delete("page")
								setSearchParams(newParams)
							}}
							variant={!activeCategory ? "default" : "outline"}
						>
							All
						</Badge>
						{categories.map((cat) => (
							<Badge
								className="cursor-pointer transition-colors hover:bg-primary/20"
								key={cat.slug}
								onClick={() => handleCategoryClick(cat.slug)}
								variant={activeCategory === cat.slug ? "default" : "outline"}
							>
								{cat.title}
							</Badge>
						))}
					</div>
				</div>
			)}

			<div className="mx-auto w-full max-w-7xl px-4 py-6">
				{articles.length > 0 ? (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{articles.map((article) => (
							<Link
								className="group block h-full"
								key={article.id}
								to={`/articles/${article.slug}`}
							>
								<div className="group flex h-full flex-col rounded-xl border border-border/10 bg-card p-5 transition-colors hover:bg-muted/50">
									{article.image && (
										<div className="mb-4 overflow-hidden rounded-xl bg-muted/20">
											<img
												alt={article.title}
												className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
												src={article.image}
											/>
										</div>
									)}
									<div className="flex flex-1 flex-col">
										<div className="mb-2 text-muted-foreground text-sm">
											<time dateTime={article.createdAt}>
												{new Date(article.createdAt).toLocaleDateString(
													"en-US",
													{
														month: "long",
														day: "numeric",
														year: "numeric",
													},
												)}
											</time>
										</div>
										<h3 className="mb-2 font-bold text-xl leading-tight tracking-tight group-hover:text-primary">
											{article.title}
										</h3>

										<div className="mb-4 flex items-center gap-2 text-muted-foreground text-sm">
											{article.author?.image && (
												<img
													alt={article.author.name}
													className="h-5 w-5 rounded-full object-cover"
													src={article.author.image}
												/>
											)}
											<span>{article.author?.name}</span>
										</div>

										<p className="line-clamp-3 text-muted-foreground">
											{article.excerpt}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="py-12 text-center text-muted-foreground">
						<p>No articles found.</p>
					</div>
				)}

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="mt-12 flex items-center justify-center gap-2">
						<Button
							disabled={page <= 1}
							onClick={() => handlePageChange(page - 1)}
							size="sm"
							variant="outline"
						>
							Previous
						</Button>

						<div className="flex items-center gap-1">
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(pageNum) => {
									// Show first page, last page, current page, and pages around current
									const showPage =
										pageNum === 1 ||
										pageNum === totalPages ||
										(pageNum >= page - 1 && pageNum <= page + 1)

									if (!showPage) {
										// Show ellipsis
										if (pageNum === page - 2 || pageNum === page + 2) {
											return (
												<span
													className="px-2 text-muted-foreground"
													key={pageNum}
												>
													…
												</span>
											)
										}
										return null
									}

									return (
										<Button
											key={pageNum}
											onClick={() => handlePageChange(pageNum)}
											size="sm"
											variant={page === pageNum ? "default" : "outline"}
										>
											{pageNum}
										</Button>
									)
								},
							)}
						</div>

						<Button
							disabled={page >= totalPages}
							onClick={() => handlePageChange(page + 1)}
							size="sm"
							variant="outline"
						>
							Next
						</Button>
					</div>
				)}
			</div>
		</>
	)
}
