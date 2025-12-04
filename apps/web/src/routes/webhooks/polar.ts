import { redirect } from "react-router"

export const loader = () => redirect("/")

export async function action() {
	// biome-ignore lint/suspicious/noConsole:For testing
	console.log("Polar webhook received")
	return {}
}
