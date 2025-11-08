import { randomBytes } from "node:crypto"
import { PassThrough } from "node:stream"

import type { RenderToPipeableStreamOptions } from "react-dom/server"
import { renderToPipeableStream } from "react-dom/server"

import type { HandleDocumentRequestFunction } from "react-router"
import { ServerRouter } from "react-router"

import { contentSecurity } from "@nichtsam/helmet/content"
import { createReadableStreamFromReadable } from "@react-router/node"
import { isbot } from "isbot"

import { avatarBaseUrl } from "@repo/utils/misc"
import { NonceProvider } from "@repo/utils/providers/nonce"
import {
	bunnyBaseUrl,
	bunnyStorageZone,
	youtubeBaseUrl,
} from "@repo/utils/storage.server"

export const streamTimeout = 5_000
const sanityCdnBaseUrl = "*.sanity.io"

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>

export function handleRequest(...args: DocRequestArgs) {
	// eslint-disable-next-line prefer-const
	let [request, responseStatusCode, responseHeaders, routerContext] = args
	const nonce = randomBytes(16).toString("hex")
	return new Promise((resolve, reject) => {
		let shellRendered = false
		const userAgent = request.headers.get("user-agent")
		const readyOption: keyof RenderToPipeableStreamOptions =
			(userAgent && isbot(userAgent)) || routerContext.isSpaMode
				? "onAllReady"
				: "onShellReady"

		const { pipe, abort } = renderToPipeableStream(
			<NonceProvider value={nonce}>
				<ServerRouter context={routerContext} nonce={nonce} url={request.url} />
			</NonceProvider>,
			{
				[readyOption]() {
					shellRendered = true
					const body = new PassThrough()
					const stream = createReadableStreamFromReadable(body)
					responseHeaders.set("Content-Type", "text/html")

					contentSecurity(responseHeaders, {
						crossOriginEmbedderPolicy: false,
						contentSecurityPolicy: {
							reportOnly: true,
							directives: {
								fetch: {
									"connect-src": [
										"'self'",
										process.env.SENTRY_DSN ? "*.sentry.io" : undefined,
										youtubeBaseUrl,
										bunnyBaseUrl,
										bunnyStorageZone,
										sanityCdnBaseUrl,
									].filter(Boolean),
									"font-src": ["'self'"],
									"frame-src": ["'self'", youtubeBaseUrl, bunnyBaseUrl],
									"img-src": [
										"'self'",
										// "data:",
										avatarBaseUrl,
										bunnyStorageZone,
										sanityCdnBaseUrl,
									],
									"script-src": [
										"'strict-dynamic'",
										"'self'",
										`'nonce-${nonce}'`,
										sanityCdnBaseUrl,
										process.env.NODE_ENV === "development"
											? "'unsafe-eval'"
											: undefined,
									].filter(Boolean),
									"script-src-attr": [`'nonce-${nonce}'`],
								},
							},
						},
					})
					resolve(
						new Response(stream, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					)

					pipe(body)
				},
				onShellError(error: unknown) {
					reject(error)
				},
				onError(error: unknown) {
					responseStatusCode = 500
					if (shellRendered) {
						// biome-ignore lint/suspicious/noConsole: for debugging purpose, to be removed
						console.error(error)
					}
				},
			},
		)

		setTimeout(abort, streamTimeout + 1000)
	})
}
