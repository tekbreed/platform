import { cn } from "@/lib/utils"

export function Ul({
	className,
	...props
}: React.HTMLAttributes<HTMLUListElement>) {
	return (
		<ul
			className={cn(
				"my-6 ml-6 list-disc text-foreground [&>li]:mt-2",
				className,
			)}
			{...props}
		/>
	)
}

export function Ol({
	className,
	...props
}: React.HTMLAttributes<HTMLOListElement>) {
	return (
		<ol
			className={cn(
				"my-6 ml-6 list-decimal text-foreground [&>li]:mt-2",
				className,
			)}
			{...props}
		/>
	)
}
