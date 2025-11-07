import { type HttpHandler, http, passthrough } from "msw"

// React Router Dev Tools
export const handlers: HttpHandler[] =
	process.env.NODE_ENV === "development"
		? [http.post(/http:\/\/localhost\/.*/, passthrough)]
		: []
