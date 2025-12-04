import { Iframe } from "@/composed/iframe"
import { cn } from "@/lib/utils"

export function Img({
	className,
	...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<img
			className={cn(
				"mx-auto my-8 max-w-full rounded-md border object-cover shadow-sm",
				className,
			)}
			loading="lazy"
			{...props}
			alt={props.alt}
		/>
	)
}

interface MDXIframeProps {
	videoId: string
	type: "youtube" | "bunny"
	className?: string
}

export function MDXIframe({
	videoId,
	type = "youtube",
	className,
}: MDXIframeProps) {
	return <Iframe className={className} type={type} videoId={videoId} />
}
