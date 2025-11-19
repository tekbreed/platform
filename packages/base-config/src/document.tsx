import { Links, Meta, Scripts, ScrollRestoration } from "react-router"

import { PreventFlashOnWrongTheme, type Theme } from "remix-themes"

import { PostHogProvider } from "./posthog"

type DocumentProps = {
	children: React.ReactNode
	currentTheme?: Theme | null
	nonce: string
	theme?: Theme | null
	env?: Record<string, string | undefined>
}

export function Document({
	children,
	currentTheme,
	theme,
	env,
	nonce,
}: DocumentProps) {
	const allowIndexing = env?.ALLOW_INDEXING !== "false"
	return (
		<html data-theme={currentTheme ?? ""} lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<PreventFlashOnWrongTheme nonce={nonce} ssrTheme={!!theme} />
				{allowIndexing ? null : (
					<meta content="noindex, nofollow" name="robots" />
				)}
				<Links />
			</head>
			<body className="min-h-screen">
				<PostHogProvider>
					<div className="flex flex-col">{children}</div>
					<script
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Ignore dangerouslySetInnerHTML here as it is needed and safe
						dangerouslySetInnerHTML={{
							__html: `window.env = ${JSON.stringify(env)}`,
						}}
						nonce={nonce}
					/>
					{/* <Metrics nonce={nonce} /> */}
					<ScrollRestoration nonce={nonce} />
					<Scripts nonce={nonce} />
				</PostHogProvider>
			</body>
		</html>
	)
}
