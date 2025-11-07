import { createCookieSessionStorage } from "react-router"

import { GitHubProvider } from "./auth-providers/github.server"
import type { AuthProvider } from "./auth-providers/provider"
import type { ProviderName } from "./connection"

export const connectionSessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__tb_connection",
		sameSite: "lax",
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10, // 10 minutes
		secrets: [process.env.SESSION_SECRET],
		...(process.env.NODE_ENV === "production"
			? {
					domain: ".tekbreed.com",
					secure: true,
				}
			: {}),
	},
})

export const providers: Record<ProviderName, AuthProvider> = {
	github: new GitHubProvider(),
}

export async function handleMockAction(
	providerName: ProviderName,
	request: Request,
) {
	return providers[providerName].handleMockAction(request)
}

export async function resolveConnectionData(
	providerName: ProviderName,
	providerId: string,
) {
	return providers[providerName].resolveConnectionData(providerId)
}
