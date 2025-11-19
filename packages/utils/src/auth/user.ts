import type { Action, Entity, RoleName } from "@repo/database"

export type AuthenticatedUser = {
	name: string
	id: string
	email: string
	isSubscribedToNewsletter: boolean
	image: {
		fileKey: string
		altText: string | null
	} | null
	roles: {
		name: RoleName
		permissions: {
			action: Action
			entity: Entity
			access: string
		}[]
	}[]
} | null
