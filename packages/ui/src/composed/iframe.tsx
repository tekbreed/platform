import React from "react"

import { useNavigate } from "react-router"

import { getModuleUrl } from "@repo/utils/constants/client"
import { getVideoSrc } from "@repo/utils/misc"

import { cn } from "@/lib/utils"
import { EmptyState } from "./empty-state"
import { Icons } from "./icons"

interface MDXIframeProps {
	videoId: string
	type: "youtube" | "bunny"
	className?: string
}

export const Iframe = React.memo(
	({ videoId, type = "youtube", className }: MDXIframeProps) => {
		const navigate = useNavigate()
		const srcTitle = {
			youtube: `YouTube video player`,
			bunny: `Bunny video player`,
		}

		if (!videoId)
			return (
				<EmptyState
					action={{
						label: "Contact support",
						onClick: () => navigate(getModuleUrl("web", "support")),
					}}
					description="Please contact support if you believe this is an error."
					// biome-ignore lint/a11y/useMediaCaption: Just a video icon
					icon={<Icons.video />}
					title="Video not found"
				/>
			)

		return (
			<div
				className={cn(
					"my-8 w-full",
					{
						"relative pt-[56.25%]": type === "bunny",
					},
					className,
				)}
			>
				<iframe
					allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					className={cn("rounded-md", {
						"aspect-video w-full border-0": type === "youtube",
						"absolute top-0 h-full w-full border-none": type === "bunny",
					})}
					loading="lazy"
					referrerPolicy="strict-origin-when-cross-origin"
					sandbox="allow-scripts allow-same-origin allow-presentation"
					src={getVideoSrc({ type, videoId })}
					title={srcTitle[type]}
				/>
			</div>
		)
	},
)
