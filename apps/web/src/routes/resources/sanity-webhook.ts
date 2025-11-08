import { redirect } from "react-router"

import type { Route } from "./+types/sanity-webhook"

export const loader = () => redirect("/")

export async function action({ request }: Route.ActionArgs) {
	// biome-ignore lint/suspicious/noConsole: we need to see what the request is
	console.log(await request)
	return {}
}
