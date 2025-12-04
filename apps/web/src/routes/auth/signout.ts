import { redirect } from "react-router"

import { signout } from "@repo/utils/auth/auth.server"

import type { Route } from "./+types/signout"

export async function loader() {
	return redirect("/")
}

export async function action({ request }: Route.ActionArgs) {
	await signout({ request })
	return {}
}
