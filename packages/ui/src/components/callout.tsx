import type React from "react"

import { Icons } from "@/composed/icons"
import { cn } from "@/lib/utils"

interface CalloutProps {
	variant?: "info" | "caution" | "danger"
	title?: string
	children: React.ReactNode
	className?: string
}

const variants = {
	info: {
		container:
			"border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
		icon: "text-blue-600 dark:text-blue-400",
		title: "text-blue-900 dark:text-blue-100",
		content: "text-blue-800 dark:text-blue-200",
	},
	caution: {
		container:
			"border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
		icon: "text-amber-600 dark:text-amber-400",
		title: "text-amber-900 dark:text-amber-100",
		content: "text-amber-800 dark:text-amber-200",
	},
	danger: {
		container:
			"border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30",
		icon: "text-red-600 dark:text-red-400",
		title: "text-red-900 dark:text-red-100",
		content: "text-red-800 dark:text-red-200",
	},
}

const icons = {
	info: Icons.info,
	caution: Icons.alertTriangle,
	danger: Icons.xCircle,
}

export function Callout({
	variant = "info",
	title,
	children,
	className,
}: CalloutProps) {
	const style = variants[variant]
	const Icon = icons[variant]

	return (
		<div className={cn("rounded-lg border px-4", style.container, className)}>
			<div className="space-y-1">
				<div className="-mb-4 flex items-center gap-2">
					<Icon className={cn("size-5 shrink-0", style.icon)} />
					<p className={cn("font-medium text-sm capitalize", style.title)}>
						{title ?? variant}
					</p>
				</div>

				<div className={cn("text-sm leading-relaxed", style.content)}>
					{children}
				</div>
			</div>
		</div>
	)
}
