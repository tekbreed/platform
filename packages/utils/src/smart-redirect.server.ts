import { redirect as routerRedirect } from "react-router"

interface SmartRedirectOptions {
	/**
	 * The URL to redirect to
	 */
	to: string

	/**
	 * Force external redirect (window.location)
	 */
	external?: boolean

	/**
	 * HTTP status code (default: 302)
	 */
	status?: number

	/**
	 * Additional headers for the redirect response
	 */
	headers?: HeadersInit

	/**
	 * Preserve current URL as redirectTo query param
	 */
	preserveRedirectTo?: boolean

	/**
	 * Current request (needed for preserveRedirectTo)
	 */
	request?: Request
}

/**
 * Smart redirect that automatically chooses between React Router redirect
 * and window.location redirect based on whether the destination is internal or external
 */
export function smartRedirect(options: SmartRedirectOptions): Response | never {
	const {
		to,
		external = false,
		status = 302,
		headers: customHeaders = {},
		preserveRedirectTo = false,
		request,
	} = options

	// Build final URL with redirectTo if needed
	let finalUrl = to
	if (preserveRedirectTo && request) {
		finalUrl = appendRedirectTo(to, request.url)
	}

	// Check if redirect is external (different origin)
	const isExternal =
		external ||
		finalUrl.startsWith("http://") ||
		finalUrl.startsWith("https://") ||
		finalUrl.startsWith("//")

	// Check if redirect is to a different localhost port (cross-service in dev)
	// Server-side: always treat localhost with port as external
	const isDifferentPort = finalUrl.includes("localhost:")

	// For external redirects or cross-service navigation
	if (isExternal || isDifferentPort) {
		// Server-side: use React Router redirect with full URL
		return routerRedirect(finalUrl, {
			status,
			headers: customHeaders,
		})
	}

	// For internal navigation: use React Router redirect
	return routerRedirect(finalUrl, {
		status,
		headers: customHeaders,
	})
}

/**
 * Helper to append current URL as redirectTo query param
 */
function appendRedirectTo(targetUrl: string, currentUrl: string): string {
	try {
		const target = new URL(targetUrl, currentUrl)
		const current = new URL(currentUrl)

		// Build redirectTo value (pathname + search + hash)
		const redirectTo = `${current.pathname}${current.search}${current.hash}`

		// Add to target URL
		target.searchParams.set("redirectTo", redirectTo)

		return target.href
	} catch {
		// If URL parsing fails, return original
		return targetUrl
	}
}

/**
 * Convenience function for 301 permanent redirects
 */
export function permanentRedirect(
	to: string,
	options?: Omit<SmartRedirectOptions, "to" | "status">,
): Response | never {
	return smartRedirect({ ...options, to, status: 301 })
}

/**
 * Convenience function for 302 temporary redirects (default)
 */
export function temporaryRedirect(
	to: string,
	options?: Omit<SmartRedirectOptions, "to" | "status">,
): Response | never {
	return smartRedirect({ ...options, to, status: 302 })
}

/**
 * Convenience function for 303 See Other redirects (POST -> GET)
 */
export function seeOtherRedirect(
	to: string,
	options?: Omit<SmartRedirectOptions, "to" | "status">,
): Response | never {
	return smartRedirect({ ...options, to, status: 303 })
}

/**
 * Convenience function for cross-service redirects
 */
export function crossServiceRedirect(
	to: string,
	options?: Omit<SmartRedirectOptions, "to" | "external">,
): Response | never {
	return smartRedirect({ ...options, to, external: true })
}

/**
 * Safe redirect that validates the URL before redirecting
 */
export function safeRedirect(
	to: string | null | undefined,
	fallback: string = "/",
	allowedDomains: string[] = [],
): Response | never {
	// Handle null/undefined
	if (!to) {
		return smartRedirect({ to: fallback })
	}

	try {
		const url = new URL(to, "https://tekbreed.com") // Base for relative URLs

		// If no domains specified, allow any relative URL
		if (allowedDomains.length === 0 && !url.hostname) {
			return smartRedirect({ to })
		}

		// Check if domain is allowed
		const isAllowed = allowedDomains.some(
			(domain) =>
				url.hostname === domain || url.hostname.endsWith(`.${domain}`),
		)

		if (isAllowed) {
			return smartRedirect({ to })
		}

		// Not allowed, redirect to fallback
		console.warn(`Redirect to ${to} blocked. Redirecting to ${fallback}`)
		return smartRedirect({ to: fallback })
	} catch {
		// Invalid URL, redirect to fallback
		console.warn(`Invalid redirect URL: ${to}. Redirecting to ${fallback}`)
		return smartRedirect({ to: fallback })
	}
}

/**
 * Get redirectTo from URL search params
 */
export function getRedirectTo(
	request: Request,
	fallback: string = "/",
): string {
	const url = new URL(request.url)
	return url.searchParams.get("redirectTo") || fallback
}

/**
 * Redirect back to the URL stored in redirectTo param
 */
export function redirectBack(
	request: Request,
	fallback: string = "/",
	allowedDomains: string[] = [],
): Response | never {
	const redirectTo = getRedirectTo(request, fallback)
	return safeRedirect(redirectTo, fallback, allowedDomains)
}
