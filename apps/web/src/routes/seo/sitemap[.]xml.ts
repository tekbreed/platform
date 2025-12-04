import { href } from "react-router"

import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap"

import { getDomainUrl } from "@repo/utils/misc"

import type { Route } from "./+types/sitemap[.]xml"

export const loader = async ({ request }: Route.LoaderArgs) => {
	const { routes } = await import("virtual:react-router/server-build")

	const ignoredRoutes = [
		href("/profile"),
		// href("/subscription"),
		href("/roadmap"),
		href("/auth/:provider", { provider: "github" }),
		href("/auth/:provider/callback", { provider: "github" }),
		href("/auth/onboarding"),
		href("/auth/onboarding/:provider", { provider: "github" }),
		href("/legal/:pageSlug", { pageSlug: "terms" }),
		href("/legal/:pageSlug", { pageSlug: "privacy" }),
		href("/auth/verify"),
		// href("/auth/signup"),
		// href("/auth/signin"),
		href("/auth/signout"),
		href("/auth/forgot-password"),
		href("/set-theme"),
		href("/discord"),
		href("/content/webhook"),
		href("/download-user-data"),
		href("/media/:fileId", { fileId: "" }),
		href("/faqs"),
		href("/support"),
		href("/about"),
	]
	const sitemap = await generateRemixSitemap({
		domain: getDomainUrl(request),
		ignore: [...ignoredRoutes],
		routes,
	})

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	})
}
