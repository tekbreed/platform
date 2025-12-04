import { href, Link } from "react-router"

import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"

import type { Article } from "../loader.article.server"

interface ArticleCardProps {
	article: Pick<
		Article,
		"id" | "slug" | "title" | "image" | "createdAt" | "author"
	>
}

export function ArticleCard({ article }: ArticleCardProps) {
	const { slug, title, image, createdAt, author } = article
	return (
		<Link
			className="group block h-full"
			prefetch="intent"
			to={href("/articles/:articleSlug", {
				articleSlug: slug,
			})}
		>
			<div className="group flex h-full flex-col rounded-xl border border-border/10 bg-card p-5 transition-colors hover:bg-muted/50">
				<div className="mb-4 overflow-hidden rounded-xl bg-muted/20">
					<img
						alt={title}
						className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
						src={image}
					/>
				</div>
				<div className="flex flex-1 flex-col">
					<h3 className="mb-2 font-bold text-xl leading-tight tracking-tight group-hover:text-primary">
						{title}
					</h3>
					<div className="mb-4 flex items-center gap-2 text-muted-foreground text-sm">
						<Avatar>
							<AvatarFallback>
								{author.name.charAt(0).toUpperCase()}
							</AvatarFallback>
							<AvatarImage alt={author.name} src={author.image} />
						</Avatar>
						<span>{author.name}</span>
					</div>
					<div className="mb-2 text-muted-foreground text-sm">
						<time dateTime={createdAt}>
							{format(new Date(createdAt), "MMMM d, yyyy")}
						</time>
					</div>
				</div>
			</div>
		</Link>
	)
}
