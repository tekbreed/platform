import { cn } from "@repo/ui/lib/utils"

export function Container({
	title,
	description,
	className,
	children,
}: {
	title?: string
	description?: string | React.ReactNode
	className?: string
	children: React.ReactNode
}) {
	return (
		<div
			className={cn(
				"rounded-xl border border-border bg-card shadow-sm",
				className,
			)}
		>
			<div className="border-border border-b p-6">
				<h2 className="mb-2 font-bold text-xl">{title}</h2>
				{description ? <div>{description}</div> : null}
			</div>
			<div className="p-6">{children}</div>
		</div>
	)
}
