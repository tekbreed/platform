import React from "react"

import { Link } from "react-router"

import { Quote } from "lucide-react"

import { Callout } from "@/components/callout"
import { Separator } from "@/components/separator"
import { cn } from "@/lib/utils"

export function H1({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h1
			className={cn(
				"mt-10 mb-6 scroll-m-20 font-bold text-3xl tracking-normal lg:text-4xl",
				className,
			)}
			{...props}
		/>
	)
}

export function H2({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2
			className={cn(
				"scroll-m-20 font-semibold text-3xl text-foreground tracking-tight",
				"mt-8 mb-4 border-border",
				className,
			)}
			{...props}
		/>
	)
}

export const H3 = ({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h3
		className={cn(
			"scroll-m-20 font-semibold text-2xl text-foreground tracking-tight",
			"mt-8 mb-4 border-border",
			className,
		)}
		{...props}
	/>
)

export const H4 = ({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h4
		className={cn(
			"scroll-m-20 font-semibold text-foreground text-xl tracking-tight",
			"mt-8 mb-4 border-border",
			className,
		)}
		{...props}
	/>
)

export const H5 = ({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h5
		className={cn(
			"scroll-m-20 font-semibold text-foreground text-lg tracking-tight",
			"mt-8 mb-4 border-border",
			className,
		)}
		{...props}
	/>
)

export const H6 = ({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h6
		className={cn(
			"scroll-m-20 font-semibold text-foreground text-lg tracking-tight",
			"mt-8 mb-4 border-border",
			className,
		)}
		{...props}
	/>
)

export function P({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	if (React.isValidElement(children) && children.type === "img") {
		return <>{children}</>
	}

	return (
		<p
			className={cn(
				"text-[1.05em] text-foreground leading-7.5 tracking-wide [&:not(:first-child)]:mt-6",
				className,
			)}
			{...props}
		>
			{children}
		</p>
	)
}

export function Pre({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLPreElement>) {
	if (React.isValidElement(children)) {
		const childType = children.type
		const childProps = children.props as { className?: string }

		if (
			childType === "iframe" ||
			childType === "img" ||
			(typeof childProps.className === "string" &&
				childProps.className.includes("mermaid")) ||
			(childType === "div" && childProps.className?.includes("no-pre"))
		) {
			return <>{children}</>
		}
	}

	return (
		<pre className={cn("p-0", className)} {...props}>
			{children}
		</pre>
	)
}

type CalloutVariant = "tip" | "caution" | "danger"

interface TitleChildProps {
	className?: string
	children?: React.ReactNode
}

export function Div({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const childrenArray = React.Children.toArray(children)

	const titleChild = childrenArray.find((child: React.ReactNode) => {
		if (!React.isValidElement<TitleChildProps>(child)) return false
		return (
			typeof child.props.className === "string" &&
			child.props.className.includes("remark-container-title")
		)
	})

	const contentChildren = childrenArray.filter((child) => child !== titleChild)

	const variant = React.isValidElement<TitleChildProps>(titleChild)
		? ((titleChild.props.className?.match(
				/tip|caution|danger/,
			)?.[0] as CalloutVariant) ?? "tip")
		: null

	if (variant) {
		return (
			<Callout
				className={cn("my-8", className)}
				title={variant}
				variant={variant}
				{...props}
			>
				{contentChildren}
			</Callout>
		)
	}

	return (
		<div className={cn(className)} {...props}>
			{children}
		</div>
	)
}

export function Subtle({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	)
}

export function Blockquote({
	className,
	...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
	return (
		<div className="relative">
			<Quote className="-top-2 absolute left-2 size-4 text-muted-foreground" />
			<blockquote
				className={cn(
					"pl-8 text-muted-foreground italic",
					"border-border border-l-4",
					"relative overflow-visible",
					className,
				)}
				{...props}
			/>
		</div>
	)
}

export function A({
	className,
	...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	const target = rest?.href?.startsWith("http") ? "_blank" : undefined
	const rel = rest?.href?.startsWith("http") ? "noopener noreferrer" : undefined

	return (
		<Link
			className={cn(
				"font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
				className,
			)}
			prefetch="intent"
			rel={rel}
			target={target}
			to={rest?.href ?? "#"}
			{...rest}
		/>
	)
}

export function Hr({ className, ...props }: { className?: string }) {
	return <Separator className={cn("my-2", className)} {...props} />
}
