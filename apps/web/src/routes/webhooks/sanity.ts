import { redirect } from "react-router"

export const loader = () => redirect("/")

export async function action({ request }: { request: Request }) {
	// biome-ignore lint/suspicious/noConsole: we need to see what the request is
	console.log(await request)
	return {}
}
