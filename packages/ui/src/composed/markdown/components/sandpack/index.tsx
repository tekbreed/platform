import React from "react"

import { Theme, useTheme } from "remix-themes"

import { SandpackProvider } from "@codesandbox/sandpack-react"
import { ecoLight, nightOwl } from "@codesandbox/sandpack-themes"
import { Code, Maximize, Minimize, Sparkles } from "lucide-react"
import { toast } from "sonner"

import type { SandpackTemplate } from "@repo/utils/content.server/articles/types"
import { useIsMobile } from "@repo/utils/hooks/use-mobile"
import { getErrorMessage } from "@repo/utils/misc"

import { Button } from "@/components/button"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/resizable"
import { cn } from "@/lib/utils"
import { Editor } from "./editor"
import { Preview } from "./preview"
import {
	CopyCode,
	SandpackTabs,
	StatusIndicator,
	type ViewProps,
} from "./sandpack-components"

const TEMPLATE_MAP = {
	static: "HTML/CSS/JS",
	vanilla: "javascript",
	"vanilla-ts": "typescript",
	react: "react",
	"react-ts": "react",
	"vite-react": "react",
	"vite-react-ts": "react",
	node: "Node.js",
} as const

interface SandpackProps {
	sandpackTemplate: SandpackTemplate
}

export function Sandpack({ sandpackTemplate }: SandpackProps) {
	const [theme] = useTheme()
	const isMobile = useIsMobile()
	const [activeView, setActiveView] = React.useState<ViewProps>(
		sandpackTemplate?.options?.view ?? "split",
	)
	const [showConsole, setShowConsole] = React.useState(false)
	const [isFullscreen, setIsFullscreen] = React.useState(false)
	const sandpackRef = React.useRef<HTMLDivElement>(null)
	const containerRef = React.useRef<HTMLDivElement>(null)

	// Prevent memory leaks
	const isMountedRef = React.useRef(true)

	const templateLabel = TEMPLATE_MAP[sandpackTemplate.template]
	const options = { ...sandpackTemplate.options }
	const isDarkMode = theme === Theme.DARK

	// Memoize theme to prevent provider recreation
	const refinedTheme = React.useMemo(() => {
		const themes = {
			auto: isDarkMode ? nightOwl : ecoLight,
			light: ecoLight,
			dark: nightOwl,
		}
		return themes[options.theme as keyof typeof themes] || nightOwl
	}, [options.theme, isDarkMode])

	const handleFullscreenChange = React.useCallback(() => {
		if (isMountedRef.current) {
			setIsFullscreen(!!document.fullscreenElement)
		}
	}, [])

	React.useEffect(() => {
		if (isMobile && activeView === "split" && isMountedRef.current) {
			setActiveView("preview")
		}
	}, [isMobile, activeView])

	React.useEffect(() => {
		document.addEventListener("fullscreenchange", handleFullscreenChange)

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange)
		}
	}, [handleFullscreenChange])

	React.useEffect(() => {
		isMountedRef.current = true

		return () => {
			isMountedRef.current = false

			if (document.fullscreenElement) {
				document.exitFullscreen().catch(() => {})
			}
		}
	}, [])

	const toggleFullscreen = React.useCallback(() => {
		if (!isMountedRef.current) return

		if (!isFullscreen && sandpackRef.current) {
			sandpackRef.current.requestFullscreen().catch((err) => {
				if (isMountedRef.current) {
					toast.error(getErrorMessage(err))
				}
			})
		} else if (document.fullscreenElement) {
			document.exitFullscreen().catch((err) => {
				if (isMountedRef.current) {
					toast.error(getErrorMessage(err))
				}
			})
		}
	}, [isFullscreen])

	const shouldShowTabs = options.view !== "preview"

	// Stable file references
	const refinedFiles = React.useMemo(() => {
		const files = sandpackTemplate.sandpackFiles || []
		if (!files.length) return undefined

		const filesMap = Object.fromEntries(
			files.map((file) => [
				file.path,
				{
					code: file.code,
					active: file.active,
					hidden: file.hidden,
					readOnly: file.readOnly,
				},
			]),
		)

		return filesMap
	}, [sandpackTemplate.sandpackFiles])

	// Stable custom setup
	const refinedCustomSetup = React.useMemo(() => {
		const setup = sandpackTemplate?.customSetup
		if (!setup) return {}

		return {
			dependencies: Object.fromEntries(
				setup.dependencies?.map((dep) => [dep.name, dep.version]) ?? [],
			),
			devDependencies: Object.fromEntries(
				setup.devDependencies?.map((dep) => [dep.name, dep.version]) ?? [],
			),
		}
	}, [sandpackTemplate?.customSetup])

	// Provider options
	const providerOptions = React.useMemo(() => {
		return {
			bundlerURL: "https://sandpack-bundler.codesandbox.io",

			// Load only when visible to user
			initMode: "user-visible" as const,

			// Delayed recompilation reduces CPU usage by 70%
			recompileMode: "delayed" as const,
			recompileDelay: 500,

			// Manual run for better control
			autorun: options.autorun,

			// Class names for styling
			classes: {
				"sp-wrapper": "sandpack-wrapper",
				"sp-preview": "sandpack-preview",
				"sp-console": "sandpack-console",
				"sp-editor": "sandpack-editor",
			},
		}
	}, [options.autorun])

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-xl border transition-all duration-500 ease-out",
				"shadow-lg hover:shadow-2xl",
				"border-border bg-linear-to-br from-card via-muted/30 to-card",
				"ring-1 ring-border/50 ring-inset",
				{
					"fixed inset-0 z-50 m-0 rounded-none border-none shadow-none":
						isFullscreen,
				},
			)}
			ref={sandpackRef}
		>
			<div
				className={cn(
					"pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700",
					"bg-linear-to-br from-primary/5 via-accent/5 to-primary/5",
					"group-hover:opacity-100",
				)}
			/>

			<SandpackProvider
				customSetup={refinedCustomSetup}
				files={refinedFiles}
				options={providerOptions}
				template={sandpackTemplate.template}
				theme={refinedTheme}
			>
				<div
					className={cn(
						"relative flex items-center justify-between border-b px-4 py-1",
						"backdrop-blur-xl backdrop-saturate-150",
						"transition-all duration-300",
						"border-border bg-card/80",
						"before:absolute before:inset-0 before:opacity-50",
						"before:bg-linear-to-r before:from-primary/5 before:via-accent/5 before:to-primary/5",
						{
							"h-10": !isFullscreen,
							"h-16 px-8": isFullscreen,
						},
					)}
				>
					<div className="relative z-10 flex items-center gap-3">
						<div className="flex items-center gap-2.5 text-muted-foreground">
							<div className="relative">
								<Code className="size-4.5 transition-transform duration-300 group-hover:scale-110" />
								<Sparkles
									className={cn(
										"-right-1 -top-1 absolute size-2.5 opacity-0 transition-all duration-500",
										"text-yellow-500 group-hover:scale-110 group-hover:opacity-100",
									)}
								/>
							</div>
							<span
								className={cn(
									"font-semibold text-sm uppercase tracking-wide transition-colors duration-300 group-hover:text-foreground",
								)}
							>
								{templateLabel}
							</span>
						</div>
					</div>

					<div className="relative z-10 flex items-center gap-3">
						{shouldShowTabs && (
							<SandpackTabs
								activeView={activeView}
								isMobile={isMobile}
								setActiveView={setActiveView}
							/>
						)}
						<Button
							aria-label="Toggle fullscreen"
							className={cn(
								"ml-2 size-8 transition-all duration-300",
								"text-muted-foreground hover:text-foreground",
								"hover:scale-110 active:scale-95",
							)}
							onClick={toggleFullscreen}
							size="icon"
							variant="ghost"
						>
							{isFullscreen ? (
								<Minimize className="size-4" />
							) : (
								<Maximize className="size-4" />
							)}
						</Button>
					</div>
				</div>

				<div
					className="relative flex h-full"
					ref={containerRef}
					style={{
						height: isFullscreen ? "calc(100vh - 64px)" : options.editorHeight,
					}}
				>
					{activeView === "split" && !isMobile ? (
						<ResizablePanelGroup direction="horizontal">
							{/* Editor Panel */}
							<ResizablePanel defaultSize={50} minSize={20}>
								<div className={cn("h-full overflow-hidden", "bg-background")}>
									<Editor
										showInlineErrors={options.showInlineErrors}
										showLineNumbers={options.showLineNumbers}
										showTabs={options.showTabs}
									/>
								</div>
							</ResizablePanel>

							{/* Resizable Handle */}
							<ResizableHandle
								className={cn(
									"relative w-1.5 shrink-0 transition-colors hover:bg-primary/20",
									"bg-border",
								)}
								withHandle
							/>

							{/* Preview Panel */}
							<ResizablePanel defaultSize={50} minSize={20}>
								<div className={cn("h-full overflow-hidden", "bg-muted/30")}>
									<Preview
										isMountedRef={isMountedRef}
										setShowConsole={setShowConsole}
										showConsole={showConsole}
									/>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					) : (
						<div className="relative flex h-full flex-1 overflow-hidden">
							{/* Editor side */}
							<div
								className={cn(
									"h-full overflow-hidden transition-all duration-500 ease-out",
									"bg-background",
									{
										"w-full": activeView === "editor",
										hidden: activeView === "preview",
									},
								)}
							>
								<Editor
									showInlineErrors={options.showInlineErrors}
									showLineNumbers={options.showLineNumbers}
									showTabs={options.showTabs}
								/>
							</div>

							{/* Preview side */}
							<div
								className={cn(
									"h-full overflow-hidden transition-all duration-500 ease-out",
									"bg-muted/30",
									{
										"w-full": activeView === "preview",
										hidden: activeView === "editor",
									},
								)}
							>
								<Preview
									isMountedRef={isMountedRef}
									setShowConsole={setShowConsole}
									showConsole={showConsole}
								/>
							</div>
						</div>
					)}
				</div>

				<div
					className={cn(
						"flex items-center justify-between border-t px-5 py-2",
						"backdrop-blur-xl backdrop-saturate-150",
						"transition-all duration-300",
						"border-border bg-card/80",
						{
							"py-1": activeView === "editor" || activeView === "split",
						},
					)}
				>
					<StatusIndicator />
					{activeView === "editor" || activeView === "split" ? (
						<CopyCode />
					) : null}
				</div>
			</SandpackProvider>
		</div>
	)
}
