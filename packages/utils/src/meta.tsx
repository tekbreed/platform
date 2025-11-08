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
			<meta content={description} name="description" />
			<meta content={keywords} name="keywords" />
			<meta content="Christopher S. Aondona (The Coding Simba)" name="author" />

			<meta content={title} property="og:title" />
			<meta content={description} property="og:description" />
			<meta content={`${baseUrl}/${url}`} property="og:url" />
			<meta content={image} property="og:image" />
			<meta content={imageAlt} property="og:image:alt" />
			<meta content={type} property="og:type" />

			<meta content="summary_large_image" name="twitter:card" />
			<meta content="@tekbreed" name="twitter:site" />
			<meta content={title} name="twitter:title" />
			<meta content={description} name="twitter:description" />
			<meta content={image} name="twitter:image" />
			<meta content={imageAlt} name="twitter:image:alt" />
		</>
	)
}
