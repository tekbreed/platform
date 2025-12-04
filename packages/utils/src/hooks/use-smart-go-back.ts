import React from "react"

import { useLocation, useNavigate } from "react-router"

export function useSmartGoBack() {
	const navigate = useNavigate()
	const location = useLocation()

	/**
	 * Store the initial entry path when the hook is first used
	 */
	const entryPath = React.useRef(location.pathname)

	return (fallback: string = "/") => {
		const cameFromExternal = () =>
			location.pathname === entryPath.current && window.history.length <= 2
		if (window.history.length > 1 && !cameFromExternal()) {
			navigate(-1)
		} else {
			navigate(fallback)
		}
	}
}
