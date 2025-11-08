import "dotenv/config"

import { serve } from "@hono/node-server"
import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => {
	return c.text("Hello Hono!")
})

serve(
	{
		fetch: app.fetch,
		port: Number(process.env.PORT),
	},
	(info) => {
		// biome-ignore lint/suspicious/noConsole: allow for debugging
		console.log(`Server is running on http://localhost:${info.port}`)
	},
)
