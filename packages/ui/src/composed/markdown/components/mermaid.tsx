import React from "react"

import { useTheme } from "remix-themes"

import { createId as cuid } from "@paralleldrive/cuid2"
import mermaid from "mermaid"
import { toast } from "sonner"

import { Button } from "@/components/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { Icons } from "@/composed/icons"
import { Highlighter } from "./highlighter"

export function Mermaid({ chart, ...props }: { chart: string }) {
	const [error, setError] = React.useState<string | null>(null)
	const [svgContent, setSvgContent] = React.useState<string>("")
	const [copied, setCopied] = React.useState(false)
	const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
		"preview",
	)
	const [theme] = useTheme()
	const ref = React.useRef<HTMLDivElement>(null)

	const isDark = React.useMemo(() => theme === "dark", [theme])

	// Initialize mermaid only once on mount
	React.useEffect(() => {
		mermaid.initialize({
			startOnLoad: false,
		})
	}, [])

	// Render diagram when chart or theme changes
	React.useEffect(() => {
		const uniqueId = `mermaid-${cuid()}`

		// Re-initialize with theme for each render
		mermaid.initialize({
			startOnLoad: false,
			theme: isDark ? "dark" : "default",
		})

		mermaid
			.render(uniqueId, chart)
			.then(({ svg }) => {
				setSvgContent(svg)
				setError(null)
			})
			.catch((err) => {
				toast.error("Mermaid rendering error", { description: err })
				setError("Failed to render diagram")
			})
	}, [chart, isDark])

	const handleCopyCode = React.useCallback(() => {
		navigator.clipboard.writeText(chart).then(() => {
			setCopied(true)
			toast.success("Code copied to clipboard")
			const timeoutId = setTimeout(() => setCopied(false), 2000)

			return () => clearTimeout(timeoutId)
		})
	}, [chart])

	const handleDownloadSVG = React.useCallback(() => {
		if (!svgContent) {
			toast.error("No diagram to download")
			return
		}

		const blob = new Blob([svgContent], { type: "image/svg+xml" })
		const url = URL.createObjectURL(blob)
		const link = document.createElement("a")
		link.href = url
		link.download = `mermaid-diagram-${Date.now()}.svg`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
		toast.success("SVG downloaded successfully")
	}, [svgContent])

	const handleDownloadPNG = React.useCallback(() => {
		if (!svgContent) {
			toast.error("No diagram to download")
			return
		}

		const svgElement = ref.current?.querySelector("svg")
		if (!svgElement) {
			toast.error("Failed to find SVG element")
			return
		}

		// Get SVG dimensions
		const svgRect = svgElement.getBoundingClientRect()
		const svgWidth = svgRect.width || 800
		const svgHeight = svgRect.height || 600

		const canvas = document.createElement("canvas")
		const ctx = canvas.getContext("2d")
		const img = new Image()

		// Set canvas size (2x for better quality)
		canvas.width = svgWidth * 2
		canvas.height = svgHeight * 2

		// Create a data URL instead of blob URL to avoid CORS issues
		const svgData = new XMLSerializer().serializeToString(svgElement)
		const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`

		img.onload = () => {
			if (ctx) {
				ctx.scale(2, 2)
				ctx.drawImage(img, 0, 0, svgWidth, svgHeight)

				canvas.toBlob((blob) => {
					if (blob) {
						const pngUrl = URL.createObjectURL(blob)
						const link = document.createElement("a")
						link.href = pngUrl
						link.download = `mermaid-diagram-${Date.now()}.png`
						document.body.appendChild(link)
						link.click()
						document.body.removeChild(link)
						URL.revokeObjectURL(pngUrl)
						toast.success("PNG downloaded successfully")
					}
				})
			}
		}

		img.onerror = () => {
			toast.error("Failed to convert SVG to PNG")
		}
		img.src = svgDataUrl
	}, [svgContent])

	if (error) {
		return <div className="mermaid text-red-500">{error}</div>
	}

	return (
		<Tabs
			className="mermaid w-full"
			defaultValue="preview"
			onValueChange={(value) => setActiveTab(value as "preview" | "code")}
		>
			<div className="my-8 overflow-hidden rounded-lg border bg-muted/30">
				{/* Header with tabs and action buttons */}
				<div className="flex items-center justify-between border-b bg-background/50 px-2 py-1">
					<TabsList>
						<TabsTrigger value="preview">
							<Icons.eye className="size-4" />
							Preview
						</TabsTrigger>
						<TabsTrigger value="code">
							<Icons.code className="size-4" />
							Code
						</TabsTrigger>
					</TabsList>

					{/* Conditional buttons based on active tab */}
					{activeTab === "preview" ? (
						<div className="flex gap-2">
							<Button
								onClick={handleDownloadSVG}
								size="sm"
								title="Download as SVG"
								variant="ghost"
							>
								<Icons.download className="size-4" />
								SVG
							</Button>
							<Button
								onClick={handleDownloadPNG}
								size="sm"
								title="Download as PNG"
								variant="ghost"
							>
								<Icons.download className="size-4" />
								PNG
							</Button>
						</div>
					) : (
						<Button onClick={handleCopyCode} size="sm" variant="ghost">
							{copied ? (
								<Icons.check className="size-4 text-green-600" />
							) : (
								<Icons.copy className="size-4" />
							)}
							{copied ? "Copied" : "Copy"}
						</Button>
					)}
				</div>

				{/* Tab content */}
				<TabsContent
					className="m-0 max-w-full overflow-x-auto p-6"
					value="preview"
				>
					<div
						className="flex justify-center"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for rendering Mermaid SVG
						dangerouslySetInnerHTML={{ __html: svgContent }}
						ref={ref}
					/>
				</TabsContent>

				<TabsContent
					className="m-0 max-w-full overflow-x-auto p-0"
					value="code"
				>
					<Highlighter {...props} code={chart} language="mermaid" />
				</TabsContent>
			</div>
		</Tabs>
	)
}
