import { useLocation, useRouteLoaderData } from "react-router"

/**
 * Hook that generates a redirectTo URL parameter for the current location.
 * Useful for preserving the current URL when redirecting to signin/signup pages.
 * @returns A string containing the redirectTo URL parameter
 */
export function useRedirectTo() {
	const location = useLocation()
	const { domain } = useRouteLoaderData("root")

	// Remove any existing redirectTo parameter from the search string
	const searchParams = new URLSearchParams(location.search)
	searchParams.delete("redirectTo")

	const cleanSearch = searchParams.toString()
	const searchString = cleanSearch ? `?${cleanSearch}` : ""

	const currentUrl = new URL(
		location.pathname + searchString + location.hash,
		domain,
	)

	// Get the auth service domain from the root loader data
	const authDomain = domain

	// Compare domains to determine if same service
	const isSameService = currentUrl.hostname === new URL(authDomain).hostname

	const redirectToValue = isSameService
		? location.pathname + searchString + location.hash
		: currentUrl.toString()

	return new URLSearchParams({
		redirectTo: redirectToValue,
	}).toString()
}
