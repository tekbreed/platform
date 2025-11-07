import { Link, useLocation } from "react-router"

import { format } from "date-fns"
import { Calendar, Clock } from "lucide-react"
import { readingTime } from "reading-time-estimator"

import type { Article } from "@repo/utils/content/articles/types"
import type { Tutorial } from "@repo/utils/content/turorials/types"
import { getInitials } from "@repo/utils/misc"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/breadcrumb"
import { BackgroundCanvas } from "./background-canvas"

type DetailsHeaderProps = {
	item: Article | Tutorial // | Course
}

export function DetailsHeader({ item }: DetailsHeaderProps) {
	const location = useLocation()
	const itemType = location.pathname.split("/")[1]
	const isArticle = itemType === "articles"
	const isTutorial = itemType === "tutorials"
	// const isCourse = itemType === "courses";

	const stats = "markdown" in item ? readingTime(item.markdown) : null

	return (
		<div className="relative isolate mt-13 overflow-hidden border-b border-border py-4">
			<BackgroundCanvas />
			<div className="relative z-10 container mx-auto px-4">
				<div className="mx-auto">
					<div>
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<Link
										to={`/${itemType}`}
										className="text-lg capitalize hover:text-blue-600 dark:hover:text-blue-400"
									>
										{itemType}
									</Link>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								{isTutorial ? (
									<BreadcrumbItem>
										<Link
											to={`/tutorials/${item.slug}`}
											className="text-lg capitalize hover:text-blue-600 dark:hover:text-blue-400"
										>
											{item.title}
										</Link>
									</BreadcrumbItem>
								) : (
									<BreadcrumbItem>
										<BreadcrumbPage className="text-lg">
											{item.title}
										</BreadcrumbPage>
									</BreadcrumbItem>
								)}
							</BreadcrumbList>
						</Breadcrumb>
					</div>

					<h1 className="mt-2 mb-3 text-2xl font-bold md:text-3xl">
						{item.title}
					</h1>

					<div className="flex flex-wrap items-center gap-4">
						{item.category ? (
							<span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
								{item.category.title}
							</span>
						) : null}
						{item.createdAt ? (
							<>
								<span className="text-muted-foreground">•</span>
								<div className="flex items-center text-muted-foreground">
									<Calendar className="mr-1 h-4 w-4" />
									<span>{format(item.createdAt, "MMMM dd, yyyy")}</span>
								</div>
							</>
						) : null}

						{isArticle ? (
							<>
								<span className="text-muted-foreground">•</span>
								<div className="flex items-center text-muted-foreground">
									<Clock className="mr-1 h-4 w-4" />
									<span>{stats?.text}</span>
								</div>
							</>
						) : null}
						{item.author ? (
							<>
								<span className="text-muted-foreground">•</span>
								<div className="flex items-center gap-2">
									<Avatar className="size-6">
										<AvatarImage src={item.author.image} />
										<AvatarFallback>
											{getInitials(item.author.name)}
										</AvatarFallback>
									</Avatar>
									<p className="text-sm font-medium">{item.author.name}</p>
								</div>
							</>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}
