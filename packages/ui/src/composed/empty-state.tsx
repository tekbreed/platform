import type React from "react"

import { Button } from "@/components/button"
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/empty"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
	icon?: React.ReactNode
	title: string
	description?: string
	action?: {
		label: string
		onClick: () => void
	}
	className?: string
}

export function EmptyState({
	icon,
	title,
	description,
	action,
	className,
}: EmptyStateProps) {
	return (
		<Empty className={cn("border border-dashed", className)}>
			<EmptyHeader>
				<EmptyMedia variant="icon">{icon}</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				{description ? (
					<EmptyDescription>{description}</EmptyDescription>
				) : null}
			</EmptyHeader>
			{action ? (
				<EmptyContent>
					<Button onClick={action.onClick} size="sm" variant="outline">
						{action.label}
					</Button>
				</EmptyContent>
			) : null}
		</Empty>
	)
}
