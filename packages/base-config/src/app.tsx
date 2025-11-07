import { Outlet, useLocation } from "react-router"

import { type Theme, useTheme } from "remix-themes"
import { HoneypotProvider } from "remix-utils/honeypot/react"

import type { HoneypotInputProps } from "@repo/utils/honeypot.server"
import type { Toast } from "@repo/utils/toast.server"
import { Toaster } from "@repo/ui/components/sonner"
import { Footer } from "@repo/ui/composed/footer"
import { Header } from "@repo/ui/composed/header/index"
import { useToast } from "@repo/utils/hooks/use-toast"
import { ChatProvider } from "@repo/utils/providers/chat"
import { DiscordProvider } from "@repo/utils/providers/discord"
import { MobileNavProvider } from "@repo/utils/providers/mobile-nav"
import { useNonce } from "@repo/utils/providers/nonce"

import { Document } from "./document"
import { ThemedApp } from "./themed-app"

export function App({
	nonce,
	theme,
	env,
}: {
	nonce: string
	theme: Theme | null
	env?: Record<string, string | undefined> | undefined
}) {
	const [currentTheme] = useTheme()
	const location = useLocation()
	const excludedRoutes = ["auth"]
	const hideHeader = excludedRoutes.some((r) => location.pathname.includes(r))
	return (
		<Document currentTheme={currentTheme} theme={theme} env={env} nonce={nonce}>
			{!hideHeader ? <Header /> : null}
			<main className="h-full min-h-full px-4 md:px-8">
				<Outlet />
			</main>
			<Footer />
			<Toaster position="top-right" richColors />
		</Document>
	)
}

export function AppWithProviders({
	env,
	theme,
	toastSession,
	honeypotInputProps,
}: {
	env?: Record<string, string | undefined>
	theme: Theme | null
	toastSession: Toast | null
	honeypotInputProps: HoneypotInputProps
}) {
	useToast(toastSession)
	const nonce = useNonce()
	return (
		<HoneypotProvider {...honeypotInputProps}>
			<MobileNavProvider>
				<ChatProvider>
					<DiscordProvider>
						<ThemedApp theme={theme}>
							<App theme={theme} nonce={nonce} env={env} />
						</ThemedApp>
					</DiscordProvider>
				</ChatProvider>
			</MobileNavProvider>
		</HoneypotProvider>
	)
}
