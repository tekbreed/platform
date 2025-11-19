import React from "react"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	const [hydrated, setHydrated] = React.useState(false)

	React.useEffect(() => {
		posthog.init("phc_ihNi5ypmKfTADWAuYO2c6Bc5zLOFh4LYZ6ayJmTM07h", {
			api_host: "https://us.i.posthog.com",
			defaults: "2025-05-24",
			person_profiles: "identified_only",
		})

		setHydrated(true)
	}, [])

	if (!hydrated) return <>{children}</>
	return <PHProvider client={posthog}>{children}</PHProvider>
}
