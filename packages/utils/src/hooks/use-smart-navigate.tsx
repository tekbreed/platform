import { useNavigate } from "react-router"

export interface SmartNavigateOptions {
	/**
	 * Force external navigation (window.location)
	 */
	external?: boolean

	/**
	 * Replace current history entry instead of pushing new one
	 */
	replace?: boolean

	/**
	 * State to pass to the next route
	 */
	state?: unknown
}

/**
 * Smart navigate hook that automatically chooses between React Router navigate
 * and window.location based on whether the destination is internal or external
 *
 * @returns A function that navigates to the given URL
 */
export function useSmartNavigate() {
	const navigate = useNavigate()

	return (to: string, options: SmartNavigateOptions = {}) => {
		const { external = false, replace = false, state } = options

		// Check if navigation is external (different origin)
		const isExternal =
			external ||
			to.startsWith("http://") ||
			to.startsWith("https://") ||
			to.startsWith("//")

		/**
		 * Check if navigation is to a different localhost port (cross-service in dev)
		 */
		const isDifferentPort =
			typeof window !== "undefined" &&
			to.includes("localhost:") &&
			!to.includes(window.location.port)

		/**
		 * For external navigation or cross-service navigation
		 */
		if (isExternal || isDifferentPort) {
			// Use window.location for full page reload
			if (replace) {
				window.location.replace(to)
			} else {
				window.location.href = to
			}
			return
		}

		navigate(to, { replace, state })
	}
}
