import type { Strategy } from "remix-auth/strategy"

export type ProviderUser = {
	id: string
	email: string
	username?: string
	name?: string
	imageUrl?: string
}

export interface AuthProvider {
	// biome-ignore lint/suspicious/noExplicitAny: allow any
	getAuthStrategy(): Strategy<ProviderUser, any>
	handleMockAction(request: Request): Promise<void>
	resolveConnectionData(providerId: string): Promise<{
		displayName: string
		link?: string | null
	}>
}
