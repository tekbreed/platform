import React from "react"

import { SandpackConsole, SandpackPreview } from "@codesandbox/sandpack-react"

import { cn } from "@/lib/utils"
import { RefreshButton, RunButton, ShowConsole } from "./sandpack-components"

/**
 * Props for the Preview component
 */
interface PreviewProps {
	/** Whether the console is currently visible */
	showConsole: boolean
	/** Function to toggle console visibility */
	setShowConsole: (showConsole: boolean) => void
	/** Ref to track if component is mounted */
	isMountedRef?: React.RefObject<boolean>
}

/**
 * Preview component that displays the Sandpack preview with optional console
 * @param {PreviewProps} props - Component props
 * @returns {JSX.Element} Preview component with optional console
 */
export const Preview = React.memo(function Preview({
	showConsole,
	setShowConsole,
	isMountedRef,
}: PreviewProps) {
	const toggleConsole = React.useCallback(() => {
		setShowConsole(!showConsole)
	}, [showConsole, setShowConsole])

	return (
		<div className="flex h-full flex-col bg-background">
			<div className="flex items-center justify-between border-b px-3 py-1">
				<div className="flex items-center gap-2">
					<RunButton isMountedRef={isMountedRef} />
					<RefreshButton isMountedRef={isMountedRef} />
				</div>
				<ShowConsole setShowConsole={toggleConsole} showConsole={showConsole} />
			</div>

			<div className="relative h-full overflow-hidden">
				<SandpackPreview
					className={cn({
						"h-[60%]!": showConsole,
						"h-full!": !showConsole,
					})}
					showNavigator={false}
					showOpenInCodeSandbox={false}
					showOpenNewtab
					showRefreshButton={false}
					showRestartButton={false}
					spellCheck
				/>

				<div
					className={cn("border-t bg-background", {
						"h-[40%]!": showConsole,
						"h-0!": !showConsole,
					})}
				>
					<SandpackConsole
						resetOnPreviewRestart
						showRestartButton={false}
						showSetupProgress={false}
					/>
				</div>
			</div>
		</div>
	)
})
