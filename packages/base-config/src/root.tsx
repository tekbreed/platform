import React from 'react'
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

// import type { Route } from './+types/root'
import appStyles from '~/styles/app.css?url'
import fontStyles from '~/styles/fonts.css?url'
import { Navbar } from './components/navbar'
import { themeSessionResolver } from '~/utils/theme.server'
import { GeneralErrorBoundary } from './components/error-boundary'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { MobileNavProvider } from './providers/mobile-nav'
import { ChatProvider } from './providers/chat'
import { MobileNav } from './components/mobile-nav'
import { prisma } from './utils/db.server'
import { sessionKey, signout } from './utils/auth.server'
import { Toaster } from './components/ui/sonner'
import { getToast } from './utils/toast.server'
import { combineHeaders } from './utils/misc'
import { authSessionStorage } from './utils/session.server'
import { getEnv } from './utils/env.server'
import { useToast } from './hooks/use-toast'
import { honeypot } from './utils/honeypot.server'
import { useNonce } from './utils/nonce-provider'
import { Footer } from './components/footer'
import { Stack } from './components/drawers/stack'
import { DiscordProvider } from './providers/discord'

// export const links: Route.LinksFunction = () => [
// 	{ rel: 'icon', href: '/favicon.png' },
// 	{ rel: 'stylesheet', href: appStyles },
// 	{ rel: 'stylesheet', href: fontStyles },
// ]

export async function loader({ request }: Route.LoaderArgs) {
	const { getTheme } = await themeSessionResolver(request)
	const honeyProps = await honeypot.getInputProps()
	const { toast: toastSession, headers: toastHeaders } = await getToast(request)

	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)

	const sessionId: string = authSession.get(sessionKey)
	const session = sessionId
		? await prisma.session.findUnique({
				where: { id: sessionId },
				select: { userId: true },
			})
		: null

	const user = session?.userId
		? await prisma.user.findUnique({
				where: { id: session.userId },
				select: {
					id: true,
					email: true,
					name: true,
					isSubscribedToNewsletter: true,
					image: { select: { fileKey: true, altText: true } },
					roles: {
						select: {
							name: true,
							permissions: {
								select: { access: true, action: true, entity: true },
							},
						},
					},
				},
			})
		: null

	if (sessionId && !user) {
		await signout({ request, redirectTo: '/' })
	}
	return data(
		{
			user,
			toastSession,
			theme: getTheme(),
			env: getEnv(),
			honeyProps,
		},
		{ headers: combineHeaders(toastHeaders) },
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

function App({ children }: { children?: React.ReactNode }) {
	const [currentTheme] = useTheme()
	const nonce = useNonce()
	const { theme, toastSession, env } =
		useLoaderData<Route.ComponentProps['loaderData']>()
	useToast(toastSession)

	return (
		<Document currentTheme={currentTheme} theme={theme} env={env} nonce={nonce}>
			{/* <OptionalNavbar /> */}
			{/* <MobileNav /> */}
			{children}
			<Outlet />
			{/* <Footer /> */}
			{/* <Stack /> */}
			<Toaster position="top-right" richColors />
		</Document>
	)
}

function OptionalNavbar() {
	const location = useLocation()
	const isHomePage = location.pathname === '/'
	return !isHomePage ? <Navbar /> : null
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
	const { theme, honeyProps } = loaderData
	return (
		<HoneypotProvider {...honeyProps}>
			<MobileNavProvider>
				<ChatProvider>
					<DiscordProvider>
						<ThemedApp theme={theme}>
							<App />
						</ThemedApp>
					</DiscordProvider>
				</ChatProvider>
			</MobileNavProvider>
		</HoneypotProvider>
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
