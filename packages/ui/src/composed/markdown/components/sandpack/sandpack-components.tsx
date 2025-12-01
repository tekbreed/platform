import React from "react"

import { useSandpack } from "@codesandbox/sandpack-react"
import {
	Check,
	Code,
	Copy,
	Eye,
	Layout,
	Play,
	RefreshCw,
	Terminal,
	Zap,
} from "lucide-react"

import { Button } from "@/components/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/tooltip"
import { cn } from "@/lib/utils"

/**
 * Available view modes for the Sandpack editor
 */
export type ViewProps = "editor" | "preview" | "split"

/**
 * Props for the SandpackTabs component
 */
interface SandpackTabsProps {
	/** Current active view */
	activeView: ViewProps
	/** Function to change the active view */
	setActiveView: (view: ViewProps) => void
	/** Whether the component is being rendered on a mobile device */
	isMobile?: boolean
}

/**
 * Stunning tabs with smooth transitions and gradient effects
 */
export function SandpackTabs({
	activeView,
	setActiveView,
	isMobile = false,
}: SandpackTabsProps) {
	return (
		<div className="ml-auto flex items-center gap-2">
			<Tabs
				className="h-6"
				onValueChange={(value) => setActiveView(value as ViewProps)}
				value={activeView}
			>
				<TabsList
					className={cn(
						"h-7 p-0.5 transition-all duration-300",
						"backdrop-blur-sm",
						"bg-muted/50 ring-1 ring-border",
					)}
				>
					<TabsTrigger
						className={cn(
							"h-6 rounded px-3.5 font-semibold text-xs transition-all duration-300",
							"data-[state=active]:shadow-lg",
							"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
							"hover:scale-105 active:scale-95",
						)}
						value="editor"
					>
						<Code className="mr-1.5 size-3.5" />
						Editor
					</TabsTrigger>
					{!isMobile && (
						<TabsTrigger
							className={cn(
								"h-6 rounded px-3.5 font-semibold text-xs transition-all duration-300",
								"data-[state=active]:shadow-lg",
								"data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
								"hover:scale-105 active:scale-95",
							)}
							value="split"
						>
							<Layout className="mr-1.5 size-3.5" />
							Split
						</TabsTrigger>
					)}
					<TabsTrigger
						className={cn(
							"h-6 rounded px-3.5 font-semibold text-xs transition-all duration-300",
							"data-[state=active]:shadow-lg",
							"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
							"hover:scale-105 active:scale-95",
						)}
						value="preview"
					>
						<Eye className="mr-1.5 size-3.5" />
						Preview
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	)
}

/**
 * Props for button components
 */
interface ButtonWithMountProps {
	isMountedRef?: React.RefObject<boolean>
}

/**
 * Stunning run button with animation
 */
export function RunButton({ isMountedRef }: ButtonWithMountProps) {
	const { sandpack } = useSandpack()
	const localMountedRef = React.useRef(true)

	React.useEffect(() => {
		return () => {
			localMountedRef.current = false
		}
	}, [])

	const handleRun = React.useCallback(() => {
		const isMounted = isMountedRef?.current ?? localMountedRef.current
		if (isMounted && sandpack.status !== "running") {
			sandpack.runSandpack()
		}
	}, [sandpack, isMountedRef])

	const isRunning = sandpack.status === "running"

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						className={cn(
							"h-7 rounded-lg px-3 font-semibold text-xs transition-all duration-300",
							"hover:scale-105 active:scale-95",
							isRunning
								? "cursor-not-allowed opacity-50"
								: "bg-primary text-primary-foreground hover:bg-primary/90",
							"shadow-md hover:shadow-lg",
						)}
						disabled={isRunning}
						onClick={handleRun}
						size="sm"
						variant="ghost"
					>
						<Play
							className={cn(
								"mr-1.5 size-3.5 transition-transform duration-300",
								{
									"animate-pulse": isRunning,
								},
							)}
							fill="currentColor"
						/>
						Run
					</Button>
				</TooltipTrigger>
				<TooltipContent className="font-medium text-xs" side="bottom">
					<p className="flex items-center gap-1.5">
						<Zap className="size-3" />
						Run code
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

/**
 * Stunning refresh button with rotation animation
 */
export function RefreshButton({ isMountedRef }: ButtonWithMountProps) {
	const { sandpack } = useSandpack()
	const localMountedRef = React.useRef(true)
	const [isRotating, setIsRotating] = React.useState(false)

	React.useEffect(() => {
		return () => {
			localMountedRef.current = false
		}
	}, [])

	const handleReset = React.useCallback(() => {
		const isMounted = isMountedRef?.current ?? localMountedRef.current
		if (isMounted) {
			setIsRotating(true)
			sandpack.resetAllFiles()
			setTimeout(() => setIsRotating(false), 600)
		}
	}, [sandpack, isMountedRef])

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						aria-label="Reset files"
						className={cn(
							"size-7 rounded-lg transition-all duration-300",
							"hover:scale-110 active:scale-95",
							"text-muted-foreground hover:bg-muted hover:text-foreground",
						)}
						onClick={handleReset}
						size="icon"
						variant="ghost"
					>
						<RefreshCw
							className={cn("size-4 transition-transform duration-600", {
								"animate-spin": isRotating,
							})}
						/>
					</Button>
				</TooltipTrigger>
				<TooltipContent className="font-medium text-xs" side="bottom">
					<p>Reset files</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

/**
 * Copy button with smooth success animation
 */
export function CopyCode() {
	const { sandpack } = useSandpack()
	const [copied, setCopied] = React.useState(false)

	const copyToClipboard = React.useCallback(() => {
		const activeFileContent = sandpack.files[sandpack.activeFile]?.code || ""
		navigator.clipboard
			.writeText(activeFileContent)
			.then(() => {
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			})
			.catch((_err) => {})
	}, [sandpack])

	return (
		<Button
			className={cn(
				"h-7 rounded-lg px-3 font-semibold text-xs transition-all duration-300",
				"hover:scale-105 active:scale-95",
				{
					"bg-primary text-primary-foreground shadow-md": copied,
					"text-muted-foreground hover:bg-muted hover:text-foreground": !copied,
				},
			)}
			onClick={copyToClipboard}
			size="sm"
			variant="ghost"
		>
			{copied ? (
				<>
					<Check className="mr-1.5 size-3.5 animate-bounce" />
					Copied!
				</>
			) : (
				<>
					<Copy className="mr-1.5 size-3.5" />
					Copy Code
				</>
			)}
		</Button>
	)
}

/**
 * Props for the ShowConsole component
 */
interface ShowConsoleProps {
	/** Whether the console is currently visible */
	showConsole: boolean
	/** Function to toggle console visibility */
	setShowConsole: (showConsole: boolean) => void
}

/**
 * Stunning console toggle button
 */
export function ShowConsole({ showConsole, setShowConsole }: ShowConsoleProps) {
	const toggleConsole = React.useCallback(() => {
		setShowConsole(!showConsole)
	}, [showConsole, setShowConsole])

	return (
		<Button
			className={cn(
				"h-7 rounded-lg px-3 font-semibold text-xs transition-all duration-300",
				"hover:scale-105 active:scale-95",
				{
					"bg-primary text-primary-foreground shadow-md": showConsole,
					"text-muted-foreground hover:bg-muted hover:text-foreground":
						!showConsole,
				},
			)}
			onClick={toggleConsole}
			size="sm"
			variant="ghost"
		>
			<Terminal className="mr-1 size-3.5" />
			Console
		</Button>
	)
}

/**
 * Status indicator with animated dot
 */
export function StatusIndicator() {
	const { sandpack } = useSandpack()

	const statusMap: Record<
		string,
		{ color: string; text: string; ring: string }
	> = {
		idle: {
			color: "bg-emerald-500",
			text: "Ready",
			ring: "ring-emerald-500/20",
		},
		error: {
			color: "bg-red-500",
			text: "Error",
			ring: "ring-red-500/20",
		},
		timeout: {
			color: "bg-red-500",
			text: "Timeout",
			ring: "ring-red-500/20",
		},
		running: {
			color: "bg-blue-500",
			text: "Running",
			ring: "ring-blue-500/20",
		},
		initial: {
			color: "bg-amber-500",
			text: "Initializing...",
			ring: "ring-amber-500/20",
		},
	}

	const status = statusMap[sandpack.status] || {
		color: "bg-slate-500",
		text: "Unknown",
		ring: "ring-slate-500/20",
	}

	return (
		<div className="flex items-center gap-2.5 font-medium text-muted-foreground text-xs transition-all duration-300">
			<div className="relative flex items-center justify-center">
				<div
					className={cn(
						"size-2.5 rounded-full transition-colors duration-300",
						status.color,
					)}
				/>
				<div
					className={cn(
						"absolute inset-0 size-2.5 animate-ping rounded-full",
						status.color,
						"opacity-75",
					)}
				/>
				<div
					className={cn(
						"absolute inset-[-4px] rounded-full ring-2",
						status.ring,
					)}
				/>
			</div>
			<span className="font-semibold">{status.text}</span>
		</div>
	)
}
