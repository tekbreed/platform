import React from "react"

// import { transformerNotationDiff } from "@shikijs/transformers"
import type { Element } from "react-shiki"

import type { SandpackTemplate } from "@repo/utils/content.server/articles/types"

import { Button } from "@/components/button"
import { Skeleton } from "@/components/skeleton"
import { EmptyState } from "@/composed/empty-state"
import { Icons } from "@/composed/icons"
import { cn } from "@/lib/utils"
import { Highlighter } from "./highlighter"
import { MDXIframe } from "./media"
import { Mermaid } from "./mermaid"

const Sandpack = React.lazy(() =>
	import("./sandpack").then((module) => ({ default: module.Sandpack })),
)

/**
 * Props for the Code component
 */
interface CodeHighlightProps {
	/** Additional CSS class names */
	className?: string
	/** Child elements or content */
	children?: React.ReactNode
	/** Shiki element node */
	node?: Element
	/** Array of Sandpack templates */
	sandpackTemplates?: SandpackTemplate[]
	/** Whether the code is inline */
	inline?: boolean
}

function InvalidSandboxTemplate() {
	return (
		<EmptyState
			className="bg-red-300/60 dark:bg-red-950"
			icon={<Icons.codesandbox className="size-7 animate-spin text-red-500" />}
			title="Invalid sandbox template"
		/>
	)
}

/**
 * Props for the CopyButton component
 */
interface CopyButtonProps {
	/** Code content to be copied */
	code: string
	/** Additional CSS class names */
	className?: string
}

/**
 * Button component for copying code to clipboard
 * @param {CopyButtonProps} props - Component props
 * @returns {JSX.Element} Copy button with success state
 */
const CopyButton = React.memo(function CopyButton({
	code,
	className,
}: CopyButtonProps) {
	const [copied, setCopied] = React.useState(false)

	const copyToClipboard = React.useCallback(() => {
		navigator.clipboard.writeText(code).then(() => {
			setCopied(true)
			const timer = setTimeout(() => setCopied(false), 2000)
			return () => clearTimeout(timer)
		})
	}, [code])

	return (
		<Button
			aria-label="Copy code"
			className={cn(
				"h-7 w-auto px-2 font-medium text-muted-foreground text-xs hover:bg-background/50 hover:text-foreground",
				className,
			)}
			disabled={copied}
			onClick={copyToClipboard}
			variant={"ghost"}
		>
			{copied ? (
				<>
					<Icons.check className="mr-1.5 size-3 text-green-600" />
					Copied
				</>
			) : (
				<>
					<Icons.copy className="mr-1.5 size-3" />
					Copy
				</>
			)}
		</Button>
	)
})

/**
 * Main Code component that handles code highlighting, Sandpack integration, and iframe embedding
 * @param {CodeHighlightProps} props - Component props
 * @returns {JSX.Element} Code component with appropriate rendering based on content type
 */
export function Code({
	inline,
	className,
	children,
	sandpackTemplates,
	...props
}: CodeHighlightProps): React.ReactElement {
	const [mounted, setMounted] = React.useState(false)

	const match = className?.match(/language-(\w+)/)
	const language = match?.[1]?.toLowerCase()

	// Content type detection
	const isMermaid = language?.startsWith("mermaid_diagram")
	const isYoutube = language?.startsWith("youtube") ?? null
	const isBunny = language?.startsWith("bunny") ?? null
	const isValidLanguage = !!isYoutube || !!isBunny

	const isSandpack = !!(language?.startsWith("sandpack") ?? null)

	// Code content processing
	const isInline = inline || !language
	const code = children
		? typeof children === "string"
			? children.trim()
			: String(children).trim()
		: ""

	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <span />
	}

	if (isMermaid) {
		const chart = code
		return chart ? <Mermaid chart={chart} /> : <span />
	}

	if (isValidLanguage) {
		const videoId = code || null
		if (!videoId) {
			return (
				<EmptyState
					className="bg-red-300/60 dark:bg-red-950"
					icon={<Icons.youtube className="size-7 animate-pulse text-red-500" />}
					title="Invalid YouTube ID"
				/>
			)
		}
		return (
			<MDXIframe type={isYoutube ? "youtube" : "bunny"} videoId={videoId} />
		)
	}

	// Handle Sandpack content
	if (isSandpack) {
		const templateSlug = code || null
		const hasTemplates =
			templateSlug && sandpackTemplates && sandpackTemplates?.length

		if (!hasTemplates) {
			return <InvalidSandboxTemplate />
		}

		const template = sandpackTemplates.find(
			(template) => template.slug === templateSlug,
		)

		if (!template) {
			return <InvalidSandboxTemplate />
		}
		return (
			<React.Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
				<Sandpack sandpackTemplate={template} />
			</React.Suspense>
		)
	}

	// Handle regular code blocks
	return !isInline ? (
		<div
			className={cn("overflow-hidden rounded-lg border bg-muted/30", className)}
		>
			<div className="flex items-center justify-between border-b bg-background/80 px-2 py-1">
				<div className="flex items-center gap-2">
					<Icons.code className="size-4 text-muted-foreground" />
					<span className="font-semibold text-muted-foreground text-xs capitalize">
						{language || "text"}
					</span>
				</div>
				<CopyButton code={code} />
			</div>
			<div className="overflow-x-auto">
				<Highlighter
					{...props}
					className={className}
					code={code}
					language={language}
				/>
			</div>
		</div>
	) : (
		<span
			className={cn(
				"inline rounded bg-muted px-1 py-0.5 font-mono text-sm",
				"text-foreground",
				className,
			)}
			{...props}
		>
			{code}
		</span>
	)
}
