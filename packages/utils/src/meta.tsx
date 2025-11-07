import { baseUrl, slogan } from "@/constants/config"
import { getImgSrc } from "./misc"

interface MetadataProps {
	title?: string
	description?: string
	url?: string
	image?: string
	imageAlt?: string
	type?: "website" | "article"
	keywords?: string
}

export function generateMetadata({
	title = "TekBreed",
	description = slogan,
	url = "",
	image = getImgSrc({ fileKey: "tekbreedlogo.png" }),
	imageAlt = "TekBreed",
	type = "website",
	keywords,
}: MetadataProps) {
	return (
		<>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content="Christopher S. Aondona (The Coding Simba)" />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={`${baseUrl}/${url}`} />
			<meta property="og:image" content={image} />
			<meta property="og:image:alt" content={imageAlt} />
			<meta property="og:type" content={type} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@tekbreed" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:image:alt" content={imageAlt} />
		</>
	)
}
