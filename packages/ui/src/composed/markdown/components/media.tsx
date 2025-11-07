import { getModuleUrl } from "@repo/utils/constants/client"
import { getVideoSrc } from "@repo/utils/misc"

import { EmptyState } from "@/composed/empty-state"
import { cn } from "@/lib/utils"

export function Img({
	className,
	...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<img
			className={cn(
				"mx-auto my-6 max-w-full rounded-md border object-cover shadow-sm",
				className,
			)}
			loading="lazy"
			{...props}
		/>
	)
}

interface MDXIframeProps {
	videoId: string
	type: "youtube" | "bunny"
	className?: string
}

export function Iframe({
	videoId,
	type = "youtube",
	className,
}: MDXIframeProps) {
	const srcTitle = {
		youtube: `YouTube video player`,
		bunny: `Bunny video player`,
	}

	if (!videoId)
		return (
			<EmptyState
				title="Video not found"
				description="Please contact support if you believe this is an error."
				action={{
					label: "Contact support",
					// This is supposed to be a link
					onClick: () => getModuleUrl("web", "support"),
				}}
			/>
		)

	return (
		<div
			className={cn("no-pre w-full", {
				"relative pt-[56.25%]": type === "bunny",
			})}
		>
			<iframe
				src={getVideoSrc({ type, videoId })}
				title={srcTitle[type]}
				allowFullScreen
				loading="lazy"
				className={cn(
					{
						"aspect-video w-full border-0": type === "youtube",
						"absolute top-0 h-full w-full border-none": type === "bunny",
					},
					className,
				)}
				sandbox="allow-scripts allow-same-origin allow-presentation"
				referrerPolicy="strict-origin-when-cross-origin"
				allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
			/>
		</div>
	)
}
