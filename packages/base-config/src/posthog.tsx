import React from "react"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	const [hydrated, setHydrated] = React.useState(false)

	React.useEffect(() => {
		posthog.init(env.POSTHOG_API_KEY, {
			api_host: "https://posthog-reverse-proxy.tekbreed.com",
			// api_host: "https://us.i.posthog.com",
			ui_host: "https://us.posthog.com",
			defaults: "2025-05-24",
			person_profiles: "identified_only",
		})
		setHydrated(true)
	}, [])

	if (!hydrated) return <>{children}</>
	return <PHProvider client={posthog}>{children}</PHProvider>
}
