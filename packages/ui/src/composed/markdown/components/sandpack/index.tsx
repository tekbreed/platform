import React from "react"

import { Theme, useTheme } from "remix-themes"

import { autocompletion } from "@codemirror/autocomplete"
import {
	SandpackCodeEditor,
	SandpackProvider,
} from "@codesandbox/sandpack-react"
import { atomDark, ecoLight } from "@codesandbox/sandpack-themes"
import { Code, Maximize, Minimize } from "lucide-react"
import { SandpackFileExplorer } from "sandpack-file-explorer"
import { toast } from "sonner"

import type { SandpackTemplate } from "@repo/utils/content/articles/types"
import { useIsMobile } from "@repo/utils/hooks/use-mobile"
import { getErrorMessage } from "@repo/utils/misc"

import { Button } from "@/components/button"
import { cn } from "@/lib/utils"
import { Preview } from "./preview"
import {
	CopyCode,
	SandpackTabs,
	StatusIndicator,
	type ViewProps,
} from "./sandpack-components"

/**
 * Template mapping for different Sandpack templates
 */
const TEMPLATE_MAP = {
	static: "HTML/CSS/JS",
	vanilla: "javascript",
	"vanilla-ts": "typescript",
	"vite-react": "react",
	"vite-react-ts": "react",
	node: "Node.js",
} as const

/**
 * Props for the Sandpack component
 */
interface SandpackProps {
	/** The Sandpack template configuration */
	sandpackTemplate: SandpackTemplate
}

/**
 * Main Sandpack component that provides a code editor, preview, and file explorer
 * @param {SandpackProps} props - Component props
 * @returns {JSX.Element} Sandpack component
 */
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

	const templateLabel = TEMPLATE_MAP[sandpackTemplate.template]
	const options = { ...sandpackTemplate.options }
	const isDarkMode = theme === Theme.DARK

	const refinedTheme =
		options.theme === "auto"
			? isDarkMode
				? atomDark
				: ecoLight
			: options.theme === "light"
				? ecoLight
				: atomDark

	const handleFullscreenChange = React.useCallback(() => {
		setIsFullscreen(!!document.fullscreenElement)
	}, [])

	React.useEffect(() => {
		if (isMobile && activeView === "split") {
			setActiveView("preview")
		}
	}, [isMobile, activeView])

	React.useEffect(() => {
		document.addEventListener("fullscreenchange", handleFullscreenChange)
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange)
		}
	}, [handleFullscreenChange])

	const toggleFullscreen = React.useCallback(() => {
		if (!isFullscreen && sandpackRef.current) {
			sandpackRef.current.requestFullscreen().catch((err) => {
				toast.error(getErrorMessage(err))
			})
		} else if (document.fullscreenElement) {
			document.exitFullscreen().catch((err) => {
				toast.error(getErrorMessage(err))
			})
		}
	}, [isFullscreen])

	const showPreview =
		activeView === "preview" || (activeView === "split" && !isMobile)

	const showEditor = React.useMemo(
		() => activeView === "editor" || (activeView === "split" && !isMobile),
		[activeView, isMobile],
	)

	const shouldShowFileExplorer =
		options.view !== "preview" && activeView !== "preview"
	const shouldShowEditor =
		options.view !== "preview" && activeView !== "preview"
	const shouldShowTabs = options.view !== "preview"

	/**
	 * Only depend on stringified version to avoid reference changes
	 * Including 'sandpackTemplate.sandpackFiles' directly causes infinite re-renders
	 */

	// biome-ignore lint/correctness/useExhaustiveDependencies: JSON.stringify takes care of the changes
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
	}, [JSON.stringify(sandpackTemplate.sandpackFiles)])

	/**
	 * Refine custom setup to map dependencies and devDependencies correctly
	 * Including 'sandpackTemplate.customSetup' directly causes infinite re-renders
	 */

	// biome-ignore lint/correctness/useExhaustiveDependencies: JSON.stringify takes care of the changes
	const refinedCustomSetup = React.useMemo(() => {
		const setup = sandpackTemplate?.customSetup
		if (!setup) return {}

		return {
			dependencies:
				setup.dependencies?.reduce(
					// biome-ignore lint/performance/noAccumulatingSpread: Ignore
					(acc, dep) => ({ ...acc, [dep.name]: dep.version }),
					{},
				) || {},
			devDependencies:
				setup.devDependencies?.reduce(
					// biome-ignore lint/performance/noAccumulatingSpread: Ignore
					(acc, dep) => ({ ...acc, [dep.name]: dep.version }),
					{},
				) || {},
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(sandpackTemplate?.customSetup)])

	const containerClassName = cn(
		"overflow-hidden bg-muted transition-all duration-300",
		isFullscreen ? "fixed inset-0 z-50 rounded-none border-none" : "",
	)

	const headerClassName = cn(
		"flex items-center justify-between border-b px-2 py-1",
		{
			"h-full": isFullscreen,
		},
	)

	const fileExplorerClassName = cn(
		"!h-full !min-h-full border-r",
		isMobile
			? "w-[150px] min-w-[100px] max-w-[150px]"
			: "w-[200px] min-w-[150px] max-w-[200px]",
	)

	return (
		<div className={containerClassName} ref={sandpackRef}>
			<SandpackProvider
				customSetup={refinedCustomSetup}
				files={refinedFiles}
				options={{
					autorun: options.autorun,
					recompileMode: "delayed",
					recompileDelay: 300,
					classes: {
						"sp-wrapper": "sandpack-wrapper",
						"sp-preview": "sandpack-preview",
						"sp-console": "sandpack-console",
						"sp-editor": "sandpack-editor",
					},
				}}
				template={sandpackTemplate.template}
				theme={refinedTheme}
			>
				<div className={headerClassName}>
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1 rounded-md px-3 py-1.5 font-medium text-sm">
							<Code className="size-4" />
							<span className="capitalize">{templateLabel}</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						{shouldShowTabs && (
							<SandpackTabs
								activeView={activeView}
								isMobile={isMobile}
								setActiveView={setActiveView}
							/>
						)}
						<Button
							aria-label="Toggle fullscreen"
							className="ml-4 size-7"
							onClick={toggleFullscreen}
							size="icon"
						>
							{isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
						</Button>
					</div>
				</div>

				<div
					className="flex h-full"
					ref={containerRef}
					style={{
						height: isFullscreen ? "calc(100vh - 80px)" : options.editorHeight,
					}}
				>
					{shouldShowFileExplorer && (
						<div className={fileExplorerClassName}>
							<SandpackFileExplorer className="sandpack-file-explorer" />
						</div>
					)}

					<div className="relative flex h-full flex-1">
						{showEditor && showPreview && activeView === "split" ? (
							<>
								<div className="h-full w-1/2 overflow-hidden">
									<SandpackCodeEditor
										className="h-full w-full rounded-none border-none"
										extensions={[autocompletion()]}
										showInlineErrors={options.showInlineErrors}
										showLineNumbers={options.showLineNumbers}
										showTabs={options.showTabs}
										wrapContent
									/>
								</div>

								<div className="h-full w-1/2 overflow-hidden border-l">
									<Preview
										setShowConsole={setShowConsole}
										showConsole={showConsole}
									/>
								</div>
							</>
						) : (
							<div className="h-full w-full">
								{shouldShowEditor && !showPreview && (
									<SandpackCodeEditor
										className="h-full w-full rounded-none border-none"
										extensions={[autocompletion()]}
										showInlineErrors={options.showInlineErrors}
										showLineNumbers={options.showLineNumbers}
										showTabs={options.showTabs}
										wrapContent
									/>
								)}

								{showPreview && !shouldShowEditor && (
									<Preview
										setShowConsole={setShowConsole}
										showConsole={showConsole}
									/>
								)}
							</div>
						)}
					</div>
				</div>
				<div className="flex items-center justify-between border-t px-2 py-2 text-xs">
					<StatusIndicator />
					{activeView === "editor" || activeView === "split" ? (
						<CopyCode />
					) : null}
				</div>
			</SandpackProvider>
		</div>
	)
}
