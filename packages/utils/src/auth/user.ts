import type { Action, Entity, Image, RoleName } from "@repo/database"

export type AuthenticatedUser = {
	name: string
	id: string
	email: string
	isSubscribedToNewsletter: boolean
	image: Image | null
	roles: {
		name: RoleName
		permissions: {
			action: Action
			entity: Entity
			access: string
		}[]
	}[]
} | null
