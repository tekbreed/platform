import { index, type RouteConfig, route } from "@react-router/dev/routes"

export default [
	index("routes/home.tsx"),
	route("set-theme", "routes/set-theme.ts"),
	route("media/:fileId", "routes/resources/media.ts"),
] satisfies RouteConfig
