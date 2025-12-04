import { Link } from "react-router"

import { Skeleton } from "@repo/ui/components/skeleton"
import { cn } from "@repo/ui/lib/utils"

import { useTOC } from "@repo/utils/hooks/use-toc"

export function TableOfContent({ className }: { className?: string }) {
	const { headings, activeId } = useTOC({
		containerId: "markdown-content",
	})

	return (
		<div className={cn("space-y-4", className)}>
			<h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
				Table of Contents
			</h3>
			<nav className="space-y-3">
				<ul>
					{headings?.length
						? headings
								.filter((h) => !!h.id)
								.map((heading) => {
									const { id, text } = heading
									const activeItem = activeId === id

									return (
										<li key={id}>
											<Link
												className={cn(
													"block border-l-2 py-1 pl-4 text-sm transition-colors hover:border-foreground/50 hover:text-foreground",
													activeItem
														? "border-primary font-medium text-primary"
														: "border-transparent text-muted-foreground",
												)}
												to={`#${id}`}
											>
												{text}
											</Link>
										</li>
									)
								})
						: Array.from({ length: 6 }).map((_, i) => (
								<div
									className={cn("border-transparent border-l-2 py-1 pl-4", {
										"mt-2": i !== 0,
									})}
									// biome-ignore lint/suspicious/noArrayIndexKey: Skeleton list is static
									key={i}
								>
									<Skeleton className="h-4 w-3/4" />
								</div>
							))}
				</ul>
			</nav>
		</div>
	)
}
