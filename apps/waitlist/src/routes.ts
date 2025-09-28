import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	index('routes/home.tsx'),
	route('subscribe', 'routes/subscribe.ts'),
	route('set-theme', 'routes/set-theme.ts'),
] satisfies RouteConfig
