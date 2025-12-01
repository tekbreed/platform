import { useSearchParams } from "react-router"

import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react"

import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { EmptyState } from "@repo/ui/composed/empty-state"
import { Header } from "@repo/ui/composed/page-header"

import type { Route } from "./+types/index"
import { ArticleCard } from "./components/article-card"
import {
	type Category as ArticleCategory,
	getArticles,
} from "./loader.index.server"

export async function loader({ request }: Route.LoaderArgs) {
	return await getArticles(request)
}

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
			newParams.delete("category")
		} else {
			newParams.set("category", categorySlug)
		}
		newParams.delete("page")
		setSearchParams(newParams)
	}

	const handlePageChange = (newPage: number) => {
		const newParams = new URLSearchParams(searchParams)
		newParams.set("page", newPage.toString())
		setSearchParams(newParams)
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

			<Categories
				activeCategory={activeCategory}
				categories={categories}
				handleCategoryClick={handleCategoryClick}
			/>
			<div className="mx-auto w-full max-w-7xl px-4 py-6">
				{articles?.length ? (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{articles.map((article) => (
							<ArticleCard article={article} key={article.id} />
						))}
					</div>
				) : (
					<EmptyState
						action={{
							label: "Clear search",
							onClick: () => {
								setSearchParams({})
							},
						}}
						className="mx-auto max-w-3xl"
						description="No articles match your search criteria."
						icon={<SearchIcon />}
						title="No articles found"
					/>
				)}

				{/* Pagination */}
				{totalPages > 1 ? (
					<Pagination
						handlePageChange={handlePageChange}
						page={page}
						totalPages={totalPages}
					/>
				) : null}
			</div>
		</>
	)
}

/*
 * Category Filter
 */
function Categories({
	categories,
	activeCategory,
	handleCategoryClick,
}: {
	categories: ArticleCategory[]
	activeCategory: string | null
	handleCategoryClick: (slug: string) => void
}) {
	const [searchParams, setSearchParams] = useSearchParams()

	return (
		<div className="mx-auto w-full max-w-7xl px-4 pb-8">
			<div className="flex flex-wrap items-center gap-2">
				<Badge
					className="cursor-pointer p-2 transition-colors hover:bg-primary/20"
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
						className="cursor-pointer p-2 transition-colors hover:bg-primary/20"
						key={cat.slug}
						onClick={() => handleCategoryClick(cat.slug)}
						variant={activeCategory === cat.slug ? "default" : "outline"}
					>
						{cat.title}
					</Badge>
				))}
			</div>
		</div>
	)
}

function Pagination({
	totalPages,
	page,
	handlePageChange,
}: {
	totalPages: number
	page: number
	handlePageChange: (newPage: number) => void
}) {
	return (
		<div className="mt-12 flex items-center justify-center gap-2">
			<Button
				disabled={page <= 1}
				onClick={() => handlePageChange(page - 1)}
				size="icon"
				variant="outline"
			>
				<ChevronLeft />
			</Button>

			<div className="flex items-center gap-1">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
					// Show first page, last page, current page, and pages around current
					const showPage =
						pageNum === 1 ||
						pageNum === totalPages ||
						(pageNum >= page - 1 && pageNum <= page + 1)

					if (!showPage) {
						// Show ellipsis
						if (pageNum === page - 2 || pageNum === page + 2) {
							return <span className="px-2 text-muted-foreground">…</span>
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
				})}
			</div>

			<Button
				disabled={page >= totalPages}
				onClick={() => handlePageChange(page + 1)}
				size="icon"
				variant="outline"
			>
				<ChevronRight />
			</Button>
		</div>
	)
}
