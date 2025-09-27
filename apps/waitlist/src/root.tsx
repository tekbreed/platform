import React from 'react'
import type { Route } from './+types/root'
import {
	data,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
} from 'react-router'

import {
	PreventFlashOnWrongTheme,
	Theme,
	ThemeProvider,
	useTheme,
} from 'remix-themes'

import appStyles from './styles/app.css?url'
import fontStyles from './styles/fonts.css?url'

// import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { Toaster } from '@repo/ui/components/sonner'
import { getToast } from '@repo/utils/toast.server'
import { useToast } from '@repo/utils/hooks/use-toast'
import { useNonce } from '@repo/utils/providers/nonce'
import { GeneralErrorBoundary } from '@repo/ui/composed/error-boundary'
import { themeSessionResolver } from '@repo/utils/theme.server'

export const links: Route.LinksFunction = () => [
	// { rel: 'icon', href: '/favicon.png' },
	{ rel: 'stylesheet', href: appStyles },
	{ rel: 'stylesheet', href: fontStyles },
]

export async function loader({ request }: Route.LoaderArgs) {
	const { getTheme } = await themeSessionResolver(request)
	// const honeyProps = await honeypot.getInputProps()
	const {
		toast: toastSession,
		// headers: toastHeaders
	} = await getToast(request)

	// const authSession = await authSessionStorage.getSession(
	// 	request.headers.get('cookie'),
	// )

	// const sessionId: string = authSession.get(sessionKey)
	// const session = sessionId
	// 	? await prisma.session.findUnique({
	// 			where: { id: sessionId },
	// 			select: { userId: true },
	// 		})
	// 	: null

	// const user = session?.userId
	// 	? await prisma.user.findUnique({
	// 			where: { id: session.userId },
	// 			select: {
	// 				id: true,
	// 				email: true,
	// 				name: true,
	// 				isSubscribedToNewsletter: true,
	// 				image: { select: { fileKey: true, altText: true } },
	// 				roles: {
	// 					select: {
	// 						name: true,
	// 						permissions: {
	// 							select: { access: true, action: true, entity: true },
	// 						},
	// 					},
	// 				},
	// 			},
	// 		})
	// 	: null

	// if (sessionId && !user) {
	// 	await signout({ request, redirectTo: '/' })
	// }
	return data(
		{
			// user,
			toastSession,
			theme: getTheme(),
			// env: getEnv(),
			// honeyProps,
		},
		// { headers: combineHeaders(toastHeaders) },
	)
}

type DocumentProps = {
	children: React.ReactNode
	currentTheme?: Theme | null
	nonce: string
	theme?: Route.ComponentProps['loaderData']['theme']
	env?: Record<string, string | undefined>
}

function Document({
	children,
	currentTheme,
	theme,
	env,
	nonce,
}: DocumentProps) {
	const allowIndexing = env?.ALLOW_INDEXING !== 'false'
	return (
		<html lang="en" data-theme={currentTheme ?? ''}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<PreventFlashOnWrongTheme nonce={nonce} ssrTheme={!!theme} />
				{allowIndexing ? null : <meta name="robots" content="noindex, nofollow" />}
				<Links />
			</head>
			<body>
				{children}
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.env = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

function App() {
	const [currentTheme] = useTheme()
	const nonce = useNonce()
	const {
		theme,
		toastSession,
		//  env
	} = useLoaderData<Route.ComponentProps['loaderData']>()
	useToast(toastSession)

	return (
		<Document
			currentTheme={currentTheme}
			theme={theme}
			// env={env}
			nonce={nonce}
		>
			<Outlet />
			<Toaster position="top-right" richColors />
		</Document>
	)
}

function ThemedApp({
	children,
	theme,
}: {
	children: React.ReactNode
	theme: Theme | null
}) {
	return (
		<ThemeProvider
			specifiedTheme={theme}
			themeAction="/set-theme"
			disableTransitionOnThemeChange={true}
		>
			{children}
		</ThemeProvider>
	)
}

export default function AppWithProviders({ loaderData }: Route.ComponentProps) {
	const {
		theme,
		//  honeyProps
	} = loaderData
	return (
		// <HoneypotProvider {...honeyProps}>
		<ThemedApp theme={theme}>
			<App />
		</ThemedApp>
		// </HoneypotProvider>
	)
}

export function ErrorBoundary() {
	const nonce = useNonce()
	return (
		<ThemedApp theme={null}>
			<Document nonce={nonce}>
				<GeneralErrorBoundary />
			</Document>
		</ThemedApp>
	)
}
