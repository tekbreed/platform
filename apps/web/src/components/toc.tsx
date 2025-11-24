import { useEffect, useState } from "react"

import { cn } from "@repo/ui/lib/utils"

interface TOCProps {
	content: any // Portable Text content
}

export function TableOfContents({ content }: TOCProps) {
	const [headings, setHeadings] = useState<
		{ id: string; text: string; level: number }[]
	>([])
	const [activeId, setActiveId] = useState<string>("")

	useEffect(() => {
		// Extract headings from Portable Text blocks
		// This is a simplified extraction. Real implementation depends on Portable Text structure.
		if (!content || !Array.isArray(content)) return

		const extracted = content
			.filter(
				(block: any) => block._type === "block" && block.style?.startsWith("h"),
			)
			.map((block: any) => {
				const text =
					block.children?.map((child: any) => child.text).join("") || ""
				const id = text.toLowerCase().replace(/[^\w]+/g, "-")
				return {
					id,
					text,
					level: parseInt(block.style.replace("h", ""), 10),
				}
			})

		setHeadings(extracted)
	}, [content])

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id)
					}
				})
			},
			{ rootMargin: "0px 0px -80% 0px" },
		)

		headings.forEach(({ id }) => {
			const element = document.getElementById(id)
			if (element) observer.observe(element)
		})

		return () => observer.disconnect()
	}, [headings])

	if (headings.length === 0) return null

	return (
		<div className="space-y-2 border-muted border-l-2 pl-4 text-sm">
			{headings.map((heading) => (
				<a
					className={cn(
						"block transition-colors hover:text-foreground",
						activeId === heading.id
							? "-ml-[18px] border-primary border-l-2 pl-4 font-medium text-primary"
							: "text-muted-foreground",
					)}
					href={`#${heading.id}`}
					key={heading.id}
					onClick={(e) => {
						e.preventDefault()
						document
							.getElementById(heading.id)
							?.scrollIntoView({ behavior: "smooth" })
						setActiveId(heading.id)
					}}
					style={{
						paddingLeft:
							(heading.level - 2) * 16 + (activeId === heading.id ? 16 : 0),
					}}
				>
					{heading.text}
				</a>
			))}
		</div>
	)
}
